

-- Drop tables if they exist (in reverse order of creation to handle dependencies)
DROP TABLE IF EXISTS staff_working_hours CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS redeemed_rewards CASCADE;
DROP TABLE IF EXISTS rewards CASCADE;
DROP TABLE IF EXISTS loyalty_points CASCADE;
DROP TABLE IF EXISTS deals CASCADE;
DROP TABLE IF EXISTS campaigns CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS business_staff CASCADE;
DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS business_gallery CASCADE;
DROP TABLE IF EXISTS business_features CASCADE;
DROP TABLE IF EXISTS businesses CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS staff_services CASCADE;
DROP TABLE IF EXISTS points_transactions CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS auth.users CASCADE;
DROP TYPE IF EXISTS profile_type CASCADE;
DROP TYPE IF EXISTS business_category CASCADE;

-- Drop enums if they exist
DROP TYPE IF EXISTS payment_status CASCADE;
DROP TYPE IF EXISTS booking_status CASCADE;
DROP TYPE IF EXISTS campaign_status CASCADE;
DROP TYPE IF EXISTS notification_type CASCADE;





INSERT INTO auth.users (id, email) VALUES
    ('d0d8d2bc-e5c7-4350-9e61-7549e39b60ef', 'owner1@example.com'),
    ('f3d1529e-64c3-4e65-9f47-1a5d87d254c4', 'owner2@example.com'),
    ('8b55a5c5-6d56-4c1c-9c4d-7a4df2e5c806', 'owner3@example.com'),
    ('b7e715d9-69c0-4e59-8f2c-6ee8d9e6ab94', 'staff1@example.com'),
    ('e3e0d2a9-1c53-4f54-9c9d-7d8b3e5c8e7f', 'staff2@example.com'),
    ('c4f3b2a1-9e8d-7c6b-5a4e-3f2d1c0b9a8d', 'staff3@example.com');

-- Insert businesses
INSERT INTO businesses (
    id, 
    name, 
    description, 
    category, 
    price_range, 
    profile_picture, 
    cover_picture, 
    is_premium, 
    tags,
    owner_id, 
    created_at
) VALUES
    (
        'f47ac10b-58cc-4372-a567-0e02b2c3d479', 
        'Luxe Hair Studio', 
        'Premium hair salon offering cutting-edge styles and treatments',
        'hair_salon', 
        3,
        'https://images.unsplash.com/photo-1560066984-138dadb4c035',
        'https://images.unsplash.com/photo-1560066984-138dadb4c035',
        true, 
        ARRAY['Hair', 'Beauty', 'Salon'],
        'd0d8d2bc-e5c7-4350-9e61-7549e39b60ef',
        '2023-08-15T00:00:00Z'
    ),
    (
        'c9eb1c3e-1b2e-4c3b-8b1e-1c3b8b1e1c3b',
        'Zen Massage & Spa',
        'Luxurious massage and spa treatments for ultimate relaxation',
        'spa', 4,
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
        true, 
        ARRAY['Massage', 'Spa', 'Wellness'],
        'f3d1529e-64c3-4e65-9f47-1a5d87d254c4',
        '2023-11-15T00:00:00Z'
    ),
    (
        'd3c1e1b2-4c3b-8b1e-1c3b-8b1e1c3b8b1e', 
        'Blloku Fitness Center',
        'Modern gym with state-of-the-art equipment and expert trainers',
        'gym_and_fitness', 2,
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
        false, 
        ARRAY['Fitness', 'Gym', 'Training'],
        '8b55a5c5-6d56-4c1c-9c4d-7a4df2e5c806',
        '2023-10-01T00:00:00Z'
    );

-- Insert locations
INSERT INTO locations (
    id, 
    business_id, 
    name, 
    address, 
    city, 
    state, 
    country,
    postal_code, 
    is_main_location, 
    timezone
) VALUES
    (
        uuid_generate_v4(),
        'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        'Luxe Hair Studio Downtown',
        'Rruga Myslym Shyri', 
        'Tiranë', 
        'AL', 
        'Albania',
        '1001', 
        true, 
        'Europe/Tirane'
    ),
    (
        uuid_generate_v4(), 
        'c9eb1c3e-1b2e-4c3b-8b1e-1c3b8b1e1c3b', 
        'Zen Massage & Spa Central',
        'Rruga e Kavajës',
         'Tiranë', 
         'AL',
          'Albania',
        '1001',
         true, 
         'Europe/Tirane'
    ),
    (
        uuid_generate_v4(),
        'd3c1e1b2-4c3b-8b1e-1c3b-8b1e1c3b8b1e', 
        'Blloku Fitness Center',
        'Blloku', 
        'Tiranë', 
        'AL', 
        'Albania',
        '1001', 
        true,
        'Europe/Tirane'
    );

-- Insert business staff
INSERT INTO business_staff (
    id, 
    business_id,
    user_id,
    position,
     is_active
) VALUES
    (
        'd1e2f3a4-b5c6-7d8e-9f0a-11c2d3e4f5g6',
        'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        'b7e715d9-69c0-4e59-8f2c-6ee8d9e6ab94',
        'Senior Stylist',
        true
    ),
    (
        'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
        'c9eb1c3e-1b2e-4c3b-8b1e-1c3b8b1e1c3b',
        'e3e0d2a9-1c53-4f54-9c9d-7d8b3e5c8e7f',
        'Massage Therapist',
        true
    ),
    (
        'f7g8h9i0-j1k2-l3m4-n5o6-p7q8r9s0t1u2',
        'd3c1e1b2-4c3b-8b1e-1c3b-8b1e1c3b8b1e',
        'c4f3b2a1-9e8d-7c6b-5a4e-3f2d1c0b9a8d',
        'Personal Trainer',
        true
    );

-- Insert services
INSERT INTO services (
    id, 
    business_id, 
    name,
    description,
    duration, base_price, is_active
) VALUES
    (
        'd3c1e1b2-4c3b-8b1e-1c3b-8b1e1c3b8b1e', 
        'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        'Haircut & Style',
        'Professional haircut and styling',
        60, 
        85.00,
        true
    ),
    (
        'a2f1c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6', 
        'f47ac10b-58cc-4372-a567-0e02b2c3d479', 
        'Color Treatment',
        'Professional hair coloring service',
        120, 
        120.00, 
        true
    ),
    (
        'b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6', 
        'c9eb1c3e-1b2e-4c3b-8b1e-1c3b8b1e1c3b', 
        'Swedish Massage',
        '60-minute relaxing massage',
        60, 120.00, true
    ),
    (
        'c3d4e5f6-7g8h-9i0j-k1l2-m3n4o5p6q7r', 
        'c9eb1c3e-1b2e-4c3b-8b1e-1c3b8b1e1c3b',
        'Deep Tissue Massage',
        'Deep tissue massage therapy',
        60, 140.00, true
    ),
    (
        'd4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s', 
        'd3c1e1b2-4c3b-8b1e-1c3b-8b1e1c3b8b1e', 
        'Personal Training',
        'One-on-one personal training session',
        60, 
        50.00,
        true
    ),
    (
        'f5g6h7i8-j9k0-l1m2-n3o4-p5q6r7s8t9u', 
        'd3c1e1b2-4c3b-8b1e-1c3b-8b1e1c3b8b1e',
        'Group Classes',
        'Group fitness class',
        45, 25.00, true
    );

-- Insert staff working hours
INSERT INTO staff_working_hours (
    staff_id, 
    day_of_week, 
    start_time, 
    end_time,
    hourly_rate, 
    is_available
) VALUES
    -- Luxe Hair Studio staff hours
    ('d1e2f3a4-b5c6-7d8e-9f0a-11c2d3e4f5g6', 1, '09:00', '18:00', 50.00, true),
    ('d1e2f3a4-b5c6-7d8e-9f0a-11c2d3e4f5g6', 2, '09:00', '18:00', 50.00, true),
    ('d1e2f3a4-b5c6-7d8e-9f0a-11c2d3e4f5g6', 3, '09:00', '18:00', 50.00, true),
    ('d1e2f3a4-b5c6-7d8e-9f0a-11c2d3e4f5g6', 4, '09:00', '20:00', 50.00, true),
    ('d1e2f3a4-b5c6-7d8e-9f0a-11c2d3e4f5g6', 5, '09:00', '20:00', 50.00, true),
    ('d1e2f3a4-b5c6-7d8e-9f0a-11c2d3e4f5g6', 6, '10:00', '16:00', 50.00, true),
    -- Zen Massage & Spa staff hours
    ('a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6', 1, '10:00', '20:00', 60.00, true),
    ('a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6', 2, '10:00', '20:00', 60.00, true),
    ('a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6', 3, '10:00', '20:00', 60.00, true),
    ('a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6', 4, '10:00', '21:00', 60.00, true),
    ('a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6', 5, '10:00', '21:00', 60.00, true),
    ('a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6', 6, '09:00', '22:00', 60.00, true),
    ('a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6', 0, '11:00', '18:00', 60.00, true),
    -- Blloku Fitness Center staff hours
    ('f7g8h9i0-j1k2-l3m4-n5o6-p7q8r9s0t1u2', 1, '06:00', '23:00', 45.00, true),
    ('f7g8h9i0-j1k2-l3m4-n5o6-p7q8r9s0t1u2', 2, '06:00', '23:00', 45.00, true),
    ('f7g8h9i0-j1k2-l3m4-n5o6-p7q8r9s0t1u2', 3, '06:00', '23:00', 45.00, true),
    ('f7g8h9i0-j1k2-l3m4-n5o6-p7q8r9s0t1u2', 4, '06:00', '23:00', 45.00, true),
    ('f7g8h9i0-j1k2-l3m4-n5o6-p7q8r9s0t1u2', 5, '06:00', '22:00', 45.00, true),
    ('f7g8h9i0-j1k2-l3m4-n5o6-p7q8r9s0t1u2', 6, '07:00', '20:00', 45.00, true),
    ('f7g8h9i0-j1k2-l3m4-n5o6-p7q8r9s0t1u2', 0, '08:00', '18:00', 45.00, true);

-- Insert staff services
INSERT INTO staff_services (staff_id, service_id)
VALUES
    ('d1e2f3a4-b5c6-7d8e-9f0a-11c2d3e4f5g6', 'd3c1e1b2-4c3b-8b1e-1c3b-8b1e1c3b8b1e'),
    ('d1e2f3a4-b5c6-7d8e-9f0a-11c2d3e4f5g6', 'a2f1c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6'),
    ('a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6', 'b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6'),
    ('a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6', 'c3d4e5f6-7g8h-9i0j-k1l2-m3n4o5p6q7r'),
    ('f7g8h9i0-j1k2-l3m4-n5o6-p7q8r9s0t1u2', 'd4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s'),
    ('f7g8h9i0-j1k2-l3m4-n5o6-p7q8r9s0t1u2', 'f5g6h7i8-j9k0-l1m2-n3o4-p5q6r7s8t9u');

-- Insert business features
INSERT INTO business_features (business_id, feature_name)
VALUES
    ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Free WiFi'),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Complimentary Beverages'),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Parking'),
    ('c9eb1c3e-1b2e-4c3b-8b1e-1c3b8b1e1c3b', 'Sauna'),
    ('c9eb1c3e-1b2e-4c3b-8b1e-1c3b8b1e1c3b', 'Steam Room'),
    ('c9eb1c3e-1b2e-4c3b-8b1e-1c3b8b1e1c3b', 'Robes Provided'),
    ('c9eb1c3e-1b2e-4c3b-8b1e-1c3b8b1e1c3b', 'Shower Facilities'),
    ('d3c1e1b2-4c3b-8b1e-1c3b-8b1e1c3b8b1e', 'Towel Service'),
    ('d3c1e1b2-4c3b-8b1e-1c3b-8b1e1c3b8b1e', 'Lockers'),
    ('d3c1e1b2-4c3b-8b1e-1c3b-8b1e1c3b8b1e', 'Showers'),
    ('d3c1e1b2-4c3b-8b1e-1c3b-8b1e1c3b8b1e', 'Protein Bar');

-- Insert business gallery
INSERT INTO business_gallery (
    business_id, 
    image_url, 
    thumbnail_url,
    alt_text,
    is_featured
) VALUES
    (
        'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        'https://images.unsplash.com/photo-1560066984-138dadb4c035',
        'https://images.unsplash.com/photo-1560066984-138dadb4c035',
        'Modern salon interior',
        true
    ),
    (
        'c9eb1c3e-1b2e-4c3b-8b1e-1c3b8b1e1c3b',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
        'Relaxing spa environment',
        true
    ),
    (
        'd3c1e1b2-4c3b-8b1e-1c3b-8b1e1c3b8b1e',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
        'Modern gym equipment',
        true
    );
