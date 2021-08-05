<template>
  <div class="completeBanner position-relative">
    <div
      class="
        completeBanner__mask
        d-flex
        flex-column
        justify-content-center
        align-items-center
      "
    >
      <p class="fs-2 fw-bold d-flex align-items-center">
        <span class="material-icons fs-2 me-2"> task_alt </span> SUCCESS！
      </p>
      <p class="mb-3">Thank you for your purchase!</p>
      <p class="mb-4">
        ORDER ID：<span class="text-primary fw-bold">{{ orderId }}</span>
      </p>
      <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-outline-secondary me-3">
          CHECK MY ORDER
        </button>
        <router-link to="/products" class="btn btn-primary">
          CONTINUE TO SHOP
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      orderId: '',
    };
  },
  mounted() {
    this.orderId = this.$route.params.id;
  },
};
</script>
