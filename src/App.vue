<template>
  <Loading :isLoading="isLoading" />
  <Opening :isOpening="isOpening" />
  <Alert />
  <router-view/>
</template>

<script>
import Loading from '@/components/Loading.vue';
import Alert from '@/components/Alert.vue';
import emitter from '@/methods/mitt';
import $alertState from '@/methods/alertState';
import Opening from '@/components/Fronted/Opening.vue';

export default {
  data() {
    return {
      isLoading: false,
      isOpening: false,
    };
  },
  provide() {
    return {
      emitter,
      $alertState,
    };
  },
  components: {
    Loading,
    Alert,
    Opening,
  },
  mounted() {
    // loading 效果
    emitter.on('isLoading', (state) => {
      this.isLoading = state;
    });
    // opening 效果
    emitter.on('isOpening', (state) => {
      this.isOpening = state;
    });
  },
  unmounted() {
    this.emitter.off('isLoading');
    this.emitter.off('isOpening');
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/all";
</style>
