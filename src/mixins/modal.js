import Modal from 'bootstrap/js/dist/modal';

export default {
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
  },
  mounted() {
    // modal 初始化
    this.modal = new Modal(this.$refs.modal);
  },
};
