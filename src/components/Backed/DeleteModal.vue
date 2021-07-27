<template>
  <div
    ref="delModal"
    class="modal fade"
    id="del"
    tabindex="-1"
    aria-labelledby="delLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title title fs-2" id="delLabel">
            DELETE {{ modalTitle }}
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p class="mb-1" v-if="data.title">
            Do you want to delete this {{ data.title }}?
          </p>
          <p class="mb-1" v-if="!data.title">
            Do you want to delete this order?
          </p>
          <p class="fs-5 text-primary">Cannot be restored after deletion.</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-sm btn-secondary text-white"
            data-bs-dismiss="modal"
          >
            CANCLE
          </button>
          <button
            type="button"
            class="btn btn-sm btn-primary d-flex"
            @click="$emit('delData')"
          >
            <Spinner v-if="isSpinner" />
            DELETE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import Spinner from '@/components/Spinner.vue';

export default {
  data() {
    return {
      delModal: '',
    };
  },
  props: {
    data: {
      type: Object,
      default() { return {}; },
    },
    isSpinner: {
      type: Boolean,
    },
    modalTitle: {
      type: String,
      default() { return ''; },
    },
  },
  methods: {
    openModal() {
      this.delModal.show();
    },
    closeModal() {
      this.delModal.hide();
    },
  },
  mounted() {
    // modal 初始化
    this.delModal = new Modal(this.$refs.delModal);
  },
  components: {
    Spinner,
  },
};
</script>
