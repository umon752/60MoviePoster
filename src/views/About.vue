<template>
  <img
    src="https://storage.googleapis.com/vue-course-api.appspot.com/umon752/1626773645846.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=arRQeLhHayJZydSK%2BH8JksSIa2BUXJc7nXj6shtUUV%2B%2Ba%2FXSuKdnQUnS6l%2FeA0y4IoqSKlgXhi7mgReyea5Ubs5mPc2EH6cUk7%2F6ust1tSkRW%2FubI6c9mWh0E66%2F66xgumfu7blewzG7vhlRqFUTF%2BDqqXSEzJeWU6a46HRGAlkaHbRL1yOV4%2B0uxXClEp8XimqWA9jquRAF35PwcpyKLZhOpCnkowia7OJDddbYnyIfQekD4RP5b5sfpihiTbIxun2XjMnIntjjd5zB%2FckOxF36Lchh2d2GVyxfsXkvEgPvoDexFOcjYXnOTW6%2FFDdrZsXr7OiryKYo%2B1P8YtVjhQ%3D%3D"
    class="jumbotron opacity-30 mb-5"
  />
  <section class="container pb-9 pt-3">
    <div class="d-flex flex-column align-items-center justify-content-center">
      <h2 class="title mb-7">ABOUT</h2>
      <div class="row align-items-center justify-content-center mb-6">
        <div class="col-xl-9">
          <div class="row align-items-center mb-7 mb-lg-6">
            <div class="col-lg-6 mb-4 mb-lg-0">
              <img
                src="https://storage.googleapis.com/vue-course-api.appspot.com/umon752/1626872090356.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=UhFN0ksxNJjjRoFtQ72TKKwJPQ4QeQYYhpisgtsQQrIckDRURq8l8BXWSzVnt%2Fb2y%2BzhPMmEnkZzV7467B3EEk6Iwo%2Fv15%2FJWj9UjidU4MXBm%2FpsRtedROsyPpoTmOinNzYDoM%2B4LQv9gZo2%2Bn8APUDo9KHn64ucB00%2FykzAnSQpxxdgdlJ0u%2BUdpjJNtGV6t6U%2FfgrhKB2hdajEoMBdhQ3GY%2B1Lqa8kNHjKYpryWmrhqzzae9Dk3X1Y%2B6uEYRBS2TpAgi4ZojdUgEh6otu4A6wwYOGTBGTGPMawS8K40B3hLRY%2Fn%2Fe41jMdSShqlQMI3Q07FAHsp%2FJv885Bff6lyw%3D%3D"
                class="jumbotron"
              />
            </div>
            <div class="col-lg-6">
              <h3 class="opacity-90 fs-md-2 fw-bold mb-2 mb-lg-4">
                We love movie posters.
              </h3>
              <p class="opacity-70 fs-5 fs-md-4 mb-3">
                For generations, films have had the ability to evoke memories in
                our lives. Enjoy of life through the magic of cinema.
                <br />
                60 Movie Poster was founded in 1995, we are a movie posters
                shop. Let’s find what you love!
              </p>
              <router-link to="/products">
                <div
                  class="d-inline-flex align-items-center fs-5"
                  data-cursor="cursor"
                >
                  SHOP NOW
                  <div class="arrow-btn border border-primary ms-2">
                    <span class="material-icons" data-cursor="cursor">
                      arrow_right
                    </span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <div class="row align-items-center flex-lg-row-reverse">
            <div class="col-lg-6 mb-4 mb-lg-0">
              <img
                src="https://storage.googleapis.com/vue-course-api.appspot.com/umon752/1626871986805.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=fwQzxSPzSvMvdT8xOiNmHRR97QkUZMh7uPT%2Bq2VsDLBDd%2Bdr5DqQPPgTHFermvN%2FT0BrKC7xRQFrCXG%2FhNFW3FglcmXddLLO714aTY33sc8A0JgP6ysiZWEmMgb7hG7n2kgR0vDfKiwaEYDm0Lc3Z%2BNeRjbSni%2BX%2Fo1cxIy2rr%2F7iN89V%2Fl2nLYqFO3sw6okcjyoHuYvRGxzS8lS%2FwexGFlHP%2BWG48bjVfOpIAQkRnmgHPJRQg23tuoasUXpYEu8MSIP3ngaC90RUnKAhxn3ygAlmjE1QUw8gHN81Ea%2B99T41%2BHhwo22Tr%2FIq%2FTogAG5Ylzx9QMOC%2FTkONhkdiWQcg%3D%3D"
                class="jumbotron"
              />
            </div>
            <div class="col-lg-6">
              <h3 class="opacity-90 fs-md-2 fw-bold mb-2 mb-lg-4">
                Collecting movie posters.
              </h3>
              <p class="opacity-70 fs-5 fs-md-4 mb-3">
                Original vintage movie posters have a long and fascinating
                history.
                <br />
                We are also interested in buying individual movie posters so
                please contact us if you have anything for sale.
              </p>
              <router-link to="/contact">
                <div
                  class="d-inline-flex align-items-center fs-5"
                  data-cursor="cursor"
                >
                  CONTACT US
                  <div class="arrow-btn border border-primary ms-2">
                    <span class="material-icons" data-cursor="cursor">
                      arrow_right
                    </span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import emitter from '@/methods/mitt';

export default {
  inheritAttrs: false,
  emits: ['toggleHide'],
  mounted() {
    // 顯示 loading
    emitter.emit('isLoading', (this.isLoading = true));
    // 隱藏 loading
    setTimeout(() => {
      emitter.emit('isLoading', (this.isLoading = false));
    }, 2000);
    // 關閉 toggle panel
    this.$emit('toggleHide');
    // Firefox Material-icons 置中
    emitter.emit('firefoxIcon');
  },
};
</script>
