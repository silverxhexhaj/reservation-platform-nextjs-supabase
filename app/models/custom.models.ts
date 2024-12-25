

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
