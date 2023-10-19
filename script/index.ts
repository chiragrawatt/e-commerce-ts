import * as productSerivce from './services/productSerivce.js';
import * as renderComponents from '../utils/renderComponents.js'

productSerivce.getAllProducts()
.then(res => renderComponents.appendProductCards("product-cards-container", res))
.catch(error => console.log(error));