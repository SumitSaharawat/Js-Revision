import { products } from '../data/products.js';
import { cart, updateCart } from '../data/cart.js';


let productsHTML = ''; 

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.products-grid').innerHTML = productsHTML;
const addToCartBtn = document.querySelectorAll('.add-to-cart-button');

let cartQuantity = 0;

addToCartBtn.forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        updateCart(productId);
        updateCartQuantity();
        console.log(cart);
    })
});

function updateCartQuantity(){
     document.querySelector('.cart-quantity').innerHTML = ++cartQuantity;
}