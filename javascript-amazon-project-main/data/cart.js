export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart =  [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2
            },{
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1
            },

         ];
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

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

    incrementCartItemsQuantity();

    saveToStorage();
};

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

export function updateCheckoutItems(productId, link){
    const checkOutHeaderLink = document.querySelector(link);
    const cartItem = cart.find(cartItem => cartItem.productId === productId);
    const unit = decrementCartItemsQuantity(cartItem.quantity) === 1 ? 'item' : 'items';
    decrementCartItemsQuantity(cartItem.quantity);
    checkOutHeaderLink.innerHTML = `${decrementCartItemsQuantity(cartItem.quantity)} ${unit}`;
};

export function incrementCartItemsQuantity(){
    let count = 0;
    cart.forEach((item) => {
        count += item.quantity;
    })

    return count;
};

export function decrementCartItemsQuantity(quantity){
    let count = 0;
    cart.forEach((item) => {
        count += item.quantity;
    })

    count -= quantity;
    return count;
};