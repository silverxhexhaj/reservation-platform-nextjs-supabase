
export interface BusinessOffer {
    id: string;
    businessId: string;
    title: string;
    description: string;
    originalPrice: number;
    discountedPrice: number;
    discountPercentage: number;
    validUntil: string;
    imageUrl: string;
}


export interface Business {
    id: string;
    name: string;
    description: string;
    category: string;
    rating: number;
    priceRange: string;
    imageUrl: string;
    cover_picture?: string;
    profile_picture?: string;
    galleryImages?: string[];
    location: {
        address: string;
        city: string;
        state: string;
        zip: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
        country?: string;
    };
    hours?: {
        [key: string]: {
            open: string;
            close: string;
        };
    };
    openingHours?: {
        day: string;
        hours: string;
    }[];
    isOpen?: boolean;
    closingTime?: string;
    services?: {
        id: string;
        name: string;
        price: number;
        duration: number;
    }[];
    amenities?: string[];
    tags?: string[];
    socialMedia?: {
        instagram?: string;
        facebook?: string;
        twitter?: string;
    };
    isPremium?: boolean;
    createdAt: string;
    reviewCount: number;
}

export interface Service {
    name: string;
    price: number;
    description?: string;
    id?: string;
    duration?: number;
    categoryId?: string;
    businessId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ServiceCategory {
    name: string;
    services: Service[];
}

export interface CategoryServices {
    [key: string]: ServiceCategory[];
}

export interface TeamMember {
    name: string;
    profession: string;
}

export interface CategoryTeam {
    [key: string]: TeamMember[];
}


export interface BookingItem {
    name: string;
    price: number;
}

export interface SelectedService extends Service {
    categoryName: string;
}
