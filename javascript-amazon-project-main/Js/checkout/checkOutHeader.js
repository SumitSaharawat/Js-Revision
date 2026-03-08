import { cart } from "../../data/cart.js";

export function renderCheckoutHeader(){
    let quantity = 0;

    cart.forEach((cartItem) => {
        quantity += cartItem.quantity;
    })

    const checkOutHeadeHtml = `
        Checkout (<a class="return-to-home-link"
            href="amazon.html">${quantity}</a>)
    `

    document.querySelector('.checkout-header-middle-section').innerHTML = checkOutHeadeHtml;
}