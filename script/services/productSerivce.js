var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getAllProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response = yield fetch('https://fakestoreapi.com/products');
            let products = yield response.json();
            return products;
        }
        catch (error) {
            throw error;
        }
    });
}
export function getProductById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response = yield fetch(`https://fakestoreapi.com/products/${id}`);
            let product = yield response.json();
            return product;
        }
        catch (error) {
            throw error;
        }
    });
}
export function getAllCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response = yield fetch(`https://fakestoreapi.com/products/categories`);
            let categories = yield response.json();
            return categories;
        }
        catch (error) {
            throw error;
        }
    });
}
