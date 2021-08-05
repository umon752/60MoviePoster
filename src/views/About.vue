<template>
  <img
    src="https://storage.googleapis.com/vue-course-api.appspot.com/umon752/1628067816999.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=J6wO2PKoI9MqMsEdDO25GpPGcH6pVaSGn%2FwCQq%2F%2Fe78Qid5BaaC7MVfqvumfA%2FjLYmrKTLabaNVNAJPxAUwD%2FXMYPRL3mj489v%2BE4ZpBxRBG8LeHAtpXr0epKchxBfyuCV5cRqJm9dZ0y3YdfvdKx05LotrTE6Zq1mqjQ0FnU3MNWwZRg1PSSjxJZIxyizXXiB5RIG1t5dmcfLypvauZL80mAQUYsIGAtc%2FUPtbfMzMtC04rVzFJNFLY9PieORCfAdQOufWD0c2qcNSzBx8EBa26j5e6pV%2BalYiIuFuEeqIde3PzgbS8FjE5T5FKui2LH2f%2B7vVWu2C79sTDZbaMxw%3D%3D"
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
                src="https://storage.googleapis.com/vue-course-api.appspot.com/umon752/1628067979978.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=kweDn60IeLZPCvBqdiyk1uKWItfVj40eC0rw5B2YBJFwyxNw66GdK%2FA78Kz%2BigTSEJvrPHSNNieTLBLyoOseLrsN%2FD63LVG03OjCj2p0lcUM2IkX%2B9i144wnmEYMCwSlQ%2FxbrljMV0s2t8H%2FRku0YMT2YyexZVN5tmtlloztMFXpp%2B4Ugh2lI7EJ5zK%2BSVpcas%2F6pPdPVQ5tIIRwB6zGE4YpHjmerHY0zPi4xpSzfq4ODGcQQaoYqtijHTcB4niCOLJoP%2BXvpsWhFAUiKPQ3FaL5OZ9saQPaiVQPhEgVH0v6zU5BV5GONe5ZgFjEr7%2BR4nzMpxkYLGEWmgP%2BFEeuOQ%3D%3D"
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
                src="https://storage.googleapis.com/vue-course-api.appspot.com/umon752/1628067982440.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=AECPS%2FV1iu6NpCgQRHdxsEEFx3S%2Bc66oQkSG%2F6Rki2PgmVcbbBu006Yg7Fofu9%2Bzyive8%2BfEthBGAjLlutDoTm4cMi3ozCzcfJXB6%2BHqozGuD43qajlI%2Bva8GbqqWyXdmWPCLewZHNRCfwSx3xpZk6kFA9QK450mP%2BBTGnoXBEgZnJ1tq3Mf%2FfuYXS2hj0JufKA704B%2BpDGyut3sIQuDoXWMqDSuZeOlN9qx668OQn3x6G3XE6KFgKcJYWn7igtKoMpWDrzmrs7ig40MP4YYZiYcw%2FNGCYt8Q6WKda%2FydV04yXajuVUJxEolqAXE79MUEaCqeUQc5q97K39pusyl7w%3D%3D"
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
  },
};
</script>
