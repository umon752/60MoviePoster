<template>
  <img
    src="https://storage.googleapis.com/vue-course-api.appspot.com/umon752/1626773700597.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=lbue8sNNTFzZybM0gT%2FnzqEpn56SPhig92riowizH%2BP4%2FUmtm6c0AAu6mkl1WlmGU%2F%2FexjB29Hcoos%2FZhN9pvvkxVG1IvZQaQp%2F8UMu8pLoCzdXB55LZfHdanFALQuyZvM85PkLXt5o1bEhiCMURk8IFjPRK6d38V%2FpWhJZZ%2FXhYisJjmNGKtD3qkNm1oFP31c91HlwB3GFMIekmJ5sbMhWZGGJ0WjBr6cgQm7NgpdO5ddqSzDChpFKXBYeg%2Bnb6RTE%2B94taPcf5lRe5eOCJIhzWUElDhNCqYc6Y6WEYE2KlhcjyL6jSLFJaVpukLPJDoSHZY2sq0%2B667Qyl%2BWCy4A%3D%3D"
    class="jumbotron opacity-30 mb-5"
  />
  <section class="container pb-9 pt-3">
    <div class="row justify-content-center">
      <div class="col-xl-9">
        <div
          class="d-flex flex-column align-items-center justify-content-center"
        >
          <h2 class="title mb-7">CONTACT</h2>
        </div>
        <ul class="row mb-7">
          <li
            class="
              col-6 col-md-3
              d-flex
              flex-column
              align-items-center
              border-secondary-dark border-end border-bottom border-bottom-md-0
              pb-4 pb-md-0
              mb-md-6
            "
          >
            <span
              class="
                contactIcon
                display-6
                material-icons
                d-flex
                align-items-center
                justify-content-center
                rounded-circle
                bg-secondary-dark
                mb-3
              "
              >schedule</span
            >
            <p class="text-center opacity-70 fs-6 fs-sm-5">
              2:00 PM - 8:00 PM
              <br />
              Monday - Saturday
            </p>
          </li>
          <li
            class="
              col-6 col-md-3
              d-flex
              flex-column
              align-items-center
              border-secondary-dark border-end border-bottom border-bottom-md-0
              pb-4 pb-md-0
              mb-md-6
            "
          >
            <span
              class="
                contactIcon
                display-6
                material-icons
                d-flex
                align-items-center
                justify-content-center
                rounded-circle
                bg-secondary-dark
                mb-3
              "
              >store</span
            >
            <p class="text-center opacity-70 fs-6 fs-sm-5">
              3030 Queens Chapel Rd, Hyattsville, MD 20782
            </p>
          </li>
          <li
            class="
              col-6 col-md-3
              d-flex
              flex-column
              align-items-center
              border-secondary-dark border-end
              mb-md-6
              pt-4 pt-md-0
            "
          >
            <span
              class="
                contactIcon
                display-6
                material-icons
                d-flex
                align-items-center
                justify-content-center
                rounded-circle
                bg-secondary-dark
                mb-3
              "
              >email</span
            >
            <a
              class="link fs-6 fs-sm-5 opacity-70 mb-1"
              href="mailto:60movieposter@gmail.com"
            >
              poster60@gmail.com
            </a>
          </li>
          <li
            class="
              col-6 col-md-3
              d-flex
              flex-column
              align-items-center
              mb-md-6
              pt-4 pt-md-0
            "
          >
            <span
              class="
                contactIcon
                display-6
                material-icons
                d-flex
                align-items-center
                justify-content-center
                rounded-circle
                bg-secondary-dark
                mb-3
              "
              >phone</span
            >
            <a class="link fs-6 fs-sm-5 opacity-70" href="tel:301-123-45678">
              301-123-45678
            </a>
          </li>
        </ul>
        <div class="row g-0 mb-8">
          <div class="col-lg-5">
            <img
              src="https://storage.googleapis.com/vue-course-api.appspot.com/umon752/1626773728410.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=E%2F8oZdqq9%2BXoMHAXzQ42YU1bBqMv%2F272MzxChcbLQbE%2FyNaVUEiHsM9RV5cOW%2BMoJ04Zr%2FgPVKp3NRhOvTG8N3YpqBONSQf6Pm8r9%2BITngVAsdy7MFDlwoZGMKTNSZT%2BRkqRzkfjWPRRt31sfaEIoqVUZaXHzbBbchzxe2YKFh5pmXq7Y0v1vRKDWdb9e2KOzsmne4RQCVTZfP7xF2okiJE7I8LlHwCBsrOq6er5NB9ndi9Fm8DPPT8tlMh%2FcGm7TOknW5%2FpiJzQmivXUlJH2cVLOkZstZuPTILLpUNmDOtXgipLhk%2BUE1eZg1V7bhXnACOJL%2Fi1kjgohYhfQ7vVwA%3D%3D"
              class="img-cover w-100 h-100 opacity-50 d-none d-lg-block"
            />
          </div>
          <div class="col-lg-7 bg-sm-black-opacity-50">
            <Form
              v-slot="{ errors }"
              @submit="sendMessage"
              ref="form"
              class="p-4 p-sm-6"
            >
              <div class="mb-5">
                <label for="name" class="form-label text-secondary"
                  ><span class="text-primary">*</span>NAME</label
                >
                <Field
                  type="text"
                  class="form-control"
                  id="name"
                  name="Name"
                  placeholder="Please enter a name"
                  :class="{ 'is-invalid': errors['Name'] }"
                  rules="required"
                />
                <error-message
                  name="Name"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <div class="mb-5">
                <label for="tel" class="form-label text-secondary"
                  ><span class="text-primary">*</span>TEL</label
                >
                <Field
                  type="text"
                  class="form-control"
                  id="tel"
                  name="Tel"
                  placeholder="Please enter a tel"
                  :class="{ 'is-invalid': errors['Tel'] }"
                  rules="min:8|required"
                />
                <error-message
                  name="Tel"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <div class="mb-5">
                <label for="email" class="form-label text-secondary"
                  ><span class="text-primary">*</span>EMAIL</label
                >
                <Field
                  type="email"
                  class="form-control"
                  id="email"
                  name="Email"
                  placeholder="Please enter an email"
                  :class="{ 'is-invalid': errors['Email'] }"
                  rules="email|required"
                />
                <error-message
                  name="Email"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <div class="mb-5">
                <label for="message" class="form-label text-secondary"
                  ><span class="text-primary">*</span>MESSAGE</label
                >
                <Field
                  as="textarea"
                  type="text"
                  class="form-control"
                  id="message"
                  name="Message"
                  placeholder="Please enter a message"
                  :class="{ 'is-invalid': errors['Message'] }"
                  rules="required"
                ></Field>
                <error-message
                  name="Message"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <div class="text-center text-lg-start">
                <button type="submit" class="btn btn-primary w-100 w-md-auto">
                  SEND
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import emitter from '@/methods/mitt';

export default {
  inheritAttrs: false,
  emits: ['toggleHide'],
  inject: ['emitter', '$alertState'],
  methods: {
    sendMessage() {
      // 顯示訊息
      this.$alertState(true, 'Submit for');
    },
  },
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
  },
};
</script>
