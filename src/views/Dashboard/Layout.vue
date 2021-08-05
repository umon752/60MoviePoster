<template>
  <div
    class="mask"
    :class="{ active: isShowSidebar }"
    @click="sidebarHide"
  ></div>
  <div class="d-flex" ref="outer">
    <!-- sidebar -->
    <aside
      class="adminSidebar border-end p-4 p-md-6"
      :class="{ active: isShowSidebar }"
    >
      <div class="position-relative h-100">
        <h1 class="mb-6">
          <router-link to="/admin/products" class="logo"
          @click="changeTitle('PRODUCTS'), toggle()">
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
        <ul>
          <li class="mb-4">
            <router-link
              to="/admin/products"
              class="link-primary d-flex align-items-center"
              @click="changeTitle('PRODUCTS'), toggle()"
            >
              <span class="material-icons me-2"> shopping_bag </span>
              PRODUCTS
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="/admin/orders"
              class="link-primary d-flex align-items-center"
              @click="changeTitle('ORDERS'), toggle()"
            >
              <span class="material-icons me-2"> receipt_long </span>
              ORDERS
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="/admin/coupons"
              class="link-primary d-flex align-items-center"
              @click="changeTitle('COUPONS'), toggle()"
            >
              <span class="material-icons me-2"> confirmation_number </span>
              COUPONS
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="/admin/articles"
              class="link-primary d-flex align-items-center"
              @click="changeTitle('ARTICLES'), toggle()"
            >
              <span class="material-icons me-2"> article </span>
              ARTICLES
            </router-link>
          </li>
        </ul>
        <a
          href="#"
          class="
            adminSidebar__item
            link-primary
            d-flex
            align-items-center
            opacity-70
          "
          @click.prevent="signOut()"
        >
          <span class="material-icons me-2"> logout </span>
          SIGN OUT
        </a>
      </div>
    </aside>

    <section class="adminContent d-flex flex-column p-4 p-md-6 px-xl-7">
      <!-- navbar -->
      <nav
        class="d-flex justify-content-between align-items-center mb-5 mb-lg-5"
      >
        <h2 class="title">{{ title }}</h2>
        <!-- mobile、pad -->
        <a
          href="#"
          class="hamToggle d-block d-xl-none"
          :class="{ active: isToggleHam }"
          @click.prevent="toggle"
        ></a>
        <!-- desktop -->
        <ul class="align-items-center d-none d-xl-flex">
          <li class="position-relative me-3">
            <a href="#" class="link px-3" @click.prevent>
              <span class="material-icons"> notifications </span>
              <span class="point">3</span>
            </a>
          </li>
          <li class="position-relative">
            <a href="#" class="avatar d-block" @click.prevent>
              <img class="avatar__img" src="https://i.imgur.com/Jcnq7qG.jpg" />
            </a>
          </li>
        </ul>
      </nav>
      <!-- content -->
      <router-view v-if="checkSuccess" @emptyState="emptyState" />
    </section>
  </div>
</template>

<script>
import emitter from '@/methods/mitt';

export default {
  data() {
    return {
      isToggleHam: false,
      isShowSidebar: false,
      title: 'PRODUCTS',
      checkSuccess: false,
    };
  },
  inject: ['emitter', '$alertState'],
  methods: {
    emptyState(state) {
      if (state) {
        this.$refs.outer.classList.add('vh-100');
      } else {
        this.$refs.outer.classList.remove('vh-100');
      }
    },
    toggle() {
      if (window.screen.width < 1200) {
        if (!this.isShowSidebar) {
          this.isShowSidebar = true;
          this.isToggleHam = true;
        } else {
          this.isShowSidebar = false;
          this.isToggleHam = false;
        }
      }
    },
    sidebarShow() {
      this.isShowSidebar = true;
      this.isToggleHam = true;
    },
    sidebarHide() {
      this.isShowSidebar = false;
      this.isToggleHam = false;
    },
    changeTitle(text) {
      this.title = text;
    },
    checkLogin() {
      // 取出儲存在瀏覽器 cookie 裡面的 token 憑證
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      // 確認有 token 執行
      if (token) {
        // 將 token 加入在 headers 內
        this.$http.defaults.headers.common.Authorization = token;
        // 檢查用戶是否仍持續登入
        const url = `${process.env.VUE_APP_API}/api/user/check`;
        this.$http.post(url).then((res) => {
          if (res.data.success) {
            // 確認用戶有登入 -> 顯示 router-view 內容
            this.checkSuccess = true;
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Login');
            // 轉址到 /login
            this.$router.push('/login');
          }
        });
      } else {
        // 顯示訊息
        this.$alertState(false, 'Login');
        // 轉址到 /login
        this.$router.push('/login');
      }
    },
    signOut() {
      const url = `${process.env.VUE_APP_API}/logout`;
      // 顯示 loading
      emitter.emit('isLoading', this.isLoading = true);
      this.$http
        .post(url, this.userData)
        .then((res) => {
          if (res.data.success) {
            // 清除 cookie
            document.cookie = 'hexToken=; expires=; path=/60MoviePoster/dist';
            // 轉址到 /admin
            this.$router.push('/login');
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Sign out');
          }
          // 隱藏 loading
          emitter.emit('isLoading', this.isLoading = false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.checkLogin();
    // 隱藏 opening
    setTimeout((() => {
      emitter.emit('isOpening', this.isOpening = true);
    }), 1300);
  },
};
</script>
