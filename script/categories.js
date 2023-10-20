import * as productSerivce from './services/productSerivce.js';
import * as renderComponents from '../utils/renderComponents.js';
let allProducts = [];
let allCategories = [];
productSerivce.getAllProducts()
    .then(res => allProducts = res)
    .then(_ => refreshProducts())
    .catch(error => console.log(error));
productSerivce.getAllCategories()
    .then(res => allCategories = res)
    .then(_ => renderComponents.appendCategories("category-filter", allCategories, refreshProducts));
renderComponents.attachEventListenersToSortFilters("sort-filter", refreshProducts);
function getSelectedCategories() {
    const SORT_FILTER = document.getElementById('category-filter');
    let categoryInputs = SORT_FILTER === null || SORT_FILTER === void 0 ? void 0 : SORT_FILTER.getElementsByTagName('input');
    let selectedCategories = [];
    for (let i = 0; i < categoryInputs.length; i++) {
        if (categoryInputs[i].checked) {
            selectedCategories.push(categoryInputs[i].value);
        }
    }
    return selectedCategories;
}
function sortProducts(products) {
    var _a;
    const RADIO_GROUP = (_a = document.getElementById('sort-filter')) === null || _a === void 0 ? void 0 : _a.querySelector('input[name="sort"]:checked');
    console.log(RADIO_GROUP.value);
    switch (RADIO_GROUP.value) {
        case "plth":
            return products.sort((prod1, prod2) => {
                return prod1.price - prod2.price;
            });
        case "phtl":
            return products.sort((prod1, prod2) => {
                return prod2.price - prod1.price;
            });
        case "rlth":
            return products.sort((prod1, prod2) => {
                return prod1.rating.rate - prod2.rating.rate;
            });
        case "rhtl":
            return products.sort((prod1, prod2) => {
                return prod2.rating.rate - prod1.rating.rate;
            });
        case "pplth":
            return products.sort((prod1, prod2) => {
                return prod1.rating.count - prod2.rating.count;
            });
        case "pphtl":
            return products.sort((prod1, prod2) => {
                return prod2.rating.count - prod1.rating.count;
            });
        default:
            return products;
    }
}
function refreshProducts() {
    let selectedCategories = getSelectedCategories();
    let selectedProducts = [];
    if (selectedCategories.length > 0) {
        selectedProducts = allProducts.filter(product => {
            return selectedCategories.indexOf(product.category) != -1;
        });
    }
    else {
        selectedProducts = allProducts;
    }
    selectedProducts = sortProducts(selectedProducts);
    renderComponents.appendProductCards("category-cards-container", selectedProducts);
}
