<template>
<div>
    <div class="row">
        <div class="col-md-6 offset-3 mt-8">
            <Card>
                <div class="row">
                    <div class="col-md-12 d-flex justify-content-center">
                        <h1>Sign up</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <form>
                            <div class="row">
                                <div class="col-md-6">
                                    <BaseInput name='name' :required=true label="Name" v-model="user.name" type="text" placeholder="Ex: Eric" />

                                    <BaseInput name="username" :required=true label="Username" v-model="user.username" type="text" placeholder="Username" />

                                    <base-input label="Register as">
                                        <select v-model="user.title" class="form-control">
                                            <option value="ARTIST" selected>ARTIST</option>
                                            <option value="CUSTOMER">CUSTOMER</option>
                                        </select>
                                    </base-input>

                                    <BaseInput name="password" :required=true label="Password" v-model="user.password" type="password" placeholder="password" />
                                </div>
                                <div class="col-md-6">
                                    <BaseInput name="phone number" :required=true label="Phone" v-model="user.phone" type="text" placeholder="Phone" />

                                    <BaseInput name="email" :required=true label="Email" v-model="user.email" type="email" placeholder="Name" />
                                    <BaseInput name="address" label="Address" v-model="user.address" type="text" placeholder="address"></BaseInput>
                                    <BaseInput name="confirm password" :required=true label="Confirm Password" v-model="confirmPassword" type="password" placeholder="Confirm password" />

                                </div>
                            </div>

                            <BButton block type="default" @click="submit()">Sign up</BButton>
                        </form>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import Card from "../../components/Cards/Card";
import BButton from "../../components/BaseButton";
import BaseInput from "../../components/Inputs/BaseInput";
export default {
    name: "register",
    components: {
        Card,
        BButton,
        BaseInput
    },
    data() {
        return {
            user: {
                name: "",
                email: "",
                phone: "",
                category: "",
                username: "",
                password: "",
                title: "ARTIST",
                address: "",
            },
            confirmPassword: "",
            invalidForm: "false",
        }
    },
    methods: {

        checkValidation: function (evt) {
            console.log(evt)
        },
        submit: function () {
            var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
            if (this.user.name.length < 3) {
                this.invalidForm = true;
            } else if (this.user.username.length < 3) {
                this.invalidForm = true;
            } else if (this.user.password != this.confirmPassword) {
                this.invalidForm = true;
            } else if (!emailPattern.test(this.user.email)) {
                this.invalidForm = true;
            } else if (this.user.phone.length < 10) {
                this.invalidForm = true;
            } else {
                this.invalidForm = false;
            }

            if (!this.invalidForm) {
                let formData = new FormData();
                formData.append("username", this.user.username);
                formData.append("name", this.user.name);
                formData.append("phone", this.user.phone);
                formData.append("email", this.user.email);
                formData.append("password", this.user.password)
                formData.append('title', this.user.title)
                formData.append("address", this.user.address)
                axios({
                    method: "POST",
                    data: formData,
                    url: this.$store.state.backend_url + "/users/create",
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.$alert.success("Account is created, You may login")
                    } else {
                        this.$alert.error(res.data.description)
                    }
                })
            } else {
                this.$alert.error("Form is invalid, Fill the form with valid information")
            }

        },

    }
}
</script>

<style>

</style>
