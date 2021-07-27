<template>
  <!-- success -->
  <div
    class="alert alert-light d-flex align-items-center"
    role="alert"
    :class="{ active: alert.isShowAlert }"
    v-if="alert.isSuccess"
  >
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi flex-shrink-0 me-2"
        viewBox="0 0 16 16"
        role="img"
      >
        <path
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16
        0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477
        9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97
        11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
        />
      </svg>
    </svg>
    <div>
      {{ alert.text }}
    </div>
  </div>

  <!-- failed -->
  <div
    class="alert alert-primary d-flex align-items-center"
    role="alert"
    :class="{ active: alert.isShowAlert }"
    v-else
  >
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi flex-shrink-0 me-2"
        viewBox="0 0 16 16"
        role="img"
      >
        <path
          d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165
    13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0
    1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35
    3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002
    6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        />
      </svg>
    </svg>
    <div>
      {{ alert.text }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alert: {
        isShowAlert: false,
        isSuccess: true,
        text: '',
      },
    };
  },
  inject: ['emitter'],
  methods: {
    showAlert() {
      // 顯示訊息
      this.alert.isShowAlert = true;
      setTimeout(() => {
        this.alert.isShowAlert = false;
      }, 2000);
    },
  },
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { text, icon } = message;
      this.alert.text = text;
      this.alert.isSuccess = icon;
      this.showAlert();
    });
  },
  unmounted() {
    this.emitter.off('push-message');
  },
};
</script>
