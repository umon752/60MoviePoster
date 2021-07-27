<template>
  <div
    ref="productItemModal"
    class="modal fade"
    id="productItem"
    tabindex="-1"
    aria-labelledby="productItemLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title title fs-2" id="productItemLabel">
            PRODUCT ITEMS
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <ul>
            <li
              class="border-bottom mb-2 pb-2"
              v-for="item in data"
              :key="item.id"
            >
              <div
                class="
                  d-flex
                  flex-wrap
                  justify-content-between
                  align-items-center
                "
                v-if="item.product"
              >
                <p class="w-md-60">
                  {{ item.product.title }}
                </p>
                <p>
                  <span class="me-3">x{{ item.qty }}</span>
                  NT$ {{ $filters.thousands(item.product.price) }}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-sm btn-primary d-flex"
            data-bs-dismiss="modal"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      productItemModal: '',
    };
  },
  props: {
    data: {
      type: Object,
      default() { return {}; },
    },
  },
  methods: {
    openModal() {
      this.productItemModal.show();
    },
    closeModal() {
      this.productItemModal.hide();
    },
  },
  mounted() {
    // modal 初始化
    this.productItemModal = new Modal(this.$refs.productItemModal);
  },
};
</script>
