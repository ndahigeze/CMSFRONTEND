<template>
  <div>
      <div class="main-content">
          <div>

                <NavBar class="navbar navbar-default"
                        v-model="showNavbar"
                        type="primary" show="true">
                    <a slot="brand" class="navbar-brand" href="/home" >
                     <h1 style="color:white">CMS</h1>
                    </a>
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
                    
                    <ul class="navbar-nav ml-lg-auto">
                            <li class="nav-item mr-5" style="color:white" v-if="isLoggedIn">
                                 <a  style="color:white" href="/clientcraft">MY CRAFTS</a>
                            </li>
                            <li class="nav-item mr-5" style="color:white" v-if="isLoggedIn">
                                  <a  style="color:white" href="#">MY REQUESTS</a>
                            </li>
                            <base-dropdown tag="li" title="Settings" titleClasses="nav-item" menuClass="titleClasses">
                                <BaseButton slot="title-container" type="secondary" class=" btn-sm btn-secondary dropdown-toggle">
                                </BaseButton>
                                <a class="dropdown-item" href="#" v-if="isLoggedIn">Profile</a>
                                <a class="dropdown-item" href="#" v-if="isLoggedIn">Dashboard</a>
                                <a class="dropdown-divider"></a>
                                <a class="dropdown-item" v-if="!isLoggedIn" href="/login">Login</a>
                                <a class="dropdown-item" v-if="isLoggedIn" href="#" @click="logout">Logout</a>
                                <a class="dropdown-item" v-if="!isLoggedIn" href="/register">Register</a>
                            </base-dropdown>
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
    },
    methods:{
        logout:function(){
              this.$store.dispatch("logout")
        }
    }
}
</script>

<style>

</style>