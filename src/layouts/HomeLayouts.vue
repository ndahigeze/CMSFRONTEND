<template>
  <div>
      <div class="main-content">
          <div>

                <NavBar class="navbar navbar-light"
                        v-model="showNavbar"
                        type="light">
                    <a slot="brand" class="navbar-brand" href="#">CMS</a>
                    <div class="navbar-collapse-header">
                        <div class="row">
                            
                            <div class="col-6 collapse-close">
                                <button @click="showNavbar = false" type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-default" aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
                                    <span></span>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <ul class="navbar-nav ml-md-auto">
                        <li class="nav-item dropdown">
                            <base-dropdown>
                                <BaseButton slot="title-container" type="secondary" class=" btn-sm dropdown-toggle">
                                </BaseButton>
                                <a class="dropdown-item" v-if="!isLoggedIn" href="/login">Login</a>
                                <a class="dropdown-item" v-if="!isLoggedIn" href="/register">Register</a>
                                <a class="dropdown-divider"></a>
                                <a class="dropdown-item" href="#" v-if="isLoggedIn">Profile</a>
                                <a class="dropdown-item" href="#" v-if="isLoggedIn">Dashboard</a>
                            </base-dropdown>
                        </li>
                    </ul>
                </NavBar>
          </div>
          <div class="container-fluid mt-3">
             <slide-y-up-transition mode="out-in" origin="center top">
                        <router-view></router-view>
             </slide-y-up-transition>
          </div>
      </div>
     
     

  </div>
</template>

<script>
import NavBar from "../components/Navbar/BaseNav"
import DropDown from "../components/BaseDropdown"
import BaseButton from "../components/BaseButton"
import { SlideYUpTransition } from 'vue2-transitions'
export default {
    name:"HomeLayout",
    components:{
      NavBar,
      DropDown,
      BaseButton,
      SlideYUpTransition
    },
    data(){
        return{
            showNavbar:true,
    
        }
    },
    computed:{
        username(){
            return this.$store.state.user.username
        },
        isLoggedIn(){
            return this.$store.state.isLoggedIn
        }
    }
}
</script>

<style>

</style>