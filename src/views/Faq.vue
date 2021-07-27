<template>
  <img src="https://storage.googleapis.com/vue-course-api.appspot.com/umon752/1626773674213.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=lqLsrmTOV2QNPbnRw6Z39gobNQC%2BkZXagTVLXuJ0UVYMEhoINnqM2cWDG7kAkjd%2FVdw%2BrSwcuxS6Qkxtz3%2FSNW%2FQueg7y3fm8ptSmcNR70VuvVdgXQ%2FJjIl2E7iXBD%2FQyCQW9EYxeUa3p16fVNUUWEpqiArBjWankRB%2FOGdRuEe1fpn%2FJSSQxF%2FeEDNDNeAvY%2BN%2F9IszOgYpP52QJCatWMZcq4Wlbd9Ksp%2BxKrqnQgCbzsg8TRDj2n23kQ9CzrlYlNoQ2qIqyUnu9cDVJaaWNq%2Fmy53ntkUBMPK23MT4kt4zQl06oqzeAhT7ILY0%2BFbSncVjrm9ghaqJzZ3qDcGPNw%3D%3D" class="jumbotron opacity-30 mb-5" />
  <section class="container pb-9 pt-3">
    <div class="row justify-content-center">
      <div class="col-xl-9">
        <div
          class="d-flex flex-column align-items-center justify-content-center"
        >
          <h2 class="title mb-7">FAQ</h2>
          <div class="accordion w-100 mb-9" id="selector">
            <div class="accordion-item">
              <h3 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button collapsed fs-5 fs-md-4"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                  data-cursor="cursor"
                >
                  How to confirm that the order has been completed
                </button>
              </h3>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
              >
                <div class="accordion-body fs-5 fs-md-4">
                  After the order is completed, the webpage will display the
                  "order number" of your order and send the details of the order
                  to your email address for this order.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h3 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed fs-5 fs-md-4"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
                  data-cursor="cursor"
                >
                  When Can I get my product after the order?
                </button>
              </h3>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse show"
                aria-labelledby="headingTwo"
              >
                <ul class="accordion-body fs-5 fs-md-4 list-disc ms-5">
                  <li>
                    Orders are processed 1-2 business days after an order has
                    been placed, Monday – Friday, excluding weekends, public and
                    bank holidays and scheduled warehouse closures.
                  </li>
                  <li>
                    Orders placed during holidays will be processed on the
                    following business day.
                  </li>
                </ul>
              </div>
            </div>
            <div class="accordion-item">
              <h3 class="accordion-header" id="headingThree">
                <button
                  class="accordion-button collapsed fs-5 fs-md-4"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                  data-cursor="cursor"
                >
                  How to check my order status?
                </button>
              </h3>
              <div
                id="collapseThree"
                class="accordion-collapse collapse show"
                aria-labelledby="headingThree"
              >
                <div class="accordion-body fs-5 fs-md-4">
                  To check your order status:<br />
                  Log into your account via Under My Orders<br />
                  Select “View Your Order History”
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h3 class="accordion-header" id="headingFour">
                <button
                  class="accordion-button collapsed fs-5 fs-md-4"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                  data-cursor="cursor"
                >
                  Do you deliver internationally?
                </button>
              </h3>
              <div
                id="collapseFour"
                class="accordion-collapse collapse show"
                aria-labelledby="headingFour"
              >
                <div class="accordion-body fs-5 fs-md-4">
                  We regularly deliver to different countries using safe and
                  reliable couriers. For international shipping it is always
                  best to send rolled posters in special protective tubes.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h3 class="accordion-header" id="headingFive">
                <button
                  class="accordion-button collapsed fs-5 fs-md-4"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                  data-cursor="cursor"
                >
                  Can I sell my poster to you?
                </button>
              </h3>
              <div
                id="collapseFive"
                class="accordion-collapse collapse show"
                aria-labelledby="headingFive"
              >
                <div class="accordion-body fs-5 fs-md-4">
                  Yes, we are always willing to look at any good quality film
                  poster and establish a price. Just give us a call or email us
                  a photo of your poster.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';
import emitter from '@/methods/mitt';

export default {
  inheritAttrs: false,
  data() {
    return {
      collapse: '',
    };
  },
  emits: ['toggleHide'],
  mounted() {
    // 顯示 loading
    emitter.emit('isLoading', (this.isLoading = true));
    // 隱藏 loading
    setTimeout(() => {
      emitter.emit('isLoading', (this.isLoading = false));
    }, 2000);
    // 關閉 toggle panel
    this.$emit('toggleHide');
    // Firefox Material-icons 置中
    emitter.emit('firefoxIcon');
    // collapse 初始化
    const collapseElementList = [].slice.call(
      document.querySelectorAll('.collapse'),
    );
    this.collapse = collapseElementList.map(
      (collapseEl) => new Collapse(collapseEl, {
        parent: document.getElementById('selector'),
      }),
    );
  },
};
</script>
