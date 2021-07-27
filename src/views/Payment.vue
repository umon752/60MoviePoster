<template>
  <section class="container pb-9 pt-3">
    <div class="row justify-content-center">
      <div class="col-xl-9">
        <div class="d-flex flex-wrap justify-content-between mb-6">
          <h2 class="title mb-5 mb-md-0">PAYMENT</h2>
          <ul class="d-flex w-100 w-md-auto">
            <li
              class="
                cartStep
                text-center
                bg-black-opacity-50
                border border-dark
                fs-6 fs-sm-5
                py-2 py-md-0
              "
            >
              STEP 1<br />CART
            </li>
            <li
              class="
                cartStep
                text-center
                bg-black-opacity-50
                border border-dark
                fs-6 fs-sm-5
                py-2 py-md-0
              "
            >
              STEP 2<br />ORDER
            </li>
            <li
              class="
                cartStep
                text-center
                bg-black-opacity-50
                border border-dark
                fs-6 fs-sm-5
                active
                py-2 py-md-0
              "
            >
              STEP 3<br />PAYMENT
            </li>
          </ul>
        </div>
        <div class="bg-black-opacity-50 px-5 py-6 p-md-6 p-lg-7 mt-2">
          <ul class="row border-top border-bottom py-4 mx-0">
            <li class="col-6 fw-bold d-none d-md-block">NAME</li>
            <li class="col-3 text-center fw-bold d-none d-md-block">QTY</li>
            <li class="col-3 fw-bold d-none d-md-block">PRICE</li>
            <li class="col-3 fw-bold text-center w-100 d-md-none">PRODUCT</li>
          </ul>
          <ul
            class="row align-items-center border-bottom py-5 mx-0"
            v-for="item in orderData.products"
            :key="item.id"
          >
            <li class="col-5 col-md-3 d-flex align-items-center">
              <div class="product overflow-hidden position-relative">
                <img class="product__img" :src="item.product.imageUrl" />
              </div>
            </li>
            <li class="col-7 col-md-9">
              <ul class="row">
                <li class="col-md-4">
                  <p>{{ item.product.title }}</p>
                </li>
                <li
                  class="
                    col-md-4
                    d-flex
                    justify-content-md-center
                    align-items-center
                  "
                >
                  <span>{{ item.product.num }}</span>
                </li>
                <li
                  class="
                    col-md-4
                    d-flex
                    justify-content-md-between
                    align-items-center
                  "
                >
                  <p class="lh-lg me-3 me-md-0">
                    NT$ {{ $filters.thousands(item.product.price) }}
                  </p>
                </li>
              </ul>
            </li>
          </ul>
          <div class="d-flex justify-content-end py-5 mb-6 mb-lg-7">
            <p class="text-primary fw-bold fs-5 fs-md-4 pe-5">TOTAL</p>
            <p class="text-primary fw-bold">
              NT$ {{ $filters.thousands(orderData.total) }}
            </p>
          </div>
          <ul class="border-top mb-6 mb-lg-8" v-if="orderData.user">
            <li class="fw-bold border-bottom py-4">
              <span class="w-40 w-sm20 d-inline-block">EMAIL</span>
              <span class="fw-normal">{{ orderData.user.email }}</span>
            </li>
            <li class="fw-bold border-bottom py-4">
              <span class="w-40 w-sm20 d-inline-block">NAME</span>
              <span class="fw-normal">{{ orderData.user.name }}</span>
            </li>
            <li class="fw-bold border-bottom py-4">
              <span class="w-40 w-sm20 d-inline-block">TEL</span>
              <span class="fw-normal">{{ orderData.user.tel }}</span>
            </li>
            <li class="fw-bold border-bottom py-4">
              <span class="w-40 w-sm20 d-inline-block">ADDRESS</span>
              <span class="fw-normal">{{ orderData.user.address }}</span>
            </li>
          </ul>
          <div class="d-flex flex-column flex-md-row justify-content-center">
            <button
              type="button"
              class="
                btn btn-secondary
                text-white
                w-100 w-md-40 w-lg-25
                me-3
                mb-3 mb-md-0
              "
            >
              CANCEL ORDER
            </button>
            <button
              type="button"
              @click="payment(orderData.id)"
              class="btn btn-primary w-100 w-md-40 w-lg-25"
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import emitter from '@/methods/mitt';

export default {
  data() {
    return {
      orderData: {},
    };
  },
  emits: ['delAllCartData'],
  methods: {
    getOrder() {
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${id}`;
      // 顯示 loading
      emitter.emit('isLoading', (this.isLoading = true));
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.orderData = res.data.order;
          } else {
          // 顯示訊息
            this.$alertState(res.data.success, 'Get order');
          }
          // 隱藏 loading
          emitter.emit('isLoading', (this.isLoading = false));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    payment(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${id}`;
      // 顯示 loading
      emitter.emit('isLoading', (this.isLoading = true));
      this.$http
        .post(url)
        .then((res) => {
          if (res.data.success) {
            // 轉址到 /complete
            this.$router.push(`/complete/${id}`);
          } else {
          // 顯示訊息
            this.$alertState(res.data.success, 'Payment');
          }
          // 隱藏 loading
          emitter.emit('isLoading', (this.isLoading = false));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getOrder();
    // 清空購物車
    this.$emit('delAllCartData', []);
    // Firefox Material-icons 置中
    emitter.emit('firefoxIcon');
  },
};
</script>
