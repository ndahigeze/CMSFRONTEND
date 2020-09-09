<template>
<div>
    <div class="row">
        <div class="col-md-12">
            <div class="row mt-4">
                <div class="col-md-4">
                    <div style="cursor:pointer" :class="'shadow text-center p-4 text-dark '+ paymenttab " data-payments="PAYMENTS" @click="changetab">PAYMENTS REPORTS</div>
                </div>
                <div class="col-md-4">
                    <div style="cursor:pointer" :class="'shadow text-center p-4 text-dark '+ crafttab" data-payments="CRAFTS" @click="changetab">CRAFTS REPORTS</div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-md-12 mt-3" v-if="payments">
                    <div class="shadow"> test1</div>
                </div>
                <div class="col-md-12 mt-3" v-if="crafts">
                    <div class="shadow">test2</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import Card from "../../components/Cards/Card"
import BButton from "../../components/BaseButton"
import StatsCard from '../../components/Cards/StatsCard';
export default {
    name: "Artistdashboard",
    components: {
        Card,
        BButton,
    },
    data() {
        return {

            payments: true,
            crafts: false,
            paymenttab: "active-tab",
            crafttab: "",

        }
    },
    computed: {
        username() {
            return this.$store.state.user.username
        },
        isLoggedIn() {
            return this.$store.state.isLoggedIn
        }
    },
    methods: {

        changetab: function (evt) {
            let category = event.target.getAttribute("data-payments")
            if (category === "PAYMENTS") {
                this.paymenttab = "active-tab"
                this.crafttab = ""
                this.payments = true
                this.crafts = false
            } else {
                this.paymenttab = ""
                this.crafttab = "active-tab"
                this.payments = false
                this.crafts = true
            }
        },

    },

    created() {

    }

}
</script>

<style>
.ownerdetails {
    list-style: none;
}

.active-tab {
    background-color: #33b5e5;
    color: white;
}

.customstyle {
    border-top: 0;
    border-right: 0;
    border-left: 0;
}
</style>
