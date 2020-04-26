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
             },{
               path:"/craftdetails/:uuid",
               name:"craftdetails",
               component: () => import("../views/crafts/craftdetails"),
               props:true
             },
             {
               path:"/login",
               name:"login",
               component: () => import("../views/auth/login")
             },
             {
               path:"/register",
               name:"register",
               component: () => import("../views/auth/register")
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
          {
                path: "artistdashboard",
                name: "Artistdashboard",
                component: () => import("../views/crafts/ArtistDashboard")


          }
         
        ]
     }
  ],
  
});
