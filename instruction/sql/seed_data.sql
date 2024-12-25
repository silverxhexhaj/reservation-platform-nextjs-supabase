-- Seed data for the reservation platform database

-- Insert clients
INSERT INTO clients (id, user_id, first_name, last_name, avatar_url, phone)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'auth0|user1', 'John', 'Doe', 'https://example.com/avatars/john.jpg', '+1234567890'),
    ('22222222-2222-2222-2222-222222222222', 'auth0|user2', 'Jane', 'Smith', 'https://example.com/avatars/jane.jpg', '+1234567891'),
    ('33333333-3333-3333-3333-333333333333', 'auth0|user3', 'Michael', 'Johnson', 'https://example.com/avatars/michael.jpg', '+1234567892');

-- Insert businesses
INSERT INTO businesses (id, name, description, phone, website_url, external_link_facebook, external_link_instagram, owner_id)
VALUES
    ('b1111111-1111-1111-1111-111111111111', 'Elegant Cuts Salon', 'Premium hair salon offering cutting-edge styles and treatments', '+1234567893', 'https://elegantcuts.com', 'https://facebook.com/elegantcuts', 'https://instagram.com/elegantcuts', 'auth0|owner1'),
    ('b2222222-2222-2222-2222-222222222222', 'Zen Spa & Wellness', 'Luxury spa offering relaxation and rejuvenation treatments', '+1234567894', 'https://zenspa.com', 'https://facebook.com/zenspa', 'https://instagram.com/zenspa', 'auth0|owner2'),
    ('b3333333-3333-3333-3333-333333333333', 'Perfect Nails', 'Professional nail care and artistic nail designs', '+1234567895', 'https://perfectnails.com', 'https://facebook.com/perfectnails', 'https://instagram.com/perfectnails', 'auth0|owner3');

-- Insert business features
INSERT INTO business_features (business_id, feature_name, is_available)
VALUES
    ('b1111111-1111-1111-1111-111111111111', 'Online Booking', true),
    ('b1111111-1111-1111-1111-111111111111', 'WiFi', true),
    ('b1111111-1111-1111-1111-111111111111', 'Card Payment', true),
    ('b2222222-2222-2222-2222-222222222222', 'Parking', true),
    ('b2222222-2222-2222-2222-222222222222', 'WiFi', true),
    ('b3333333-3333-3333-3333-333333333333', 'Walk-ins Welcome', true);

-- Insert business gallery
INSERT INTO business_gallery (business_id, image_url, thumbnail_url, alt_text, is_featured)
VALUES
    ('b1111111-1111-1111-1111-111111111111', 'https://example.com/gallery/salon1.jpg', 'https://example.com/gallery/salon1_thumb.jpg', 'Modern salon interior', true),
    ('b2222222-2222-2222-2222-222222222222', 'https://example.com/gallery/spa1.jpg', 'https://example.com/gallery/spa1_thumb.jpg', 'Relaxing spa environment', true),
    ('b3333333-3333-3333-3333-333333333333', 'https://example.com/gallery/nails1.jpg', 'https://example.com/gallery/nails1_thumb.jpg', 'Professional nail art', true);

-- Insert locations
INSERT INTO locations (id, business_id, name, address, city, state, country, postal_code, latitude, longitude, timezone, is_main_location)
VALUES
    ('l1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', 'Elegant Cuts Downtown', '123 Main St', 'New York', 'NY', 'USA', '10001', 40.7128, -74.0060, 'America/New_York', true),
    ('l2222222-2222-2222-2222-222222222222', 'b2222222-2222-2222-2222-222222222222', 'Zen Spa Central', '456 Relaxation Ave', 'Los Angeles', 'CA', 'USA', '90001', 34.0522, -118.2437, 'America/Los_Angeles', true),
    ('l3333333-3333-3333-3333-333333333333', 'b3333333-3333-3333-3333-333333333333', 'Perfect Nails Mall', '789 Beauty Blvd', 'Chicago', 'IL', 'USA', '60601', 41.8781, -87.6298, 'America/Chicago', true);

-- Insert business staff
INSERT INTO business_staff (id, business_id, user_id, position, is_active)
VALUES
    ('s1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', 'auth0|staff1', 'Senior Stylist', true),
    ('s2222222-2222-2222-2222-222222222222', 'b2222222-2222-2222-2222-222222222222', 'auth0|staff2', 'Massage Therapist', true),
    ('s3333333-3333-3333-3333-333333333333', 'b3333333-3333-3333-3333-333333333333', 'auth0|staff3', 'Nail Artist', true);

-- Insert staff working hours
INSERT INTO staff_working_hours (staff_id, day_of_week, start_time, end_time, hourly_rate)
VALUES
    ('s1111111-1111-1111-1111-111111111111', 1, '09:00', '17:00', 50.00),
    ('s1111111-1111-1111-1111-111111111111', 2, '09:00', '17:00', 50.00),
    ('s2222222-2222-2222-2222-222222222222', 1, '10:00', '18:00', 60.00),
    ('s3333333-3333-3333-3333-333333333333', 1, '09:00', '16:00', 45.00);

-- Insert services
INSERT INTO services (id, business_id, name, description, duration, base_price)
VALUES
    ('sv111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', 'Haircut & Style', 'Professional haircut and styling', 60, 80.00),
    ('sv222222-2222-2222-2222-222222222222', 'b2222222-2222-2222-2222-222222222222', 'Swedish Massage', '60-minute relaxing massage', 60, 100.00),
    ('sv333333-3333-3333-3333-333333333333', 'b3333333-3333-3333-3333-333333333333', 'Manicure', 'Classic manicure service', 45, 35.00);

-- Insert staff services
INSERT INTO staff_services (staff_id, service_id)
VALUES
    ('s1111111-1111-1111-1111-111111111111', 'sv111111-1111-1111-1111-111111111111'),
    ('s2222222-2222-2222-2222-222222222222', 'sv222222-2222-2222-2222-222222222222'),
    ('s3333333-3333-3333-3333-333333333333', 'sv333333-3333-3333-3333-333333333333');

-- Insert products
INSERT INTO products (business_id, name, description, price, stock_quantity)
VALUES
    ('b1111111-1111-1111-1111-111111111111', 'Professional Shampoo', 'High-quality hair care product', 29.99, 50),
    ('b2222222-2222-2222-2222-222222222222', 'Essential Oils Set', 'Aromatherapy oils collection', 45.99, 30),
    ('b3333333-3333-3333-3333-333333333333', 'Nail Polish Set', 'Premium nail polish collection', 24.99, 40);

-- Insert campaigns
INSERT INTO campaigns (id, business_id, name, description, start_date, end_date, status)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', 'Summer Special', 'Special summer discounts', '2024-06-01 00:00:00', '2024-08-31 23:59:59', 'active'),
    ('c2222222-2222-2222-2222-222222222222', 'b2222222-2222-2222-2222-222222222222', 'Wellness Week', 'Spa package deals', '2024-07-01 00:00:00', '2024-07-07 23:59:59', 'draft');

-- Insert deals
INSERT INTO deals (campaign_id, service_id, discount_percentage, start_date, end_date)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'sv111111-1111-1111-1111-111111111111', 20.00, '2024-06-01 00:00:00', '2024-08-31 23:59:59'),
    ('c2222222-2222-2222-2222-222222222222', 'sv222222-2222-2222-2222-222222222222', 15.00, '2024-07-01 00:00:00', '2024-07-07 23:59:59');

-- Insert loyalty points
INSERT INTO loyalty_points (user_id, points_balance, total_points_earned, total_points_spent)
VALUES
    ('auth0|user1', 100, 150, 50),
    ('auth0|user2', 75, 75, 0),
    ('auth0|user3', 200, 250, 50);

-- Insert rewards
INSERT INTO rewards (business_id, name, description, points_required)
VALUES
    ('b1111111-1111-1111-1111-111111111111', 'Free Haircut', 'Redeem points for a free haircut', 500),
    ('b2222222-2222-2222-2222-222222222222', 'Free Massage', 'Redeem points for a free massage', 750),
    ('b3333333-3333-3333-3333-333333333333', 'Free Manicure', 'Redeem points for a free manicure', 300);

-- Insert bookings
INSERT INTO bookings (id, user_id, business_id, staff_id, service_id, booking_date, status, total_amount)
VALUES
    ('bk111111-1111-1111-1111-111111111111', 'auth0|user1', 'b1111111-1111-1111-1111-111111111111', 's1111111-1111-1111-1111-111111111111', 'sv111111-1111-1111-1111-111111111111', '2024-03-15 10:00:00', 'confirmed', 80.00),
    ('bk222222-2222-2222-2222-222222222222', 'auth0|user2', 'b2222222-2222-2222-2222-222222222222', 's2222222-2222-2222-2222-222222222222', 'sv222222-2222-2222-2222-222222222222', '2024-03-16 14:00:00', 'pending', 100.00);

-- Insert payments
INSERT INTO payments (booking_id, amount, status, payment_method, stripe_payment_id)
VALUES
    ('bk111111-1111-1111-1111-111111111111', 80.00, 'paid', 'credit_card', 'pi_1234567890'),
    ('bk222222-2222-2222-2222-222222222222', 100.00, 'pending', 'credit_card', 'pi_0987654321');

-- Insert reviews
INSERT INTO reviews (business_id, user_id, booking_id, rating, comment, review_type)
VALUES
    ('b1111111-1111-1111-1111-111111111111', 'auth0|user1', 'bk111111-1111-1111-1111-111111111111', 5, 'Excellent service and very professional!', 'business'),
    (NULL, 'auth0|user2', 'bk222222-2222-2222-2222-222222222222', 4, 'Great massage technique', 'staff');

-- Insert notifications
INSERT INTO notifications (user_id, type, title, message, reference_id, reference_type)
VALUES
    ('auth0|user1', 'booking_confirmed', 'Booking Confirmed', 'Your appointment has been confirmed', 'bk111111-1111-1111-1111-111111111111', 'booking'),
    ('auth0|user2', 'booking_pending', 'New Booking', 'Your booking is pending confirmation', 'bk222222-2222-2222-2222-222222222222', 'booking');

-- Insert points transactions
INSERT INTO points_transactions (user_id, points_amount, transaction_type, reference_id)
VALUES
    ('auth0|user1', 50, 'earn', 'bk111111-1111-1111-1111-111111111111'),
    ('auth0|user2', 75, 'earn', 'bk222222-2222-2222-2222-222222222222');
