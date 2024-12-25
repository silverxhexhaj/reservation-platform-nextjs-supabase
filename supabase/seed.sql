-- Add missing columns to businesses table
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS location_address TEXT;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS location_city TEXT;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS location_state TEXT;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS location_zip TEXT;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS hours JSONB;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS services JSONB;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS amenities TEXT[];
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS gallery_images TEXT[];
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS social_media JSONB;

-- Create business_offers table if it doesn't exist
CREATE TABLE IF NOT EXISTS business_offers (
  id UUID PRIMARY KEY,
  business_id UUID REFERENCES businesses(id),
  title TEXT NOT NULL,
  description TEXT,
  original_price DECIMAL(10,2) NOT NULL,
  discounted_price DECIMAL(10,2) NOT NULL,
  discount_percentage INTEGER NOT NULL,
  valid_until DATE NOT NULL,
  image_url TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample businesses
INSERT INTO businesses (
  id,
  name,
  description,
  category,
  rating,
  price_range,
  image_url,
  is_premium,
  created_at,
  location_address,
  location_city,
  location_state,
  location_zip,
  hours,
  services,
  amenities,
  tags,
  gallery_images,
  social_media
) VALUES
(
  'c8815019-8fc2-4647-9a85-e5158e6a3f6b',
  'Luxe Hair Studio',
  'Premium hair salon offering cutting-edge styles and treatments',
  'Hair Salon',
  4.8,
  '$$$',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&h=600&fit=crop',
  true,
  '2023-08-15T00:00:00Z',
  'Rruga Myslym Shyri',
  'Tiranë',
  'AL',
  '1001',
  jsonb_build_object(
    'monday', jsonb_build_object('open', '09:00', 'close', '18:00'),
    'tuesday', jsonb_build_object('open', '09:00', 'close', '18:00'),
    'wednesday', jsonb_build_object('open', '09:00', 'close', '18:00'),
    'thursday', jsonb_build_object('open', '09:00', 'close', '20:00'),
    'friday', jsonb_build_object('open', '09:00', 'close', '20:00'),
    'saturday', jsonb_build_object('open', '10:00', 'close', '16:00')
  ),
  jsonb_build_array(
    jsonb_build_object('id', 's1', 'name', 'Haircut & Style', 'price', 85, 'duration', 60),
    jsonb_build_object('id', 's2', 'name', 'Color Treatment', 'price', 120, 'duration', 120)
  ),
  ARRAY['Free WiFi', 'Complimentary Beverages', 'Parking'],
  ARRAY['Hair', 'Beauty', 'Salon'],
  ARRAY['https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&h=600&fit=crop'],
  jsonb_build_object(
    'instagram', '@luxehair',
    'facebook', 'luxehairtirana'
  )
),
(
  'd7a3a880-e8b7-4d0c-9f3d-f8b8a4b5c335',
  'Zen Massage & Spa',
  'Luxurious massage and spa treatments for ultimate relaxation',
  'Spa',
  4.9,
  '$$$$',
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop',
  true,
  '2023-11-15T00:00:00Z',
  'Rruga e Kavajës',
  'Tiranë',
  'AL',
  '1001',
  jsonb_build_object(
    'monday', jsonb_build_object('open', '10:00', 'close', '20:00'),
    'tuesday', jsonb_build_object('open', '10:00', 'close', '20:00'),
    'wednesday', jsonb_build_object('open', '10:00', 'close', '20:00'),
    'thursday', jsonb_build_object('open', '10:00', 'close', '21:00'),
    'friday', jsonb_build_object('open', '10:00', 'close', '21:00'),
    'saturday', jsonb_build_object('open', '09:00', 'close', '22:00'),
    'sunday', jsonb_build_object('open', '11:00', 'close', '18:00')
  ),
  jsonb_build_array(
    jsonb_build_object('id', 's3', 'name', 'Swedish Massage', 'price', 120, 'duration', 60),
    jsonb_build_object('id', 's4', 'name', 'Deep Tissue Massage', 'price', 140, 'duration', 60)
  ),
  ARRAY['Sauna', 'Steam Room', 'Robes Provided', 'Shower Facilities'],
  ARRAY['Massage', 'Spa', 'Wellness'],
  ARRAY['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop'],
  jsonb_build_object(
    'instagram', '@zenspa',
    'facebook', 'zenspatirana'
  )
),
(
  'e9b9f5e6-a67d-4c1c-9f3d-8b8f5c7d2e1a',
  'Blloku Fitness Center',
  'Modern gym with state-of-the-art equipment and expert trainers',
  'Gym & Fitness',
  4.7,
  '$$',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
  false,
  '2023-10-01T00:00:00Z',
  'Blloku',
  'Tiranë',
  'AL',
  '1001',
  jsonb_build_object(
    'monday', jsonb_build_object('open', '06:00', 'close', '23:00'),
    'tuesday', jsonb_build_object('open', '06:00', 'close', '23:00'),
    'wednesday', jsonb_build_object('open', '06:00', 'close', '23:00'),
    'thursday', jsonb_build_object('open', '06:00', 'close', '23:00'),
    'friday', jsonb_build_object('open', '06:00', 'close', '22:00'),
    'saturday', jsonb_build_object('open', '07:00', 'close', '20:00'),
    'sunday', jsonb_build_object('open', '08:00', 'close', '18:00')
  ),
  jsonb_build_array(
    jsonb_build_object('id', 's5', 'name', 'Personal Training', 'price', 50, 'duration', 60),
    jsonb_build_object('id', 's6', 'name', 'Group Classes', 'price', 25, 'duration', 45)
  ),
  ARRAY['Towel Service', 'Lockers', 'Showers', 'Protein Bar'],
  ARRAY['Fitness', 'Gym', 'Training'],
  ARRAY['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop'],
  jsonb_build_object(
    'instagram', '@blokufitness',
    'facebook', 'blokufitnesstirana'
  )
);

-- Insert sample business offers
INSERT INTO business_offers (
  id,
  business_id,
  title,
  description,
  original_price,
  discounted_price,
  discount_percentage,
  valid_until,
  image_url,
  category
) VALUES
(
  'f1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d',
  'd7a3a880-e8b7-4d0c-9f3d-f8b8a4b5c335',
  'Summer Spa Package',
  'Full body massage + facial treatment',
  150,
  99,
  34,
  '2024-08-31',
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop',
  'Spa Package'
),
(
  'a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d',
  'c8815019-8fc2-4647-9a85-e5158e6a3f6b',
  'Hair Transformation',
  'Haircut + color + treatment',
  200,
  149,
  25,
  '2024-07-31',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&h=600&fit=crop',
  'Hair Package'
),
(
  'b1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d',
  'e9b9f5e6-a67d-4c1c-9f3d-8b8f5c7d2e1a',
  'Fitness Starter Pack',
  '1 month membership + 3 PT sessions',
  300,
  199,
  33,
  '2024-06-30',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
  'Fitness Package'
); 