import { Business, BusinessOffer, Category, ServiceCategory, TeamMember, categoryImages } from './index';

// Services by category
const categoryServices: Record<Category, ServiceCategory[]> = {
  "Hair Salon": [
    {
      name: "Haircuts",
      services: [
        { name: "Women's Haircut", price: 50 },
        { name: "Men's Haircut", price: 35 },
        { name: "Children's Haircut", price: 25 },
      ]
    },
    {
      name: "Coloring",
      services: [
        { name: "Full Color", price: 80 },
        { name: "Highlights", price: 100 },
        { name: "Balayage", price: 150 },
      ]
    },
    {
      name: "Styling",
      services: [
        { name: "Blowout", price: 40 },
        { name: "Updo", price: 65 },
        { name: "Hair Extensions", price: 200 },
      ]
    }
  ],
  "Nail Salon": [
    {
      name: "Manicures",
      services: [
        { name: "Basic Manicure", price: 30 },
        { name: "Gel Manicure", price: 45 },
        { name: "Nail Art", price: 20 },
      ]
    },
    {
      name: "Pedicures",
      services: [
        { name: "Basic Pedicure", price: 40 },
        { name: "Spa Pedicure", price: 55 },
        { name: "Gel Pedicure", price: 60 },
      ]
    }
  ],
  "Waxing Salon": [
    {
      name: "Facial Waxing",
      services: [
        { name: "Eyebrow Wax", price: 15 },
        { name: "Upper Lip Wax", price: 10 },
        { name: "Full Face Wax", price: 40 },
      ]
    },
    {
      name: "Body Waxing",
      services: [
        { name: "Leg Wax", price: 50 },
        { name: "Brazilian Wax", price: 60 },
        { name: "Full Body Wax", price: 150 },
      ]
    }
  ],
  "Beauty Salon": [
    {
      name: "Facial Treatments",
      services: [
        { name: "Basic Facial", price: 70 },
        { name: "Deep Cleansing Facial", price: 90 },
        { name: "Anti-Aging Facial", price: 110 },
      ]
    },
    {
      name: "Makeup Services",
      services: [
        { name: "Makeup Application", price: 60 },
        { name: "Bridal Makeup", price: 120 },
        { name: "Makeup Lesson", price: 80 },
      ]
    }
  ],
  "Barbershop": [
    {
      name: "Haircuts",
      services: [
        { name: "Men's Haircut", price: 30 },
        { name: "Buzz Cut", price: 20 },
        { name: "Kids Haircut", price: 25 },
      ]
    },
    {
      name: "Beard Services",
      services: [
        { name: "Beard Trim", price: 20 },
        { name: "Hot Shave", price: 35 },
        { name: "Hair & Beard Combo", price: 45 },
      ]
    }
  ],
  "Eyebrows & Lashes": [
    {
      name: "Eyebrow Services",
      services: [
        { name: "Eyebrow Threading", price: 15 },
        { name: "Eyebrow Tinting", price: 20 },
        { name: "Brow Lamination", price: 50 },
      ]
    },
    {
      name: "Lash Services",
      services: [
        { name: "Lash Lift", price: 60 },
        { name: "Lash Tint", price: 25 },
        { name: "Lash Extensions", price: 100 },
      ]
    }
  ],
  "Massage": [
    {
      name: "Massage Services",
      services: [
        { name: "Swedish Massage", price: 80 },
        { name: "Deep Tissue Massage", price: 90 },
        { name: "Hot Stone Massage", price: 100 },
        { name: "Couples Massage", price: 150 },
      ]
    }
  ],
  "Spa": [
    {
      name: "Spa Services",
      services: [
        { name: "Spa Day Package", price: 200 },
        { name: "Body Wrap", price: 90 },
        { name: "Aromatherapy Session", price: 70 },
        { name: "Hydrotherapy", price: 80 },
      ]
    }
  ],
  "Gym & Fitness": [
    {
      name: "Fitness Services",
      services: [
        { name: "Monthly Membership", price: 50 },
        { name: "Day Pass", price: 15 },
        { name: "Group Class", price: 20 },
        { name: "Personal Training Session", price: 60 },
      ]
    }
  ],
  "Personal Trainer": [
    {
      name: "Personal Training Services",
      services: [
        { name: "1-on-1 Session", price: 70 },
        { name: "Nutrition Consultation", price: 50 },
        { name: "Fitness Assessment", price: 40 },
        { name: "10-Session Package", price: 600 },
      ]
    }
  ],
  "Therapy Centre": [
    {
      name: "Therapy Services",
      services: [
        { name: "Individual Therapy", price: 100 },
        { name: "Couples Therapy", price: 130 },
        { name: "Group Therapy", price: 50 },
        { name: "Art Therapy", price: 80 },
      ]
    }
  ],
  "Tattoo & Piercing": [
    {
      name: "Tattoo Services",
      services: [
        { name: "Small Tattoo", price: 100 },
        { name: "Medium Tattoo", price: 200 },
        { name: "Large Tattoo", price: 400 },
      ]
    },
    {
      name: "Piercing Services",
      services: [
        { name: "Basic Piercing", price: 40 },
        { name: "Complex Piercing", price: 60 },
        { name: "Jewelry Change", price: 20 },
      ]
    }
  ],
  "Tanning Studio": [
    {
      name: "Tanning Services",
      services: [
        { name: "Single Session", price: 25 },
        { name: "Monthly Package", price: 80 },
        { name: "Spray Tan", price: 40 },
      ]
    }
  ],
  "Aesthetics": [
    {
      name: "Aesthetic Services",
      services: [
        { name: "Botox", price: 300 },
        { name: "Dermal Fillers", price: 400 },
        { name: "Chemical Peel", price: 150 },
      ]
    }
  ],
  "Weight Loss": [
    {
      name: "Weight Loss Services",
      services: [
        { name: "Consultation", price: 50 },
        { name: "Monthly Program", price: 200 },
        { name: "Body Composition Analysis", price: 30 },
      ]
    }
  ]
};

// Teams by category
const categoryTeams: Record<Category, TeamMember[]> = {
  "Hair Salon": [
    { name: "Emma Styles", profession: "Senior Stylist" },
    { name: "Liam Cuts", profession: "Color Specialist" },
    { name: "Olivia Shears", profession: "Junior Stylist" },
  ],
  "Nail Salon": [
    { name: "Sophia Nails", profession: "Nail Technician" },
    { name: "Ava Polish", profession: "Nail Artist" },
    { name: "Mia Manicure", profession: "Pedicure Specialist" },
  ],
  "Waxing Salon": [
    { name: "Isabella Smooth", profession: "Waxing Specialist" },
    { name: "Ethan Strip", profession: "Body Waxing Expert" },
    { name: "Charlotte Gentle", profession: "Facial Waxing Specialist" },
  ],
  "Beauty Salon": [
    { name: "Amelia Glow", profession: "Makeup Artist" },
    { name: "Harper Beauty", profession: "Skincare Specialist" },
    { name: "Evelyn Lash", profession: "Lash Technician" },
  ],
  "Barbershop": [
    { name: "Noah Razor", profession: "Master Barber" },
    { name: "William Trim", profession: "Beard Specialist" },
    { name: "James Clipper", profession: "Junior Barber" },
  ],
  "Eyebrows & Lashes": [
    { name: "Sophia Arch", profession: "Brow Artist" },
    { name: "Ava Lash", profession: "Lash Extension Specialist" },
    { name: "Mia Tint", profession: "Brow and Lash Tinting Expert" },
  ],
  "Massage": [
    { name: "Oliver Knead", profession: "Massage Therapist" },
    { name: "Elijah Relax", profession: "Sports Massage Specialist" },
    { name: "Charlotte Zen", profession: "Hot Stone Massage Expert" },
  ],
  "Spa": [
    { name: "Amelia Tranquil", profession: "Spa Manager" },
    { name: "Harper Serene", profession: "Facial Specialist" },
    { name: "Abigail Calm", profession: "Body Treatment Expert" },
  ],
  "Gym & Fitness": [
    { name: "Lucas Muscle", profession: "Personal Trainer" },
    { name: "Henry Cardio", profession: "Group Fitness Instructor" },
    { name: "Evelyn Flex", profession: "Yoga Instructor" },
  ],
  "Personal Trainer": [
    { name: "Alexander Fit", profession: "Strength Coach" },
    { name: "Daniel Nutrition", profession: "Nutritionist" },
    { name: "Sophia Endurance", profession: "Cardio Specialist" },
  ],
  "Therapy Centre": [
    { name: "Benjamin Mind", profession: "Psychotherapist" },
    { name: "Emily Counsel", profession: "Marriage Counselor" },
    { name: "Michael Heal", profession: "Art Therapist" },
  ],
  "Tattoo & Piercing": [
    { name: "Liam Ink", profession: "Tattoo Artist" },
    { name: "Olivia Pierce", profession: "Body Piercing Specialist" },
    { name: "Noah Design", profession: "Custom Tattoo Designer" },
  ],
  "Tanning Studio": [
    { name: "Summer Glow", profession: "Tanning Specialist" },
    { name: "Ray Bronze", profession: "Spray Tan Expert" },
    { name: "Dawn Sun", profession: "Tanning Consultant" },
  ],
  "Aesthetics": [
    { name: "Grace Beauty", profession: "Aesthetic Nurse" },
    { name: "Claire Skin", profession: "Dermatologist" },
    { name: "Rose Youth", profession: "Cosmetic Specialist" },
  ],
  "Weight Loss": [
    { name: "Fit Coach", profession: "Weight Loss Specialist" },
    { name: "Health Guide", profession: "Nutritionist" },
    { name: "Slim Expert", profession: "Fitness Trainer" },
  ],
};

// Sample offers
export const businessOffers: BusinessOffer[] = [
  {
    id: '1',
    businessId: '2', // Tranquil Waters Spa
    title: 'Summer Spa Package',
    description: 'Full body massage + facial treatment',
    originalPrice: 150,
    discountedPrice: 99,
    discountPercentage: 34,
    validUntil: '2024-08-31',
    imageUrl: categoryImages["Spa"],
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
    imageUrl: categoryImages["Hair Salon"],
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
    imageUrl: categoryImages["Gym & Fitness"],
    category: 'Fitness Package'
  }
];

// Sample businesses
export const businesses: Business[] = [
  {
    id: "1",
    name: "Luxe Hair Studio",
    description: "Premium hair salon offering cutting-edge styles and treatments",
    category: "Hair Salon",
    rating: 4.8,
    reviewCount: 128,
    priceRange: "$$$",
    imageUrl: categoryImages["Hair Salon"],
    isPremium: true,
    createdAt: "2023-08-15T00:00:00Z",
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
      categoryImages["Hair Salon"]
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
    category: "Spa",
    rating: 4.9,
    reviewCount: 256,
    priceRange: "$$$$",
    imageUrl: categoryImages["Spa"],
    isPremium: true,
    createdAt: "2023-11-15T00:00:00Z",
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
    galleryImages: [categoryImages["Spa"]],
    socialMedia: {
      instagram: "@zenspa",
      facebook: "zenspatirana"
    }
  },
  {
    id: "3",
    name: "Blloku Fitness Center",
    description: "Modern gym with state-of-the-art equipment and expert trainers",
    category: "Gym & Fitness",
    rating: 4.7,
    reviewCount: 189,
    priceRange: "$$",
    imageUrl: categoryImages["Gym & Fitness"],
    isPremium: false,
    createdAt: "2023-10-01T00:00:00Z",
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
    galleryImages: [categoryImages["Gym & Fitness"]],
    socialMedia: {
      instagram: "@blokufitness",
      facebook: "blokufitnesstirana"
    }
  }
]; 