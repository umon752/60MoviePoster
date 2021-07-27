import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import AOS from 'aos';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';

import App from './App.vue';
import router from './router';
import { thousands, date } from './methods/filters';

AOS.init({
  duration: 800,
});

defineRule('email', email);
defineRule('required', required);
defineRule('min', min);

configure({
  validateOnInput: true, // 調整為輸入字元立即進行驗證
});

const app = createApp(App);
// 全域使用
app.config.globalProperties.$filters = {
  thousands,
  date,
};
app.use(router);
app.use(VueAxios, axios);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app');
