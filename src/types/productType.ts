export type ProductType = {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
}

export type ProductDetailType = {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    discountPercentage: number;
    stock: number;
    category: string;
    reviews: Reviews[];
}

export type Reviews = {
    rating: number;
    comment: string;
    date: number;
    recieverName: string;
    reviewerEmail: string;
}