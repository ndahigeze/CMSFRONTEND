<template>
<div>
    <div class="row">
        <div class="col-md-12">
            <Card>
                <div class="row">
                    <div class="col-md-4">
                        <div :class="isCrafts? 'shadow active-tab text-center mt-8 row':'shadow text-center mt-8 row'" data-category="CRAFTS" style="padding:20px" @click="viewDetails">
                            <div class="col-md-12" data-category="CRAFTS" @click="viewDetails"><strong>CRAFTS</strong></div>
                            <div class="col-md-12" data-category="CRAFTS" @click="viewDetails">
                                <h1 class="mt-2" data-category="CRAFTS" @click="viewDetails">{{craftsNumber}}</h1>
                            </div>
                        </div>
                        <div :class="isRequests? 'shadow active-tab text-center mt-2 row':'shadow text-center mt-2 row'" data-category="REQUESTS" style="padding:20px" @click="viewDetails">
                            <div class="col-md-12" data-category="REQUESTS" @click="viewDetails"><strong>REQUEST||ORDERS</strong></div>
                            <div class="col-md-12" data-category="REQUESTS" @click="viewDetails">
                                <h1 class="mt-2" data-category="REQUESTS" @click="viewDetails">{{orderNumber}}</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8" v-if="isCrafts">
                        <div class="text-center mt-2">
                            <div class="shadow" data-category="pending" style="padding:20px;">
                                <div class="row">
                                    <div class="col-md-6 mt-5">
                                        <stats-card title="PUBLISHED" type="gradient-orange" :sub-title="published.toString()"  class="mb-4 mb-xl-0">

                                            <template slot="footer">
                                                <span class="text-success mr-2"><i class="fa fa-circle"></i>
                                                   {{(craftsNumber==0)?'0':(published*100)/craftsNumber}}
                                                 </span>
                                                <span class="text-nowrap">Of all Crafts</span>
                                            </template>
                                        </stats-card>
                                    </div>
                                    <div class="col-md-6 mt-5">
                                        <stats-card title="UNPUBLISHED" type="gradient-orange" :sub-title="unpublished.toString()" class="mb-4 mb-xl-0">

                                            <template slot="footer">
                                                <span class="text-success mr-2"><i class="fa fa-circle"></i> {{(craftsNumber==0)?'0':(unpublished*100)/craftsNumber}}</span>
                                                <span class="text-nowrap">Of all Crafts</span>
                                            </template>
                                        </stats-card>
                                    </div>
                                    <div class="col-md-6 mt-5 offset-3">
                                        <stats-card title="SOLD" type="gradient-orange" :sub-title="sold.toString()"  class="mb-4 mb-xl-0">

                                            <template slot="footer">
                                                <span class="text-success mr-2"><i class="fa fa-circle"></i> {{(craftsNumber==0)?'0':(sold*100)/craftsNumber}}</span>
                                                <span class="text-nowrap">Of all Crafts</span>
                                            </template>
                                        </stats-card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="col-md-8" v-if="isRequests">
                         <div class="text-center mt-2">
                            <div class="shadow" data-category="pending" style="padding:20px;">
                                <div class="row">
                                    <div class="col-md-6 mt-5">
                                        <stats-card title="PENDING" type="gradient-orange" :sub-title="pending.toString()" class="mb-4 mb-xl-0">

                                            <template slot="footer">
                                                <span class="text-success mr-2"><i class="fa fa-cicle"></i>{{(orderNumber==0)?'0':(pending*100)/orderNumber}}</span>
                                                <span class="text-nowrap">Of all requests</span>
                                            </template>
                                        </stats-card>
                                    </div>
                                    <div class="col-md-6 mt-5">
                                        <stats-card title="ACCEPTED" type="gradient-orange" :sub-title="accepted.toString()" class="mb-4 mb-xl-0">

                                            <template slot="footer">
                                                <span class="text-success mr-2"><i class="fa fa-cicle"></i>{{(orderNumber==0)?'0':(accepted*100)/orderNumber}}</span>
                                                <span class="text-nowrap">Of all requests</span>
                                            </template>
                                        </stats-card>
                                    </div>
                                    <div class="col-md-6 mt-5">
                                        <stats-card title="REJECTED" type="gradient-orange" :sub-title="rejected.toString()"  class="mb-4 mb-xl-0">

                                            <template slot="footer">
                                                <span class="text-success mr-2"><i class="fa fa-cicle"></i>{{(orderNumber==0)?'0':(rejected*100)/orderNumber}}</span>
                                                <span class="text-nowrap">Of all requests</span>
                                            </template>
                                        </stats-card>
                                    </div>
                                    <div class="col-md-6 mt-5">
                                        <stats-card title="CANCELED" type="gradient-orange" :sub-title="cancelled.toString()" icon="ni ni-chart-pie-35" class="mb-4 mb-xl-0">

                                            <template slot="footer">
                                                <span class="text-success mr-2"><i class="fa fa-cicle"></i>{{(orderNumber==0)?'0':(cancelled*100)/orderNumber}}</span>
                                                <span class="text-nowrap">Of all requests</span>
                                            </template>
                                        </stats-card>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </Card>
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
            crafts: [],
            ownerUuid: "",
            comments: [],
            comment: "",
            isCrafts: true,
            isRequests: false,
            published: 0,
            sold: 0,
            unpublished: 0,
            pending:0,
            rejected: 0,
            accepted: 0,
            cancelled: 0,
            craftsNumber: 0,
            orderNumber:0,
           

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

        filterCrafts: function () {
            this.crafts.filter(craft => {
                if (craft.paidSubscription && craft.publish) {
                    this.published = this.published + 1;
                } else if (craft.sold) {
                    this.sold = this.sold + 1;
                } else if (!craft.publish || !craft.paidSubscription) {
                    this.unpublished = this.unpublished + 1;
                }
            })
        },
        viewArtifacts: function () {
            axios({
                methods: "GET",
                headers:{
                    username:"ADMIN"
                },
                url: this.$store.state.backend_url + "/crafts",
            }).then(res => {
                if (res.data.code == 200) {
                    this.crafts = res.data.data.crafts
                    this.craftsNumber = res.data.data.crafts.length
                    this.filterCrafts()
                }
            })
        },
        viewDetails: function () {
            let type = event.target.getAttribute("data-category")
            if (type === "CRAFTS") {
                this.isCrafts = true;
                this.isRequests = false;
            } else if (type === "REQUESTS") {
                this.isRequests = true;
                this.isCrafts = false;
            }
        },
        
         viewOrders: function () {
            axios({
                method: "GET",
                url: this.$store.state.backend_url + "/orders",
            }).then(res => {
                if (res.data.code == 200) {
                    this.orders = res.data.data.orders;
                    this.orderNumber=this.orders.length
                    this.filter_orders()
                    this.viewAll()

                }
            })
        },
         filter_orders: function () {
           
            this.orders.filter(order => {
                if (order.orderStatus == "PENDING") {
                    this.pending=this.pending+1;
                } else if (order.orderStatus == "ACCEPTED") {
                    this.accepted++;
                } else if (order.orderStatus == "REJECTED") {
                    this.rejected++;
                } else {
                    this.cancelled++;
                }
            })
        },
    },

    created() {
        this.viewArtifacts()
        this.viewOrders()
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
