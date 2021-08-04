<template>
  <section class="container pb-9 pt-3">
    <div class="row justify-content-center">
      <div class="col-xl-9">
        <h2 class="title mb-6">WISHLIST</h2>
        <!-- empty state -->
        <div
          class="
            emptyBlock
            d-flex
            flex-column
            justify-content-center
            align-items-center
          "
          v-if="productsData.length === 0"
        >
          <span
            class="
              material-icons
              display-1
              text-secondary
              opacity-30
              lh-xs
              mb-3
            "
          >
            favorite
          </span>
          <h3 class="text-secondary fs-2 mb-6">
            Your wishlist is currently empty.
          </h3>
          <router-link to="/products" class="btn btn-primary">
            CONTINUE TO SHOP
          </router-link>
        </div>
        <!-- full state -->
        <div class="pt-2" v-else>
          <ul class="row row-cols-md-6 border-top border-bottom py-4 mx-0">
            <li class="col fw-bold d-none d-md-block text-center">ITEM</li>
            <li class="col fw-bold d-none d-md-block text-center">NAME</li>
            <li class="col fw-bold d-none d-md-block text-center">PRICE</li>
            <li class="col fw-bold d-none d-md-block text-center">STATE</li>
            <li class="col fw-bold d-none d-md-block text-center">ACTION</li>
            <li class="col fw-bold text-center w-100 d-md-none">PRODUCT</li>
          </ul>
          <ul
            class="
              row row-cols-2 row-cols-md-6
              align-items-center
              border-bottom
              py-5
              mx-0
            "
            v-for="(item, index) in productsData"
            :key="item.id"
          >
            <li class="col mb-2 mb-md-0 px-5 px-md-0">
              <router-link :to="`/product/${item.id}`" class="product">
                <div class="overflow-hidden position-relative">
                  <img
                    class="product__img"
                    data-cursor="cursor"
                    :src="item.imageUrl"
                  />
                  <div class="mask-fill" data-cursor="cursor"></div>
                </div>
              </router-link>
            </li>
            <li class="col mb-1 mb-md-0">
              <div class="mb-1 mb-md-0">{{ item.title }}</div>
              <div class="d-md-none mb-1">
                NT$ {{ $filters.thousands(item.price) }}
              </div>
              <div class="d-md-none">
                <p class="text-primary" v-if="item.inStock">IN STOCK</p>
                <p class="text-light disabled" v-else>OUT OF STOCK</p>
              </div>
              <div class="d-md-none mb-1">
                <a
                  href="#"
                  class="link-primary d-inline-block opacity-70"
                  @click.prevent="delFavorite(favoritesData, index)"
                >
                  <Spinner
                    class="spinner lh-base my-2"
                    v-if="isSpinner === index"
                  />
                  <span class="material-icons" v-else>delete</span>
                </a>
              </div>
              <div class="d-md-none">
                <button
                  type="button"
                  class="
                    btn btn-sm btn-primary
                    d-flex
                    align-items-center
                    justify-content-center
                    w-100 w-sm-auto
                    fs-6
                    py-1
                    me-1
                  "
                  @click="addCart(item.id)"
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
            </li>
            <li class="col text-center d-none d-md-block">
              NT$ {{ $filters.thousands(item.price) }}
            </li>
            <li class="col d-none d-md-block mb-3 mb-md-0">
              <p class="text-primary" v-if="item.inStock">IN STOCK</p>
              <p class="text-light disabled" v-else>OUT OF STOCK</p>
            </li>
            <li class="col d-none d-md-flex align-items-center">
              <button
                type="button"
                class="
                  btn btn-sm btn-primary
                  d-flex
                  align-items-center
                  justify-content-center
                  w-100 w-sm-auto
                  text-nowrap
                  fs-6
                  py-1
                  me-1
                "
                :class="{ disabled: !item.inStock }"
                @click="addCart(item.id)"
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
            </li>
            <li class="col text-md-end text-lg-center d-none d-md-block">
              <a
                href="#"
                class="link-primary opacity-70"
                @click.prevent="delFavorite(item.id, index)"
              >
                <Spinner
                  class="spinner lh-base my-2"
                  v-if="isSpinner === index"
                />
                <span class="material-icons" v-else
                  data-cursor="cursor">delete</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import emitter from '@/methods/mitt';
import Spinner from '@/components/Spinner.vue';

export default {
  data() {
    return {
      tempFavoritesData: [],
      productsData: [],
      isSpinner: false,
      // inStock: '',
    };
  },
  inject: ['emitter', '$alertState'],
  emits: ['sidebarShow', 'delFavorite', 'getCartsData'],
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
  watch: {
    favoritesData() {
      this.tempFavoritesData = this.favoritesData;
    },
    cartsData() {
      this.cartsData.carts.forEach((value) => {
        this.productsData.forEach((item) => {
        // 購物車有此商品則庫存數以購物車為主
          if (value.product_id === item.id) {
            item.inStock = value.product.inStock - value.qty;
          }
        });
      });
    },
  },
  methods: {
    getProducts() {
      // 取得收藏項目
      this.tempFavoritesData = this.favoritesData;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            const resData = res.data.products;
            this.productsData = resData.filter((item) => this.tempFavoritesData.includes(item.id));
            const cart = this.cartsData.carts;
            cart.forEach((value) => {
              this.productsData.forEach((item) => {
                // 購物車有此商品則庫存數以購物車為主
                if (value.product_id === item.id) {
                  item.inStock = value.product.inStock - value.qty;
                }
              });
            });
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Get products');
          }
          // 隱藏 spinner
          this.isSpinner = false;
          // 隱藏 loading
          emitter.emit('isLoading', (this.isLoading = false));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addCart(id, qty = 1) {
      // this.inStock -= qty;
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
    },
    delFavorite(id, index) {
      this.isSpinner = index;
      this.$emit('delFavorite', id);
      this.getProducts();
    },
  },
  mounted() {
    this.getProducts();
    // 顯示 loading
    emitter.emit('isLoading', (this.isLoading = true));
    // Firefox Material-icons 置中
    emitter.emit('firefoxIcon');
  },
  components: {
    Spinner,
  },
};
</script>

<style scope>
.spinner {
  width: 14px;
  height: 14px;
}
</style>
