import * as cartService from './services/cartService.js';
import * as productService from './services/productSerivce.js';
import * as renderComponents from '../utils/renderComponents.js'

let cartItems: Record<string, number> = cartService.getCart();
let products: Product[];

function responePay() {
    console.log(calculateTotal(products));
    var options = {
        "key": "rzp_test_PqpwwpJDSZU1jz", // Enter the Key ID generated from the Dashboard
        "amount": Math.round(calculateTotal(products) * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Acme Corp", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": "",//"order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function () {
            localStorage.setItem("cartItems", "");
            location.assign("success.html");
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', (response: any) => {
        console.log(response);
    });

    try{
    console.log(rzp1);
    rzp1.open();
    }
    catch(err){
        console.log(err);
    }
}

function getPriceById(id: number, products: Product[]): number {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            return products[i].price;
        }
    }
    return 0;
}

function calculateTotal(products: Product[]): number {
    let total: number = 0;
    for (let i = 0; i < products.length; i++) {
        total += products[i].price * cartItems[products[i].id.toString()];
    }
    return total;
}

function updateUI(id: string) {
    const counter: HTMLButtonElement = document.getElementById(`cnt${id}`) as HTMLButtonElement;
    const total: HTMLSpanElement = document.getElementById(`total${id}`) as HTMLSpanElement;
    const grandTotal: HTMLSpanElement = document.getElementById('grand-total') as HTMLSpanElement;
    cartItems = cartService.getCart();

    console.log(cartItems);

    if (cartItems[id]==undefined) {
        const prod: HTMLDivElement = document.getElementById(`prod${id}`) as HTMLDivElement;
        products = products.filter(item => item.id != parseInt(id));
        prod.remove();
    } else {
        counter.textContent = cartItems[id].toString();
        total.innerHTML = `<b>Total:</b> $${(getPriceById(parseInt(id), products) * cartItems[id]).toString()}`;
    }
    grandTotal.textContent = `$${calculateTotal(products).toFixed(2)}`;
}

async function getCartProducts(): Promise<Product[]> {
    products = await productService.getAllProducts();

    products = products.filter((item) => {
        return item.id.toString() in cartItems;
    })

    return products;
}


getCartProducts()
    .then(res => renderComponents.appendCartItems(products, cartItems, calculateTotal, responePay, updateUI))
    .catch(error => console.log(error));
