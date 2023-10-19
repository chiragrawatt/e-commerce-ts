import { getWishList, saveWishList } from "./localStorageService.js";
export function toggleItemFromWishList(product) {
    try {
        let wishlist = getWishList();
        let idx = wishlist.findIndex(prod => {
            return prod.id == product.id;
        });
        if (idx === -1) {
            wishlist.push(product);
        }
        else {
            wishlist.splice(idx, 1);
        }
        console.log(wishlist);
        saveWishList(wishlist);
    }
    catch (error) {
        console.log(error);
    }
}
