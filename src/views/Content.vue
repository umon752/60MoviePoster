<template>
  <!-- banner -->
  <header class="px-4 px-xl-8 pb-5 pb-xl-8 pt-0 pt-xl-7">
    <div class="row px-md-5 px-lg-0">
      <div class="col-lg-8 mb-4 mb-md-5 mb-lg-0">
        <div class="position-relative overflow-hidden">
          <div class="bannerEffect flashing-dark"></div>
          <img
            class="bannerNoise"
            src="@/assets/images/index/noise.jpg"
            ref="bannerNoise"
          />
          <canvas
            class="banner02 position-absolute top-0 start-0"
            id="banner02"
            ref="banner02"
          ></canvas>
          <canvas
            class="banner position-relative top-0 start-0"
            id="banner"
            ref="banner"
          ></canvas>
        </div>
      </div>
      <div
        class="
          col-lg-4
          d-flex
          flex-column
          justify-content-center
          position-relative
        "
      >
        <div class="w-sm-50">
          <img
            src="@/assets/images/logo.svg"
            alt="60 Movie Poster"
            class="coverImg pe-xl-0 mb-4 mb-lg-5 mb-xl-7"
            ref="coverImg"
          />
          <h2 class="coverIntro fs-4 mb-4 mb-lg-5" ref="coverIntro">
            60 Movie Poster was founded in 1995, we are a movie posters shop.
            Let’s find what you love!
          </h2>
          <router-link to="/products">
            <div
              class="coverBtn d-inline-flex align-items-center fs-5"
              ref="coverBtn"
              data-cursor="cursor"
            >
              SHOP NOW
              <div class="arrow-btn border border-primary ms-2">
                <span class="material-icons" data-cursor="cursor">
                  arrow_right
                </span>
              </div>
            </div>
          </router-link>
        </div>
        <a
          href="#"
          class="headerPeople"
          @click.prevent="switchBanner"
          ref="headerPeople"
        >
          <img
            class="headerPeople__img"
            src="https://storage.googleapis.com/vue-course-api.appspot.com/umon752/1626773803808.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hLrFQ%2FnVH4sCOWBNBrUiIHJ4jFyvBou4rlIkVVfcn9Lx5aTZFhwVD5IXD5ZDSQRGYg0COb5F1nZ6eTgs%2FIdLqIvdOi93mXIVXtLPh95QNCFXN2zo8dpNV4Kxo9Pa9YU%2BoFLFbsNf8JEG38iyR9DzNyB4Ji5TKG%2F%2BjtPBupIkMxfjaXUJl3szkdKr%2BoL5E%2BHUpgV1PisQSF3WT913Z2pFTL%2F1h16qFCD08gO%2B11u9RZX%2F90cTeYejCVM8Nf%2B9my1wKngzCdprHlt1WB9JsLCtOFpoSU59%2BHrYuT1yRVPNmSp8E2EXS%2B%2FF%2FFJ1PqVq%2F%2BPrJD0k4S5cOcuXfOZ2oUYikg%3D%3D"
            alt="photographer"
            data-cursor="cursor"
          />
          <div class="headerPeople__light" data-cursor="cursor"></div>
          <div class="headerPeople__text fs-6 fs-xl-5" ref="headerPeopleText">
            Click!
          </div>
        </a>
      </div>
    </div>
  </header>
  <!-- 消息 -->
  <section class="container py-5 py-xl-8"
  data-aos="fade-up">
    <ul class="row">
      <li class="col-md-4 mb-4 mb-md-0">
        <router-link
          :to="`/product/${saleProductId}`"
          class="news overflow-hidden d-block"
          @click.prevent
        >
          <div
            class="mask-circle d-flex justify-content-center align-items-center"
            data-cursor="cursor"
          >
            <p
              class="opacity-80 fs-3 fs-lg-2 fw-bold text-light"
              data-cursor="cursor"
            >
              SALE
            </p>
          </div>
          <img
            src="https://storage.googleapis.com/vue-course-api.appspot.com/umon752/1628067989091.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=bJfjwVdMJLJPl6AkIUaI0252FaH46kd2nllwQw7s%2B1vT%2B30T2V%2FamBChVdHvoUaDWkBXxGcfbk4fkhbxkKZOH%2F%2BmBs18PHXQxPzCqXyuFVRh5RAKBUpJ3CMypQy9un4Whz6LJ%2FGzq2nYLUBbTDZnchwznZIuwI3IM7JAtknZ41kYO07YSMI2KsEaD39teVdV6dNzkuoVb6Dpay2yzMMzWTt1H8M7yC2CH5zJ7yxJNpBbyHcxXMja3a0zFv%2FXl8tlPpHAXR0luZhsV4Bdk7NzIj0m%2BPuqdgSzJNJrt9uD5Hy0zQdj8Yv8OBYsvdxtCUoKDRJ8QstejsyGi%2BFMA2fcEA%3D%3D"
            alt="SALE"
            class="news__img"
          />
        </router-link>
      </li>
      <li class="col-md-4 mb-4 mb-md-0">
        <router-link
          to="/product/-MdCUjV8II_9RZR5Qtv9"
          class="news overflow-hidden d-block"
          @click.prevent
        >
          <div
            class="mask-circle d-flex justify-content-center align-items-center"
            data-cursor="cursor"
          >
            <p
              class="opacity-80 fs-3 fs-lg-2 fw-bold text-light"
              data-cursor="cursor"
            >
              NEW ARRIVAL
            </p>
          </div>
          <img
            src="https://storage.googleapis.com/vue-course-api.appspot.com/umon752/1628067812283.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=mUlUCiqE0vrSdGeV2A%2FUjx8FQWktybHuO4luykIvvQZJF17sUJRj%2BYGYIbKVxS8wlw0tUrq5Dt3zm1Lu0xIdS6yv%2F3HTY%2B7fBU0RYu%2B3R9SKqve4cDigVVHo3bczt%2BkRLTIoCMuel2wpZwmUyWU%2BdNLxWNGiq0Hzur4iaxueRkDKY0pDwDjVCNTdpKqhHzzyW6dfq7Kk3FTKkUZMDcBmnEz9Hr9X3jYCD7n7LKZb1tfjZZItWQuTY0r%2B8aFcV09H0CXk6syGM6FzoPUwepM8zN0eGuY%2F00AK9iVz4gsOAx5%2F8ICjBKWFPDNrkzd0KBUJinf9TTX6djAGnaqMpF29gQ%3D%3D"
            alt="NEW ARRIVAL"
            class="news__img"
          />
        </router-link>
      </li>
      <li class="col-md-4">
        <a
          href="#"
          class="news overflow-hidden d-block"
          @click.prevent="openCouponModal"
        >
          <div
            class="mask-circle d-flex justify-content-center align-items-center"
            data-cursor="cursor"
          >
            <p
              class="opacity-80 fs-3 fs-lg-2 fw-bold text-light"
              data-cursor="cursor"
            >
              COUPON
            </p>
          </div>
          <img
            src="https://storage.googleapis.com/vue-course-api.appspot.com/umon752/1628067984974.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=BHkKDerCIdvsIox9ag0OzXzCrPjsNXIrFrE3Mgnx9McfrWJKm27UYbF3p5fg%2FjRnvlJbiQlFKs6g0dUfdcESYEspzUOXEVs4R%2Bto5CREG7VTb7NVQB9SJyurWf%2FE1QF4sq13xOVZz5pfWQU5OCwxJhoxFDnrf9R62CgVZqVp9VFjxyeVo6RxcT7DCQCKMV5j9N49v3VNu7FFq7q95llFXz17dKLW8Yij8V8dL3nv9SyD4%2FwW7dhPIB28mFvUG3JDTdzkQXeRPbkV%2FFvHhwHUAbpgdOpts7f1S5i1oG8U0I9l5oOkT96qqW6Xnp6GQNsH6oS8cvbgfhlTi5gJlx0QJA%3D%3D"
            alt="COUPON"
            class="news__img"
          />
        </a>
      </li>
    </ul>
  </section>
  <!-- 推薦 -->
  <section
    class="recommend container py-5 py-xl-8 mb-8"
    id="recommend"
    data-aos="fade-up"
  >
    <h3
      class="
        dividerTitle
        fs-2 fs-md-1
        fw-bold
        text-center
        opacity-50
        mb-5 mb-lg-7
      "
    >
      RECOMMEND
    </h3>
    <!-- swiper -->
    <swiper
      :loop="false"
      :navigation="false"
      :spaceBetween="12"
      :thumbs="{ swiper: thumbsSwiper }"
      class="mySwiper2"
    >
      <swiper-slide
        class="mb-2 mb-lg-7"
        v-for="item in productsData"
        :key="item.id"
      >
        <div class="row">
          <div
            class="col-md-5 col-lg-6 d-flex justify-content-center mb-4 mb-md-0"
          >
            <img
              class="recommend__mainImg flashing-shadow"
              :src="item.imageUrl"
            />
          </div>
          <div class="col-md-7 col-lg-6">
            <h4 class="fs-3 fs-md-2 mb-2 mb-lg-4">{{ item.title }}</h4>
            <div class="badge bg-primary" v-if="item.is_onSale">SALE</div>
            <hr />
            <ul>
              <li class="row mb-2 mb-lg-4">
                <p class="col-4 col-lg-3 opacity-50">YEAR：</p>
                <p class="col-8 col-lg-7">{{ item.year }}</p>
              </li>
              <li class="row mb-2 mb-lg-4">
                <p class="col-4 col-lg-3 opacity-50">COUNTRY：</p>
                <p class="col-8 col-lg-7">{{ item.country }}</p>
              </li>
              <li class="row mb-2 mb-lg-4">
                <p class="col-4 col-lg-3 opacity-50">TYPE：</p>
                <p class="col-8 col-lg-7">{{ item.type }}</p>
              </li>
              <li class="row mb-2 mb-lg-4">
                <p class="col-4 col-lg-3 opacity-50">SIZE：</p>
                <p class="col-8 col-lg-7">{{ item.size }}</p>
              </li>
            </ul>
            <hr />
            <p ref="description" class="mb-2 mb-lg-4">
              {{ truncateStr(item.description) }}
            </p>
            <router-link
              :to="`/product/${item.id}`"
              class="d-flex align-items-center fs-5"
              >SEE MORE
              <div class="arrow-btn border border-primary ms-2">
                <span class="material-icons" data-cursor="cursor">
                  arrow_right
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <swiper
      @swiper="setThumbsSwiper"
      :loop="false"
      :spaceBetween="12"
      :navigation="true"
      data-cursor="cursor"
      :breakpoints="{
        0: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 6,
        },
      }"
      :freeMode="true"
      :watchSlidesVisibility="true"
      :watchSlidesProgress="true"
      class="mySwiper p-4 py-md-6 px-md-7 border-md"
    >
      <swiper-slide
        class="recommend__thumbnail"
        data-cursor="cursor"
        v-for="item in productsData"
        :key="item.id"
      >
        <img
          class="recommend__thumbnail__img mb-2"
          data-cursor="cursor"
          href="#recommend"
          @click.prevent="anchorTop($event)"
          :src="item.imageUrl"
        />
        <div
          class="
            position-absolute
            top-negative-5
            end-negative-5
            badge
            bg-primary
          "
          v-if="item.is_onSale"
        >
          SALE
        </div>
        <h5
          class="fs-4 border-start border-primary border-2 text-truncate ps-2"
          data-cursor="cursor"
        >
          {{ item.title }}
        </h5>
      </swiper-slide>
    </swiper>
  </section>
  <!-- coupon modal -->
  <div
    ref="couponModal"
    class="modal fade"
    id="coupon"
    tabindex="-1"
    aria-labelledby="couponLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-dotted">
        <div
          class="modal-body d-flex flex-column align-items-center py-6 py-md-7"
        >
          <h4
            class="
              modal-title
              fw-bold
              fs-2
              text-primary
              d-flex
              align-items-center
              border-bottom-0
              mb-1 mb-md-2
            "
            id="couponLabel"
          >
            <span class="material-icons me-2"> confirmation_number </span>
            DISCOUNT COUPON
          </h4>
          <p class="fs-5 fs-md-4 mb-4 mb-md-5">
            10% off with any number of days.
          </p>
          <div class="input-group w-md-60">
            <input
              type="text"
              class="form-control bg-dark border-0"
              :value="couponCode"
              ref="code"
              readonly
            />
            <button
              class="btn btn-primary d-flex align-items-center fs-5 py-1 px-3"
              type="button"
              @click="copyCode"
            >
              <span class="material-icons fs-4 me-1"> content_copy </span>
              COPY
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/mitt';
import * as PIXI from 'pixi.js';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Navigation, Thumbs } from 'swiper/core';
import Modal from 'bootstrap/js/dist/modal';
import banner from '@/assets/images/index/banner.jpg';
import banner02 from '@/assets/images/index/banner02.jpg';
import displacement from '@/assets/images/index/displacement_map_repeat.jpg';

SwiperCore.use([Navigation, Thumbs]);
PIXI.utils.skipHello();

export default {
  inheritAttrs: false,
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      thumbsSwiper: null,
      productsData: [],
      couponModal: '',
      couponCode: '60MoviePoster',
      saleProductId: '',
    };
  },
  inject: ['emitter', '$alertState'],
  methods: {
    setThumbsSwiper(swiper) {
      // 因 AJAX 的關係需要待 AJAX 執行完畢，再稍微延遲 swiper，才會出現 active 效果
      setTimeout(() => {
        this.thumbsSwiper = swiper;
      }, 3000);
    },
    bannerFlag() {
      const app = new PIXI.Application({
        view: document.getElementById('banner'), // 指定 DOM，<canvas> 畫布位置
        width: 1186, // 設定 <canvas> 畫布寬度，default: 800
        height: 705,
        backgroundColor: 0xffffff,
      });

      app.stage.interactive = true;

      const container = new PIXI.Container();
      app.stage.addChild(container);

      const flag = PIXI.Sprite.from(
        `${banner}`,
      );
      container.addChild(flag);
      flag.width = 1186;
      flag.height = 705;

      const displacementSprite = PIXI.Sprite.from(
        `${displacement}`,
      );
      // Make sure the sprite is wrapping.
      displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      const displacementFilter = new PIXI.filters.DisplacementFilter(
        displacementSprite,
      );

      displacementSprite.position = flag.position;

      app.stage.addChild(displacementSprite);

      flag.filters = [displacementFilter];

      displacementFilter.scale.x = 14;
      displacementFilter.scale.y = 14;

      app.ticker.add(() => {
        displacementSprite.x += 1;
        if (displacementSprite.x > displacementSprite.width) {
          displacementSprite.x = 0;
        }
      });
    },
    bannerFlag02() {
      const app = new PIXI.Application({
        view: document.getElementById('banner02'), // 指定 DOM，<canvas> 畫布位置
        width: 1186, // 設定 <canvas> 畫布寬度，default: 800
        height: 705,
        backgroundColor: 0xffffff,
      });

      app.stage.interactive = true;

      const container = new PIXI.Container();
      app.stage.addChild(container);

      const flag = PIXI.Sprite.from(
        `${banner02}`,
      );
      container.addChild(flag);
      flag.width = 1186;
      flag.height = 705;

      const displacementSprite = PIXI.Sprite.from(
        `${displacement}`,
      );
      // Make sure the sprite is wrapping.
      displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      const displacementFilter = new PIXI.filters.DisplacementFilter(
        displacementSprite,
      );

      displacementSprite.position = flag.position;

      app.stage.addChild(displacementSprite);

      flag.filters = [displacementFilter];

      displacementFilter.scale.x = 14;
      displacementFilter.scale.y = 14;

      app.ticker.add(() => {
        displacementSprite.x += 1;
        if (displacementSprite.x > displacementSprite.width) {
          displacementSprite.x = 0;
        }
      });
    },
    getProducts() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.filterRecommed(res.data.products);
            this.filterSaleProduct(res.data.products);
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Get products');
          }
          // 隱藏 loading
          emitter.emit('isLoading', (this.isLoading = false));
        })
        .catch(() => {
          // 顯示訊息
          this.$alertState('error');
        });
    },
    filterRecommed(product) {
      // 篩選出有現貨的商品
      const productsInstock = product.filter((item) => item.inStock);
      // 設定最多 10 個商品
      const maxSize = productsInstock.length < 10 ? productsInstock.length : 10;
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      const arrSet = new Set([]); // 新增一個類陣列

      getRandomInt(); // 取得隨機數函式

      // 得到 maxSize 個值就會停止
      for (let index = 0; arrSet.size < maxSize; index + 1) {
        const num = getRandomInt(productsInstock.length); // 取得隨機數並設定最大值
        arrSet.add(num); // 取得隨機數存進陣列中
      }

      // 將取得的隨機數字帶入
      arrSet.forEach((i) => {
        this.productsData.push(productsInstock[i]);
      });

      // 將折扣商品排序置前
      this.productsData.sort((a, b) => b.is_onSale - a.is_onSale);
    },
    filterSaleProduct(product) {
      const saleProduct = product.filter((item) => item.is_onSale);
      // 設定最多 1 個商品
      const maxSize = 1;
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      const arrSet = new Set([]); // 新增一個類陣列

      getRandomInt(); // 取得隨機數函式

      // 得到 maxSize 個值就會停止
      for (let index = 0; arrSet.size < maxSize; index + 1) {
        const num = getRandomInt(saleProduct.length); // 取得隨機數並設定最大值
        arrSet.add(num); // 取得隨機數存進陣列中
      }

      // 將取得的隨機數字帶入
      arrSet.forEach((i) => {
        this.saleProductId = saleProduct[i].id;
      });
    },
    openCouponModal() {
      this.couponModal.show();
    },
    truncateStr(text) {
      const str = text.substring(0, 180);
      return `${str}...`;
    },
    copyCode() {
      // 選取
      this.$refs.code.select();
      // 執行瀏覽器複製命令
      document.execCommand('Copy');
      // 顯示訊息
      this.$alertState(true, 'Copied');
      // 關閉 modal
      this.couponModal.hide();
    },
    hoverEffect() {
      this.$refs.headerPeople.addEventListener('mouseover', (() => {
        this.$refs.bannerNoise.classList.add('active');
        this.$refs.headerPeopleText.classList.add('active');
      }));
      this.$refs.headerPeople.addEventListener('mouseout', (() => {
        this.$refs.bannerNoise.classList.remove('active');
        this.$refs.headerPeopleText.classList.remove('active');
      }));
    },
    switchBanner() {
      this.$refs.banner.classList.toggle('active');
      this.$refs.banner02.classList.toggle('active');
    },
    anchorTop(e) {
      let targetName = e.target.getAttribute('href');
      targetName = targetName.substring(1, targetName.length);
      const target = document.getElementById(`${targetName}`);
      const targetPos = target.offsetTop;
      document.documentElement.scrollTop = targetPos;
    },
  },
  mounted() {
    this.getProducts();
    // 顯示 loading
    emitter.emit('isLoading', this.isLoading = true);
    setTimeout((() => {
      this.$refs.banner.classList.add('opening');
      this.$refs.coverImg.classList.add('opening');
      this.$refs.coverImg.classList.add('flashing');
    }), 1200);
    setTimeout((() => {
      this.$refs.coverIntro.classList.add('opening');
    }), 1500);
    setTimeout((() => {
      this.$refs.coverBtn.classList.add('opening');
    }), 1700);
    this.bannerFlag();
    this.bannerFlag02();
    this.hoverEffect();
    // modal 初始化
    this.couponModal = new Modal(this.$refs.couponModal);
  },
};
</script>
