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
                    <div class="shadow">
                        <div class="row">
                            <div class="col-sd-3 p-3">
                                <select class="form-control" v-model="paymenttype">
                                    <option value="subscription">SUBSCRIPTION PAYMENTS</option>
                                    <option value="crafts">CRAFTS PAYMENTS</option>
                                </select>
                            </div>
                            <div class="col-md-3 p-3">
                                <a class="btn btn-primary" @click="download">Generate Report</a>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-md-12 mt-3" v-if="crafts">
                    <div class="shadow">
                        <div class="row">
                            <div class="col-sd-3 p-3">
                                <select class="form-control" v-model="craft_report">
                                    <option value="SOLD">SOLD</option>
                                    <option value="PUBLISHED">PUBLISHED</option>
                                    <option value="ALL">ALL</option>
                                </select>
                            </div>
                            <div class="col-md-3 p-3">
                                <a class="btn btn-primary" @click="genCraft">Generate Report</a>
                            </div>
                        </div>

                    </div>

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
            paymenttype: "subscription",
            craft_report:"SOLD",

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
        download: function () {
            axios({
                method: "GET",
                url: this.$store.state.backend_url + "/payments/report/" + this.paymenttype
            }).then(res => {
                console.log(res);
                if (res.data.code == 200) {

                    this.payments = res.data.data.payments;
                }
            }).catch(err => {

            })
        },
       genCraft:function(){
           axios({
              method:"GET",
              url:this.$store.state.backend_url +"/crafts/report/"+this.craft_report
           }).then(res =>{
                console.log(res)
           }).catch(err =>{
               console.log(err)
           })
       }

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
