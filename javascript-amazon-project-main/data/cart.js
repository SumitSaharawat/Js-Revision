
export let cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
    },{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
    },

];

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
}