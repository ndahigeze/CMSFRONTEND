<template>
<div>
    <div class="row">
        <div class="col-md-12">
            <Card>

                <div class="row mt-2">
                    <div class="col-md-12">
                        <div class="card-body description">
                            <div class="md-3 col-md-10 offset-1">
                                <input type="text" class="form-control form-control-alternative" v-model="filters[0].value" placeholder="Search . . ." />
                            </div>
                            <div class="mt-3 col-md-10 offset-1">
                                <datatable :data="payments"  :selection="false" :titles="titles" :filters="filters" />
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
import datatable from "../../components/Datatables";
import Modal from "../../components/Modal"
import Dropdown from "../../components/BaseDropdown"
import Badge from '../../components/Badge'
export default {
    name: "Crafts",
    components: {
        Card,
        BButton,
        datatable,
        Dropdown,
        Modal,
        Badge,

    },
    data() {
        return {
            payments: [],
            showdetails: false,
           
            titles: [{
                    prop: "clientPhone",
                    label: "Client Phone"
                },
                {
                    prop: 'clientName',
                    label: "Client Name"
                },
                {
                    prop: "doneAt",
                    label: "Payment date",
                    formatter: (row, column, cellValue) => {
                        var date = new Date(cellValue);
                        return  date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
                    }
                },
                {
                    prop: "amount",
                    label: "Amount",
                    formatter: (row, column, cellValue) => {
                        return "RWF " + cellValue
                    }
                }

            ],
            filters: [{
                prop: ["clientPhone", "clientName"],
                value: ""
            }]
        }
    },
    methods: {
        viewPayments: function () {
            axios({
                method: "GET",
                url: this.$store.state.backend_url + "/payments/subscriptions"
            }).then(res => {
                console.log(res);
                if (res.data.code == 200) {

                    this.payments = res.data.data.payments;
                }
            })
        }
    },
    created() {
        this.viewPayments();
    }
}
</script>

<style>

</style>
