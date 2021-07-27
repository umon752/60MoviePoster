<template>
  <div
    ref="modal"
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-dialog-centered modal-xl modal-fullscreen-lg-down
      "
    >
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title title fs-2" id="exampleModalLabel">
            {{ modalTitle }} PRODUCT
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="recoveryState"
          ></button>
        </div>
        <div class="modal-body">
          <Form v-slot="{ errors }" class="row" ref="form">
            <div class="col-md-4 mb-6">
              <div class="mb-5 mb-md-6">
                <p class="text-secondary mb-2">MAIN IMAGE</p>
                <!-- 上傳方式按鈕 -->
                <div
                  class="d-flex align-items-center justify-content-between mb-3"
                >
                  <p class="fs-5 text-secondary opacity-70">ADD IMAGE：</p>
                  <div>
                    <a
                      href="#"
                      class="icon-btn link d-inline-flex me-3"
                      @click.prevent="uploadMethod('cloud')"
                    >
                      <span class="material-icons"> cloud_upload </span>
                    </a>
                    <a
                      href="#"
                      class="icon-btn link d-inline-flex"
                      @click.prevent="uploadMethod('link')"
                    >
                      <span class="material-icons"> link </span>
                    </a>
                  </div>
                </div>
                <!-- 本地上傳 -->
                <div v-if="uploadState.mainImg.cloud">
                  <img
                    class="modalImg d-inline-block bg-dark py-3"
                    :src="tempProduct.imageUrl"
                    v-if="tempProduct.imageUrl"
                  />
                  <label
                    for="file"
                    class="form-label btn btn-primary w-100 mb-3"
                  >
                    <Spinner v-if="innerSpinner === 'mainImg'" />
                    UPLOAD</label
                  >
                  <input
                    type="file"
                    class="form-control d-none"
                    name="file-to-upload"
                    @change="upload($event.target)"
                    id="file"
                  />
                </div>
                <!-- 輸入網址 -->
                <div v-if="uploadState.mainImg.link">
                  <!-- tempProduct.imageUrl -->
                  <img
                    class="modalImg d-inline-block bg-dark py-3"
                    :src="tempProduct.imageUrl"
                    v-if="tempProduct.imageUrl"
                    onerror="this.src='https://i.imgur.com/xmiTQFW.png'"
                  />
                  <input
                    type="text"
                    class="form-control"
                    id="imageUrl"
                    placeholder="Please enter an image url"
                    v-model.trim="tempProduct.imageUrl"
                  />
                </div>
              </div>
              <p class="text-secondary mb-1">OTHER IMAGES</p>
              <div
                class="d-flex align-items-center justify-content-between mb-3"
              >
                <p class="fs-5 text-secondary opacity-70">ADD IMAGE：</p>
                <div>
                  <a
                    href="#"
                    class="icon-btn link d-inline-flex me-3"
                    @click.prevent="addImage(tempProduct, 'cloud')"
                  >
                    <span class="material-icons"> cloud_upload </span>
                  </a>
                  <a
                    href="#"
                    class="icon-btn link d-inline-flex"
                    @click.prevent="addImage(tempProduct, 'link')"
                  >
                    <span class="material-icons"> link </span>
                  </a>
                </div>
              </div>
              <div
                class="mb-5 mb-md-6"
                v-for="(item, index) in tempProduct.imagesUrl"
                :key="index"
              >
                <label :for="index" class="form-label w-100 mb-0">
                  <img
                    class="modalImg d-inline-block bg-dark py-3"
                    :src="item"
                    onerror="this.src='https://i.imgur.com/xmiTQFW.png'"
                  />
                </label>
                <div class="input-group">
                  <!-- 本地上傳 -->
                  <div class="flex-grow-1" v-if="uploadState.otherImgs.cloud">
                    <label
                      :for="index"
                      class="form-label btn btn-outline-secondary w-100 mb-0"
                    >
                      <Spinner v-if="innerSpinner === `otherImg ${index}`" />
                      UPLOAD</label
                    >
                    <input
                      type="file"
                      class="form-control d-none"
                      name="file-to-upload"
                      @change="upload($event.target, index)"
                      :id="index"
                    />
                  </div>
                  <!-- 輸入網址 -->
                  <input
                    type="text"
                    :id="index"
                    class="form-control"
                    placeholder="Please enter an image url"
                    v-if="uploadState.otherImgs.link"
                    v-model.trim="tempProduct.imagesUrl[index]"
                  />
                  <a
                    href="#"
                    class="link d-flex align-items-center border px-2"
                    @click.prevent="delImage(index)"
                  >
                    <span class="material-icons opacity-50"> delete </span>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="mb-5 mb-md-6">
                <label for="title" class="form-label text-secondary"
                  ><span class="text-primary">*</span>TITLE</label
                >
                <Field
                  type="text"
                  class="form-control"
                  id="title"
                  name="Title"
                  placeholder="Please enter a title"
                  :class="{ 'is-invalid': errors['Title'] }"
                  rules="required"
                  v-model.trim="tempProduct.title"
                />
                <error-message
                  name="Title"
                  class="invalid-feedback"
                ></error-message>
                <!-- <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="Please enter a title"
                  v-model="tempProduct.title"
                /> -->
              </div>
              <div class="row mb-5 mb-md-6">
                <div class="col-md-6 mb-5 mb-md-0">
                  <label for="category" class="form-label text-secondary"
                    ><span class="text-primary">*</span>CATEGORY</label
                  >
                  <!-- tempProduct.category 沒有值的狀態 -->
                  <select
                    v-if="!tempProduct.category"
                    class="form-select text-light"
                    id="category"
                    @input="categorySelect($event.target.value)"
                  >
                    <option
                      class="text-secondary"
                      value="Please select a category"
                      selected
                      disabled
                      hidden
                    >
                      Please select a category
                    </option>
                    <option :value="item" v-for="item in category" :key="item">
                      {{ item }}
                    </option>
                  </select>
                  <!-- tempProduct.category 有值的狀態 -->
                  <select
                    v-else
                    class="form-select text-light"
                    id="category"
                    v-model="tempProduct.category"
                  >
                    <option :value="item" v-for="item in category" :key="item">
                      {{ item }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="unit" class="form-label text-secondary"
                    ><span class="text-primary">*</span>UNIT</label
                  >
                  <Field
                    type="text"
                    class="form-control"
                    id="unit"
                    name="Unit"
                    placeholder="Please enter an unit"
                    :class="{ 'is-invalid': errors['Unit'] }"
                    rules="required"
                    v-model.trim="tempProduct.unit"
                  />
                  <error-message
                    name="Unit"
                    class="invalid-feedback"
                  ></error-message>
                </div>
              </div>
              <div class="row mb-5 mb-md-6">
                <div class="col-md-6 mb-5 mb-md-0">
                  <label for="originPrice" class="form-label text-secondary"
                    ><span class="text-primary">*</span>ORIGIN PRICE</label
                  >
                  <Field
                    type="number"
                    class="form-control"
                    id="originPrice"
                    name="Origin price"
                    placeholder="Please enter an origin price"
                    :class="{ 'is-invalid': errors['Origin price'] }"
                    rules="required"
                    v-model.number="tempProduct.origin_price"
                  />
                  <error-message
                    name="Origin price"
                    class="invalid-feedback"
                  ></error-message>
                </div>
                <div class="col-md-6">
                  <label for="price" class="form-label text-secondary"
                    ><span class="text-primary">*</span>PRICE</label
                  >
                  <Field
                    type="number"
                    class="form-control"
                    id="price"
                    name="Price"
                    placeholder="Please enter a price"
                    :class="{ 'is-invalid': errors['Price'] }"
                    rules="required"
                    v-model.number="tempProduct.price"
                  />
                  <error-message
                    name="Price"
                    class="invalid-feedback"
                  ></error-message>
                </div>
              </div>
              <div class="row mb-5 mb-md-6">
                <div class="col-md-6 mb-5 mb-md-0">
                  <label for="year" class="form-label text-secondary"
                    >YEAR</label
                  >
                  <Field
                    type="text"
                    class="form-control"
                    id="year"
                    name="Year"
                    placeholder="Please enter a year"
                    :class="{ 'is-invalid': errors['Year'] }"
                    rules="required"
                    v-model.trim="tempProduct.year"
                  />
                  <error-message
                    name="Year"
                    class="invalid-feedback"
                  ></error-message>
                </div>
                <div class="col-md-6">
                  <label for="country" class="form-label text-secondary"
                    >COUNTRY</label
                  >
                  <Field
                    type="text"
                    class="form-control"
                    id="country"
                    name="Country"
                    placeholder="Please enter a country"
                    :class="{ 'is-invalid': errors['Country'] }"
                    rules="required"
                    v-model.trim="tempProduct.country"
                  />
                  <error-message
                    name="Country"
                    class="invalid-feedback"
                  ></error-message>
                </div>
              </div>
              <div class="row mb-5 mb-md-6">
                <div class="col-md-6 mb-5 mb-md-0">
                  <label for="type" class="form-label text-secondary"
                    >TYPE</label
                  >
                  <Field
                    type="text"
                    class="form-control"
                    id="type"
                    name="Type"
                    placeholder="Please enter a type"
                    :class="{ 'is-invalid': errors['Type'] }"
                    rules="required"
                    v-model.trim="tempProduct.type"
                  />
                  <error-message
                    name="Type"
                    class="invalid-feedback"
                  ></error-message>
                </div>
                <div class="col-md-6">
                  <label for="size" class="form-label text-secondary"
                    >SIZE</label
                  >
                  <Field
                    type="text"
                    class="form-control"
                    id="size"
                    name="Size"
                    placeholder="Please enter a size"
                    :class="{ 'is-invalid': errors['Size'] }"
                    rules="required"
                    v-model.trim="tempProduct.size"
                  />
                  <error-message
                    name="Size"
                    class="invalid-feedback"
                  ></error-message>
                </div>
              </div>
              <div class="mb-5 mb-md-6">
                <label for="description" class="form-label text-secondary"
                  >DESCRIPTION</label
                >
                <textarea
                  class="form-control"
                  id="description"
                  placeholder="Please enter a description"
                  v-model.trim="tempProduct.description"
                ></textarea>
              </div>
              <div class="mb-5 mb-md-6">
                <label for="content" class="form-label text-secondary"
                  >CONTENT</label
                >
                <textarea
                  class="form-control"
                  id="content"
                  placeholder="Please enter a content"
                  v-model.trim="tempProduct.content"
                ></textarea>
              </div>
              <div class="row mb-5 mb-md-6">
                <div class="col-md-6 mb-3 mb-md-0">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_onSale"
                      :true-value="1"
                      :false-value="0"
                      v-model="tempProduct.is_onSale"
                    />
                    <label class="form-check-label" for="is_onSale">
                      IS ON SALE
                    </label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inStock"
                      :true-value="1"
                      :false-value="0"
                      v-model="tempProduct.inStock"
                    />
                    <label class="form-check-label" for="inStock">
                      IN STOCK
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-sm btn-secondary text-white"
            data-bs-dismiss="modal"
            @click="recoveryState"
          >
            CANCLE
          </button>
          <button
            type="button"
            class="btn btn-sm btn-primary d-flex align-items-center"
            @click="$emit('updateProduct', tempProduct, modalTitle)"
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
    productData: {
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
      tempProduct: {},
      category: ['Animation', 'Drama', 'Fantasy', 'Comedy', 'Horror'],
      innerSpinner: false,
      uploadState: {
        mainImg: {
          cloud: false,
          link: false,
        },
        otherImgs: {
          cloud: false,
          link: false,
        },
      },
    };
  },
  watch: {
    productData() {
      this.tempProduct = { ...this.productData };
      // 驗證、加上自訂的資料欄位
      if (this.tempProduct.imageUrl) {
        this.uploadState.mainImg.cloud = true;
      }
      if (this.tempProduct.imagesUrl) {
        // imagesUrl 有資料時顯示本地上傳狀態
        this.uploadState.otherImgs.cloud = true;
      }
    },
  },
  methods: {
    recoveryState() {
      // 恢復狀態
      this.uploadState.mainImg.cloud = false;
      this.uploadState.mainImg.link = false;
      this.uploadState.otherImgs.cloud = false;
      this.uploadState.otherImgs.link = false;
    },
    uploadMethod(state) {
      if (state === 'cloud') {
        this.uploadState.mainImg.cloud = true;
        this.uploadState.mainImg.link = false;
      } else {
        this.uploadState.mainImg.cloud = false;
        this.uploadState.mainImg.link = true;
      }
    },
    upload(target, index) {
      const file = target.files[0];
      // 使用傳統表單格式
      const formData = new FormData();
      // 將檔案內容加到 formData 內
      formData.append('file-to-upload', file);
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      if (index === undefined) {
        this.innerSpinner = 'mainImg';
      } else {
        this.innerSpinner = `otherImg ${index}`;
      }
      this.$http.post(url, formData)
        .then((res) => {
          if (res.data.success) {
            if (index === undefined) {
              // 主要圖片
              this.tempProduct.imageUrl = res.data.imageUrl;
            } else {
              // 其他圖片
              this.tempProduct.imagesUrl[index] = res.data.imageUrl;
            }
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Upload');
          }
          this.innerSpinner = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    categorySelect(value) {
      this.tempProduct.category = value;
    },
    addImage(item, state) {
      // 切換上傳方式
      if (state === 'cloud') {
        this.uploadState.otherImgs.cloud = true;
        this.uploadState.otherImgs.link = false;
      } else {
        this.uploadState.otherImgs.cloud = false;
        this.uploadState.otherImgs.link = true;
      }
      // product 內沒有 imagesUrl 則給予空陣列
      if (!item.imagesUrl) {
        this.tempProduct.imagesUrl = [];
      }
      // imagesUrl 陣列最後一筆資料非空字串時執行
      if (item.imagesUrl[item.imagesUrl.length - 1] !== '') {
        this.tempProduct.imagesUrl.push('');
      }
    },
    delImage(index) {
      // 刪除 imagesUrl 陣列最後一筆資料
      this.tempProduct.imagesUrl.splice(index, 1);
    },
  },
  components: {
    Spinner,
  },
};
</script>
