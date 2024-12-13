import { Business } from "@/app/lib/types/business";

export const businesses: Business[] = [
  {
    id: "1",
    name: "Elegant Cuts Salon",
    description: "A premium hair salon offering cutting-edge styles and treatments",
    category: "Hair Salon",
    rating: 4.8,
    reviewCount: 128,
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&h=600&fit=crop",
    location: {
      address: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
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
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&h=600&fit=crop"
    ],
    socialMedia: {
      instagram: "@elegantcuts",
      facebook: "elegantcutssf"
    }
  },
  {
    id: "2",
    name: "Zen Massage & Spa",
    description: "Luxurious massage and spa treatments for ultimate relaxation",
    category: "Spa",
    rating: 4.9,
    reviewCount: 256,
    priceRange: "$$$$",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
    location: {
      address: "456 Market St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      coordinates: {
        lat: 37.7897,
        lng: -122.4001
      }
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
    galleryImages: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&h=600&fit=crop"
    ],
    socialMedia: {
      instagram: "@zenspa",
      facebook: "zenspasf"
    }
  }
]; 