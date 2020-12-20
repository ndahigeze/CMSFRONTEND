import Vue from 'vue';
import Router from 'vue-router';
import HomeLayout from '../layouts/HomeLayouts';
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
import {
  guards
} from "../routerGuards";

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
             },
             {
               path:"/clientcraft",
               name:"clientcraft",
               component: () => import("../views/crafts/clientCrafts")
             },
             {
               path:"/my_requests",
               name:"/my_requests",
               component: () => import("../views/crafts/myRequests")
             },
             {
               path:"publicprofile",
               name:"publicprofile",
               component: () => import("../views/auth/profile")
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
                beforeEnter:guards.isLoggedIn,
                path: "artistdashboard",
                name: "Artistdashboard",
                component: () => import("../views/dashboard/ArtistDashboard")
          },
          {    
            beforeEnter:guards.isLoggedIn,
            path: "admindashboard",
            name: "Admindashboard",
            component: () => import("../views/dashboard/AdminDashboard")
          },
          {  
               beforeEnter: guards.isLoggedIn,
               path: "CustomDashboard",
               name: "CustomDashboard",
               component: () => import("../views/dashboard/ArtistDashboard")
          },
          {
            beforeEnter: guards.isLoggedIn,
            path:"Crafts",
            name:"Crafts",
            component: () => import("../views/crafts/Crafts")
          },
          {
            beforeEnter:guards.isLoggedIn,
            path:"orders",
            name:"orders",
            component:()=> import("../views/orders/craftOrders")
          },
          {
            beforeEnter:guards.isLoggedIn,
            path:"Craftsuserdetails/:uuid",
            name:"Craft details",
            component: () => import("../views/crafts/Details"),
            props:true
          },
          {
             beforeEnter: guards.isLoggedIn,
             path: "craft_payments",
             name: "CRAFT PAYMENT",
             component:()=> import("../views/payments/craft_payments")
           },
           {
             beforeEnter:guards.isLoggedIn,
             path:"subscriptions",
             name:"SUBSCRIPTIONS",
             component:()=>import("../views/payments/subscription_payments")
           },
           {
             beforeEnter:guards.isLoggedIn,
             path:"reports",
             name:"REPORTS",
             component: () => import("../views/reports/report_page")
           },
           {
            beforeEnter:guards.isLoggedIn,
            path:"craft_details/:uuid",
            name:"CRAFT DETAILS",
            component: () => import("../views/crafts/Details"),
            props:true
           },
           {
            path:"profile",
            name:"profile",
            component: () => import("../views/auth/profile")
          }
         
        ]
     }
  ],
  
});
