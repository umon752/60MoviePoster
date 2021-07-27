<template>
  <div
    ref="modal"
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-fullscreen-md-down">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title title fs-2" id="exampleModalLabel">
            {{ modalTitle }} COUPON
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <Form v-slot="{ errors }" class="mb-4">
            <div class="mb-5">
              <label for="title" class="form-label text-secondary">TITLE</label>
              <Field
                type="text"
                class="form-control"
                id="title"
                name="Title"
                placeholder="Please enter a title"
                :class="{ 'is-invalid': errors['Title'] }"
                rules="required"
                v-model.trim="tempCoupon.title"
              />
              <error-message
                name="Title"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-5">
              <label for="code" class="form-label text-secondary">CODE</label>
              <Field
                type="text"
                class="form-control"
                id="code"
                name="Code"
                placeholder="Please enter a code"
                :class="{ 'is-invalid': errors['Code'] }"
                rules="required"
                v-model.trim="tempCoupon.code"
              />
              <error-message
                name="Code"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="mb-5">
              <label for="date" class="form-label text-secondary"
                >DUE DATE</label
              >
              <input
                type="date"
                class="form-control text-secondary"
                id="date"
                :min="today"
                v-model="due_date"
              />
            </div>
            <div class="mb-5">
              <label for="percent" class="form-label text-secondary"
                >PERCENT</label
              >
              <Field
                type="text"
                class="form-control"
                id="percent"
                name="Percent"
                placeholder="Please enter a percent"
                :class="{ 'is-invalid': errors['Percent'] }"
                rules="required"
                v-model.trim="tempCoupon.percent"
              />
              <error-message
                name="Percent"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="isEnabled"
                :true-value="1"
                :false-value="0"
                v-model.number="tempCoupon.is_enabled"
              />
              <label class="form-check-label" for="isEnabled">
                IS ENABLED
              </label>
            </div>
          </Form>
        </div>
        <div class="modal-footer justify-content-center">
          <button
            type="button"
            class="btn btn-sm btn-secondary text-white"
            data-bs-dismiss="modal"
          >
            CANCLE
          </button>
          <button
            type="button"
            class="btn btn-sm btn-primary"
            @click="$emit('updateCoupon', tempCoupon, modalTitle)"
          >
            <Spinner v-if="isSpinner" />OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modal';
import Spinner from '@/components/Spinner.vue';

export default {
  props: {
    modalTitle: {
      type: String,
      default() {
        return '';
      },
    },
    couponData: {
      type: Object,
      default() {
        return {};
      },
    },
    isSpinner: {
      type: Boolean,
    },
  },
  mixins: [modalMixin],
  data() {
    return {
      tempCoupon: {},
      due_date: '',
      today: '',
    };
  },
  watch: {
    couponData() {
      this.tempCoupon = { ...this.couponData };
      // 驗證資料欄位內容
      if (!this.tempCoupon.is_enabled) {
        this.tempCoupon.is_enabled = 0;
      }
      if (!this.tempCoupon.due_date) {
        // 預設加上今天日期，格式為 timestamp (時間戳)
        this.tempCoupon.due_date = new Date().getTime() / 1000;
      }
      if (!this.tempCoupon.title) {
        this.tempCoupon.title = '';
      }
      if (!this.tempCoupon.code) {
        this.tempCoupon.code = '';
      }
      if (!this.tempCoupon.percent) {
        this.tempCoupon.percent = '';
      }
      // 將從外層取得的時間資料，格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
      // 解構賦值（Destructuring Assignment）
      [this.due_date, this.test] = dateAndTime;
      // 設定最小值 (今天日期)，為"新增"時才執行設定，格式 YYYY-MM-DD
      if (this.modalTitle === 'CREATE') {
        this.today = Math.floor(Date.now() / 1000);
        [this.today] = dateAndTime;
      }
    },
    due_date() {
      // 將內層設定的時間資料，格式改回 timestamp (時間戳)
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  components: {
    Spinner,
  },
};
</script>
