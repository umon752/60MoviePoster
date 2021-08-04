<template>
  <section class="container pb-9 pt-3">
    <div class="row mb-8">
      <nav aria-label="breadcrumb" class="d-md-none">
        <ol class="breadcrumb mb-3">
          <li class="breadcrumb-item">
            <router-link to="/" class="link-primary">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/products" class="link-primary d-inline"
              >Posters</router-link
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ this.productData.category }}
          </li>
        </ol>
      </nav>
      <div class="col-md-5 col-lg-6 d-flex justify-content-center mb-2 mb-md-0">
        <div class="w-70 w-md-auto px-lg-8 px-xl-9">
          <img :src="this.productData.imageUrl" />
        </div>
      </div>
      <div class="col-md-7 col-lg-6">
        <nav aria-label="breadcrumb" class="d-none d-md-block">
          <ol class="breadcrumb mb-2 mb-lg-3">
            <li class="breadcrumb-item">
              <a href="#" class="link-primary">Home</a>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/products" class="link-primary d-inline"
                >Posters</router-link
              >
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ this.productData.category }}
            </li>
          </ol>
        </nav>
        <h2 class="mb-2 mb-lg-3">{{ this.productData.title }}</h2>
        <div class="badge bg-primary mb-3" v-if="this.productData.is_onSale">
          SALE
        </div>
        <div class="d-flex justify-content-between border-bottom pb-lg-2 mb-3">
          <h4 class="fs-3 text-primary fw-bold">
            NT$ {{ $filters.thousands(this.productData.origin_price) }}
            <del class="opacity-50 text-light fw-normal ms-3">
              NT$ {{ $filters.thousands(this.productData.price) }}</del
            >
          </h4>
          <a
            href="#"
            class="material-icons heart-fadeOut link-primary opacity-70"
            @click.prevent="addFavorite(this.productData)"
            v-if="favoritesData.includes(this.productData.id)"
          >
            favorite
          </a>
          <a
            href="#"
            class="material-icons heart-fadeOut link-primary opacity-70"
            @click.prevent="addFavorite(this.productData)"
            v-else
          >
            favorite_border
          </a>
        </div>
        <ul class="border-bottom mb-4 mb-lg-5">
          <li class="mb-2">
            <span class="opacity-50 d-inline-block w-auto w-md-25">YEAR：</span>
            {{ this.productData.year }}
          </li>
          <li class="mb-2">
            <span class="opacity-50 d-inline-block w-auto w-md-25"
              >COUNTRY：</span
            >
            {{ this.productData.country }}
          </li>
          <li class="mb-2">
            <span class="opacity-50 d-inline-block w-auto w-md-25">TYPE：</span>
            {{ this.productData.type }}
          </li>
          <li class="mb-3">
            <span class="opacity-50 d-inline-block w-auto w-md-25">SIZE：</span>
            {{ this.productData.size }}
          </li>
        </ul>
        <div class="input-group input-group-sm w-lg-50 pe-lg-2 mb-4">
          <button
            class="btn border link opacity-80"
            type="button"
            @click="removeQty"
            :class="{ disabled: this.qty <= 1 }"
          >
            <span
              class="material-icons"
              data-cursor="cursor"
              :class="{ 'opacity-50': this.qty <= 1 }"
            >
              remove
            </span>
          </button>
          <input
            type="number"
            class="form-control text-center"
            v-model.number="qty"
            :class="[{ 'pointer-none': !this.inStock }, { 'text-secondary': !this.inStock }]"
          />
          <button
            class="btn border link opacity-80"
            type="button"
            @click="addQty"
            :class="{ disabled: this.qty >= this.inStock }"
          >
            <span
              class="material-icons"
              data-cursor="cursor"
              :class="{ 'opacity-50': this.qty >= this.inStock }"
            >
              add
            </span>
          </button>
        </div>
        <div class="d-flex justify-content-between">
          <router-link
            to="/cart"
            class="
              btn btn-sm btn-outline-secondary
              d-flex
              justify-content-center
              align-items-center
              fs-5
              w-100
              me-3
            "
          >
            VIEW CART
          </router-link>
          <button
            type="button"
            class="
              btn btn-sm btn-primary
              d-flex
              align-items-center
              justify-content-center
              fs-5
              w-100
            "
            :class="{ disabled: !this.inStock }"
            @click="addCart(this.productData.id, this.qty)"
          >
            <Spinner class="spinner my-2" v-if="isSpinner" />
            <span class="material-icons me-2" v-else data-cursor="cursor">
              shopping_cart
            </span>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
    <div class="row mb-7">
      <div class="col">
        <ul class="nav nav-tabs py-0" id="myTab" role="tablist">
          <li class="nav-item w-50 w-md-auto" role="presentation">
            <button
              class="nav-link link w-100 active py-3"
              id="introduction-tab"
              data-bs-toggle="tab"
              data-bs-target="#introduction"
              type="button"
              role="tab"
              aria-controls="introduction"
              aria-selected="true"
              data-cursor="cursor"
            >
              INTRODUCTION
            </button>
          </li>
          <li class="nav-item w-50 w-md-auto" role="presentation">
            <button
              class="nav-link link w-100 py-3"
              id="shopping_guide-tab"
              data-bs-toggle="tab"
              data-bs-target="#shopping_guide"
              type="button"
              role="tab"
              aria-controls="shopping_guide"
              aria-selected="false"
              data-cursor="cursor"
            >
              SHOPPING GUIDE
            </button>
          </li>
        </ul>
        <div
          class="tab-content bg-black-opacity-50 p-5 p-lg-7"
          id="myTabContent"
        >
          <div
            class="tab-pane fade show text-secondary active"
            id="introduction"
            role="tabpanel"
            aria-labelledby="introduction-tab"
          >
            {{ this.productData.description }}
          </div>
          <div
            class="tab-pane fade text-secondary"
            id="shopping_guide"
            role="tabpanel"
            aria-labelledby="shopping_guide-tab"
            v-html="this.productData.content"
          ></div>
        </div>
      </div>
    </div>
    <!-- related products -->
    <section class="relatedProducts">
      <h3 class="dividerTitle text-center fs-2 opacity-50 fw-bold mb-5 mb-lg-7">
        RELATED PRODUCTS
      </h3>
      <swiper
        :loop="false"
        :loopFillGroupWithBlank="false"
        :navigation="true"
        :breakpoints="{
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 30,
          },
        }"
        class="mySwiper mb-7 px-5 py-2"
      >
        <swiper-slide
          v-for="item in relatedProductsData"
          :key="item.id"
          class="relatedProducts__item"
          data-cursor="cursor"
        >
          <router-link :to="`/product/${item.id}`">
            <img
              :src="item.imageUrl"
              class="relatedProducts__item__img mb-2"
              :class="{ 'opacity-50': !item.inStock }"
              data-cursor="cursor"
            />
            <div
                v-if="item.is_onSale"
                class="
                  position-absolute
                  top-negative-5
                  end-negative-5
                  badge
                  bg-primary
                "
              >
                SALE
              </div>
              <div
                v-if="!item.inStock"
                class="
                  position-absolute
                  top-negative-5
                  end-negative-5
                  badge
                  bg-secondary
                "
              >
                SOLD OUT
              </div>
            <h5
              class="
                fs-4
                border-start border-primary border-2
                text-truncate text-light
                ps-2
              "
              data-cursor="cursor"
            >
              {{ item.title }}
            </h5>
          </router-link>
        </swiper-slide>
      </swiper>
    </section>
    <div class="d-flex justify-content-center">
      <router-link to="/products" class="btn btn-outline-secondary">
        MORE POSTERS
      </router-link>
    </div>
  </section>
</template>

<script>
import Tab from 'bootstrap/js/dist/tab';
import emitter from '@/methods/mitt';
import Spinner from '@/components/Spinner.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

SwiperCore.use([Pagination, Navigation]);

export default {
  data() {
    return {
      tab: '',
      productData: [],
      allProductsData: [],
      relatedProductsData: [],
      isSpinner: false,
      qty: 1,
      inStock: '',
    };
  },
  computed: {
    productRouteId() {
      return this.$route.params.id;
    },
  },
  watch: {
    qty() {
      if (this.qty <= 1) {
        this.qty = 1;
      }
      if (this.qty > this.inStock && this.inStock !== 0) {
        this.qty = this.inStock;
        // 顯示訊息
        this.$alertState(false, 'Exceed the maximum inventory, enter');
      }
    },
    productRouteId(value) {
      this.getProduct(value);
      // 更新購物車資料
      this.$emit('getCartsData');
    },
    cartsData() {
      this.cartsData.carts.forEach((item) => {
        // 購物車有此商品則庫存數以購物車為主
        if (item.product_id === this.productRouteId) {
          this.inStock = item.product.inStock - item.qty;
        }
      });
    },
  },
  props: {
    favoritesData: {
      type: Array,
      default() {
        return [];
      },
    },
    cartsData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  inject: ['emitter', '$alertState'],
  emits: ['sidebarShow', 'sidebarHide', 'getCartsData', 'addFavorite'],
  methods: {
    getProduct(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      // 顯示 loading
      emitter.emit('isLoading', (this.isLoading = true));
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.productData = res.data.product;
            // 關閉 cart
            this.$emit('sidebarHide');
            this.getAllProducts();
            // 商品沒有在購物車內，庫存量以商品資料為主
            const cart = this.cartsData.carts;
            const isInclude = cart.every((item) => item.product_id !== this.productRouteId);
            if (isInclude) {
              this.inStock = this.productData.inStock;
            }
          }
          // 隱藏 loading
          emitter.emit('isLoading', (this.isLoading = false));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllProducts() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.allProductsData = res.data.products;
            this.getRelatedProducts();
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Get products');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRelatedProducts() {
      // 清空陣列
      this.relatedProductsData = [];
      const { category } = this.productData;
      const { id } = this.productData;
      const { year } = this.productData;

      // 以「類別」篩選
      // 篩選同類別並排除當前商品
      const filterCategories = this.allProductsData.filter(
        (item) => item.category === category && item.id !== id,
      );

      // 設定最多 8 個商品
      const maxSize = filterCategories.length < 8 ? filterCategories.length : 8;
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      const arrSet = new Set([]); // 新增一個類陣列

      getRandomInt(); // 取得隨機數函式

      // 得到 maxSize 個值就會停止
      for (let index = 0; arrSet.size < maxSize; index + 1) {
        const num = getRandomInt(filterCategories.length); // 取得隨機數並設定最大值
        arrSet.add(num); // 取得隨機數存進陣列中
      }

      // 將取得的隨機數字帶入
      arrSet.forEach((i) => {
        this.relatedProductsData.push(filterCategories[i]);
      });

      // 以「年份」篩選
      if (maxSize < 8) {
        // 排除已篩選過的商品
        const FilteredCategories = [];
        this.relatedProductsData.forEach((item) => {
          FilteredCategories.push(item.id);
        });
        // 篩選相同年份並排除當前商品
        const filterYears = this.allProductsData.filter(
          (item) => item.year.match(year.substring(0, year.length - 1)) && item.id !== id,
        );
        // 篩除已篩選過的商品
        filterYears.forEach((value, index) => {
          FilteredCategories.forEach((item) => {
            if (value.id === item) {
              filterYears.splice(index, 1);
            }
          });
        });

        // 剩餘陣列額度 (最多 8 個商品)
        const lastSize = filterYears.length < 8 - maxSize ? filterYears.length : 8 - maxSize;

        const yearArrSet = new Set([]); // 新增一個類陣列

        getRandomInt(); // 取得隨機數函式

        // 得到 lastSize 個值就會停止
        for (let index = 0; yearArrSet.size < lastSize; index + 1) {
          const num = getRandomInt(filterYears.length); // 取得隨機數並設定最大值
          yearArrSet.add(num); // 取得隨機數存進陣列中
        }

        // 將取得的隨機數字帶入
        yearArrSet.forEach((i) => {
          this.relatedProductsData.push(filterYears[i]);
        });
      }
    },
    addCart(id, qty = 1) {
      this.inStock -= qty;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      // 顯示 spinner
      this.isSpinner = true;
      const product = {
        data: {
          product_id: id,
          qty,
        },
      };
      this.$http
        .post(url, product)
        .then((res) => {
          if (res.data.success) {
            // 更新 qty
            this.qty = 1;
            // 打開 cart
            this.$emit('sidebarShow');
            // 更新購物車資料
            this.$emit('getCartsData');
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Add to cart');
          }
          // 隱藏 spinner
          this.isSpinner = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addQty() {
      if (this.qty < this.inStock) {
        this.qty += 1;
      }
    },
    removeQty() {
      if (this.qty > 1) {
        this.qty -= 1;
      }
    },
    addFavorite(item) {
      this.$emit('addFavorite', item);
    },
  },
  mounted() {
    this.getProduct(this.productRouteId);
    // Firefox Material-icons 置中
    emitter.emit('firefoxIcon');
    // tab 初始化
    const triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'));
    triggerTabList.forEach((item) => {
      const tabTrigger = new Tab(item);
      item.addEventListener('click', (e) => {
        e.preventDefault();
        tabTrigger.show();
      });
    });
    // 更新購物車資料
    this.$emit('getCartsData');
  },
  components: {
    Spinner,
    Swiper,
    SwiperSlide,
  },
};
</script>

<style scope>
  .spinner {
    width: 20px;
    height: 20px;
  }
</style>
