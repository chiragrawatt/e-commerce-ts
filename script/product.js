var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as productController from './services/productSerivce.js';
import * as utilities from '../utils/renderComponents.js';
function getProductId() {
    let domain = location.href.split("=");
    return parseInt(domain[1]);
}
let productId = getProductId();
let product;
let similarProducts;
function populateDate() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            product = yield productController.getProductById(getProductId());
            console.log(product);
            document.title = product.title;
            product;
            utilities.appendProductCard("product-container", product);
            //Fetching products of same category as selected product
            similarProducts = yield productController.getAllProducts();
            similarProducts = similarProducts.filter(prod => {
                return prod.id != productId && prod.category == product.category;
            });
            utilities.appendProductCards("similar-products-container", similarProducts);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
populateDate();
