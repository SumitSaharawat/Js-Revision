import { cart, decrementCartItemsQuantity } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let html = '' ;
    let quantity = 0;

    cart.forEach((cartItem) => {
        const product = products.find(p => p.id === cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
        quantity += cartItem.quantity;
        shippingPriceCents += deliveryOption.priceCents;

    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents =  totalBeforeTaxCents * 0.1;
    const totalAfterTaxCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `
         <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="summary-items">Items (${quantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalAfterTaxCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;

   document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;
}