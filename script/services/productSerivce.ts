export async function getAllProducts() : Promise<Product[]> {
    try {
        let response = await fetch('https://fakestoreapi.com/products');
        let products : Product[] = await response.json();
        return products;
    } catch(error) {
        throw error;
    }
}

export async function getProductById(id: number) : Promise<Product> {
    try {
        let response = await fetch(`https://fakestoreapi.com/products/${id}`);
        let product : Product = await response.json();
        return product;
    } catch(error) {
        throw error;
    }
}

export async function getAllCategories() : Promise<string[]> {
    try {
        let response = await fetch(`https://fakestoreapi.com/products/categories`);
        let categories : string[] = await response.json();
        return categories;
    } catch(error) {
        throw error;
    }
}