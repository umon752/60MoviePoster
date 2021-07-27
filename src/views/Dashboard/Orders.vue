<template>
  <!-- empty state -->
  <section
    class="
      flex-grow-1
      bg-black-opacity-50
      d-flex
      justify-content-center
      align-items-center
    "
    v-if="ordersData.length === 0"
  >
    <h3 class="fs-2 fw-bold opacity-50">No order yet.</h3>
  </section>

  <!-- full state -->
  <div class="scrollbar mb-6" v-else>
    <table class="table text-nowrap mb-8">
      <thead class="bg-black-opacity-50 border-top">
        <tr>
          <th scope="col" class="border-bottom">PAID DATE</th>
          <th scope="col" class="border-bottom">EMAIL</th>
          <th scope="col" class="border-bottom">PRODUCTS</th>
          <th scope="col" class="border-bottom">TOTAL</th>
          <th scope="col" class="border-bottom">IS PAID</th>
          <th scope="col" class="border-bottom">EDIT</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in ordersData" :key="item.id">
          <td>{{ $filters.date(item.create_at) }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <a href="#" @click.prevent="openModal('VIEWITEM', item.products)"
              >PRODUCT ITEMS</a
            >
          </td>
          <td>NT$ {{ $filters.thousands(item.total) }}</td>
          <td>
            <div class="form-check form-switch" v-if="item.is_paid">
              <input
                class="form-check-input"
                type="checkbox"
                :id="item.id"
                checked
                @click="UpdatePaidState(item)"
              />
              <label class="form-check-label text-primary" :for="item.id"
                >PAID</label
              >
            </div>
            <div class="form-check form-switch" v-else>
              <input
                class="form-check-input"
                type="checkbox"
                :id="item.id"
                @click="UpdatePaidState(item)"
              />
              <label class="form-check-label opacity-50" :for="item.id"
                >NOT PAID</label
              >
            </div>
          </td>
          <td>
            <a
              href="#"
              class="icon-btn link d-inline-flex me-4"
              @click.prevent="openModal('VIEW', item)"
            >
              <span class="material-icons"> visibility </span>
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
  <div class="d-flex justify-content-end" v-if="ordersData.length !== 0">
    <Pagination :page="pagination" @getData="getOrders" />
  </div>

  <!-- orderModal -->
  <OrderModal ref="orderModal" :orderData="orderData" :isSpinner="isSpinner" />

  <!-- delete modal -->
  <DeleteModal
    ref="delModal"
    :data="orderData"
    :modalTitle="modalTitle"
    @delData="delOrder"
    :isSpinner="isSpinner"
  />

  <!-- product modal -->
  <ProductItemModal ref="productItemModal" :data="orderData" />
</template>

<script>
import emitter from '@/methods/mitt';
import Pagination from '@/components/Pagination.vue';
import OrderModal from '@/components/Backed/OrderModal.vue';
import DeleteModal from '@/components/Backed/DeleteModal.vue';
import ProductItemModal from '@/components/Backed/ProductItemModal.vue';

export default {
  data() {
    return {
      ordersData: [],
      orderData: {},
      pagination: {},
      modalTitle: '',
      isSpinner: false,
    };
  },
  inject: ['emitter', '$alertState'],
  emits: ['emptyState'],
  watch: {
    ordersData() {
      if (this.ordersData.length === 0) {
        this.$emit('emptyState', true);
      } else {
        this.$emit('emptyState', false);
      }
    },
  },
  methods: {
    getOrders(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.ordersData = res.data.orders;
            this.pagination = res.data.pagination;
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Get orders');
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
        this.orderData = {
          ...item,
        };
        this.modalTitle = 'ORDER';
      } else if (state === 'VIEW') {
        this.$refs.orderModal.openModal();
        // push 該訂單資料
        this.orderData = {
          ...item,
        };
      } else if (state === 'VIEWITEM') {
        this.$refs.productItemModal.openModal();
        // push 該訂單的產品資料
        this.orderData = {
          ...item,
        };
      }
    },
    delOrder() {
      this.isSpinner = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.orderData.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            // 顯示訊息
            this.$alertState(res.data.success, 'Delete this order');
            this.getOrders();
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Delete this order');
          }
          this.isSpinner = false;
          this.$refs.delModal.closeModal();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    UpdatePaidState(item) {
      if (item.is_paid) {
        item.is_paid = false;
      } else {
        item.is_paid = true;
      }
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;

      this.$http.put(url, {
        data: item,
      })
        .then((res) => {
          if (res.data.success) {
            // 顯示訊息
            this.$alertState(res.data.success, 'Update paid state');
            this.getOrders();
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Update paid state');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    // 顯示 loading
    emitter.emit('isLoading', this.isLoading = true);
    this.getOrders();
    // Firefox Material-icons 置中
    emitter.emit('firefoxIcon');
  },
  components: {
    Pagination,
    OrderModal,
    DeleteModal,
    ProductItemModal,
  },
};
</script>
