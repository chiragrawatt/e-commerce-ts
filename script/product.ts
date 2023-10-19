import * as productController from './services/productSerivce.js';
import * as utilities from '../utils/renderComponents.js'

function getProductId() : number {
    let domain : string[] = location.href.split("=");
    return parseInt(domain[1]);
}

let productId = getProductId();
let product : Product;
let similarProducts : Product[];

async function populateDate() {
    try {
        product = await productController.getProductById(getProductId());

        console.log(product);
        document.title = product.title;
        product
        
        utilities.appendProductCard("product-container", product);

        //Fetching products of same category as selected product
        similarProducts = await  productController.getAllProducts();

        similarProducts = similarProducts.filter(prod => {
            return prod.id != productId && prod.category == product.category;
        })

        utilities.appendProductCards("similar-products-container", similarProducts);
    } catch(error) {
        console.log(error);
        throw error;
    }
}

populateDate();