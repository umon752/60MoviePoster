<template>
  <div
    ref="modal"
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-dialog-centered modal-xl modal-fullscreen-lg-down
      "
    >
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title title fs-2" id="exampleModalLabel">
            ORDER DETAIL
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4 mb-6">
              <h4 class="fs-3 fw-bold border-bottom pb-2">CUSTOMER INFO</h4>
              <ul v-if="tempOrder.user">
                <li class="border-bottom py-3">
                  <p class="fw-bold w-30 d-inline-block">NAME</p>
                  <span class="text-secondary">{{ tempOrder.user.name }}</span>
                </li>
                <li class="border-bottom py-3">
                  <p class="fw-bold w-30 d-inline-block">EMAIL</p>
                  <span class="text-secondary">{{ tempOrder.user.email }}</span>
                </li>
                <li class="border-bottom py-3">
                  <p class="fw-bold w-30 d-inline-block">TEL</p>
                  <span class="text-secondary">{{ tempOrder.user.tel }}</span>
                </li>
                <li class="border-bottom py-3">
                  <p class="fw-bold w-30 d-inline-block">ADDRESS</p>
                  <span class="text-secondary">{{ tempOrder.user.address }}</span>
                </li>
              </ul>
            </div>
            <div class="col-md-8">
              <h4 class="fs-3 fw-bold border-bottom pb-2">ORDER INFO</h4>
              <ul class="mb-6 mb-md-7">
                <li class="border-bottom py-3">
                  <p class="fw-bold w-30 d-inline-block">ORDER ID</p>
                  <span class="text-secondary">{{ tempOrder.id }}</span>
                </li>
                <li class="border-bottom py-3">
                  <p class="fw-bold w-30 d-inline-block">CREATE AT</p>
                  <span class="text-secondary">
                    {{ $filters.date(tempOrder.create_at) }}</span>
                </li>
                <li class="border-bottom py-3">
                  <p class="fw-bold w-30 d-inline-block">PAID DATE</p>
                  <span class="text-secondary">
                    {{ $filters.date(tempOrder.paid_date) }}</span>
                </li>
                <li class="border-bottom py-3">
                  <p class="fw-bold w-30 d-inline-block">PAYMENT STATUS</p>
                  <span
                    class="text-secondary"
                    :class="{ 'text-primary': tempOrder.is_paid }"
                  >
                    {{ tempOrder.is_paid ? "Paid" : "Not paid" }}</span
                  >
                </li>
                <li class="border-bottom py-3">
                  <p class="fw-bold w-30 d-inline-block">TOTAL</p>
                  <span class="text-secondary"
                    >NT$ {{ $filters.thousands(tempOrder.total) }}</span
                  >
                </li>
              </ul>
              <h4 class="fs-3 fw-bold border-bottom pb-2">PRODUCTS</h4>
              <ul class="mb-6 mb-md-7" v-if="tempOrder.products">
                <li
                  class="
                    border-bottom
                    d-flex
                    flex-wrap
                    align-items-center
                    justify-content-between
                    py-3
                  "
                  v-for="item in tempOrder.products"
                  :key="item.id"
                >
                  <p class="text-secondary w-md-60">{{ item.product.title }}</p>
                  <p class="text-secondary">
                    <span class="me-3 me-xl-4">
                      x{{ item.qty }} / {{ item.product.unit }}</span
                    >
                    NT$ {{ $filters.thousands(item.product.price) }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-primary px-5">
            <Spinner v-if="isSpinner" />OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modal';
import Spinner from '@/components/Spinner.vue';

export default {
  props: {
    orderData: {
      type: Object,
      default() {
        return {};
      },
    },
    isSpinner: {
      type: Boolean,
    },
  },
  mixins: [modalMixin],
  data() {
    return {
      modal: '',
      tempOrder: {},
    };
  },
  watch: {
    orderData() {
      this.tempOrder = { ...this.orderData };
    },
  },
  components: {
    Spinner,
  },
};
</script>
