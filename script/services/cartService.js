import { getCartItems, saveCartItems } from "./localStorageService.js";
export function addToCart(productId) {
    let cartItems = getCartItems();
    cartItems[productId] = cartItems[productId] == null ? 1 : cartItems[productId] + 1;
    saveCartItems(cartItems);
    return cartItems;
}
export function removeFromCart(productId) {
    let cartItems = getCartItems();
    cartItems[productId] = cartItems[productId] == null || cartItems[productId] == 0 ? 0 : cartItems[productId] - 1;
    if (cartItems[productId] <= 0) {
        delete cartItems[productId];
    }
    saveCartItems(cartItems);
    return cartItems;
}
export function getCart() {
    return getCartItems();
}
