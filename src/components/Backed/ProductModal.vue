<template>
  <div
    ref="modal"
    class="modal fade"
    id="staticBackdrop"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-dialog-centered modal-lg modal-fullscreen-lg-down
      "
    >
      <div class="modal-content">
        <div class="modal-header flex-wrap">
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
          <ul
            class="
              nav nav-tabs
              justify-content-between justify-content-md-start
              w-100
              mt-4
              py-0
            "
            id="myTab"
            role="tablist"
          >
            <li
              class="nav-item flex-fill-stretch me-2 me-md-4"
              role="presentation"
            >
              <button
                class="
                  nav-link
                  link
                  bg-secondary-dark
                  d-flex
                  align-items-center
                  justify-content-center
                  fs-5 fs-md-4
                  w-100 w-md-auto
                  py-md-3
                  active
                "
                id="content-tab"
                data-bs-toggle="tab"
                data-bs-target="#content"
                type="button"
                role="tab"
                aria-controls="content"
                aria-selected="true"
                data-cursor="cursor"
              >
                <span class="material-icons fs-5 fs-md-4 me-2"> edit </span>
                CONTENT
              </button>
            </li>
            <li
              class="nav-item flex-fill-stretch ms-2 me-md-4"
              role="presentation"
            >
              <button
                class="
                  nav-link
                  link
                  bg-secondary-dark
                  d-flex
                  align-items-center
                  justify-content-center
                  fs-5 fs-md-4
                  w-100 w-md-auto
                  py-md-3
                "
                id="image-tab"
                data-bs-toggle="tab"
                data-bs-target="#image"
                type="button"
                role="tab"
                aria-controls="image"
                aria-selected="false"
                data-cursor="cursor"
              >
                <span class="material-icons fs-5 fs-md-4 me-2"> image </span>
                IMAGE
              </button>
            </li>
          </ul>
        </div>
        <div class="modal-body">
          <div class="tab-content bg-black-opacity-50" id="myTabContent">
            <div
              class="tab-pane fade show text-secondary active"
              id="content"
              role="tabpanel"
              aria-labelledby="content-tab"
            >
              <Form v-slot="{ errors }" class="row" ref="form">
                <div class="col">
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
                        <option
                          :value="item"
                          v-for="item in category"
                          :key="item"
                        >
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
                        <option
                          :value="item"
                          v-for="item in category"
                          :key="item"
                        >
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
                        type="number"
                        class="form-control"
                        id="year"
                        name="Year"
                        placeholder="Please enter a year"
                        :class="{ 'is-invalid': errors['Year'] }"
                        rules="required"
                        v-model.number="tempProduct.year"
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
                  <div class="row align-items-centermb-5 mb-md-6">
                    <div class="col-md-6 mb-5">
                      <label class="form-label text-secondary" for="inStock">
                        IN STOCK
                      </label>
                      <Field
                        type="number"
                        class="form-control"
                        id="inStock"
                        name="In stock"
                        placeholder="Please enter the quantity"
                        :class="{ 'is-invalid': errors['In stock'] }"
                        rules="required"
                        v-model.number="tempProduct.inStock"
                      />
                      <error-message
                        name="In stock"
                        class="invalid-feedback"
                      ></error-message>
                    </div>
                    <div class="col-12">
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
                  </div>
                </div>
              </Form>
            </div>
            <div
              class="tab-pane fade text-secondary"
              id="image"
              role="tabpanel"
              aria-labelledby="image-tab"
            >
              <div class="col mb-6">
                <div
                  class="d-flex justify-content-between align-items-center mb-4"
                >
                  <p class="text-secondary me-3">IMAGES</p>
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <p class="fs-5 text-secondary opacity-70 me-2">METHOD</p>
                    <div>
                      <a
                        href="#"
                        class="icon-btn link d-inline-flex me-3"
                        @click.prevent="changeImgMethod('cloud')"
                      >
                        <span class="material-icons"> cloud_upload </span>
                      </a>
                      <a
                        href="#"
                        class="icon-btn link d-inline-flex"
                        @click.prevent="changeImgMethod('link')"
                      >
                        <span class="material-icons"> link </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="row align-items-center">
                  <!-- main image -->
                  <div
                    class="productModal col-sm-6 col-md-4 col-lg-3 mb-5 mb-md-6"
                  >
                    <label
                      for="mainImg"
                      class="form-label position-relative w-100 mb-0"
                    >
                      <div
                        class="
                          mask-fill
                          cursor-pointer
                          d-flex
                          flex-column
                          justify-content-end
                          align-items-end
                        "
                      ></div>
                      <div
                        class="
                          position-absolute
                          top-negative-5
                          end-negative-5
                          badge
                          bg-secondary
                        "
                      >
                        MAIN
                      </div>
                      <img
                        class="productModal__img d-inline-block bg-dark py-3"
                        :src="tempProduct.imageUrl"
                        onerror="this.src='https://i.imgur.com/xmiTQFW.png'"
                      />
                    </label>
                    <div class="input-group">
                      <!-- 本地上傳 -->
                      <div class="flex-grow-1" v-if="uploadState.cloud">
                        <label
                          for="mainImg"
                          class="
                            form-label
                            btn btn-outline-secondary
                            w-100
                            mb-0
                          "
                        >
                          <Spinner v-if="innerSpinner === 'mainImg'" />
                          UPLOAD</label
                        >
                        <input
                          type="file"
                          class="form-control d-none"
                          name="file-to-upload"
                          @change="upload($event.target)"
                          id="mainImg"
                        />
                      </div>
                      <!-- 輸入網址 -->
                      <input
                        type="text"
                        :id="index"
                        class="form-control"
                        placeholder="Please enter an image url"
                        v-if="uploadState.link"
                        v-model.trim="tempProduct.imageUrl"
                      />
                      <a
                        href="#"
                        class="link d-flex align-items-center border px-2"
                        @click.prevent="delImage()"
                        :class="{ disabled: tempProduct.imageUrl === '' }"
                      >
                        <span class="material-icons opacity-50"> delete </span>
                      </a>
                    </div>
                  </div>
                  <!-- other images -->
                  <div
                    class="
                      productModal
                      col-sm-6 col-md-4 col-lg-3
                      overflow-hidden
                      position-relative
                      mb-5 mb-md-6
                    "
                    v-for="(item, index) in tempProduct.imagesUrl"
                    :key="index"
                  >
                    <label :for="index" class="form-label w-100 mb-0">
                      <div
                        class="
                          mask-fill
                          cursor-pointer
                          d-flex
                          flex-column
                          justify-content-end
                          align-items-end
                        "
                      ></div>
                      <img
                        class="productModal__img d-inline-block bg-dark py-3"
                        :src="item"
                        onerror="this.src='https://i.imgur.com/xmiTQFW.png'"
                      />
                    </label>
                    <div class="input-group">
                      <!-- 本地上傳 -->
                      <div class="flex-grow-1" v-if="uploadState.cloud">
                        <label
                          :for="index"
                          class="
                            form-label
                            btn btn-outline-secondary
                            w-100
                            mb-0
                          "
                        >
                          <Spinner
                            v-if="innerSpinner === `otherImg ${index}`"
                          />
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
                        v-if="uploadState.link"
                        v-model.trim="tempProduct.imagesUrl[index]"
                      />
                      <a
                        href="#"
                        class="link d-flex align-items-center border px-2"
                        @click.prevent="delImage(index)"
                        :class="{
                          disabled: tempProduct.imagesUrl[index] === '',
                        }"
                      >
                        <span class="material-icons opacity-50"> delete </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
import Tab from 'bootstrap/js/dist/tab';
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
      tab: '',
      tempProduct: {},
      category: ['Animation', 'Drama', 'Fantasy', 'Comedy', 'Horror'],
      innerSpinner: false,
      uploadState: {
        cloud: true,
        link: false,
      },
    };
  },
  watch: {
    productData() {
      this.tempProduct = { ...this.productData };
    },
  },
  methods: {
    recoveryState() {
      // 恢復狀態
      this.uploadState.cloud = true;
      this.uploadState.link = false;
    },
    uploadMethod(state) {
      if (state === 'cloud') {
        this.uploadState.cloud = true;
        this.uploadState.link = false;
      } else {
        this.uploadState.cloud = false;
        this.uploadState.link = true;
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
    changeImgMethod(state) {
      // 切換上傳方式
      if (state === 'cloud') {
        this.uploadState.cloud = true;
        this.uploadState.link = false;
      } else {
        this.uploadState.cloud = false;
        this.uploadState.link = true;
      }
    },
    delImage(index) {
      // 刪除 imagesUrl 陣列最後一筆資料
      this.tempProduct.imagesUrl[index] = '';
      if (index === undefined) {
        this.tempProduct.imageUrl = '';
      }
    },
  },
  mounted() {
    // tab 初始化
    const triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'));
    triggerTabList.forEach((item) => {
      const tabTrigger = new Tab(item);
      item.addEventListener('click', (e) => {
        e.preventDefault();
        tabTrigger.show();
      });
    });
  },
  components: {
    Spinner,
  },
};
</script>
