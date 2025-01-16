
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DELETE FROM working_hours;
DELETE FROM payments;
DELETE FROM bookings;
DELETE FROM redeemed_rewards;
DELETE FROM rewards;
DELETE FROM loyalty_points;
DELETE FROM deals;
DELETE FROM campaigns;
DELETE FROM products;
DELETE FROM services;
DELETE FROM business_staff;
DELETE FROM locations;
DELETE FROM business_gallery;
DELETE FROM business_features;
DELETE FROM businesses;
DELETE FROM notifications;
DELETE FROM clients;
DELETE FROM reviews;
DELETE FROM staff_services;
DELETE FROM points_transactions;
DELETE FROM profiles;


-- Insert 5 users in auth.users manually 

-- Insert seed data for clients
INSERT INTO clients (id, user_id, first_name, last_name, phone, created_at, updated_at) VALUES
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 0), 'John', 'Doe', '1234567890', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 1), 'Jane', 'Smith', '0987654321', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 2), 'Alice', 'Johnson', '1112223333', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 3), 'Bob', 'Brown', '4445556666', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 4), 'Charlie', 'Davis', '7778889999', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert seed data for locations
INSERT INTO locations (id, name, address, city, state, country, postal_code, latitude, longitude, phone, is_main_location, is_active, timezone, created_at, updated_at) VALUES
(uuid_generate_v4(), 'Location A1', '123 Main St', 'City A', 'State A', 'Country A', '12345', 40.7128, -74.0060, '1234567890', true, true, 'UTC', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Location B1', '456 Elm St', 'City B', 'State B', 'Country B', '23456', 34.0522, -118.2437, '0987654321', true, true, 'UTC', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Location C1', '789 Oak St', 'City C', 'State C', 'Country C', '34567', 51.5074, -0.1278, '1112223333', true, true, 'UTC', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Location D1', '101 Pine St', 'City D', 'State D', 'Country D', '45678', 35.6762, 139.6503, '4445556666', true, true, 'UTC', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Location E1', '202 Maple St', 'City E', 'State E', 'Country E', '56789', 48.8566, 2.3522, '7778889999', true, true, 'UTC', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO businesses (id, name, description, category, price_range, phone, website_url, profile_picture, cover_picture, is_premium, tags, external_link_facebook, external_link_instagram, external_link_tiktok, external_link_linkedin, owner_id, location_id, created_at, updated_at) VALUES
(uuid_generate_v4(), 'Salon A', 'A premium hair salon', ARRAY['hair_salon'::business_category], 2, '1234567890', 'www.salonA.com', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', false, ARRAY['Hair', 'Beauty', 'top'], 'salonA', '@salonA', '@salonA', 'salon-a', (SELECT id FROM auth.users LIMIT 1 OFFSET 0), (SELECT id FROM locations LIMIT 1 OFFSET 0), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Salon B', 'Expert nail care', ARRAY['nail_salon'::business_category], 3, '0987654321', 'www.salonB.com', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', true, ARRAY['Nails', 'Beauty'], 'salonB', '@salonB', '@salonB', 'salon-b', (SELECT id FROM auth.users LIMIT 1 OFFSET 1), (SELECT id FROM locations LIMIT 1 OFFSET 1), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Salon C', 'Luxury spa treatments', ARRAY['spa'::business_category], 4, '1112223333', 'www.salonC.com', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', true, ARRAY['Spa', 'Wellness'], 'salonC', '@salonC', '@salonC', 'salon-c', (SELECT id FROM auth.users LIMIT 1 OFFSET 2), (SELECT id FROM locations LIMIT 1 OFFSET 2), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Salon D', 'Modern fitness center', ARRAY['gym_and_fitness'::business_category], 1, '4445556666', 'www.salonD.com', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', false, ARRAY['Fitness', 'Gym'], 'salonD', '@salonD', '@salonD', 'salon-d', (SELECT id FROM auth.users LIMIT 1 OFFSET 3), (SELECT id FROM locations LIMIT 1 OFFSET 3), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Salon E', 'Professional massage services', ARRAY['massage'::business_category], 2, '7778889999', 'www.salonE.com', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', true, ARRAY['Massage', 'Wellness'], 'salonE', '@salonE', '@salonE', 'salon-e', (SELECT id FROM auth.users LIMIT 1 OFFSET 4), (SELECT id FROM locations LIMIT 1 OFFSET 4), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Insert seed data for business_staff
INSERT INTO business_staff (id, business_id, user_id, position, is_active, created_at, updated_at) VALUES
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), (SELECT id FROM auth.users LIMIT 1 OFFSET 0), 'Manager', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), (SELECT id FROM auth.users LIMIT 1 OFFSET 1), 'Staff', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), (SELECT id FROM auth.users LIMIT 1 OFFSET 2), 'Staff', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), (SELECT id FROM auth.users LIMIT 1 OFFSET 3), 'Manager', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), (SELECT id FROM auth.users LIMIT 1 OFFSET 4), 'Staff', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Insert seed data for services
INSERT INTO services (id, business_id, name, description, duration, base_price, is_active, created_at, updated_at) VALUES
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'Haircut', 'Professional haircut service', 30, 20.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'Hair Coloring', 'Full hair coloring service', 120, 80.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'Hair Treatment', 'Deep conditioning treatment', 45, 35.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'Manicure', 'Nail care and polish', 45, 25.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'Pedicure', 'Foot care and polish', 60, 35.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'Gel Nails', 'Long-lasting gel nail application', 75, 45.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Swedish Massage', 'Relaxing full body massage', 60, 50.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Deep Tissue Massage', 'Therapeutic deep tissue work', 90, 75.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Hot Stone Massage', 'Massage with heated stones', 75, 65.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'Personal Training', 'One-on-one fitness training', 60, 40.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'Group Fitness Class', 'High-intensity group workout', 45, 15.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'Yoga Session', 'Guided yoga practice', 75, 25.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 'Basic Facial', 'Rejuvenating facial treatment', 30, 30.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 'Deep Cleansing Facial', 'Advanced cleansing treatment', 60, 55.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 'Anti-Aging Facial', 'Premium anti-aging treatment', 90, 85.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'Haircut', 'Professional haircut service', 30, 20.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'Manicure', 'Nail care and polish', 45, 25.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Massage', 'Relaxing full body massage', 60, 50.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'Personal Training', 'One-on-one fitness training', 60, 40.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 'Facial', 'Rejuvenating facial treatment', 30, 30.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert seed data for bookings
INSERT INTO bookings (id, user_id, business_id, staff_id, service_id, booking_date, status, total_amount, notes, created_at, updated_at) VALUES
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 0), (SELECT id FROM businesses LIMIT 1 OFFSET 0), (SELECT id FROM business_staff LIMIT 1 OFFSET 0), (SELECT id FROM services LIMIT 1 OFFSET 0), NOW() + INTERVAL '1 day', 'confirmed', 20.00, 'First time customer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 1), (SELECT id FROM businesses LIMIT 1 OFFSET 1), (SELECT id FROM business_staff LIMIT 1 OFFSET 1), (SELECT id FROM services LIMIT 1 OFFSET 1), NOW() + INTERVAL '2 days', 'confirmed', 25.00, 'Regular customer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 2), (SELECT id FROM businesses LIMIT 1 OFFSET 2), (SELECT id FROM business_staff LIMIT 1 OFFSET 2), (SELECT id FROM services LIMIT 1 OFFSET 2), NOW() + INTERVAL '3 days', 'confirmed', 50.00, 'Special requests noted', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 3), (SELECT id FROM businesses LIMIT 1 OFFSET 3), (SELECT id FROM business_staff LIMIT 1 OFFSET 3), (SELECT id FROM services LIMIT 1 OFFSET 3), NOW() + INTERVAL '4 days', 'confirmed', 40.00, 'Follow-up session', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 4), (SELECT id FROM businesses LIMIT 1 OFFSET 4), (SELECT id FROM business_staff LIMIT 1 OFFSET 4), (SELECT id FROM services LIMIT 1 OFFSET 4), NOW() + INTERVAL '5 days', 'confirmed', 30.00, 'VIP customer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert seed data for payments
INSERT INTO payments (id, booking_id, amount, status, payment_method, stripe_payment_id, created_at, updated_at) VALUES
(uuid_generate_v4(), (SELECT id FROM bookings LIMIT 1 OFFSET 0), 20.00, 'pending', 'credit_card', 'pi_1234567890', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM bookings LIMIT 1 OFFSET 1), 25.00, 'pending', 'credit_card', 'pi_2345678901', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM bookings LIMIT 1 OFFSET 2), 50.00, 'pending', 'credit_card', 'pi_3456789012', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM bookings LIMIT 1 OFFSET 3), 40.00, 'pending', 'credit_card', 'pi_4567890123', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM bookings LIMIT 1 OFFSET 4), 30.00, 'pending', 'credit_card', 'pi_5678901234', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert seed data for reviews
INSERT INTO reviews (id, business_id, user_id, rating, comment, review_type, created_at, updated_at) VALUES
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), (SELECT id FROM auth.users LIMIT 1 OFFSET 0), 5, 'Excellent service!', 'business', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), (SELECT id FROM auth.users LIMIT 1 OFFSET 1), 4, 'Very good experience.', 'business', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), (SELECT id FROM auth.users LIMIT 1 OFFSET 2), 3, 'Average service.', 'business', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), (SELECT id FROM auth.users LIMIT 1 OFFSET 3), 4, 'Good service.', 'business', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), (SELECT id FROM auth.users LIMIT 1 OFFSET 4), 5, 'Outstanding!', 'business', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert seed data for loyalty_points
INSERT INTO loyalty_points (id, user_id, points_balance, total_points_earned, total_points_spent, created_at, updated_at) VALUES
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 0), 100, 100, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 1), 200, 200, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), 
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 2), 150, 150, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 3), 250, 250, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 4), 300, 300, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert seed data for campaigns
INSERT INTO campaigns (id, business_id, name, description, start_date, end_date, status, created_at, updated_at) VALUES
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'Summer Sale', 'Discounts on all services', NOW(), NOW() + INTERVAL '1 month', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'Winter Sale', 'Special offers for winter', NOW(), NOW() + INTERVAL '2 months', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Spring Sale', 'Spring discounts', NOW(), NOW() + INTERVAL '1 month', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'Autumn Sale', 'Autumn special offers', NOW(), NOW() + INTERVAL '1 month', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 'Holiday Sale', 'Holiday discounts', NOW(), NOW() + INTERVAL '1 month', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert seed data for deals
INSERT INTO deals (id, business_id, campaign_id, service_id, original_price, now_price, description, title, start_date, end_date, is_active, created_at, updated_at, image_url, category) VALUES
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), (SELECT id FROM campaigns LIMIT 1 OFFSET 0), (SELECT id FROM services LIMIT 1 OFFSET 0), 20.00, 18.00, '10% off haircut services', 'Summer Haircut Special', NOW(), NOW() + INTERVAL '1 month', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', 'hair_salon'),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), (SELECT id FROM campaigns LIMIT 1 OFFSET 1), (SELECT id FROM services LIMIT 1 OFFSET 1), 25.00, 21.25, '15% off manicure services', 'Winter Manicure Deal', NOW(), NOW() + INTERVAL '2 months', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', 'manicure'),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), (SELECT id FROM campaigns LIMIT 1 OFFSET 2), (SELECT id FROM services LIMIT 1 OFFSET 2), 50.00, 40.00, '20% off massage services', 'Spring Massage Offer', NOW(), NOW() + INTERVAL '1 month', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', 'massage'),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), (SELECT id FROM campaigns LIMIT 1 OFFSET 3), (SELECT id FROM services LIMIT 1 OFFSET 3), 40.00, 30.00, '25% off personal training', 'Autumn Fitness Deal', NOW(), NOW() + INTERVAL '1 month', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', 'nail_salon'),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), (SELECT id FROM campaigns LIMIT 1 OFFSET 4), (SELECT id FROM services LIMIT 1 OFFSET 4), 30.00, 21.00, '30% off facial treatments', 'Holiday Beauty Special', NOW(), NOW() + INTERVAL '1 month', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', 'nail_salon');

-- Insert seed data for products
INSERT INTO products (id, business_id, name, description, price, stock_quantity, is_active, created_at, updated_at) VALUES
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'Shampoo', 'Professional hair shampoo', 10.00, 100, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'Shampoo', 'Professional hair shampoo', 10.00, 100, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'Conditioner', 'Hair conditioner', 12.00, 80, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'Conditioner', 'Hair conditioner', 12.00, 80, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'Conditioner', 'Hair conditioner', 12.00, 80, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'Conditioner', 'Hair conditioner', 12.00, 80, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'Conditioner', 'Hair conditioner', 12.00, 80, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Lotion', 'Body lotion', 15.00, 50, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Lotion', 'Body lotion', 15.00, 50, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Lotion', 'Body lotion', 15.00, 50, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Lotion', 'Body lotion', 15.00, 50, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Lotion', 'Body lotion', 15.00, 50, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Lotion', 'Body lotion', 15.00, 50, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Lotion', 'Body lotion', 15.00, 50, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'Cream', 'Face cream', 20.00, 30, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'Cream', 'Face cream', 20.00, 30, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'Cream', 'Face cream', 20.00, 30, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'Cream', 'Face cream', 20.00, 30, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'Cream', 'Face cream', 20.00, 30, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 'Oil', 'Massage oil', 25.00, 40, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 'Oil', 'Massage oil', 25.00, 40, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert seed data for notifications
INSERT INTO notifications (id, user_id, type, title, message, reference_id, reference_type, is_read, created_at, updated_at) VALUES
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 0), 'booking_confirmed', 'Booking Confirmed', 'Your booking has been confirmed.', (SELECT id FROM bookings LIMIT 1 OFFSET 0), 'bookings', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 1), 'payment_received', 'Payment Received', 'Your payment has been received.', (SELECT id FROM payments LIMIT 1 OFFSET 1), 'payments', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 2), 'booking_cancelled', 'Booking Cancelled', 'Your booking has been cancelled.', (SELECT id FROM bookings LIMIT 1 OFFSET 2), 'bookings', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 3), 'booking_rescheduled', 'Booking Rescheduled', 'Your booking has been rescheduled.', (SELECT id FROM bookings LIMIT 1 OFFSET 3), 'bookings', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 4), 'points_earned', 'Points Earned', 'You have earned loyalty points.', (SELECT id FROM loyalty_points LIMIT 1 OFFSET 4), 'loyalty_points', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert seed data for profiles
INSERT INTO profiles (id, user_id, first_name, last_name, profile_type, bio, date_of_birth, gender, preferred_language, specialties, years_of_experience, education, certifications, languages, created_at, updated_at) VALUES
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 0), 'John', 'Doe', 'client', 'Bio for user 1', '1990-01-01', 'male', 'en', NULL, NULL, NULL, NULL, ARRAY['English'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 1), 'Jane', 'Smith', 'staff', 'Experienced hairstylist', '1985-03-15', 'female', 'en', ARRAY['Hair Cutting', 'Hair Coloring'], 8, ARRAY['Cosmetology School'], ARRAY['Licensed Cosmetologist'], ARRAY['English', 'Spanish'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 2), 'Alice', 'Johnson', 'client', 'Bio for user 3', '1995-06-20', 'female', 'es', NULL, NULL, NULL, NULL, ARRAY['Spanish', 'English'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 3), 'Bob', 'Brown', 'staff', 'Professional massage therapist', '1988-09-10', 'male', 'en', ARRAY['Swedish Massage', 'Deep Tissue'], 5, ARRAY['Massage Therapy Institute'], ARRAY['Licensed Massage Therapist'], ARRAY['English'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 4), 'Alice', 'Johnson', 'client', 'Bio for user 5', '1992-12-25', 'female', 'fr', NULL, NULL, NULL, NULL, ARRAY['French', 'English'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert seed data for staff_services
INSERT INTO staff_services (id, staff_id, service_id, created_at) VALUES
(uuid_generate_v4(), (SELECT id FROM business_staff LIMIT 1 OFFSET 0), (SELECT id FROM services LIMIT 1 OFFSET 0), CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM business_staff LIMIT 1 OFFSET 1), (SELECT id FROM services LIMIT 1 OFFSET 1), CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM business_staff LIMIT 1 OFFSET 2), (SELECT id FROM services LIMIT 1 OFFSET 2), CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM business_staff LIMIT 1 OFFSET 3), (SELECT id FROM services LIMIT 1 OFFSET 3), CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM business_staff LIMIT 1 OFFSET 4), (SELECT id FROM services LIMIT 1 OFFSET 4), CURRENT_TIMESTAMP);

-- Insert seed data for points_transactions
INSERT INTO points_transactions (id, user_id, points_amount, transaction_type, reference_id, created_at) VALUES
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 0), 10, 'earn', (SELECT id FROM bookings LIMIT 1 OFFSET 0), CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 1), 20, 'earn', (SELECT id FROM bookings LIMIT 1 OFFSET 1), CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 2), 15, 'redeem', (SELECT id FROM rewards LIMIT 1 OFFSET 0), CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 3), 25, 'earn', (SELECT id FROM bookings LIMIT 1 OFFSET 2), CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 4), 30, 'redeem', (SELECT id FROM rewards LIMIT 1 OFFSET 1), CURRENT_TIMESTAMP);

-- Insert seed data for redeemed_rewards
INSERT INTO redeemed_rewards (id, user_id, reward_id, points_spent, redeemed_at, expiry_date, is_used) VALUES
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 0), (SELECT id FROM rewards LIMIT 1 OFFSET 0), 50, NOW() - INTERVAL '5 days', NOW() + INTERVAL '30 days', false),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 1), (SELECT id FROM rewards LIMIT 1 OFFSET 1), 100, NOW() - INTERVAL '4 days', NOW() + INTERVAL '30 days', false),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 2), (SELECT id FROM rewards LIMIT 1 OFFSET 2), 150, NOW() - INTERVAL '3 days', NOW() + INTERVAL '30 days', false),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 3), (SELECT id FROM rewards LIMIT 1 OFFSET 3), 200, NOW() - INTERVAL '2 days', NOW() + INTERVAL '30 days', false),
(uuid_generate_v4(), (SELECT id FROM auth.users LIMIT 1 OFFSET 4), (SELECT id FROM rewards LIMIT 1 OFFSET 4), 250, NOW() - INTERVAL '1 day', NOW() + INTERVAL '30 days', false);

-- Insert seed data for rewards
INSERT INTO rewards (id, business_id, name, description, points_required, is_active, created_at, updated_at) VALUES
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'Free Haircut', 'Get a complimentary haircut service', 50, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'Spa Package', 'Enjoy a relaxing spa treatment package', 100, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), 
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Massage Session', 'One hour massage session of your choice', 150, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'Beauty Bundle', 'Complete beauty treatment package', 200, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 'VIP Treatment', 'Full day of premium services', 250, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert seed data for working_hours staff
INSERT INTO working_hours (id, staff_id, day_of_week, start_time, end_time, hourly_rate, is_available, created_at, updated_at) VALUES
(uuid_generate_v4(), (SELECT id FROM business_staff LIMIT 1 OFFSET 0), 0, '09:00', '17:00', 25.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM business_staff LIMIT 1 OFFSET 1), 1, '09:00', '17:00', 22.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM business_staff LIMIT 1 OFFSET 2), 2, '09:00', '17:00', 20.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM business_staff LIMIT 1 OFFSET 3), 3, '09:00', '17:00', 23.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM business_staff LIMIT 1 OFFSET 4), 4, '09:00', '17:00', 21.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Insert seed data for working_hours business
INSERT INTO working_hours (id, business_id, day_of_week, start_time, end_time, hourly_rate, is_available, created_at, updated_at) VALUES
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 0, '09:00', '17:00', 25.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 1, '09:00', '17:00', 22.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 2, '09:00', '17:00', 20.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 3, '09:00', '17:00', 23.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 4, '09:00', '17:00', 21.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 5, '09:00', '17:00', 21.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 0, '09:00', '17:00', 25.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 1, '09:00', '17:00', 22.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 2, '09:00', '17:00', 20.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 3, '09:00', '17:00', 23.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 4, '09:00', '17:00', 21.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 5, '09:00', '17:00', 21.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 0, '09:00', '17:00', 25.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 1, '09:00', '17:00', 22.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 2, '09:00', '17:00', 20.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 3, '09:00', '17:00', 23.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 4, '09:00', '17:00', 21.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 5, '09:00', '17:00', 21.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 0, '09:00', '17:00', 25.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 1, '09:00', '17:00', 22.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 2, '09:00', '17:00', 20.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 3, '09:00', '17:00', 23.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 4, '09:00', '17:00', 21.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 5, '09:00', '17:00', 21.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 0, '09:00', '17:00', 25.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 1, '09:00', '17:00', 22.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 2, '09:00', '17:00', 20.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 3, '09:00', '17:00', 23.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 4, '09:00', '17:00', 21.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 5, '09:00', '17:00', 21.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), 0, '09:00', '17:00', 25.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), 1, '09:00', '17:00', 22.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), 2, '09:00', '17:00', 20.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), 3, '09:00', '17:00', 23.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), 4, '09:00', '17:00', 21.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), 5, '09:00', '17:00', 21.00, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Insert seed data for business_gallery
INSERT INTO business_gallery (id, business_id, image_url, thumbnail_url, alt_text, caption, sort_order, is_featured, media_type, created_at, updated_at) VALUES
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f', 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400', 'Modern salon interior', 'Our main salon area', 1, true, 'image', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'https://images.unsplash.com/photo-1560066984-138dadb4c035', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400', 'Styling station', 'Professional styling area', 2, false, 'image', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400', 'Spa treatment room', 'Relaxation area', 3, false, 'image', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250', 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=400', 'Nail salon setup', 'Manicure station', 1, true, 'image', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'https://images.unsplash.com/photo-1632345031435-8727f6897d53', 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400', 'Pedicure chairs', 'Luxury pedicure area', 2, false, 'image', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'https://images.unsplash.com/photo-1540555700478-4be289fbecef', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400', 'Massage room', 'Therapeutic massage space', 1, true, 'image', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400', 'Spa reception', 'Welcome area', 2, false, 'image', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'https://images.unsplash.com/photo-1470259078422-826894b933aa', 'https://images.unsplash.com/photo-1470259078422-826894b933aa?w=400', 'Barbershop interior', 'Classic barbershop', 1, true, 'image', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1', 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400', 'Barber tools', 'Professional equipment', 2, false, 'image', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388', 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400', 'Beauty salon', 'Modern beauty space', 1, true, 'image', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 'https://images.unsplash.com/photo-1487412912498-0447578fcca8', 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400', 'Makeup station', 'Professional makeup area', 2, false, 'image', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937', 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400', 'Wellness center', 'Holistic healing space', 1, true, 'image', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1', 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400', 'Meditation room', 'Peaceful environment', 2, false, 'image', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Insert seed data for business_features
INSERT INTO business_features (id, business_id, feature_name, is_available, created_at, updated_at) VALUES
-- Business 1 (Hair Salon)
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'Free WiFi', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'Parking Available', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'Card Payment', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'Wheelchair Accessible', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'Kids Friendly', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Business 2 (Nail Salon)
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'Free WiFi', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'Card Payment', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'Walk-ins Welcome', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'Complimentary Drinks', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Business 3 (Spa)
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Free WiFi', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Private Rooms', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Shower Facilities', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Locker Room', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Sauna', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Business 4 (Barbershop)
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'Free WiFi', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'Card Payment', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'Walk-ins Welcome', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'Beer Service', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'TV Available', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Business 5 (Beauty Salon)
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 'Free WiFi', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 'Parking Available', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 'Card Payment', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 'Product Sales', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Business 6 (Wellness Center)
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), 'Free WiFi', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), 'Meditation Room', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), 'Herbal Tea Service', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), 'Consultation Room', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), 'Yoga Studio', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Insert seed data for business_story
INSERT INTO business_story (id, business_id, title, image_url, is_available, created_at, updated_at) VALUES
-- Business 1 (Hair Salon)
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'Our Journey', 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), 'Meet Our Team', 'https://images.unsplash.com/photo-1562322140-8baeececf3df', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Business 2 (Nail Salon)
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'Latest Designs', 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), 'Nail Art Showcase', 'https://images.unsplash.com/photo-1604654894610-df63bc536371', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Business 3 (Spa)
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Relaxation Journey', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), 'Spa Experience', 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Business 4 (Barbershop)
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'Classic Cuts', 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), 'Barbershop Culture', 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Business 5 (Beauty Salon)
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 'Beauty Transformations', 'https://images.unsplash.com/photo-1560066984-138dadb4c035', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), 'Makeup Artistry', 'https://images.unsplash.com/photo-1487412912498-0447578fcca8', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Business 6 (Wellness Center)
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), 'Wellness Journey', 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), 'Holistic Healing', 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Insert seed data for additional_info
INSERT INTO additional_info (id, business_id, is_available, description, created_at, updated_at) VALUES
-- Business 1 (Hair Salon)
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), true, 'Free Consultation', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), true, 'Professional Hair Products Available', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), true, 'Color Specialist On Staff', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 0), false, 'Student Discount', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Business 2 (Nail Salon) 
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), true, 'Gel Polish Available', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), true, 'Custom Nail Art', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), true, 'Pedicure Stations', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 1), false, 'Group Bookings', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Business 3 (Spa)
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), true, 'Couples Massage Available', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), true, 'Steam Room Access', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), true, 'Aromatherapy Services', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 2), false, 'Pool Access', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Business 4 (Barbershop)
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), true, 'Hot Towel Service', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), true, 'Beard Grooming', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), true, 'Traditional Straight Razor Shaves', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 3), false, 'Hair Coloring', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Business 5 (Beauty Salon)
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), true, 'Makeup Services', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), true, 'Waxing Services', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), true, 'Eyelash Extensions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 4), false, 'Microblading', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Business 6 (Wellness Center)
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), true, 'Nutritional Counseling', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), true, 'Acupuncture', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), true, 'Holistic Treatments', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), (SELECT id FROM businesses LIMIT 1 OFFSET 5), false, 'Physical Therapy', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
