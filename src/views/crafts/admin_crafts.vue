<template>
<div>
    <div class="row">
        <div class="col-md-12">
            <Card>
                <div class="row mt-2">
                    <div class="col-md-12">
                        <Tabs tabNavClasses="nav-fill flex-column flex-sm-row nav-wrapper" tabContentClasses="card shadow">
                            <TabPane id="figurines">
                                <span slot="title">
                                    FIGURINES
                                </span>

                                <div class="card-body description">
                                    <div class="row">
                                        <div class="md-3 col-md-10 offset-1">
                                            <input type="text" class="form-control form-control-alternative" v-model="filters[0].value" placeholder />
                                        </div>
                                        <div class="mt-3 col-md-10 offset-1">
                                            <datatable :data="figurines" :actionCol="actionCol" :selection="false" :titles="titles" :filters="filters" @viewdetails="viewDetails($event)" />
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane id="painting">
                                <span slot="title">
                                    PAINTING
                                </span>

                                <div class="card-body description">
                                    <div class="md-3 col-md-10 offset-1">
                                        <input type="text" class="form-control form-control-alternative" v-model="filters[0].value" placeholder />
                                    </div>
                                    <div class="mt-3 col-md-10 offset-1">
                                        <datatable :data="paintings" :actionCol="actionCol" :selection="false" :titles="titles" :filters="filters" @viewdetails="viewDetails($event)" />
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane id="statues">
                                <span slot="title">
                                    STATUES
                                </span>

                                <div class="card-body description">
                                    <div class="md-3 col-md-10 offset-1">
                                        <input type="text" class="form-control form-control-alternative" v-model="filters[0].value" placeholder />
                                    </div>
                                    <div class="mt-3 col-md-10 offset-1">
                                        <datatable :data="statues" :actionCol="actionCol" :selection="false" :titles="titles" :filters="filters" @viewdetails="viewDetails($event)" />
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane id="jeweries">
                                <span slot="title">
                                    JEWERIES
                                </span>

                                <div class="card-body description">
                                    <div class="md-3 col-md-10 offset-1">
                                        <input type="text" class="form-control form-control-alternative" v-model="filters[0].value" placeholder />
                                    </div>
                                    <div class="mt-3 col-md-10 offset-1">
                                        <datatable :data="jeweries" :actionCol="actionCol" :selection="false" :titles="titles" @viewdetails="viewDetails($event)" :filters="filters" />
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </Card>
        </div>
    </div>

    <div>
        <Modal :show.sync="modal.show">
            <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">NEW CRAFT</h5>
            </template>
            <div class="row">
                <div class="col-md-12">
                    <NewCraft @reload="reload" />
                </div>
            </div>
            <template slot="footer">
            </template>
        </Modal>
    </div>

    <!-- payment modal -->
    <Modal :show.sync='paymentModal.show' modalClasses="modal-dialog-centered modal-dialog modal-lg ">
        <template slot="header">
            <div class="row">
                <div class="col-md-12">
                    <h5 class="modal-title" id="exampleModalLabel">
                        Pay Subscription
                    </h5>
                </div>
            </div>
            <br>

        </template>
        <div class="row">
            <div class="col-md-12">
                <PaymentPage @reload="reload" :craft="craft.uuid" v-if="paymentModal.show"></PaymentPage>
            </div>
        </div>
    </Modal>

</div>
</template>

<script>
import axios from "axios";
import Card from "../../components/Cards/Card"
import BButton from "../../components/BaseButton"
import datatable from "../../components/Datatables";
import Tabs from "../../components/Tabs/Tabs"
import TabPane from "../../components/Tabs/Tab"
import Crafts_mixins from "../../Mixins/craftMixins"
import Modal from "../../components/Modal"
import NewCraft from "./NewCraft"
import Dropdown from "../../components/BaseDropdown"
import PaymentPage from './payment_page'
import Badge from '../../components/Badge'
export default {
    name: "Crafts",
    mixins: [Crafts_mixins],
    components: {
        Card,
        BButton,
        Tabs,
        TabPane,
        datatable,
        Dropdown,
        Modal,
        NewCraft,
        PaymentPage,
        Badge

    },
    data() {
        return {

            modal: {
                show: false,
            },
            paymentModal: {
                show: false,
            },
            paintings: [],
            figurines: [],
            statues: [],
            jeweries: [],
            crafts: [],
            craft: {},
            showdetails: false,
            ownerUuid: "",
            published: true,
            actionCol: {
                label: "Perfom Actions",
                props: {
                    align: "center"
                },
                buttons: [{
                    id: "viewDetails",
                    label: "",
                    classes: "btn btn-sm btn-primary",
                    event: "viewdetails",
                    icon: "fa fa-eye",
                    tooltip: {
                        placement: "top",
                        title: "View Details"
                    }
                }]
            },
            titles: [{
                    prop: "name",
                    label: "Name"
                },
                {
                    prop: 'price',
                    label: 'Price'
                },
                {
                    prop: 'status',
                    label: 'Status'
                },
                {
                    prop: 'uuid',
                    label: 'Image',
                    formatter: (row, column, cellValue) => {
                        var t = "http://localhost:8082/crafts/profile/" + cellValue;
                        return ( < img src = {
                                t
                            }
                            width = "200px"
                            height = "200" / > );
                    }
                }

            ],
            filters: [{
                prop: ["name", "phone", "email"],
                value: ""
            }]
        }
    },
    computed: {
        root_path: function () {
            return this.$store.state.backend_url
        }
    },
    methods: {
       
        unpublish: function () {
            axios({
                method: "GET",
                url: this.$store.state.backend_url + "/crafts/publish/unpublish/" + this.craft.uuid,
                headers: {
                    'username': this.$store.state.user.username
                }
            }).then(res => {
                if (res.data.code == 200) {
                    this.$alert.success("Craft is unpublished successfuly")
                    var evt = {
                        'uuid': this.craft.uuid
                    }
                    this.viewDetails(evt)
                } else {
                    this.$alert.error(res.data.description);
                }
            })
        },

        reload: function () {
            this.modal.show = false;
            this.paymentModal.show = false
            this.viewArtifacts()
            // var evt = {
            //     'uuid': this.craft.uuid
            // }
            // this.viewDetails(evt)

        },
        viewDetails: function (evt) {
            // this.showdetails = true;
            // this.viewArtifact(evt.uuid)
          this.$router.push({ name: 'CRAFT DETAILS', params: { uuid: evt.uuid } })
            
        },

        viewArtifacts: function () {
            axios({
                method: "GET",
                url: this.$store.state.backend_url + "/crafts" ,
            }).then(res => {
                console.log(res)
                if (res.data.code == 200) {
                    this.crafts = res.data.data.crafts;
                    this.filterCrafts();
                }
            })
        },
        viewArtifact: function (uuid) {
            axios({
                method: "GET",
                url: this.$store.state.backend_url + "/crafts/" + uuid,
            }).then(res => {

                if (res.data.code == 200) {
                    this.craft = res.data.data.craft;
                    this.ownerUuid = this.craft.owner.uuid;

                    if (this.craft.publish && this.craft.paidSubscription) {
                        this.published = true;
                    } else {
                        this.published = false;
                    }

                    console.log(res)
                }
            })
        },
    },
    created() {
        this.viewArtifacts();
    }
}
</script>

<style>

</style>
