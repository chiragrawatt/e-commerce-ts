interface Product {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string,
    quantity: number,
    rating: {
        count: number,
        rate: number;
    }
}