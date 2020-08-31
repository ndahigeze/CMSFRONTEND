<template>
<base-nav container-classes="container-fluid" class="navbar-top border-bottom navbar-expand" :class="{'bg-success': type === 'default'}">
    <!-- Search form -->
    <div class="navbar-search form-inline mr-sm-3 ">
        <H1 class="text-white">{{currentRouteName}}</H1>
    </div>
    <!-- Navbar links -->
    <ul class="navbar-nav align-items-center ml-md-auto">
        <li class="nav-item d-xl-none">
            <!-- Sidenav toggler -->
            <div class="pr-3 sidenav-toggler" :class="{active: $sidebar.showSidebar, 'sidenav-toggler-dark': type === 'default', 'sidenav-toggler-light': type === 'light'}" @click="toggleSidebar">
                <div class="sidenav-toggler-inner">
                    <i class="sidenav-toggler-line"></i>
                    <i class="sidenav-toggler-line"></i>
                    <i class="sidenav-toggler-line"></i>
                </div>
            </div>
        </li>
        <li class="nav-item d-sm-none">
            <a class="nav-link" href="#" data-action="search-show" data-target="#navbar-search-main">
                <i class="ni ni-zoom-split-in"></i>
            </a>
        </li>

    </ul>
    <ul class="navbar-nav align-items-center ml-auto ml-md-0">
        <base-dropdown menu-on-right class="nav-item" tag="li" title-tag="a" title-classes="nav-link pr-0">
            <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
                <div class="media align-items-center">
                    <span class="avatar avatar-sm rounded-circle">
                        <h2 class="text-primary">{{username?username[0]:'DEV'[0]}}</h2>
                    </span>
                    <div class="media-body ml-2 d-none d-lg-block">
                        <span class="mb-0 text-sm  font-weight-bold">{{name? name:"Unknown"}}</span>
                    </div>
                </div>
            </a>

            <template>

                <div class="dropdown-header noti-title">
                    <h6 class="text-overflow m-0">Welcome!</h6>
                </div>
                <a href="#!" class="dropdown-item">
                    <i class="ni ni-single-02"></i>
                    <span>My profile</span>
                </a>

                <div class="dropdown-divider"></div>
                <a href="#!" class="dropdown-item" @click="logout">
                    <i class="ni ni-user-run"></i>
                    <span>Logout</span>
                </a>

            </template>
        </base-dropdown>
    </ul>
</base-nav>
</template>

<script>
import {
    CollapseTransition
} from 'vue2-transitions';
import {
    BaseNav,
    Modal
} from '@/components';

export default {
    components: {
        CollapseTransition,
        BaseNav,
        Modal
    },
    props: {
        type: {
            type: String,
            default: 'default', // default|light
            description: 'Look of the dashboard navbar. Default (Green) or light (gray)'
        }
    },
    computed: {
        routeName() {
            const {
                name
            } = this.$route;
            return this.capitalizeFirstLetter(name);
        },
        username() {
            return this.$store.state.user.username
        },
        role() {
            return this.$store.state.user.role.title
        },
        name() {
            return this.$store.state.user.name
        },
        currentRouteName() {
            return this.$route.name;
        }
    },
    data() {
        return {
            activeNotifications: false,
            showMenu: false,
            searchModalVisible: false,
            searchQuery: '',
        };
    },
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        toggleNotificationDropDown() {
            this.activeNotifications = !this.activeNotifications;
        },
        closeDropDown() {
            this.activeNotifications = false;
        },
        toggleSidebar() {
            this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
        },
        hideSidebar() {
            this.$sidebar.displaySidebar(false);
        },
        logout() {
            this.$store.dispatch("logout")
        }
    }
};
</script>
