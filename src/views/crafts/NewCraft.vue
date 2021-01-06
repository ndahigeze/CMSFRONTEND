<template>
<div>
    <div class="row" style="height:500px;overflow:scroll">
        <div class="col-md-12">
            <Card >
                <div class="row">
                    <div class="col-md-12">
                        <BaseInput :alternative="true" name='name' :required=true label="Name" v-model="craft.name" type="text" placeholder="Name" />
                    </div>
                    <div class="col-md-12">
                        <BaseInput :alternative="true" name='price' :required=true label="Price" v-model="craft.price" type="text" placeholder="1200" />
                    </div>
                    <div class="col-md-12">
                        <base-input label="Craft Category">
                            <select v-model="craft.category" class="form-control">
                                <option value="PAINTING" selected>PAINTING</option>
                                <option value="STATUE">STATUE</option>
                                <option value="FIGURINE">FIGURINE</option>
                                <option value="JEWERY">JEWERY</option>
                            </select>
                        </base-input>
                    </div>

                    <div class="col-md-12">
                        <base-input name="Main picture" label="Craft picture">
                            <input type="file" @change="onUploadFile($event)" class="form-control form-control-alternative" name="mainPicture" />
                        </base-input>
                    </div>
                    <div class="col-md-12">
                        <base-input label="Description" name="Comment">
                            <textarea v-model="craft.comment" required class="form-control form-control-alternative" id="Description" rows="3"></textarea>
                        </base-input>
                    </div>

                </div>
                <div class="row">
                    <div class="col-md-12">
                        <base-button type="primary" @click="submit()">Submit</base-button>
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
import BaseInput from "../../components/Inputs/BaseInput";
export default {
    name: "NewCraft",
    props: ['uuid'],
    components: {
        Card,
        BButton,
        BaseInput,
    },
    data() {
        return {
            craft: {
                name: "",
                comment: "",
                price: "",
                category: "PAINTING"
            },
            invalidForm: "false",
            file: [],

        }
    },
    methods: {

        onUploadFile: function (evt) {

            this.file.push(evt.target.files[0]);
            console.log(evt.target.files[0])
        },

        submit: function () {
            if (this.craft.price == 0) {
                this.invalidForm = true;
            } else if (this.craft.name.lenght == 0) {
                this.invalidForm = true;
            } else if (this.craft.comment.lenght == 0) {
                this.invalidForm = 0
            } else {
                this.invalidForm = false
            }
            if (!this.invalidForm) {
                let formData = new FormData();
                formData.append("name", this.craft.name);
                formData.append('comment', this.craft.comment)
                formData.append('category', this.craft.category)
                formData.append('price', this.craft.price)
                formData.append('file', this.file[0])
                
                axios({
                    method: "POST",
                    url: this.$store.state.backend_url + "/crafts/create",
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'username': this.$store.state.user.username
                    }
                }).then(res => {

                    if (res.data.code == 200) {
                       
                        this.file = [];
                        this.craft.name = "";
                        this.craft.comment = "";
                        this.craft.category = "";
                        this.craft.price = 0;

                         this.$emit("reload")

                    } else {
                        this.$alert.error(res.data.description)
                    }

                }).catch(res => {
                    this.$alert.error("error occured try again later")
                })
            } else {
                this.$alert.error("Form is invalid")
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

.customstyle {
    border-top: 0;
    border-right: 0;
    border-left: 0;
}
</style>
