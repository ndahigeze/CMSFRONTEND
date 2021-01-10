<template>
<div class="wrapper">
    <notifications></notifications>
    <side-bar>
        <template slot-scope="props" slot="links">
            <sidebar-item v-if="role=='ARTIST'" :link="{
            name: 'Dashboards',
            icon: 'ni ni-shop text-primary',
            path:'/Artistdashboard'
            }">

            </sidebar-item>
            <sidebar-item v-if="role=='ADMIN'" :link="{
            name: 'Dashboards',
            icon: 'ni ni-shop text-primary',
            path:'Admindashboard'
            }">

            </sidebar-item>
            <sidebar-item v-if="role=='ARTIST'" :link="{
            name: 'Crafts',
            icon: 'ni ni-calendar-grid-58 text-red',
            path: '/Crafts'
          }">
            </sidebar-item>

            <sidebar-item v-if="role=='ARTIST'" :link="{
            name: 'Orders',
            icon: 'ni ni-calendar-grid-58 text-red',
            path: '/Orders'
          }">
            </sidebar-item>

            <sidebar-item v-if="role=='ARTIST'" :link="{
            name: 'Craft payment',
            icon: 'ni ni-calendar-grid-58 text-red',
            path: '/craft_payments'
          }">
            </sidebar-item>

            <sidebar-item v-if="role=='ADMIN'" :link="{
               name: 'PAYMENTS',
               icon: 'ni ni-calendar-grid-58 text-red',
               path: '/subscriptions'
             }">
            </sidebar-item>
            <sidebar-item v-if="role=='ADMIN'" :link="{
             name:'REPORTS',
             icon:'ni ni-calendar-grid-58 text-red',
             path:'/reports'
            }" />
            <sidebar-item v-if="role=='ADMIN'" :link="{
                name:'CRAFTS',
                icon:'fa fa-clone',
                path:'admin_crafts'
            }"/>

        </template>

    </side-bar>
    <div class="main-content">
        <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

        <div @click="$sidebar.displaySidebar(false)" class="container-fluid mt-3">
            <fade-transition :duration="200" origin="center top" mode="out-in">
                <!-- your content here -->
                <router-view></router-view>
            </fade-transition>
        </div>

    </div>
</div>
</template>

<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

function hasElement(className) {
    return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
    if (hasElement(className)) {
        new PerfectScrollbar(`.${className}`);
    } else {
        // try to init it later in case this component is loaded async
        setTimeout(() => {
            initScrollbar(className);
        }, 100);
    }
}

import DashboardNavbar from './DashboardNavbar.vue';
import DashboardContent from './Content.vue';
import {
    FadeTransition
} from 'vue2-transitions';

export default {
    components: {
        DashboardNavbar,
        DashboardContent,
        FadeTransition
    },
    computed: {
        username() {
            return this.$store.state.user.username
        },
        role() {
            return this.$store.state.user.role.title
        },
    },
    methods: {
        initScrollbar() {
            let isWindows = navigator.platform.startsWith('Win');
            if (isWindows) {
                initScrollbar('sidenav');
            }
        }
    },
    mounted() {
        this.initScrollbar()
    }
};
</script>

<style lang="scss">
</style>
