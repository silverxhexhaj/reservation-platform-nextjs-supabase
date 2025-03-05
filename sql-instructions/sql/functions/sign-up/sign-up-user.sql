
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists create_profile_with_metadata;

drop policy if exists allow_authenticated_users_to_insert_their_profile on public.profiles;
drop policy if exists allow_users_to_read_their_own_profile on public.profiles;
drop policy if exists allow_users_to_update_their_own_profile on public.profiles;

drop policy if exists allow_business_owners_to_create_business on public.businesses;
drop policy if exists allow_business_owners_to_read_their_business on public.businesses;
drop policy if exists allow_business_owners_to_update_their_business on public.businesses;

create or replace function create_profile_with_metadata()
returns trigger as $$
declare
  profile_type_var public.profile_type;
begin

    profile_type_var := (new.raw_user_meta_data->>'profile_type')::public.profile_type;

  insert into public.profiles (
    user_id,
    profile_type,
    first_name,
    last_name,
    phone
  ) values (
    new.id,
    profile_type_var,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'phone'
  );
  
  
  if profile_type_var = 'business_owner' then
    -- Create location record first
    with new_location as (
      insert into public.locations (
        name,
        floor,
        side,
        city_code,
        city_section,
        city_name,
        country
      ) values (
        new.raw_user_meta_data->>'road_name',
        new.raw_user_meta_data->>'floor',
        new.raw_user_meta_data->>'side',
        new.raw_user_meta_data->>'city_code',
        new.raw_user_meta_data->>'city_section',
        new.raw_user_meta_data->>'city_name',
        new.raw_user_meta_data->>'country'
      )
      returning id
    )
    insert into public.businesses (
      owner_id,
      name,
      description,
      location_id,
      external_link_facebook,
      external_link_instagram,
      external_link_tiktok,
      external_link_linkedin,
      price_range,
      category,
      is_active
    ) values (
      new.id,
      new.raw_user_meta_data->>'business_name',
      new.raw_user_meta_data->>'description',
      (select id from new_location),
      new.raw_user_meta_data->>'external_link_facebook',
      new.raw_user_meta_data->>'external_link_instagram',
      new.raw_user_meta_data->>'external_link_tiktok',
      new.raw_user_meta_data->>'external_link_linkedin',
      new.raw_user_meta_data->>'price_range',
      new.raw_user_meta_data->>'category',
      true
    );
  end if;
  
  return new;
end;
$$ language plpgsql;


create trigger on_auth_user_created
after insert on auth.users
for each row execute function create_profile_with_metadata();

CREATE POLICY allow_authenticated_users_to_insert_their_profile
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY allow_users_to_read_their_own_profile
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY allow_users_to_update_their_own_profile
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id);


-- Policy to allow business owners to create their business
CREATE POLICY allow_business_owners_to_create_business
ON public.businesses
FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM public.profiles 
    WHERE user_id = auth.uid() AND profile_type = 'business_owner'
  )
);

-- Policy to allow business owners to read their own business
CREATE POLICY allow_business_owners_to_read_their_business
ON public.businesses
FOR SELECT
USING (
  owner_id = auth.uid()
);

-- Policy to allow business owners to update their own business
CREATE POLICY allow_business_owners_to_update_their_business
ON public.businesses
FOR UPDATE
USING (
  owner_id = auth.uid()
);
