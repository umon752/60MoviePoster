<template>
  <section class="container pb-9 pt-3">
    <nav aria-label="breadcrumb" class="border-bottom mb-5">
        <ol class="breadcrumb mb-3">
          <li class="breadcrumb-item">
            <router-link to="/" class="link-primary">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/products" class="link-primary d-inline"
            @click="filterCategory('All')"
              >Posters</router-link
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ categoryActive ? categoryActive : 'All' }}
          </li>
        </ol>
      </nav>
    <div class="row">
      <div class="col d-md-none">
        <div class="input-group input-group-sm mb-3">
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Search..."
            @change="searchProduct"
          />
          <button class="btn border link py-1" type="button">
            <span class="material-icons"> search </span>
          </button>
        </div>
      </div>
      <ul class="col-md-2 d-none d-md-block">
        <li class="mb-4" v-for="item in category" :key="item">
          <a
            href="#"
            class="link-primary"
            :class="{ 'text-primary': categoryActive === item }"
            @click.prevent="filterCategory(item)"
            >{{ item }}</a
          >
        </li>
      </ul>
      <div class="col-md-10">
        <div class="w-100 d-flex justify-content-end align-items-center mb-5">
          <p class="text-secondary fs-5">Years：</p>
          <select
            class="
              form-select form-select-sm
              w-auto
              border-0
              bg-black-opacity-50
            "
            ref="select"
            data-cursor="cursor"
            @change="filterYear($event)"
          >
            <option :value="item" v-for="item in year" :key="item">
              {{ item }}
            </option>
          </select>
        </div>
        <ul class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          <li class="mb-7" v-for="(item, index) in productsData" :key="item.id">
            <router-link
              :to="`/product/${item.id}`"
              class="products d-block position-relative"
              :class="{ active: isSpinner === item.id }"
            >
              <div class="overflow-hidden position-relative mb-2">
                <img
                  :src="item.imageUrl"
                  class="products__img"
                  data-cursor="cursor"
                  :class="{ 'opacity-50': !item.inStock }"
                />
                <div
                  class="
                    mask-fill
                    d-flex
                    flex-column
                    justify-content-end
                    align-items-end
                  "
                  data-cursor="cursor"
                >
                  <a href="#"
                    class="
                      products__favoriteBtn
                      heart-fadeOut
                      material-icons
                      link
                      me-2 me-xl-3
                      mb-1 mb-xl-2
                    "
                    v-if="favoritesData.includes(item.id)"
                    @click.prevent="addFavorite(item, index)"
                  >
                    favorite
                  </a>
                  <a href="#"
                    class="
                      products__favoriteBtn
                      heart-fadeOut
                      material-icons
                      link
                      me-2 me-xl-3
                      mb-1 mb-xl-2
                    "
                    v-else
                    @click.prevent="addFavorite(item, index)"
                  >
                    favorite_border
                  </a>
                  <button
                    type="button"
                    class="
                      products__btn
                      btn btn-sm btn-primary
                      w-100
                      d-flex
                      align-items-center
                      justify-content-center
                      opacity-80
                      fs-6
                      py-1
                    "
                    @click.prevent="addCart(item.id)"
                    :class="{ disabled: !item.inStock }"
                  >
                    <Spinner
                      class="spinner lh-base my-2"
                      v-if="isSpinner === item.id"
                    />
                    <span class="material-icons fs-3 me-2" v-else>
                      shopping_cart
                    </span>
                    ADD TO CART
                  </button>
                </div>
              </div>
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
              <h2
                class="
                  fs-4
                  text-light
                  border-start border-primary border-2
                  text-truncate
                  ps-1 ps-lg-2
                "
                data-cursor="cursor"
              >
                {{ item.title }}
              </h2>
              <h3 class="fs-4" data-cursor="cursor">
                <del
                  class="opacity-50 text-light d-block d-sm-inline-block me-2"
                  data-cursor="cursor"
                  >NT$ {{ $filters.thousands(item.origin_price) }}</del
                >
                NT$ {{ $filters.thousands(item.price) }}
              </h3>
            </router-link>
          </li>
        </ul>
        <!-- pagination -->
        <div
          class="d-flex justify-content-end"
          v-if="pagination.total_pages > 1"
        >
          <Pagination :page="pagination" @getData="filterPage" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import emitter from '@/methods/mitt';
import Spinner from '@/components/Spinner.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      allProductsData: [],
      productsData: [],
      category: ['All'],
      categoryActive: 'All',
      year: ['Default'],
      pagination: {},
      isSpinner: false,
      inStock: '',
    };
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
  emits: ['sidebarShow', 'getCartsData', 'toggleHide', 'addFavorite'],
  computed: {
    productRoute() {
      return this.$route.query.category;
    },
  },
  watch: {
    productRoute(category) {
      this.filterCategory(category);
    },
  },
  methods: {
    getAllProducts() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.allProductsData = res.data.products;
            this.pagination.category = null;
            this.pagination.year = null;
            this.pagination.search = null;
            this.filterList();
            this.filterPage();
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Get products');
          }
          // 隱藏 loading
          emitter.emit('isLoading', this.isLoading = false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filterPage(currentPage = 1) {
      // 建立資料篩選的空陣列
      let tempProducts = [];
      // 進行篩選
      if (this.pagination.search !== null) {
        if (this.pagination.search !== null && this.pagination.year === null) {
          this.allProductsData.forEach((item) => {
            if (item.title.match(this.pagination.search)) {
              tempProducts.push(item);
            }
          });
        } else if (this.pagination.search !== null && this.pagination.year !== null) {
          this.allProductsData.forEach((item) => {
            if (item.title.match(this.pagination.search) && item.year.match(this.pagination.year)) {
              tempProducts.push(item);
            }
          });
        }
      } else if (this.pagination.category !== null) {
        if (this.pagination.year === null) {
          this.allProductsData.forEach((item) => {
            if (item.category === this.pagination.category) {
              tempProducts.push(item);
            }
          });
        } else if (this.pagination.year !== null) {
          this.allProductsData.forEach((item) => {
            if (item.category === this.pagination.category
            && item.year.match(this.pagination.year)) {
              tempProducts.push(item);
            }
          });
        }
      } else if (this.pagination.category === null) {
        if (this.pagination.year === null) {
          tempProducts = this.allProductsData;
        } else if (this.pagination.year !== null) {
          this.allProductsData.forEach((item) => {
            if (item.year.match(this.pagination.year)) {
              tempProducts.push(item);
            }
          });
        }
      }
      // 取得資料長度
      this.pagination.totalResult = tempProducts.length;
      // 設置每一頁資料數量
      this.pagination.per_page = 10;
      // 統計總頁數
      // 公式:總長度 / 每一頁數量，出現小數點使用 Math.ceil 無條件進位
      this.pagination.total_pages = Math.ceil(this.pagination.totalResult
            / this.pagination.per_page);
      // 當前頁數
      this.pagination.current_page = currentPage;
      // 當前頁數是不能超過總頁數
      if (this.pagination.current_page > this.pagination.total_pages) {
        this.pagination.current_page = this.pagination.total_pages;
      }
      // 判斷有無前後一頁
      if (this.pagination.current_page === 1) {
        this.pagination.has_pre = false;
        this.pagination.has_next = true;
      } else if (this.pagination.current_page > 1
      && this.pagination.current_page <= this.pagination.total_pages) {
        this.pagination.has_pre = true;
        this.pagination.has_next = false;
      }
      // 當前頁數，陣列中的最小值和最大值
      const minPage = (this.pagination.current_page
            * this.pagination.per_page) - this.pagination.per_page + 1;
      const maxPage = (this.pagination.current_page
            * this.pagination.per_page);
      // 將所有資料拉出來
      this.productsData = [];
      tempProducts.forEach((item, index) => {
        const num = index + 1;
        // 當 num 比 minPage 大並且比 maxPage 小的時候，就 push 資料進去
        if (num >= minPage && num <= maxPage) {
          this.productsData.push(item);
        }
      });
    },
    filterList() {
      // category
      const sortCategory = this.allProductsData.map((item) => item.category);
      sortCategory.forEach((item, index) => {
        if (sortCategory.indexOf(item) === index) {
          this.category.push(item);
        }
      });
      // year
      const sortYear = this.allProductsData.map((item) => item.year);
      // 將字串最後一個字元刪除
      const sliceYearArray = [];
      sortYear.forEach((item) => {
        const ary = item.substring(0, item.length - 1);
        sliceYearArray.push(ary);
      });
      // 將字串最後一個字加上 0
      const joinYearArray = [];
      sliceYearArray.forEach((item) => {
        const ary = `${item}0's`;
        joinYearArray.push(ary);
      });
      // 將重複的值過濾
      joinYearArray.forEach((item, index) => {
        if (joinYearArray.indexOf(item) === index) {
          this.year.push(item);
        }
      });
      // 排序 (從舊到新)
      this.year.sort((a, b) => a - b);
    },
    filterCategory(category) {
      if (category !== 'All' && category !== undefined) {
        this.pagination.category = category;
        this.pagination.year = null;
        this.pagination.search = null;
        this.$refs.select.value = 'Default';
        // 設定分類路由
        this.$router.push({ name: 'products', query: { category } });
      } else if (category === 'All' || category === undefined) {
        this.pagination.category = null;
        this.pagination.year = null;
        this.pagination.search = null;
        this.$refs.select.value = 'Default';
        // 全部商品的路由設定
        this.$router.push({ name: 'products' });
      }
      this.categoryActive = category;
      this.filterPage();
    },
    filterYear(e) {
      const { value } = e.target;
      // 篩選符合 value 的值
      if (value !== 'Default') {
        // 將 value 字串最後三個字元刪除
        const selectStr = value.substring(0, value.length - 3);
        this.pagination.year = selectStr;
      } else {
        this.pagination.year = null;
      }
      this.filterPage();
    },
    searchProduct(e) {
      this.pagination.search = e.target.value;
      this.pagination.category = null;
      this.pagination.year = null;
      this.$refs.select.value = 'Default';
      this.filterPage();
    },
    addCart(id, qty = 1) {
      // 當前商品庫存量
      this.cartsData.carts.forEach((item) => {
        if (item.product_id === id) {
          this.inStock = item.product.inStock - item.qty;
        }
      });
      // 購物車未超過庫存才可加入購物車
      if (this.inStock !== 0) {
        const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
        // 顯示 spinner
        this.isSpinner = id;
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
      } else {
        // 顯示訊息
        this.$alertState(false, 'Exceed the maximum inventory, add to cart');
      }
    },
    addFavorite(item) {
      this.$emit('addFavorite', item);
    },
  },
  mounted() {
    // 顯示 loading
    emitter.emit('isLoading', this.isLoading = true);
    // toggle panel 關閉
    this.$emit('toggleHide');
    // 取得產品資料
    this.getAllProducts();
    // 更新購物車資料
    this.$emit('getCartsData');
  },
  components: {
    Pagination,
    Spinner,
  },
};
</script>

<style scope>
  .spinner {
    width: 13px;
    height: 13px;
  }
</style>
