import Vue from 'vue';
import VueRouter from 'vue-router';

import A from '../views/A.vue';
import B from '../views/B.vue';
import C from '../views/C.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/a',
      name: 'A',
      component: A
    },
    {
      path: '/b',
      name: 'B',
      component: B
    },
    {
      path: '/c',
      name: 'C',
      component: C
    }
  ]
});