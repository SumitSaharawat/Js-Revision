import { renderCheckout } from '../Js/checkout.js';

export const cart = [];

export function updateCart(id){
    let matchingItem = cart.find(item => item.productId === id);

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: id,
            quantity: 1
        });
    }
    renderCheckout();
};