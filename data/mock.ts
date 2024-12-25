import { Business, BusinessCategory } from "@/app/models/supabase.models";

// Category Images
export const categoryImages: Record<BusinessCategory, string> = {
  "hair_salon": "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "nail_salon": "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "waxing_salon": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "beauty_salon": "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "barbershop": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "eyebrows_and_lashes": "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "massage": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "spa": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "gym_and_fitness": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "personal_trainer": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "therapy_centre": "https://images.unsplash.com/photo-1598257006458-087169a1f08d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "tattoo_and_piercing": "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "tanning_studio": "https://images.unsplash.com/photo-1607008829749-c0f284a49fc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "aesthetics": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "weight_loss": "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
};

// Sample offers
export const businessOffers: object[] = [
  {
    id: '1',
    businessId: '2', // Tranquil Waters Spa
    title: 'Summer Spa Package',
    description: 'Full body massage + facial treatment',
    originalPrice: 150,
    discountedPrice: 99,
    discountPercentage: 34,
    validUntil: '2024-08-31',
    imageUrl: categoryImages["spa"],
    category: 'Spa Package'
  },
  {
    id: '2',
    businessId: '1', // Stellar Hair Salon
    title: 'Hair Transformation',
    description: 'Haircut + color + treatment',
    originalPrice: 200,
    discountedPrice: 149,
    discountPercentage: 25,
    validUntil: '2024-07-31',
    imageUrl: categoryImages["hair_salon"],
    category: 'Hair Package'
  },
  {
    id: '3',
    businessId: '3', // FitZone Gym
    title: 'Fitness Starter Pack',
    description: '1 month membership + 3 PT sessions',
    originalPrice: 300,
    discountedPrice: 199,
    discountPercentage: 33,
    validUntil: '2024-06-30',
    imageUrl: categoryImages["gym_and_fitness"],
    category: 'Fitness Package'
  }
];

// Sample businesses
export const businesses: (Business & { rating: number, reviewCount: number })[] = [
  {
    id: "1",
    name: "Luxe Hair Studio",
    description: "Premium hair salon offering cutting-edge styles and treatments",
    category: "hair_salon",
    rating: 4.8,
    reviewCount: 128,
    price_range: 3,
    cover_picture: categoryImages["hair_salon"],
    profile_picture: categoryImages["hair_salon"],
    is_premium: true,
    created_at: "2023-08-15T00:00:00Z",
    location: {
      address: "Rruga Myslym Shyri",
      city: "Tiranë",
      state: "AL",
      zip: "1001"
    },
    hours: {
      monday: { open: "09:00", close: "18:00" },
      tuesday: { open: "09:00", close: "18:00" },
      wednesday: { open: "09:00", close: "18:00" },
      thursday: { open: "09:00", close: "20:00" },
      friday: { open: "09:00", close: "20:00" },
      saturday: { open: "10:00", close: "16:00" }
    },
    services: [
      {
        id: "s1",
        name: "Haircut & Style",
        price: 85,
        duration: 60
      },
      {
        id: "s2",
        name: "Color Treatment",
        price: 120,
        duration: 120
      }
    ],
    amenities: ["Free WiFi", "Complimentary Beverages", "Parking"],
    tags: ["Hair", "Beauty", "Salon"],
    galleryImages: [
      categoryImages["hair_salon"]
    ],
    socialMedia: {
      instagram: "@luxehair",
      facebook: "luxehairtirana"
    }
  },
  {
    id: "2",
    name: "Zen Massage & Spa",
    description: "Luxurious massage and spa treatments for ultimate relaxation",
    category: "spa",
    rating: 4.9,
    reviewCount: 256,
    price_range: 4,
    cover_picture: categoryImages["spa"],
    profile_picture: categoryImages["spa"],
    is_premium: true,
    created_at: "2023-11-15T00:00:00Z",
    location: {
      address: "Rruga e Kavajës",
      city: "Tiranë",
      state: "AL",
      zip: "1001"
    },
    hours: {
      monday: { open: "10:00", close: "20:00" },
      tuesday: { open: "10:00", close: "20:00" },
      wednesday: { open: "10:00", close: "20:00" },
      thursday: { open: "10:00", close: "21:00" },
      friday: { open: "10:00", close: "21:00" },
      saturday: { open: "09:00", close: "22:00" },
      sunday: { open: "11:00", close: "18:00" }
    },
    services: [
      {
        id: "s3",
        name: "Swedish Massage",
        price: 120,
        duration: 60
      },
      {
        id: "s4",
        name: "Deep Tissue Massage",
        price: 140,
        duration: 60
      }
    ],
    amenities: ["Sauna", "Steam Room", "Robes Provided", "Shower Facilities"],
    tags: ["Massage", "Spa", "Wellness"],
    galleryImages: [categoryImages["spa"]],
    socialMedia: {
      instagram: "@zenspa",
      facebook: "zenspatirana"
    }
  },
  {
    id: "3",
    name: "Blloku Fitness Center",
    description: "Modern gym with state-of-the-art equipment and expert trainers",
    category: "gym_and_fitness",
    rating: 4.7,
    reviewCount: 189,
    price_range: 2,
    cover_picture: categoryImages["gym_and_fitness"], 
    profile_picture: categoryImages["gym_and_fitness"],
    is_premium: false,
    created_at: "2023-10-01T00:00:00Z",
    location: {
      address: "Blloku",
      city: "Tiranë",
      state: "AL",
      zip: "1001"
    },
    hours: {
      monday: { open: "06:00", close: "23:00" },
      tuesday: { open: "06:00", close: "23:00" },
      wednesday: { open: "06:00", close: "23:00" },
      thursday: { open: "06:00", close: "23:00" },
      friday: { open: "06:00", close: "22:00" },
      saturday: { open: "07:00", close: "20:00" },
      sunday: { open: "08:00", close: "18:00" }
    },
    services: [
      {
        id: "s5",
        name: "Personal Training",
        price: 50,
        duration: 60
      },
      {
        id: "s6",
        name: "Group Classes",
        price: 25,
        duration: 45
      }
    ],
    amenities: ["Towel Service", "Lockers", "Showers", "Protein Bar"],
    tags: ["Fitness", "Gym", "Training"],
    galleryImages: [categoryImages["gym_and_fitness"]],
    socialMedia: {
      instagram: "@blokufitness",
      facebook: "blokufitnesstirana"
    }
  }
]; 