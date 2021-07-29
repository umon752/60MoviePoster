<template>
  <section class="container pb-9 pt-3">
    <div class="row justify-content-center">
      <div class="col-xl-9">
        <div class="d-flex flex-wrap justify-content-between mb-6">
          <h2 class="title mb-5 mb-md-0">CART</h2>
          <ul class="d-flex w-100 w-md-auto">
            <li
              class="
                cartStep
                text-center
                border border-dark
                fs-6 fs-md-5
                active
                py-1 py-md-0
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
                fs-6 fs-md-5
                py-1 py-md-0
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
                fs-6 fs-md-5
                py-1 py-md-0
              "
            >
              STEP 3<br />PAYMENT
            </li>
          </ul>
        </div>
        <!-- empty state -->
        <div
          class="
            emptyBlock
            d-flex
            flex-column
            justify-content-center
            align-items-center
          "
          v-if="tempCartsDataLength === 0"
        >
          <span
            class="
              material-icons
              display-1
              text-secondary
              opacity-30
              lh-xs
              mb-3
            "
          >
            shopping_cart
          </span>
          <h3 class="text-secondary fs-2 mb-6">
            Your cart is currently empty.
          </h3>
          <router-link to="/products" class="btn btn-primary">
            CONTINUE TO SHOP
          </router-link>
        </div>
        <!-- full state -->
        <div class="pt-2" v-else>
          <ul class="row border-top border-bottom py-4 mx-0">
            <li class="col-6 fw-bold d-none d-md-block">NAME</li>
            <li class="col-3 text-center fw-bold d-none d-md-block">QTY</li>
            <li class="col-3 fw-bold d-none d-md-block">PRICE</li>
            <li class="col fw-bold text-center w-100 d-md-none">PRODUCT</li>
          </ul>
          <ul
            class="row align-items-center border-bottom py-5 mx-0"
            v-for="item in tempCartsData.carts"
            :key="item.id"
          >
            <li class="col-5 col-md-3 d-flex align-items-center">
              <router-link :to="`/product/${item.product.id}`" class="product">
                <div class="overflow-hidden position-relative">
                  <img
                    class="product__img"
                    data-cursor="cursor"
                    :src="item.product.imageUrl"
                  />
                  <div class="mask-fill" data-cursor="cursor"></div>
                </div>
              </router-link>
            </li>
            <li class="col-7 col-md-9">
              <ul class="row">
                <li class="col-md-4">
                  {{ item.product.title }}
                </li>
                <li
                  class="
                    col-md-4
                    d-flex
                    justify-content-md-center
                    align-items-center
                  "
                >
                  <a
                    href="#"
                    class="link-primary px-md-2"
                    :class="{ disabled: item.qty === 1 }"
                    v-if="item.qty !== 0"
                    @click.prevent="removeQty(item.qty, item)"
                  >
                    <span class="material-icons"> remove </span>
                  </a>
                  <input
                    class="form-control w-20 text-center border-0 px-2"
                    @change="updateCart(item.qty, item)"
                    v-model.number="item.qty"
                  />
                  <a
                    href="#"
                    class="link-primary px-md-2"
                    :class="{ disabled: item.qty >= item.product.inStock }"
                    @click.prevent="addQty(item.qty, item)"
                  >
                    <span class="material-icons"
                    :class="{ 'opacity-50': item.qty >= item.product.inStock }"> add </span>
                  </a>
                </li>
                <li
                  class="
                    col-md-4
                    d-flex
                    flex-column flex-md-row
                    justify-content-md-between
                    align-items-md-center
                  "
                >
                  <p class="lh-lg">NT$ {{ $filters.thousands(item.total) }}</p>
                  <a
                    href="#"
                    class="link-primary d-inline-block opacity-70"
                    @click.prevent="delCartData(item.id)"
                  >
                    <Spinner v-if="isSpinner === item.id" />
                    <span class="material-icons" v-else>delete</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div class="d-flex flex-column align-items-end mt-3">
            <ul class="w-100 w-md-40 w-xl-30 my-5 mb-6">
              <li
                class="
                  input-group input-group-sm
                  align-items-center
                  justify-content-end
                  mb-5
                "
              >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Coupon Code"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  v-model="this.couponCode"
                />
                <button
                  class="btn btn-outline-secondary bg-black-opacity-50"
                  type="button"
                  id="button-addon2"
                  @click="applyCoupon(this.couponCode, true)"
                  :class="{ disabled: this.couponCode === '' }"
                >
                  <Spinner class="spinner" v-if="isSpinner === true" />
                  APPLY
                </button>
              </li>
              <li class="d-flex justify-content-end mb-3">
                <p class="w-50 d-inline-block opacity-80 fs-5 pe-5">SUBTOTAL</p>
                <p class="w-50 text-end d-inline-block">
                  NT$ {{ $filters.thousands(tempCartsData.total) }}
                </p>
              </li>
              <li class="d-flex justify-content-end border-bottom pb-3 mb-3">
                <p class="w-50 d-inline-block opacity-80 fs-5 pe-5">DISCOUNT</p>
                <del class="w-50 text-end d-inline-block text-secondary">
                  <span v-if="tempCartsDiscount !== ''">
                    NT$ {{ $filters.thousands(tempCartsDiscount) }}
                  </span>
                </del>
              </li>
              <li class="d-flex justify-content-end">
                <p class="w-50 fw-bold fs-3 fs-md-4 d-inline-block pe-5">
                  TOTAL
                </p>
                <p class="w-50 text-end fw-bold d-inline-block">
                  NT$ {{ $filters.thousands(tempCartsData.final_total) }}
                </p>
              </li>
            </ul>
          </div>
          <div class="d-flex justify-content-between">
            <router-link
              to="/products"
              class="d-flex align-items-center link opacity-50"
            >
              <span class="material-icons"> arrow_left </span>
              SHOPPING
            </router-link>
            <router-link to="/order" class="d-flex align-items-center">
              CHECKOUT
              <span class="material-icons"> arrow_right </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import emitter from '@/methods/mitt';
import Spinner from '@/components/Spinner.vue';

export default {
  data() {
    return {
      tempCartsData: [],
      tempCartsDataLength: 0,
      tempCartsDiscount: '',
      couponCode: '',
      isSpinner: false,
    };
  },
  inject: ['emitter', '$alertState'],
  emits: ['sidebarHide', 'getCartsData', 'delCartData', 'updateCart'],
  props: {
    cartsData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    cartsData() {
      this.tempCartsData = { ...this.cartsData };
      this.tempCartsDataLength = this.tempCartsData.carts.length;
      this.tempCartsTotal = this.tempCartsData.total;
      // 更新折價
      this.applyCoupon(this.couponCode);
    },
  },
  methods: {
    applyCoupon(code, isClickBtn) {
      // isClickBtn 是點擊按鈕才觸發
      if (isClickBtn) {
        // 隱藏 spinner
        this.isSpinner = true;
      }
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`;
      const couponCode = {
        data: {
          code,
        },
      };
      this.$http
        .post(url, couponCode)
        .then((res) => {
          if (res.data.success) {
            this.tempCartsData.final_total = res.data.data.final_total;
            this.tempCartsDiscount = this.tempCartsData.total - this.tempCartsData.final_total;
            if (isClickBtn) {
              // 顯示訊息
              this.$alertState(res.data.success, 'Add coupon code');
            }
          } else if (res.data.success === false) {
            if (isClickBtn) {
              // 顯示訊息
              this.$alertState(res.data.success, 'Add coupon code');
              // 清除 input 欄位
              this.couponCode = '';
            }
          }
          if (isClickBtn) {
            // 隱藏 spinner
            this.isSpinner = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCartsData() {
      this.$emit('getCartsData');
    },
    updateCart(qty, item) {
      let num = qty;
      if (num <= 0) {
        num = 1; // 強制設為 1
      } else {
        this.$emit('updateCart', num, item);
      }
    },
    addQty(qty, item) {
      let num = qty;
      num += 1;
      if (num > item.product.inStock) {
        num = item.product.inStock;
      }
      this.$emit('updateCart', num, item);
    },
    removeQty(qty, item) {
      let num = qty;
      num -= 1;
      this.$emit('updateCart', num, item);
    },
    delCartData(id) {
      this.isSpinner = id;
      this.$emit('delCartData', id);
    },
  },
  mounted() {
    // 顯示 loading
    emitter.emit('isLoading', (this.isLoading = true));
    // 隱藏 loading
    setTimeout((() => {
      emitter.emit('isLoading', this.isLoading = false);
    }), 800);
    // 隱藏 cart sidebar
    this.$emit('sidebarHide');
    this.getCartsData();
    // Firefox Material-icons 置中
    emitter.emit('firefoxIcon');
  },
  components: {
    Spinner,
  },
};
</script>

<style scope>
  .spinner {
    width: 14px;
    height: 14px;
  }
</style>
