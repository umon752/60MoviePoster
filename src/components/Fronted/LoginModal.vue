<template>
  <div
    ref="loginModal"
    class="modal fade"
    id="del"
    tabindex="-1"
    aria-labelledby="loginLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title title fs-2" id="loginLabel" v-if="isLogin">
            LOGIN
          </h3>
          <h3 class="modal-title title fs-2" id="loginLabel" v-else>
            REGISTER
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body pt-0">
          <Form
            v-slot="{ errors }"
            @submit="login"
            class="mb-4"
            ref="form"
            v-if="isLogin"
          >
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
              />
              <error-message
                name="Email"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="text-left mb-4">
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
            <div class="form-check mb-6">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label fs-5" for="exampleCheck1"
                >Remember me</label
              >
            </div>
            <button type="submit" class="btn btn-primary w-100">LOGIN</button>
          </Form>
          <Form
            v-slot="{ errors }"
            @submit="register"
            class="mb-4"
            ref="form"
            v-else
          >
            <div class="mb-6">
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
            <div class="mb-6">
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
            <div class="mb-4">
              <label for="password" class="form-label text-secondary"
                ><span class="text-primary">*</span>PASSWORD</label
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
            <div class="form-check mb-6">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label fs-5" for="exampleCheck1"
                >I agree to the
                <a href="#" @click.prevent>terms and condition.</a></label
              >
            </div>
            <button type="submit" class="btn btn-primary w-100">
              REGISTER
            </button>
          </Form>
          <p class="fs-5 text-light text-center" v-if="isLogin">
            <span class="opacity-30 me-1">Don’t have an account?</span>
            <a href="#" @click.prevent="isLogin = false">Register!</a>
          </p>
          <p class="fs-5 text-light text-center" v-else>
            <span class="opacity-30 me-1">I has an account.</span>
            <a href="#" @click.prevent="isLogin = true">Login!</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      loginModal: '',
      isLogin: true,
      isViewPassword: 'password',
    };
  },
  inject: ['emitter', '$alertState'],
  methods: {
    openModal() {
      this.loginModal.show();
    },
    closeModal() {
      this.loginModal.hide();
      this.isLogin = true;
    },
    passwordState() {
      if (this.isViewPassword === 'password') {
        this.isViewPassword = 'current-password';
      } else {
        this.isViewPassword = 'password';
      }
    },
    login() {
      // 顯示訊息
      this.$alertState(true, 'Login');
      this.closeModal();
    },
    register() {
      // 顯示訊息
      this.$alertState(true, 'Register');
      this.closeModal();
    },
  },
  mounted() {
    // modal 初始化
    this.loginModal = new Modal(this.$refs.loginModal);
  },
};
</script>

<style scope>
.form-check-input {
  width: 14px;
  height: 14px;
}
</style>
