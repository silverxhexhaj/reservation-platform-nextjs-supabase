
export interface DealItem {
    deal: {
        id: string;
        title: string;
        description: string;
        price: number;
        discount_price: number;
        start_date: string;
        end_date: string;
        created_at: string;
    };
    sub_category: {
        id: string;
        name: string;
    };
    business: {
        id: string;
        name: string;
        description: string;
        image_url: string;
        rating: number;
    };
}

export interface DealsResponse {
    count: number;
    items: DealItem[];
}   