import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import HomePage from '@/pages/homePage';
import ChoosePage from '@/pages/choosePage';
import GamePage from '@/pages/gamePage.vue';
import PersonalPage from '@/pages/personalPage.vue';
import FreedomPage from '@/pages/freedomPage.vue';
import setFreedomPage from '@/pages/setFreedomPage';
import testMapPage from '@/pages/testMapPage';
import playFreePage from '@/pages/playFreePage';
import accountIndex from '@/components/account/index.vue';
import login from '@/components/account/login.vue';
import register from '@/components/account/register.vue';
import phoneLogin from '@/components/account/phoneLogin';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/choosepage',
      name: 'ChoosePage',
      component: ChoosePage
    },
    {
      path: '/gamePage',
      name: 'GamePage',
      component: GamePage
    },
    {
      path: '/accountIndex',
      name: 'AccountIndex',
      component: accountIndex,
      children: [
        {
          path: '/login',
          name: 'Login',
          component: login
        },
        {
          path: '/phoneLogin',
          name: 'PhoneLogin',
          component: phoneLogin
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: register
    },
    {
      path: '/personalPage',
      name: 'PersonalPage',
      component: PersonalPage
    },
    {
      path: '/freedomPage',
      name: 'freedomPage',
      component: FreedomPage
    },
    {
      path: '/setFreedomPage',
      name: 'setFreedomPage',
      component: setFreedomPage
    },
    {
      path: '/testMapPage',
      name: 'testMapPage',
      component: testMapPage
    },
    {
      path: '/playFreePage',
      name: 'PlayFreePage',
      component: playFreePage
    }
  ]
});
