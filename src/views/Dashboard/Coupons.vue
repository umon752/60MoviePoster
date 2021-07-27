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
      CREATE COUPON
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
    v-if="couponsData.length === 0"
  >
    <h3 class="fs-2 fw-bold opacity-50">Create a coupon.</h3>
  </section>

  <!-- full state -->
  <div class="scrollbar mb-6" v-else>
    <table class="table text-nowrap mb-8">
      <thead class="bg-black-opacity-50 border-top">
        <tr>
          <th scope="col" class="border-bottom">TITLE</th>
          <th scope="col" class="border-bottom">PERCENT</th>
          <th scope="col" class="border-bottom">DUE DATE</th>
          <th scope="col" class="border-bottom">IS ENABLED</th>
          <th scope="col" class="border-bottom">EDIT</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in couponsData" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
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
  <div class="d-flex justify-content-end" v-if="couponsData.length !== 0">
    <Pagination :page="pagination" @getData="getCoupons" />
  </div>

  <!-- coupon modal -->
  <CouponModal
    ref="couponModal"
    :modalTitle="modalTitle"
    :couponData="couponData"
    @updateCoupon="updateCoupon"
    :isSpinner="isSpinner"
  />

  <!-- delete modal -->
  <DeleteModal
    ref="delModal"
    :data="couponData"
    :modalTitle="modalTitle"
    @delData="delCoupon"
    :isSpinner="isSpinner"
  />
</template>

<script>
import emitter from '@/methods/mitt';
import Pagination from '@/components/Pagination.vue';
import CouponModal from '@/components/Backed/CouponModal.vue';
import DeleteModal from '@/components/Backed/DeleteModal.vue';

export default {
  data() {
    return {
      couponsData: [],
      couponData: {},
      modalTitle: '',
      pagination: {},
      isSpinner: false,
    };
  },
  inject: ['emitter', '$alertState'],
  emits: ['emptyState'],
  watch: {
    couponsData() {
      if (this.couponsData.length === 0) {
        this.$emit('emptyState', true);
      } else {
        this.$emit('emptyState', false);
      }
    },
  },
  methods: {
    getCoupons(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.couponsData = res.data.coupons;
            this.pagination = res.data.pagination;
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Get coupons');
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
        this.couponData = {
          ...item,
        };
        this.modalTitle = 'COUPON';
      } else if (state === 'EDIT') {
        this.$refs.couponModal.openModal();
        // push 該產品資料
        this.couponData = {
          ...item,
        };
        this.modalTitle = state;
      } else if (state === 'CREATE') {
        this.$refs.couponModal.openModal();
        // push 空資料
        this.couponData = {};
        this.modalTitle = state;
      }
    },
    delCoupon() {
      this.isSpinner = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.couponData.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            // 顯示訊息
            this.$alertState(res.data.success, 'Delete this coupon');
            this.getCoupons();
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Delete this coupon');
          }
          this.isSpinner = false;
          this.$refs.delModal.closeModal();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateEnabledState(item) {
      if (item.is_enabled) {
        item.is_enabled = 0;
      } else {
        item.is_enabled = 1;
      }
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;

      this.$http.put(url, {
        data: item,
      })
        .then((res) => {
          if (res.data.success) {
            // 顯示訊息
            this.$alertState(res.data.success, 'Update enabled state');
            this.getCoupons();
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Update enabled state');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateCoupon(item, modalTitle) {
      // 建立
      let url;
      let method;
      this.isSpinner = true;

      // 編輯
      if (modalTitle === 'EDIT') {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
        method = 'put';
      } else if (modalTitle === 'CREATE') {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
        method = 'post';
      }

      this.$http[method](url, {
        data: item,
      })
        .then((res) => {
          if (res.data.success) {
            // 顯示訊息
            this.$alertState(res.data.success, 'Update this coupon');
            this.getCoupons();
            this.$refs.couponModal.closeModal();
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Update this coupon');
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
    this.getCoupons();
    // Firefox Material-icons 置中
    emitter.emit('firefoxIcon');
  },
  components: {
    Pagination,
    CouponModal,
    DeleteModal,
  },
};
</script>
