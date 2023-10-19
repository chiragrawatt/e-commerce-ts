import * as productSerivce from './services/productSerivce.js';
import * as renderComponents from '../utils/renderComponents.js'

let allProducts: Product[] = [];
let allCategories: string[] = [];

productSerivce.getAllProducts()
    .then(res => allProducts = res)
    .then(_ => refreshProducts())
    .catch(error => console.log(error));

productSerivce.getAllCategories()
    .then(res => allCategories = res)
    .then(_ => renderComponents.appendCategories("category-filter", allCategories, refreshProducts));

renderComponents.attachEventListenersToSortFilters("sort-filter", refreshProducts);

function getSelectedCategories(): string[] {
    const SORT_FILTER = document.getElementById('category-filter');

    let categoryInputs = SORT_FILTER?.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
    let selectedCategories: string[] = [];

    for (let i = 0; i < categoryInputs.length; i++) {
        if (categoryInputs[i].checked) {
            selectedCategories.push(categoryInputs[i].value);
        }
    }
    return selectedCategories;
}


function sortProducts(products: Product[]): Product[] {
    const RADIO_GROUP = document.getElementById('sort-filter')?.querySelector('input[name="sort"]:checked') as HTMLInputElement;
    console.log(RADIO_GROUP.value);

    switch (RADIO_GROUP.value) {
        case "plth":
            return products.sort((prod1, prod2) => {
                return prod1.price - prod2.price;
            })
        case "phtl":
            return products.sort((prod1, prod2) => {
                return prod2.price - prod1.price;
            })
        case "rlth":
            return products.sort((prod1, prod2) => {
                return prod1.rating.rate - prod2.rating.rate;
            })
        case "rhtl":
            return products.sort((prod1, prod2) => {
                return prod2.rating.rate - prod1.rating.rate;
            })
        case "plth":
            return products.sort((prod1, prod2) => {
                return prod1.rating.count - prod2.rating.count;
            })
        case "phtl":
            return products.sort((prod1, prod2) => {
                return prod2.rating.count - prod1.rating.count;
            })
        default:
            return products;
    }
}

function refreshProducts() {
    let selectedCategories = getSelectedCategories();

    let selectedProducts: Product[] = [];

    if (selectedCategories.length > 0) {
        selectedProducts = allProducts.filter(product => {
            return selectedCategories.indexOf(product.category) != -1;
        })
    } else {
        selectedProducts = allProducts;
    }

    selectedProducts = sortProducts(selectedProducts);

    renderComponents.appendProductCards("category-cards-container", selectedProducts);
}