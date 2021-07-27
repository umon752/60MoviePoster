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
    emitter.on('firefoxIcon', () => {
      // 在 Firefox Material-icons 統一加上 translateY(.2rem) 維持置中
      const isFirefox = window.navigator.userAgent.indexOf('Firefox') !== -1;
      if (isFirefox) {
      // 因 AJAX 的關係需要待 AJAX 執行完畢，再執行 (稍微延遲)
        setTimeout(() => {
          const materialIcons = document.getElementsByClassName('material-icons');
          materialIcons.forEach((item) => {
            item.style.transform = 'translateY(.2rem)';
          });
        }, 3000);
      }
    });
  },
  unmounted() {
    this.emitter.off('isLoading');
    this.emitter.off('isOpening');
    this.emitter.off('firefoxIcon');
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/all";
</style>
