var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as cartService from './services/cartService.js';
import * as productService from './services/productSerivce.js';
import * as renderComponents from '../utils/renderComponents.js';
let cartItems = cartService.getCart();
let products;
function responePay() {
    console.log(calculateTotal(products));
    var options = {
        "key": "rzp_test_PqpwwpJDSZU1jz",
        "amount": Math.round(calculateTotal(products) * 100),
        "currency": "INR",
        "name": "Acme Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": "",
        "handler": function () {
            localStorage.setItem("cartItems", "");
            location.assign("success.html");
        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', (response) => {
        console.log(response);
    });
    try {
        console.log(rzp1);
        rzp1.open();
    }
    catch (err) {
        console.log(err);
    }
}
function getPriceById(id, products) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            return products[i].price;
        }
    }
    return 0;
}
function calculateTotal(products) {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
        total += products[i].price * cartItems[products[i].id.toString()];
    }
    return total;
}
function updateUI(id) {
    const counter = document.getElementById(`cnt${id}`);
    const total = document.getElementById(`total${id}`);
    const grandTotal = document.getElementById('grand-total');
    cartItems = cartService.getCart();
    console.log(cartItems);
    if (cartItems[id] == undefined) {
        const prod = document.getElementById(`prod${id}`);
        products = products.filter(item => item.id != parseInt(id));
        prod.remove();
    }
    else {
        counter.textContent = cartItems[id].toString();
        total.innerHTML = `<b>Total:</b> $${(getPriceById(parseInt(id), products) * cartItems[id]).toString()}`;
    }
    grandTotal.textContent = `$${calculateTotal(products).toFixed(2)}`;
}
function getCartProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        products = yield productService.getAllProducts();
        products = products.filter((item) => {
            return item.id.toString() in cartItems;
        });
        return products;
    });
}
getCartProducts()
    .then(res => renderComponents.appendCartItems(products, cartItems, calculateTotal, responePay, updateUI))
    .catch(error => console.log(error));
