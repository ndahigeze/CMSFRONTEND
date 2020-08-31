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
                                <h1 class="mt-2" data-category="REQUESTS" @click="viewDetails">5</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="text-center mt-2">
                            <div class="shadow" data-category="pending" style="padding:20px;">
                                <div class="row">
                                    <div class="col-md-6 mt-5">
                                        <stats-card title="PUBLISHED" type="gradient-orange" :sub-title="published.toString()" icon="ni ni-chart-pie-35" class="mb-4 mb-xl-0">

                                            <template slot="footer">
                                                <span class="text-success mr-2"><i class="fa fa-arrow-up"></i>{{(published*100)/5}}</span>
                                                <span class="text-nowrap">Of all Crafts</span>
                                            </template>
                                        </stats-card>
                                    </div>
                                    <div class="col-md-6 mt-5">
                                        <stats-card title="UNPUBLISHED" type="gradient-orange" :sub-title="unpublished.toString()" icon="ni ni-chart-pie-35" class="mb-4 mb-xl-0">

                                            <template slot="footer">
                                                <span class="text-success mr-2"><i class="fa fa-arrow-up"></i>{{(unpublished*100)/5}}</span>
                                                <span class="text-nowrap">Of all Crafts</span>
                                            </template>
                                        </stats-card>
                                    </div>
                                    <div class="col-md-6 mt-5 offset-3">
                                        <stats-card title="SOLD" type="gradient-orange" :sub-title="sold.toString()" icon="ni ni-chart-pie-35" class="mb-4 mb-xl-0">

                                            <template slot="footer">
                                                <span class="text-success mr-2"><i class="fa fa-arrow-up"></i>{{(sold*100)/5}}</span>
                                                <span class="text-nowrap">Of all Crafts</span>
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
            isCrafts: false,
            isRequests: false,
            published: 0,
            sold: 0,
            unpublished: 0,
            rejected: 0,
            accepted: 0,
            cancelled: 0,
            craftsNumber: 0

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
                url: this.$store.state.backend_url + "/crafts/user/" + this.username,
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
        }
    },

    created() {
        this.viewArtifacts()
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
