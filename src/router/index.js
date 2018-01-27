import Vue from 'vue'
import Router from 'vue-router'
import Contacts from '@/components/Contacts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Contacts",
      component: Contacts
    }
  ]
});
