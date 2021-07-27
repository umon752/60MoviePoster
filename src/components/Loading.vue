<template>
  <div class="loading" :class="{ active: isLoading }">
    <div class="d-flex position-relative mb-1">
      <img class="loading__img--6" src="@/assets/images/logo/logo_6.svg" />
      <img class="loading__img--0" src="@/assets/images/logo/logo_0.svg" />
    </div>
    <p class="loading__text fs-5 fw-bold">LOADING</p>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
    },
  },
};
</script>
