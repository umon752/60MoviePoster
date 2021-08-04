<template @sidebarShow="isShowSidebar">
  <div
    class="d-flex flex-column min-vh-100"
    :class="[{ 'overflow-hidden': isToggleHam }, { 'vh-100': isToggleHam }]"
    @mousemove="cursorTracker"
  >
    <div
      class="mask"
      :class="{ active: isShowSidebar }"
      @click="sidebarHide"
    ></div>
    <div class="flex-shrink-0">
      <!-- navbar -->
      <nav
        class="
          nav
          bg-dark
          d-flex
          justify-content-between
          align-items-center
          sticky-top
          px-4 px-xl-8
        "
        :class="{ active: isScroll }"
      >
        <!-- mobile -->
        <a
          href="#"
          class="hamToggle d-block d-md-none"
          @click.prevent="toggle"
          :class="{ active: isToggleHam }"
        ></a>
        <h1>
          <router-link to="/" class="logo">
            <div class="d-flex position-relative h-100 h-md-auto">
              <img
                class="logo__6"
                src="@/assets/images/logo/logo_6.svg"
                data-cursor="cursor"
              />
              <img
                class="logo__0"
                src="@/assets/images/logo/logo_0.svg"
                data-cursor="cursor"
              />
              <div class="logo__text" data-cursor="cursor">60 Movie Poster</div>
            </div>
          </router-link>
        </h1>
        <ul class="d-flex d-md-none align-items-center">
          <li class="position-relative me-2">
            <router-link to="/wishlist" class="link">
              <span class="material-icons"> favorite </span>
              <span class="point" v-if="favoritesLength !== 0">
                {{ favoritesLength }}</span>
            </router-link>
          </li>
          <li class="position-relative">
            <a href="#" class="link ps-4" @click.prevent="sidebarShow">
              <span class="material-icons"> shopping_cart </span>
              <span class="point" v-if="cartsLength !== 0">
                {{ cartsLength }}</span>
            </a>
          </li>
        </ul>
        <!-- toggle panel -->
        <ul
          class="
            nav__panel
            d-flex
            flex-column
            justify-content-center
            align-itens-center
            text-center
          "
          :class="{ active: isToggleHam }"
        >
          <li>
            <router-link to="/about" class="link fs-5 py-3">ABOUT</router-link>
          </li>
          <li>
            <router-link to="/products" class="link fs-5 py-3"
              >POSTERS</router-link
            >
          </li>
          <li>
            <router-link to="/contact" class="link fs-5 py-3"
              >CONTACT</router-link
            >
          </li>
          <li>
            <a href="#" class="link fs-5 py-3" @click.prevent="openLoginModal"
              >LOGIN</a
            >
          </li>
        </ul>

        <!-- pad、desktop -->
        <ul class="d-none d-md-flex">
          <li class="nav__divide">
            <router-link
              to="/about"
              active-class=""
              exact-active-class="disabled"
              class="link px-4"
              >ABOUT</router-link
            >
          </li>
          <li class="nav__divide">
            <router-link
              to="/products"
              active-class=""
              exact-active-class="disabled"
              class="link px-4"
              >POSTERS</router-link
            >
          </li>
          <li>
            <router-link
              to="/contact"
              active-class=""
              exact-active-class="disabled"
              class="link px-4"
              >CONTACT</router-link
            >
          </li>
        </ul>
        <ul class="d-none d-md-flex align-items-center">
          <li>
            <a href="#" class="link px-3" @click.prevent="openLoginModal">
              <span class="material-icons" data-cursor="cursor"> person </span>
            </a>
          </li>
          <li class="position-relative">
            <router-link to="/wishlist" class="link px-3">
              <span class="material-icons" data-cursor="cursor">
                favorite
              </span>
              <span class="point" v-if="favoritesLength !== 0">
                {{ favoritesLength }}</span>
            </router-link>
          </li>
          <li class="position-relative">
            <a href="#" class="link px-3" @click.prevent="sidebarShow">
              <span class="material-icons" data-cursor="cursor">
                shopping_cart
              </span>
              <span class="point" v-if="cartsLength !== 0">
                {{ cartsLength }}</span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- content -->
      <router-view
        @getCartsData="getCartsData"
        @delCartData="delCartData"
        :cartsData="cartsData"
        @updateCart="updateCart"
        @delAllCartData="delAllCartData"
        @sidebarHide="sidebarHide"
        @sidebarShow="sidebarShow"
        @sidebarBtn="sidebarBtn"
        @toggleHide="toggleHide"
        @addFavorite="addFavorite"
        :favoritesData="favoritesData"
        @delFavorite="delFavorite"
      />
    </div>

    <!-- footer -->
    <footer class="mt-auto">
      <div class="bg-black-opacity-50 border-bottom">
        <div class="container py-8">
          <div class="row">
            <div class="col-md-4 mb-6 mb-md-0">
              <h4 class="fs-2 opacity-50 border-bottom pb-2 mb-4">ABOUT</h4>
              <p class="opacity-70 fs-4">
                60 Movie Poster was founded in 1995, we are a movie posters
                shop. Let’s find what you love!
              </p>
            </div>
            <div class="col-md-4 mb-6 mb-md-0">
              <h4 class="fs-2 opacity-50 border-bottom pb-2 mb-4">HELP</h4>
              <ul>
                <li class="mb-2 mb-xl-4">
                  <router-link to="/faq" class="link opacity-70 lh-sm fs-4">
                    FAQ</router-link
                  >
                </li>
                <li class="mb-2 mb-xl-4">
                  <router-link
                    to="/shoppingGuide"
                    class="link opacity-70 lh-sm fs-4"
                    >Shopping Guide</router-link
                  >
                </li>
                <li>
                  <router-link to="/contact" class="link opacity-70 lh-sm fs-4">
                    Contact us</router-link
                  >
                </li>
              </ul>
            </div>
            <div class="col-md-4">
              <h4 class="fs-2 opacity-50 border-bottom pb-2 mb-4">FALLOW US</h4>
              <ul class="d-flex mb-4">
                <li class="me-4 me-md-5">
                  <a
                    href="https://www.google.com.tw/maps/place/3030+Queens+Chapel+Rd,+Hyattsville,+MD+20782%E7%BE%8E%E5%9C%8B/@38.9494906,-76.9705678,17z/data=!3m1!4b1!4m5!3m4!1s0x89b7c7a6230c0bd9:0x40d5f31e149b85!8m2!3d38.9494864!4d-76.9683791?hl=zh-TW"
                    target="_blank"
                    class="icon-btn link"
                  >
                    <span class="material-icons" data-cursor="cursor">
                      near_me
                    </span>
                  </a>
                </li>
                <li class="me-4 me-md-5">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    class="icon-btn link"
                  >
                    <span class="material-icons" data-cursor="cursor">
                      facebook
                    </span>
                  </a>
                </li>
                <li class="me-4 me-md-5">
                  <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    class="icon-btn link"
                  >
                    <span class="material-icons" data-cursor="cursor">
                      smart_display
                    </span>
                  </a>
                </li>
              </ul>
              <p class="text-secondary fs-5 opacity-80">練習作品非商業用途</p>
              <p class="text-secondary fs-5 opacity-80">
                資訊來源：Google、Wikipedia、Unsplash
              </p>
            </div>
          </div>
        </div>
      </div>
      <p class="text-center fs-5 py-5">
        © 2021 60 Movie Poster All Rights Reserved.
      </p>
    </footer>

    <!-- sidebar -->
    <section
      class="sidebar border-start p-6 p-sm-7"
      :class="{ active: isShowSidebar }"
    >
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="title">CART</h3>
        <button type="button" class="btn-close" @click="sidebarHide"></button>
      </div>
      <div class="text-center mt-7" v-if="cartsLength === 0">
        <span
          class="material-icons display-1 text-secondary opacity-30 lh-xs mb-3"
        >
          shopping_cart
        </span>
        <h3 class="text-secondary fs-4 fs-sm-2 mb-6">
          Your cart is currently empty.
        </h3>
      </div>
      <ul class="sidebar__inner my-4 my-sm-5" v-else>
        <li
          class="row align-items-center border-bottom py-3 py-sm-5"
          v-for="(item, index) in cartsData.carts"
          :key="item.id"
          :class="[
            { 'border-bottom-0': cartsLength - 1 === index },
            { 'pb-sm-0': cartsLength - 1 === index },
            { 'pb-0': cartsLength - 1 === index },
            { 'pt-sm-0': index === 0 },
            { 'pt-0': index === 0 },
          ]"
        >
          <router-link
            :to="`/product/${item.product.id}`"
            class="sidebar__product col-5"
          >
            <div class="overflow-hidden position-relative">
              <img
                class="sidebar__product__img"
                data-cursor="cursor"
                :src="item.product.imageUrl"
              />
              <div class="mask-fill" data-cursor="cursor"></div>
            </div>
          </router-link>
          <div class="col-7">
            <h4 class="mb-1 mb-md-4">{{ item.product.title }}</h4>
            <div class="d-flex align-items-center mb-1 mb-md-4">
              <a
                href="#"
                class="link-primary"
                :class="{ disabled: item.qty === 1 }"
                @click.prevent="removeQty(item.qty, item)"
              >
                <span class="material-icons"
                data-cursor="cursor"> remove </span>
              </a>
              <input
                type="number"
                class="form-control w-20 text-center border-0 px-2"
                @change="updateCart(item.qty, item, index)"
                v-model.number="item.qty"
              />
              <a
                href="#"
                class="link-primary"
                @click.prevent="addQty(item.qty, item)"
                :class="{ disabled: item.qty >= item.product.inStock }"
              >
                <span class="material-icons"
                :class="{ 'opacity-50': item.qty >= item.product.inStock }"
                data-cursor="cursor"> add </span>
              </a>
            </div>
            <p class="mb-1 mb-md-4">NT$ {{ $filters.thousands(item.total) }}</p>
            <a
              href="#"
              class="link-primary d-inline-block opacity-70"
              @click.prevent="delCartData(item.id)"
            >
              <Spinner v-if="isSpinner === item.id" />
              <span class="material-icons" v-else
              data-cursor="cursor">delete</span>
            </a>
          </div>
        </li>
      </ul>
      <router-link
        to="/cart"
        active-class=""
        exact-active-class="disabled"
        v-if="cartsLength !== 0"
        :class="{ disabled: !isSidebarBtn }"
        class="btn btn-outline-secondary w-100"
        >VIEW CART</router-link
      >
    </section>

    <!-- go top -->
    <a
      href="#"
      class="goTop icon-btn link"
      :class="{ active: isScroll }"
      @click.prevent="scrollTop"
    >
      <span class="material-icons" data-cursor="cursor"> arrow_drop_up </span>
    </a>

    <!-- cursor -->
    <button
      type="button"
      class="cursor d-none d-xl-block"
      ref="cursor"
    ></button>

    <!-- Login modal -->
    <LoginModal ref="loginModal" />
  </div>
</template>

<script>
import emitter from '@/methods/mitt';
import Spinner from '@/components/Spinner.vue';
import LoginModal from '@/components/Fronted/LoginModal.vue';

export default {
  data() {
    return {
      isToggleHam: false,
      isScroll: false,
      isShowSidebar: false,
      isSidebarBtn: true,
      cartsData: [],
      cartsLength: 0,
      isSpinner: false,
      favoritesData: [],
      favoritesLength: 0,
    };
  },
  inject: ['emitter', '$alertState'],
  methods: {
    openLoginModal() {
      this.$refs.loginModal.openModal();
      this.toggleHide();
    },
    toggle() {
      if (!this.isToggleHam) {
        this.isToggleHam = true;
      } else {
        this.isToggleHam = false;
      }
    },
    toggleHide() {
      this.isToggleHam = false;
    },
    pageScroll() {
      if (window.scrollY > 0) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
    },
    scrollTop() {
      document.documentElement.scrollTop = 0;
    },
    cursorTracker(e) {
      // cursor 追蹤
      const posX = `${e.clientX - (this.$refs.cursor.offsetWidth / 2)}px`;
      const posY = `${e.clientY - (this.$refs.cursor.offsetHeight / 2)}px`;
      this.$refs.cursor.style.top = posY;
      this.$refs.cursor.style.left = posX;
      // cursor 碰到連結執行動態效果
      if (e.target.dataset.cursor === 'cursor' || e.target.nodeName === 'A' || e.target.className.match('swiper-button-prev')
      || e.target.className.match('swiper-button-next') || e.target.className.match('btn')) {
        this.$refs.cursor.classList.add('active');
      } else {
        this.$refs.cursor.classList.remove('active');
      }
    },
    sidebarShow() {
      this.isShowSidebar = true;
    },
    sidebarHide() {
      this.isShowSidebar = false;
    },
    sidebarBtn(state) {
      this.isSidebarBtn = state;
    },
    getCartsData() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.cartsData = res.data.data;
            this.cartsLength = this.cartsData.carts.length;
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Get cart');
          }
          emitter.emit('isLoading', this.isLoading = false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateCart(qty, item, index) {
      let num = qty;
      if (num > item.product.inStock) {
        num = item.product.inStock;
        // 顯示訊息
        this.$alertState(false, 'Exceed the maximum inventory, enter');
      }
      if (num <= 0) {
        num = 1; // 強制設為 1
        this.cartsData.carts[index].qty = 1;
      } else {
        const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
        const cart = {
          data: {
            product_id: item.product.id,
            qty: num,
          },
        };
        this.$http
          .put(url, cart)
          .then((res) => {
            if (res.data.success) {
              this.getCartsData();
            } else {
              // 顯示訊息
              this.$alertState(res.data.success, 'Update shopping cart');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    delCartData(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      // 顯示 spinner
      this.isSpinner = id;
      this.$http.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.getCartsData();
            // 顯示訊息
            this.$alertState(res.data.success, 'The item has been removed');
          } else {
            this.$alertState(res.data.success, 'The item remove');
          }
          // 隱藏 spinner
          this.isSpinner = false;
        }).catch((error) => {
          console.log(error);
        });
    },
    delAllCartData(item) {
      this.cartsData = item;
      this.cartsLength = this.cartsData.length;
    },
    addQty(qty, item) {
      let num = qty;
      num += 1;
      if (num > item.product.inStock) {
        num = item.product.inStock;
      }
      this.updateCart(num, item);
    },
    removeQty(qty, item) {
      let num = qty;
      num -= 1;
      this.updateCart(num, item);
    },
    addFavorite(item) {
      if (this.favoritesData.includes(item.id)) {
        // 刪除有相同 id 的項目
        this.favoritesData.splice(this.favoritesData.indexOf(item.id), 1);
      } else {
        this.favoritesData.unshift(item.id);
      }
      // favoritesData 陣列長度
      this.favoritesLength = this.favoritesData.length;
      // 加入 localStorage
      const productItem = JSON.stringify(this.favoritesData);
      localStorage.setItem('favorite', productItem);
    },
    delFavorite(id) {
      // 刪除有相同 id 的項目
      this.favoritesData.splice(this.favoritesData.indexOf(id), 1);
      // favoritesData 陣列長度
      this.favoritesLength = this.favoritesData.length;
      // localStorage 再把資料存進去，做同步更新
      const productItem = JSON.stringify(this.favoritesData);
      localStorage.setItem('favorite', productItem);
    },
    getFavorite() {
      if (localStorage.getItem('favorite') !== null) {
        this.favoritesData = JSON.parse(localStorage.getItem('favorite'));
        this.favoritesLength = this.favoritesData.length;
      }
    },
  },
  mounted() {
    this.getCartsData();
    window.addEventListener('scroll', this.pageScroll);
    // 顯示 loading
    emitter.emit('isLoading', this.isLoading = true);
    // 隱藏 opening
    setTimeout((() => {
      emitter.emit('isOpening', this.isOpening = true);
    }), 1300);
    // Firefox Material-icons 置中
    emitter.emit('firefoxIcon');
    this.getFavorite();
  },
  unmounted() {
    window.removeEventListener('scroll', this.pageScroll);
  },
  components: {
    Spinner,
    LoginModal,
  },
};
</script>
