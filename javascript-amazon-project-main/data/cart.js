import { deliveryOptions } from "./deliveryOptions.js";

export let cart = JSON.parse(localStorage.getItem('cart'));

//Initializing cart with items
if(!cart){
  cart =  [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionsId: '1'
            },{
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionsId: '3'
            },
         ];
}

//Saving cart items to local storage so that cart doesn't go empty on page change
function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

//Storing the items to cart array after clicking add to cart button or increment quantity if already in cart
export function updateCart(id){
    let matchingItem = cart.find(item => item.productId === id);

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: id,
            quantity: 1,
            deliveryOptionsId: '1'
        });
    }

    incrementCartItemsQuantity();

    saveToStorage();
};

//Remove items from cart by adding remiander items to newCart and changing cart to newCart
export function removeFromCart(id){
    const newCart = [];
    let matchingItem = cart.find(item => item.productId === id);

    cart.forEach((item) => {
        if(item !== matchingItem){
            newCart.push(item);
        }
    })
    cart = newCart;

    saveToStorage();
}

//Decrement the chekout items number if a item is deleted from the cart
export function updateCheckoutItems(productId, link){
    const checkOutHeaderLink = document.querySelector(link);
    const cartItem = cart.find(cartItem => cartItem.productId === productId);
    const unit = decrementCartItemsQuantity(cartItem.quantity) === 1 ? 'item' : 'items';
    decrementCartItemsQuantity(cartItem.quantity);
    checkOutHeaderLink.innerHTML = `${decrementCartItemsQuantity(cartItem.quantity)} ${unit}`;
};

//Helper function to keep track of number of items added in a cart & returning number of items
export function incrementCartItemsQuantity(){
    let count = 0;
    cart.forEach((item) => {
        count += item.quantity;
    })

    return count;
};

//Helper function to keep track of number of items deleted in a cart & returning number of items remianing
export function decrementCartItemsQuantity(quantity){
    let count = 0;
    cart.forEach((item) => {
        count += item.quantity;
    })

    count -= quantity;
    return count;
};

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });
    matchingItem.deliveryOptionsId = deliveryOptionId;

    saveToStorage();
}