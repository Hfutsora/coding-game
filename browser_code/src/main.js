// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Element from 'element-ui';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';

import getImg from '../static/constant.js';
import notifyErr from '../static/constant.js';
import notifyMsg from '../static/constant.js';
import sleep from '../static/constant.js';

Vue.use(getImg);
Vue.use(notifyErr);
Vue.use(notifyMsg);
Vue.use(sleep);

Vue.use(Element);
Vue.use({ axios,
  VueAxios });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
