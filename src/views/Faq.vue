<template>
  <img src="https://storage.googleapis.com/vue-course-api.appspot.com/umon752/1628067830548.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=qcpE8cQxRtfiR%2F0zEJk6qABHOufGAQmKVkcuwaYNPWOoNn7b2z3%2FzA2lxdzTquarvHVwLRi1HBfuHeRn6pmYclxNkWFsIK6KbPcPZnqfeq3HVIR%2FdfUeHkXTpIYZPDKHbTKMC8KmSFXJY37Kx%2F%2BaqJb9q5W1X%2B0487buWLvfp6uoIK%2FrpU9vb01fzCMf9S%2FD4Jisc8VzDu03Fggc%2FGjKv8nP3O3aYtZ3fHg2Q6q0Z0xwe55aECrHZ6oHckjVniH5bX1JfivSRHfPwjRfGdg4zKGF7dbxV4cRF9k509SpdttdPyKn69ckifhhAfIBy8sFTPPH4aSVex1K%2BBByZZBdRQ%3D%3D" class="jumbotron opacity-30 mb-5" />
  <section class="container pb-9 pt-3">
    <div class="row justify-content-center">
      <div class="col-xl-9">
        <div
          class="d-flex flex-column align-items-center justify-content-center"
        >
          <h2 class="title mb-7">FAQ</h2>
          <div class="accordion w-100 mb-9" id="selector">
            <div class="accordion-item" v-for="(item, index) in articlesData" :key="item.id">
              <h3 class="accordion-header" :id="item.id">
                <button
                  class="accordion-button collapsed fs-5 fs-md-4"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#collapse${index}`"
                  aria-expanded="false"
                  :aria-controls="`collapse${index}`"
                  data-cursor="cursor"
                >
                  {{ item.title }}
                </button>
              </h3>
              <div
                :id="`collapse${index}`"
                data-bs-parent="#selector"
                class="accordion-collapse collapse"
                :aria-labelledby="item.id"
              >
                <div class="accordion-body article text-break fs-5 fs-md-4"
                v-html="item.content">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';
import emitter from '@/methods/mitt';

export default {
  inheritAttrs: false,
  data() {
    return {
      collapse: '',
      articlesData: [],
    };
  },
  emits: ['toggleHide'],
  methods: {
    getArticles(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            // 過濾 tag 為 FAQ
            this.articlesData = res.data.articles.filter((item) => item.tag.includes('FAQ'));
            // 時間排序
            this.articlesData.sort((a, b) => b.create_at - a.create_at);
            this.articlesData.forEach((item, index) => {
              this.getArticle(item, index);
            });
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Get articles');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getArticle(item, index) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/article/${item.id}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.articlesData[index].content = res.data.article.content;
          } else {
          // 顯示訊息
            this.$alertState(res.data.success, 'Get article');
          }
          // 隱藏 loading
          emitter.emit('isLoading', this.isLoading = false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    // 顯示 loading
    emitter.emit('isLoading', (this.isLoading = true));
    // 隱藏 loading
    setTimeout(() => {
      emitter.emit('isLoading', (this.isLoading = false));
    }, 2000);
    // 關閉 toggle panel
    this.$emit('toggleHide');
    // collapse 初始化
    const collapseElementList = [].slice.call(
      document.querySelectorAll('.collapse'),
    );
    this.collapse = collapseElementList.map(
      (collapseEl) => new Collapse(collapseEl, {
      }),
    );
    // 取得文章列表
    this.getArticles();
  },
};
</script>
