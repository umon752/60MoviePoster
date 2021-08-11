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
      CREATE PRODUCT
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
    "
    v-if="productsData.length === 0"
  >
    <h3 class="fs-2 fw-bold opacity-50">Create a product.</h3>
  </section>

  <!-- full state -->
  <div class="scrollbar mb-6" v-else>
    <table class="table mb-8">
      <thead class="bg-black-opacity-50 border-top">
        <tr>
          <th scope="col" class="border-bottom py-5">CATEGORY</th>
          <th scope="col" class="border-bottom w-30 py-5">TITLE</th>
          <th scope="col" class="border-bottom py-5">ORIGIN PRICE</th>
          <th scope="col" class="border-bottom py-5">PRICE</th>
          <th scope="col" class="border-bottom py-5">IS ENABLED</th>
          <th scope="col" class="border-bottom text-center py-5">EDIT</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in productsData" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>NT$ {{ $filters.thousands(item.origin_price) }}</td>
          <td>NT$ {{ $filters.thousands(item.price) }}</td>
          <td>
            <div class="form-check form-switch" v-if="item.is_enabled">
              <input
                class="form-check-input"
                type="checkbox"
                :id="item.id"
                checked
                @click="updateEnabledState(item)"
              />
              <label class="form-check-label text-primary" :for="item.id"
                >ENABLED</label
              >
            </div>
            <div class="form-check form-switch" v-else>
              <input
                class="form-check-input"
                type="checkbox"
                :id="item.id"
                @click="updateEnabledState(item)"
              />
              <label class="form-check-label opacity-50" :for="item.id"
                >DISABLE</label
              >
            </div>
          </td>
          <td class="text-center">
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
  <div class="d-flex justify-content-end" v-if="productsData.length !== 0">
    <Pagination :page="pagination" @getData="getProducts" />
  </div>

  <!-- product modal -->
  <ProductModal
    ref="productModal"
    :modalTitle="modalTitle"
    :productData="productData"
    @updateProduct="updateProduct"
    :isSpinner="isSpinner"
  />

  <!-- delete modal -->
  <DeleteModal
    ref="delModal"
    :data="productData"
    :modalTitle="modalTitle"
    @delData="delProduct"
    :isSpinner="isSpinner"
  />
</template>

<script>
import emitter from '@/methods/mitt';
import Pagination from '@/components/Pagination.vue';
import ProductModal from '@/components/Backed/ProductModal.vue';
import DeleteModal from '@/components/Backed/DeleteModal.vue';

export default {
  data() {
    return {
      productsData: [],
      productData: {},
      modalTitle: '',
      pagination: {},
      isSpinner: false,
    };
  },
  inject: ['emitter', '$alertState'],
  emits: ['emptyState'],
  watch: {
    productsData() {
      if (this.productsData.length === 0) {
        this.$emit('emptyState', true);
      } else {
        this.$emit('emptyState', false);
      }
    },
  },
  methods: {
    getProducts(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.productsData = res.data.products;
            this.pagination = res.data.pagination;
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Get products');
          }
          // 隱藏 loading
          emitter.emit('isLoading', this.isLoading = false);
        })
        .catch(() => {
          // 顯示訊息
          this.$alertState('error');
        });
    },
    openModal(state, item) {
      if (state === 'DELETE') {
        this.$refs.delModal.openModal();
        this.productData = {
          ...item,
        };
        this.modalTitle = 'PRODUCT';
      } else if (state === 'EDIT') {
        this.$refs.productModal.openModal();
        // push 該產品資料
        this.productData = JSON.parse(JSON.stringify(item));
        this.modalTitle = state;
      } else if (state === 'CREATE') {
        this.$refs.productModal.openModal();
        this.$refs.productModal.resetForm();
        this.modalTitle = state;
      }
    },
    delProduct() {
      this.isSpinner = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.productData.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            // 顯示訊息
            this.$alertState(res.data.success, 'Delete this product');
            this.getProducts();
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Delete this product');
          }
          this.isSpinner = false;
          this.$refs.delModal.closeModal();
        })
        .catch(() => {
          // 顯示訊息
          this.$alertState('error');
        });
    },
    updateEnabledState(item) {
      if (item.is_enabled) {
        item.is_enabled = 0;
      } else {
        item.is_enabled = 1;
      }
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;

      this.$http.put(url, {
        data: item,
      })
        .then((res) => {
          if (res.data.success) {
            // 顯示訊息
            this.$alertState(res.data.success, 'Update enabled state');
            this.getProducts();
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Update enabled state');
          }
        })
        .catch(() => {
          // 顯示訊息
          this.$alertState('error');
        });
    },
    updateProduct(item, modalTitle) {
      // 建立
      let url;
      let method;
      this.isSpinner = true;

      // 編輯
      if (modalTitle === 'EDIT') {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        method = 'put';
      } else if (modalTitle === 'CREATE') {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
        method = 'post';
      }

      this.$refs.productModal.$refs.form.validate().then((success) => {
        if (success.valid) {
          this.$http[method](url, {
            data: item,
          })
            .then((res) => {
              if (res.data.success) {
                // 顯示訊息
                this.$alertState(res.data.success, 'Update this product');
                this.getProducts();
                this.$refs.productModal.closeModal();
              } else {
                // 顯示訊息
                this.$alertState(res.data.success, 'Update this product');
              }
              this.isSpinner = false;
            })
            .catch(() => {
              // 顯示訊息
              this.$alertState('error');
            });
        }
      })
        .catch(() => {
          // 顯示訊息
          this.$alertState('error');
        });
    },
  },
  mounted() {
    // 顯示 loading
    emitter.emit('isLoading', this.isLoading = true);
    // 取得產品資料
    this.getProducts();
  },
  components: {
    Pagination,
    ProductModal,
    DeleteModal,
  },
};
</script>
