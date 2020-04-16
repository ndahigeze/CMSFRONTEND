import Vue from 'vue';
import Router from 'vue-router';
import HomeLayout from '../layouts/HomeLayouts';
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

Vue.use(Router);

export const router= new Router({
  mode: 'history',
  routes: [
    {
        path: '/',
        redirect:"home",
        component: HomeLayout,
        children: [
             {
               path:"/home",
               name:"home",
               component: () => import("../views/HomePage")
             }
        ]
    },
    {
          path: '/',
          redirect: "login",
          component: AuthLayout,
          children: [

          ]
    },

     {
        path: '/',
        redirect: "dashboard",
        component: DashboardLayout,
        children: [

        ]
     }
  ],
  
});
