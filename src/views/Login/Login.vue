<template>
  <section class="container">
    <div class="row justify-content-center align-items-center vh-100">
      <div class="col-md-6 col-lg-4">
        <div class="text-center mb-6">
          <h3 class="title">LOGIN</h3>
        </div>
        <Form v-slot="{ errors }" @submit="signIn" class="mb-4" ref="form">
          <div class="text-left mb-6">
            <label for="email" class="form-label text-secondary">EMAIL</label>
            <Field
              type="email"
              class="form-control"
              id="email"
              name="Email"
              placeholder="Please enter an email"
              :class="{ 'is-invalid': errors['Email'] }"
              rules="email|required"
              v-model.trim="userData.username"
            />
            <error-message
              name="Email"
              class="invalid-feedback"
            ></error-message>
          </div>
          <div class="text-left mb-7">
            <label for="password" class="form-label text-secondary"
              >PASSWORD</label
            >
            <div class="input-group">
              <Field
                :type="isViewPassword"
                class="form-control pe-7"
                id="password"
                name="Password"
                placeholder="Please enter a password"
                :class="{ 'is-invalid': errors['Password'] }"
                rules="required"
                v-model.trim="userData.password"
              />
              <a
                href="#"
                class="link d-flex align-items-center"
                v-if="!errors['Password']"
                @click.prevent="passwordState"
              >
                <span
                  class="
                    position-absolute
                    top-50
                    end-0
                    translate-middle
                    material-icons
                    opacity-50
                  "
                  v-if="isViewPassword === 'password'"
                >
                  visibility_off
                </span>
                <span
                  class="
                    position-absolute
                    top-50
                    end-0
                    translate-middle
                    material-icons
                    opacity-80
                  "
                  v-else
                >
                  visibility
                </span>
              </a>
              <error-message
                name="Password"
                class="invalid-feedback"
              ></error-message>
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100">LOGIN</button>
        </Form>
        <p class="fs-5 text-light opacity-50 text-center">
          © 2021 60 Movie Poster All Rights Reserved.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import emitter from '@/methods/mitt';

export default {
  data() {
    return {
      isViewPassword: 'password',
      userData: {
        username: '',
        password: '',
      },
      cookieData: {
        token: '',
        expired: '',
      },
    };
  },
  inject: ['emitter', '$alertState'],
  methods: {
    passwordState() {
      if (this.isViewPassword === 'password') {
        this.isViewPassword = 'current-password';
      } else {
        this.isViewPassword = 'password';
      }
    },
    signIn() {
      const url = `${process.env.VUE_APP_API}/admin/signin`;
      this.$http
        .post(url, this.userData)
        .then((res) => {
          if (res.data.success) {
            // 轉址到 /admin
            this.$router.push('/admin/products');
            this.cookieData.token = res.data.token;
            this.cookieData.expired = res.data.expired;
            // 將 token 存入 cookie 內
            document.cookie = `hexToken=${
              this.cookieData.token
            }; expires=${new Date(this.cookieData.expired)}`;
          } else {
            // 顯示訊息
            this.$alertState(res.data.success, 'Login');
          }
          // 清除表單
          this.$refs.form.resetForm();
          // 隱藏 loading
          emitter.emit('isLoading', this.isLoading = false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    // 顯示 loading (修飾 empty 狀態)
    emitter.emit('isLoading', (this.isLoading = true));
    // 隱藏 loading
    setTimeout(() => {
      emitter.emit('isLoading', (this.isLoading = false));
    }, 1000);
    // 隱藏 opening
    setTimeout((() => {
      emitter.emit('isOpening', this.isOpening = true);
    }), 1300);
    // Firefox Material-icons 置中
    emitter.emit('firefoxIcon');
  },
};
</script>
