export function getWishList() : Product[] {
    try {
        let localData: string | null = localStorage.getItem('wishlist');
        if(localData!=null) {
            return JSON.parse(localData);
        }
    } catch(error) {
        console.log("reached", error);
        throw error;
    }
    return [];
}

export function saveWishList(wishlist: Product[]) : void {
    try {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch(error) {
        console.log(error);
        throw error;
    }
}

export function getCartItems() : Record<string, number> {
    try {
        let localData: string | null = localStorage.getItem('cartItems');
        if(localData!=null) {
            return JSON.parse(localData);
        }
    } catch(error) {
        console.log("cartItems", error);
        throw error;
    }
    return {};
}

export function saveCartItems(cartItems: Record<string, number>) : void {
    try {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch(error) {
        console.log(error);
        throw error;
    }
}