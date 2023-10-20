export function getWishList() {
    try {
        let localData = localStorage.getItem('wishlist');
        if (localData != null) {
            return JSON.parse(localData);
        }
    }
    catch (error) {
        console.log("reached", error);
        throw error;
    }
    return [];
}
export function saveWishList(wishlist) {
    try {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
export function getCartItems() {
    try {
        let localData = localStorage.getItem('cartItems');
        if (localData != null && localData.length > 0) {
            return JSON.parse(localData);
        }
    }
    catch (error) {
        console.log("cartItems", error);
        throw error;
    }
    return {};
}
export function saveCartItems(cartItems) {
    try {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
