<template>
  <div
    class="loadingBg vh-100 vw-100 overflow-hidden"
    :class="{ active: isOpening }"
  >
    <div class="loadingBg__up bg-dark" :class="{ active: isOpening }"></div>
    <div class="loadingBg__down bg-dark" :class="{ active: isOpening }"></div>
  </div>
</template>

<script>
export default {
  props: {
    isOpening: {
      type: Boolean,
    },
  },
};
</script>
