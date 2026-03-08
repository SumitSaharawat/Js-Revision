import { cart, removeFromCart, incrementCartItemsQuantity, updateCheckoutItems, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

function renderOrderSummary(){
  let checkoutHTML = '';

  cart.forEach((cartItem) => {
      const product = products.find(p => p.id === cartItem.productId);

      const deliveryOptionsId = cartItem.deliveryOptionsId;
      let deliveryOption;

      deliveryOptions.forEach((option) => {
        if(option.id === deliveryOptionsId){
          deliveryOption = option;
        }
      });

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      checkoutHTML += `
          <div class="cart-item-container  js-container-${product.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${product.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-price">
                ${formatCurrency(product.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary" data-product-id="${product.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(product, cartItem)}
            </div>
          </div>
        </div>
      `;
  });

  document.querySelector('.order-summary').innerHTML = checkoutHTML;

  const checkOutHeaderLink = document.querySelector('.return-to-home-link');
  const unit = incrementCartItemsQuantity() === 1 ? 'item' : 'items';
  checkOutHeaderLink.innerHTML = `${incrementCartItemsQuantity()} ${unit}`;


  let deleteItem = document.querySelectorAll('.delete-quantity-link');

  deleteItem.forEach((item) => {
    item.addEventListener('click', () => {
      let productId = item.dataset.productId;

      updateCheckoutItems(productId, '.return-to-home-link');
      removeFromCart(productId);

      let productHTML = document.querySelector(`.js-container-${productId}`);
      productHTML.remove();
    })
  });

  function deliveryOptionsHTML(product, cartItem){

    let html = ''
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'Free' : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

    html += `
              <div class="delivery-option"
              data-product-id="${product.id}"
              data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                ${isChecked ? 'checked' : ''} 
                  class="delivery-option-input"
                  name="delivery-option-${product.id}">
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} - Shipping
                  </div>
                </div>
              </div>
            ` 
    })

    return html;
  }

  document.querySelectorAll('.delivery-option').forEach((e)  => {
    e.addEventListener('click', () => {
      const {productId, deliveryOptionId} = e.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    })
  });
}

renderOrderSummary();