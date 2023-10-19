import { getWishList } from "../script/services/localStorageService.js";
import { toggleItemFromWishList } from "../script/services/wishlistService.js";
import { addToCart, removeFromCart } from "../script/services/cartService.js";
import { appendAlert } from "./alertPopUp.js";
import { ADDED_TO_CART_MSG } from "../constants.js";
import { getCart } from "../script/services/cartService.js";

export function appendProductCards(parentDivId: string, products: Product[]) {
    const CONTAINER: HTMLDivElement = document.getElementById(parentDivId) as HTMLDivElement;
    CONTAINER.innerHTML = ``;

    CONTAINER?.addEventListener("click", (event: Event) => {
        const target = event.target as HTMLElement;

        if (target.id != parentDivId && target.id != "heart-btn" && target.parentElement?.id != undefined && (/^[0-9]*$/.test(target.parentElement?.id))) {
            location.assign(`product.html?id=${target.parentElement?.id}`);
        }
    });

    let wishlist = getWishList();

    for (let i = 0; i < products.length; i++) {
        const card: HTMLDivElement = document.createElement('div');
        card.setAttribute("class", "p-3");
        card.setAttribute("id", products[i].id.toString());

        //Setting the inner structure of product card
        card.innerHTML = `
        <div class="card" id="${products[i].id}">
            <div class="card-body d-flex flex-column align-items-center shadow" id="${products[i].id}">
                <img class="card-img-top" src="${products[i].image}">
                <span class="fw-bold text-center mt-3">${products[i].title}</span>
                <span class="text-success mt-1">MRP: $${products[i].price}</span>
                <div class="d-flex mb-4">
                </div>
                <div id="${products[i].id}" class="d-flex gap-3 container-fluid mt-auto">
                    <button class="btn btn-outline-dark mt-auto flex-grow-1">View</button>
                    <button id="heart-btn" class="btn btn-outline-danger"><i class="bi bi-heart"></i></button>
                </div>
            </div>
        </div>
        `

        //Adding rating stars to product card
        let divs = card.getElementsByTagName('div');
        for (let j = 0; j < 5; j++) {
            const filledStar = document.createElement("i");
            filledStar.setAttribute("class", "bi bi-star-fill text-warning");
            const emptyStar = document.createElement("i");
            emptyStar.setAttribute("class", "bi bi-star");

            if (j < Math.floor(products[i].rating.rate)) {
                divs[2].appendChild(filledStar);
            } else {
                divs[2].appendChild(emptyStar);
            }
        }

        //Adding rating count to product card
        const count: HTMLSpanElement = document.createElement('span');
        count.textContent = `(${products[i].rating.count})`;
        divs[2].appendChild(count);

        const buttons = card.getElementsByTagName('button');
        buttons[1].addEventListener("click", (event: Event) => {
            const target = event.target as HTMLElement;

            if (buttons[1].innerHTML == `<i class="bi bi-heart"></i>`) {
                buttons[1].innerHTML = `<i class="bi bi-heart-fill"></i>`;
            } else {
                buttons[1].innerHTML = `<i class="bi bi-heart"></i>`;
            }
            toggleItemFromWishList(products[i]);
        })

        let idx = wishlist.findIndex(prod => {
            return prod.id == products[i].id;
        })

        if (idx != -1) {
            buttons[1].innerHTML = `<i class="bi bi-heart-fill"></i>`;
        }

        CONTAINER?.appendChild(card);
    }
}

export function appendProductCard(parentDivId: string, product: Product) {
    const productContainer: HTMLElement | null = document.getElementById(parentDivId);
    const row = document.createElement("div");
    row.setAttribute("class", "row justify-content-between mg-sm-0 m-4 gap-4");

    // row.innerHTML = `
    //     <img class="col-md-3 col-sm-6 col img-fluid"
    //     src="${product.image}" alt="product_img" />
    //     <div class="col">
    //         <h2>${product.title}</h2>
    //         <p class="text-secondary">${product.description}</p>
    //         <span class="text-danger card-text">$${product.price}</span>
    //         <div class="d-flex">
    //             <span><i class="bi bi-star-fill text-warning"></i>
    //                 <i class="bi bi-star-fill text-warning"></i>
    //                 <i class="bi bi-star-fill text-warning"></i>
    //                 <i class="bi bi-star"></i>
    //                 <i class="bi bi-star"></i>
    //                 (${product.rating.count})
    //             </span>
    //         </div>
    //         <button id="buy-btn" class="btn btn-primary mt-4" onclick="${() => {execute()}}">Buy Now</button>
    //     </div>
    // `

    const img: HTMLImageElement = document.createElement('img');
    img.setAttribute("class", "col-md-3 col-sm-6 col img-fluid");
    img.src = product.image;
    row.appendChild(img);

    const infoContainer: HTMLDivElement = document.createElement('div');
    infoContainer.setAttribute("class", "col");
    row.appendChild(infoContainer);

    const title: HTMLHeadingElement = document.createElement('h2');
    title.textContent = product.title;
    infoContainer.appendChild(title);

    const description: HTMLHeadingElement = document.createElement('p');
    description.textContent = product.description;
    infoContainer.appendChild(description);

    const price: HTMLSpanElement = document.createElement('span');
    price.setAttribute("class", "text-danger");
    price.textContent = `$${product.price}`;
    infoContainer.appendChild(price);

    const ratingContainer: HTMLDivElement = document.createElement('div');
    ratingContainer.setAttribute("class", "d-flex mb-4");
    infoContainer.appendChild(ratingContainer);

    for (let j = 0; j < 5; j++) {
        const filledStar = document.createElement("i");
        filledStar.setAttribute("class", "bi bi-star-fill text-warning");
        const emptyStar = document.createElement("i");
        emptyStar.setAttribute("class", "bi bi-star");

        if (j < Math.floor(product.rating.rate)) {
            ratingContainer.appendChild(filledStar);
        } else {
            ratingContainer.appendChild(emptyStar);
        }
    }

    const count: HTMLSpanElement = document.createElement('span');
    count.textContent = `(${product.rating.count})`;
    ratingContainer.appendChild(count);

    const button: HTMLButtonElement = document.createElement('button');
    button.setAttribute("class", "btn btn-primary mt-auto");
    button.setAttribute("id", product.id.toString());
    button.addEventListener("click", (event: Event) => {
        addToCart(product.id.toString());
        appendAlert("procutAlertPlaceholder", ADDED_TO_CART_MSG, "success");
    });
    button.textContent = "Add to cart";
    infoContainer.appendChild(button);

    productContainer?.appendChild(row);
}

export function appendCategories(parentDivId: string, categories: string[], handleChange: Function) {
    const CATEGORY_FILTER_CONTAINER = document.getElementById(parentDivId);

    categories.forEach(category => {
        const WRAPPER = document.createElement('div');
        
        WRAPPER.innerHTML = `
                <input type="checkbox" id="${category}" value="${category}"><label for="${category}" class="ms-2 text-capitalize">${category}</label>
        `

        WRAPPER.getElementsByTagName('input')[0].addEventListener("change", () => {
            handleChange();
        });

        CATEGORY_FILTER_CONTAINER?.appendChild(WRAPPER);
    })
}

export function attachEventListenersToSortFilters(parentDivId: string, handleChange: Function) {
    const SORT_LIST = document.getElementById(parentDivId)?.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;

    for(let i=0; i<SORT_LIST.length; i++) {
        SORT_LIST[i].addEventListener("change", () => {
            handleChange();
        });
    }
}  


export function appendCartItems(products: Product[], cartItems: Record<string, number>, calculateTotal: Function, navToCheckoutPage: Function, updateUI: Function) {
    const container = document.getElementById("cart-item-holder");


    for (let i = 0; i < products.length; i++) {

        const row = document.createElement('div');

        row.innerHTML = `
            <div id="prod${products[i].id}" class="row card-item border border-width-2 mt-3">
                <img class="col-lg-1 col-md-2 col-sm-3 col-xs-4 col-5 col img-fluid"
                    src="${products[i].image}" alt="product_img" />
                <div class="col-lg-11 col-md-10 col-sm-9 col-xs-8 col-7 row align-items-center">
                    <h4 class="col-lg-4 col-12">${products[i].title}</h4>
                    <span class="card-text col-lg-3"><b>Price:</b>: $${products[i].price}</span>
                    <span id="total${products[i].id}" class="card-text col-lg-3"><b>Total:</b> $${products[i].price * cartItems[products[i].id.toString()]}</span>
                    <div class="btn-group col-lg-2 col-4" role="group">
                        <button id=${products[i].id} type="button" class="btn btn-outline-secondary">-</button>
                        <button id=cnt${products[i].id} type="button" class="btn btn-white disabled">${cartItems[products[i].id.toString()]}</button>
                        <button id=${products[i].id} type="button" class="btn btn-outline-secondary">+</button>
                    </div>
                </div>
            </div>
        `

        const buttons = row.getElementsByTagName('div')[2].getElementsByTagName('button');
        buttons[2].addEventListener("click", (event) => {
            const target = event.target as HTMLElement;
            addToCart(target.id);
            updateUI(target.id);
        });
        buttons[0].addEventListener("click", (event) => {
            const target = event.target as HTMLElement;
            removeFromCart(target.id);
            updateUI(target.id);
        });

        const grandTotal: HTMLSpanElement = document.getElementById('grand-total') as HTMLSpanElement;
        grandTotal.textContent = `$${calculateTotal(products).toFixed(2)}`;

        const checkoutButton: HTMLButtonElement = document.getElementById('checkout-btn') as HTMLButtonElement;
        checkoutButton.addEventListener("click", () => {
            navToCheckoutPage();
        });

        container?.appendChild(row);
    }
}