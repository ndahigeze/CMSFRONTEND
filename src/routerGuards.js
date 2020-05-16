import Vue from 'vue';
import  {store}  from "./store/appStore";
import {
  router
} from './routes/router';

export const guards = {

    isLoggedIn: (to, from, next) => {
      
        if (store.state.isLoggedIn) {
            return next()
        }
        return router.push("/unauthorized")
    },
    isAdmin: (to, from, next) => {
        if (authUtils.isAdmin()) {
            return next()
        }
        return router.push("/unauthorized")
    },
    isSuperAdmin: (to, from, next) => {
        if (authUtils.isSuperAdmin()) {
            return next();
        }
        return router.push("/unauthorized")
    },
    isAdminOrSuperadmin: (to, from, next) => {
        if (authUtils.isAdmin() || authUtils.isSuperAdmin()) {
            return next();
        }
        return router.push("/unauthorized")
    },

   
}