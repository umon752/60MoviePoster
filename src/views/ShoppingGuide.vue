<template>
  <section class="container pb-9 pt-3">
    <div class="row justify-content-center">
      <div class="col-xl-9">
        <div
          class="d-flex flex-column align-items-center justify-content-center"
        >
          <h2 class="title mb-7">SHOPPING GUIDE</h2>
        </div>
        <ul>
          <li class="mb-6">
            <h3 class="fs-md-2 fw-bold border-bottom pb-1 mb-3">ORDER</h3>
            <h4 class="fs-md-3 fw-bold opacity-90 mb-2">Order processing</h4>
            <ul class="list-disc opacity-60 fs-5 fs-md-4 ps-5 mb-3">
              <li>
                Orders are processed 1-2 business days after an order has been
                placed, Monday – Friday, excluding weekends, public and bank
                holidays and scheduled warehouse closures.
              </li>
              <li>
                Orders placed during holidays will be processed on the following
                business day.
              </li>
            </ul>
            <h4 class="fs-md-3 fw-bold opacity-90 mb-2">Order state</h4>
            <p class="opacity-60 fs-5 fs-md-4 mb-3">
              To check your order status:<br />
              Log into your account via Under My Orders Select “View Your Order
              History”
            </p>
          </li>
          <li class="mb-6">
            <h3 class="fs-md-2 fw-bold border-bottom pb-1 mb-3">PAYMENT</h3>
            <h4 class="fs-md-3 fw-bold opacity-90 mb-2">Credit card</h4>
            <ul class="list-disc opacity-60 fs-5 fs-md-4 ps-5 mb-3">
              <li>Fast and secure payment worldwide</li>
              <li>
                Visa, Mastercard, American Express, Diners Club or Discover Card
              </li>
              <li>Secure transmission</li>
            </ul>
            <p class="opacity-60 fs-5 fs-md-4 mb-3">
              We do not store any credit card data on our servers.
            </p>
          </li>
          <li class="mb-6">
            <h3 class="fs-md-2 fw-bold border-bottom pb-1 mb-3">SHIPPING</h3>
            <p class="opacity-60 fs-5 fs-md-4 mb-3">
              Orders will be shipped on business days only, excluding, weekends,
              public and bank holidays, and scheduled warehouse closures.<br />
              All orders are subject to partial shipments in the event one or
              more items on an order is pre order or not available.<br />
              60 Movie Poster will send an email to all online orders when an
              order has shipped, containing the tracking number and name of
              courier service.
            </p>
            <h4 class="fs-md-3 fw-bold opacity-90 mb-2">Delivery charges</h4>
            <ul class="list-disc opacity-60 fs-5 fs-md-4 ps-5 mb-3">
              <li>Shipping NT$100</li>
              <li>Free shipping for order greater than NT$6,000</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import emitter from '@/methods/mitt';

export default {
  inheritAttrs: false,
  emits: ['toggleHide'],
  mounted() {
    // 顯示 loading
    emitter.emit('isLoading', (this.isLoading = true));
    // 隱藏 loading
    setTimeout(() => {
      emitter.emit('isLoading', (this.isLoading = false));
    }, 2000);
    // 關閉 toggle panel
    this.$emit('toggleHide');
  },
};
</script>
