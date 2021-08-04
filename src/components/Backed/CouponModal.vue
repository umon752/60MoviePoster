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
          <Form v-slot="{ errors }" class="mb-4" ref="form">
            <div class="mb-5">
              <label for="title" class="form-label text-secondary">
                <span class="text-primary">*</span>TITLE</label
              >
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
              <label for="code" class="form-label text-secondary">
                <span class="text-primary">*</span>CODE</label
              >
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
                ><span class="text-primary">*</span>DUE DATE</label
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
                ><span class="text-primary">*</span>PERCENT</label
              >
              <Field
                type="number"
                class="form-control"
                id="percent"
                name="Percent"
                placeholder="Please enter a percent"
                :class="{ 'is-invalid': errors['Percent'] }"
                rules="required"
                v-model.number="tempCoupon.percent"
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
            type="type"
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
  emits: ['updateCoupon'],
  mixins: [modalMixin],
  data() {
    return {
      tempCoupon: {},
      due_date: '',
      today: '',
    };
  },
  methods: {
    // CREATE 資料處理
    resetForm() {
      // 這裡 reset 是避免暫存已被刪除的資料 (暫存已被刪除的資料開啟同一筆會無法顯示)
      this.tempCoupon = {
        title: '',
        code: '',
        due_date: '',
        percent: '',
        is_enabled: 0,
      };
      this.tempCoupon.due_date = new Date().getTime() / 1000;
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
      [this.due_date, this.test] = dateAndTime;
      // 設定最小值 (今天日期)，格式 YYYY-MM-DD
      this.today = Math.floor(Date.now() / 1000);
      [this.today] = dateAndTime;
      // 利用非同步處理立即觸發 veevalidate 的問題
      setTimeout(() => this.$refs.form.resetForm(), 0);
    },
  },
  watch: {
    // EDIT 資料處理
    couponData() {
      this.tempCoupon = JSON.parse(JSON.stringify(this.couponData));
      // 將從外層取得的時間資料，格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
      // 解構賦值（Destructuring Assignment）
      [this.due_date, this.test] = dateAndTime;
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
