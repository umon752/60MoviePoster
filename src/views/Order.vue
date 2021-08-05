<template>
  <section class="container pb-6 pt-3">
    <div class="row justify-content-center">
      <div class="col-xl-9">
        <div class="d-flex flex-wrap justify-content-between mb-6">
          <h2 class="title mb-5 mb-md-0">ORDER</h2>
          <ul class="d-flex w-100 w-md-auto">
            <li
              class="
                cartStep
                text-center
                bg-black-opacity-50
                border border-dark
                fs-6 fs-sm-5
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
                fs-6 fs-sm-5
                active
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
                fs-6 fs-sm-5
                py-1 py-md-0
              "
            >
              STEP 3<br />PAYMENT
            </li>
          </ul>
        </div>
        <Form
          v-slot="{ errors }"
          @submit="placeOrder"
          ref="form"
          class="
            row
            gx-4 gx-lg-6
            bg-sm-black-opacity-50
            mt-2
            mx-0
            px-4
            py-6
            px-md-6
            py-md-7
          "
        >
          <div class="col-md-6 ps-md-0 mb-6 mb-md-0">
            <div class="mb-5">
              <label for="name" class="form-label text-secondary"
                ><span class="text-primary">*</span>NAME</label
              >
              <Field
                type="text"
                class="form-control"
                id="name"
                name="Name"
                placeholder="Please enter a name"
                :class="{ 'is-invalid': errors['Name'] }"
                rules="required"
                v-model.trim="orderData.data.user.name"
              />
              <error-message
                name="Name"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-5">
              <label for="tel" class="form-label text-secondary"
                ><span class="text-primary">*</span>TEL</label
              >
              <Field
                type="text"
                class="form-control"
                id="tel"
                name="Tel"
                placeholder="Please enter a tel"
                :class="{ 'is-invalid': errors['Tel'] }"
                rules="min:8|numeric|required"
                v-model.trim="orderData.data.user.tel"
              />
              <error-message
                name="Tel"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-5">
              <label for="email" class="form-label text-secondary"
                ><span class="text-primary">*</span>EMAIL</label
              >
              <Field
                type="email"
                class="form-control"
                id="email"
                name="Email"
                placeholder="Please enter an email"
                :class="{ 'is-invalid': errors['Email'] }"
                rules="email|required"
                v-model.trim="orderData.data.user.email"
              />
              <error-message
                name="Email"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-5">
              <label for="address" class="form-label text-secondary"
                ><span class="text-primary">*</span>ADDRESS</label
              >
              <Field
                type="text"
                class="form-control"
                id="address"
                name="Address"
                placeholder="Please enter an address"
                :class="{ 'is-invalid': errors['Address'] }"
                rules="required"
                v-model.trim="orderData.data.user.address"
              />
              <error-message
                name="Address"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div>
              <label for="message" class="form-label text-secondary"
                >MESSAGE</label
              >
              <textarea
                type="text"
                class="form-control"
                id="message"
                placeholder="Please enter a message"
                v-model.trim="orderData.data.message"
              ></textarea>
            </div>
          </div>
          <div class="col-md-6 pe-md-0">
            <div class="bg-black-opacity-50 p-5 p-lg-6">
              <h3
                class="
                  border-bottom
                  text-secondary
                  fw-bold
                  pb-1 pb-lg-3
                  mb-4 mb-lg-5
                "
              >
                TOTAL
              </h3>
              <ul class="mb-5 mb-lg-7">
                <li class="d-flex justify-content-end mb-1 mb-lg-3">
                  <p class="w-50 d-inline-block opacity-80 fs-5 pe-5">
                    SUBTOTAL
                  </p>
                  <p class="w-50 text-end d-inline-block">
                    NT$ {{ $filters.thousands(tempCartsData.total) }}
                  </p>
                </li>
                <li class="d-flex justify-content-end mb-2 mb-lg-3">
                  <p class="w-50 d-inline-block opacity-80 fs-5 pe-5">
                    DISCOUNT
                  </p>
                  <del class="w-50 text-end d-inline-block text-secondary">
                    <span v-if="tempCartsDiscount !== ''">
                      NT$ {{ $filters.thousands(tempCartsDiscount) }}
                    </span>
                  </del>
                </li>
                <li class="text-end">
                  <p class="fw-bold fs-3 d-inline-block">
                    NT$ {{ $filters.thousands(tempCartsData.final_total) }}
                  </p>
                </li>
              </ul>
              <button type="submit" class="btn btn-primary w-100">
                PLACE ORDER
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </section>
</template>

<script>
import emitter from '@/methods/mitt';

export default {
  data() {
    return {
      tempCartsData: [],
      tempCartsDiscount: '',
      orderData: {
        data: {
          user: {
            name: '',
            email: '',
            tel: '',
            address: '',
          },
          message: '',
        },
      },
    };
  },
  props: {
    cartsData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['getCartsData', 'sidebarBtn'],
  inject: ['emitter', '$alertState'],
  watch: {
    cartsData() {
      this.tempCartsData = { ...this.cartsData };
      this.tempCartsDiscount = this.tempCartsData.total - this.tempCartsData.final_total;
    },
  },
  methods: {
    placeOrder() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      // 顯示 loading
      emitter.emit('isLoading', this.isLoading = true);
      this.$http
        .post(url, this.orderData)
        .then((res) => {
          if (res.data.success) {
            // 轉址到 /payment
            this.$router.push(`/payment/${res.data.orderId}`);
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Order');
          }
          // 隱藏 loading
          emitter.emit('isLoading', this.isLoading = false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCartsData() {
      this.$emit('getCartsData');
      // 顯示 loading
      emitter.emit('isLoading', (this.isLoading = true));
    },
  },
  mounted() {
    this.getCartsData();
    // sidebar 按鈕不可點擊
    this.$emit('sidebarBtn', false);
  },
  unmounted() {
    // sidebar 恢復按鈕狀態
    this.$emit('sidebarBtn', true);
  },
};
</script>
