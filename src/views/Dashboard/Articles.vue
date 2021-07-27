<template>
  <div class="d-flex justify-content-xl-end">
    <button
      type="button"
      class="
        btn btn-sm btn-primary
        d-inline-flex
        align-items-center
        mb-5 mb-lg-6
      "
      @click.prevent="openModal('CREATE')"
    >
      <span class="material-icons fs-4 me-2"> add </span>
      CREATE ARTICLE
    </button>
  </div>

  <!-- empty state -->
  <section
    class="
      flex-grow-1
      bg-black-opacity-50
      d-flex
      justify-content-center
      align-items-center
      h-100
    "
    v-if="articlesData.length === 0"
  >
    <h3 class="fs-2 fw-bold opacity-50">Create an article.</h3>
  </section>

  <!-- full state -->
  <div class="scrollbar mb-6" v-else>
    <table class="table text-nowrap mb-8">
      <thead class="bg-black-opacity-50 border-top">
        <tr>
          <th scope="col" class="border-bottom">TITLE</th>
          <th scope="col" class="border-bottom">AUTHOR</th>
          <th scope="col" class="border-bottom">DESCRIPTION</th>
          <th scope="col" class="border-bottom">CREATE DATE</th>
          <th scope="col" class="border-bottom">IS PUBLIC</th>
          <th scope="col" class="border-bottom">EDIT</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in articlesData" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.description }}</td>
          <td>{{ $filters.date(item.create_at) }}</td>
          <td>
            <div class="form-check form-switch" v-if="item.isPublic">
              <input
                class="form-check-input"
                type="checkbox"
                :id="item.id"
                checked
                @click="updatePublicState(item)"
              />
              <label class="form-check-label text-primary" :for="item.id"
                >PUBLIC</label
              >
            </div>
            <div class="form-check form-switch" v-else>
              <input
                class="form-check-input"
                type="checkbox"
                :id="item.id"
                @click="updatePublicState(item)"
              />
              <label class="form-check-label opacity-50" :for="item.id"
                >PRIVATE</label
              >
            </div>
          </td>
          <td>
            <a
              href="#"
              class="icon-btn link d-inline-flex me-4"
              @click.prevent="openModal('EDIT', item)"
            >
              <span class="material-icons"> edit </span>
            </a>
            <a
              href="#"
              class="icon-btn link d-inline-flex"
              @click.prevent="openModal('DELETE', item)"
            >
              <span class="material-icons"> delete </span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- pagination -->
  <div class="d-flex justify-content-end" v-if="articlesData.length !== 0">
    <Pagination :page="pagination" @getData="getArticles" />
  </div>

  <!-- article modal -->
  <ArticleModal
    ref="articleModal"
    :modalTitle="modalTitle"
    :articleData="articleData"
    @updateArticle="updateArticle"
    :isSpinner="isSpinner"
  />

  <!-- delete modal -->
  <DeleteModal
    ref="delModal"
    :data="articleData"
    :modalTitle="modalTitle"
    @delData="delArticle"
    :isSpinner="isSpinner"
  />
</template>

<script>
import emitter from '@/methods/mitt';
import Pagination from '@/components/Pagination.vue';
import ArticleModal from '@/components/Backed/ArticleModal.vue';
import DeleteModal from '@/components/Backed/DeleteModal.vue';

export default {
  data() {
    return {
      articlesData: [],
      articleData: {},
      modalTitle: '',
      pagination: {},
      isSpinner: false,
    };
  },
  inject: ['emitter', '$alertState'],
  emits: ['emptyState'],
  watch: {
    articlesData() {
      if (this.articlesData.length === 0) {
        this.$emit('emptyState', true);
      } else {
        this.$emit('emptyState', false);
      }
    },
  },
  methods: {
    getArticles(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.articlesData = res.data.articles;
            this.pagination = res.data.pagination;
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Get articles');
          }
          // 隱藏 loading
          emitter.emit('isLoading', this.isLoading = false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getArticle(item) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.articleData = res.data.article;
            if (this.modalTitle === '') {
              this.updateArticle(this.articleData);
            }
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
    openModal(state, item) {
      if (state === 'DELETE') {
        this.$refs.delModal.openModal();
        this.articleData = {
          ...item,
        };
        this.modalTitle = 'ARICLE';
      } else if (state === 'EDIT') {
        this.$refs.articleModal.openModal();
        this.getArticle(item);
        this.modalTitle = state;
      } else if (state === 'CREATE') {
        this.$refs.articleModal.openModal();
        // push 空資料
        this.articleData = {
          title: '',
          author: '',
          description: '',
          content: '',
          tag: [''],
          isPublic: false,
        };
        this.modalTitle = state;
      }
    },
    delArticle() {
      this.isSpinner = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.articleData.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            // 顯示訊息
            this.$alertState(res.data.success, 'Delete this article');
            this.getArticles();
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Delete this article');
          }
          this.isSpinner = false;
          this.$refs.delModal.closeModal();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updatePublicState(item) {
      this.modalTitle = '';
      this.getArticle(item);

      if (item.isPublic) {
        item.isPublic = false;
      } else {
        item.isPublic = true;
      }
    },
    updateArticle(item, modalTitle = '') {
      // 將 tag 內的空值移除
      item.tag = item.tag.filter((value) => value !== '');
      // 建立
      let url;
      let method;
      this.isSpinner = true;

      // 編輯
      if (modalTitle === 'EDIT' || modalTitle === '') {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`;
        method = 'put';
      } else if (modalTitle === 'CREATE') {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`;
        method = 'post';
      }

      this.$http[method](url, {
        data: item,
      })
        .then((res) => {
          if (res.data.success) {
            // 顯示訊息
            this.$alertState(res.data.success, 'Update this article');
            this.getArticles();
            this.$refs.articleModal.closeModal();
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Update this article');
          }
          this.isSpinner = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    // 顯示 loading
    emitter.emit('isLoading', this.isLoading = true);
    this.getArticles();
    // Firefox Material-icons 置中
    emitter.emit('firefoxIcon');
  },
  components: {
    Pagination,
    ArticleModal,
    DeleteModal,
  },
};
</script>
