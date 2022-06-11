<template>
  <div>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <p class="text-h4 my-5">欢迎，伙伴</p>
        <validation-provider
          v-slot="{ errors }"
          name="手机号码"
          :rules="{
            required: true,
            digits: 11,
            regex: '^1[0-9]{10}$',
          }"
        >
          <v-text-field
            v-model="phone"
            label="手机号"
            :error-messages="errors"
            required
            outlined
          ></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" name="密码" rules="required">
          <v-text-field
            v-model="pass"
            type="password"
            label="密码"
            :error-messages="errors"
            outlined
          ></v-text-field>
        </validation-provider>

        <v-btn
          class="mr-4"
          rounded
          color="primary"
          large
          type="submit"
          width="300px"
          :disabled="invalid"
        >
          登录
        </v-btn>
        <validation-provider v-slot="{ errors }" rules="box" name="checkbox">
          <v-checkbox
            v-model="checkbox"
            :error-messages="errors"
            value="1"
            label="我已接受并同意隐私条款"
            type="checkbox"
            required
            class="ml-2"
          ></v-checkbox>
        </validation-provider>
      </form>
    </validation-observer>
    <div class="text-body-2 blue--text" route="/register">
      <router-link to="/admin/register" style="text-decoration: none">
        <span style="color:#bcbcbc">立即创建您的账号</span>
        <v-icon x-small color="#bcbcbc">mdi-arrow-top-right</v-icon>
      </router-link>
    </div>
    <!-- <p class="text-body-2 blue--text mt-8" @click="lightLog()">光速登录，仅测试使用(普通用户)，记得删除</p>
     -->

    <v-snackbar v-model="snackbar" top centered timeout="4000">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
import { required, digits, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} 需要 {length} 位.",
});

extend("required", {
  ...required,
  message: "{_field_} 不可为空",
});

extend("max", {
  ...max,
  message: "{_field_} 不可超过 {length} 个字符",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} 不符合格式",
});

extend("box", {
  ...required,
  message: "请同意条款",
});
export default {
  name: "LoginEmail",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    phone: "",
    pass: "",
    checkbox: null,
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
    snackbarText: "请输入正确的账号或密码",
    snackbar: false,
    tab: null,
  }),
  methods: {
    submit() {
      console.log("click");
      this.queryLog();
    },
    queryLog() {
      this.axios
        .post("http://127.0.0.1:3000/admin/log", {
          phonenumber: this.phone,
          password: this.pass,
        })
        .then((res) => {
          if (res.data != "No") {
            // console.log(res.data.email)
            console.log("登录成功");
            this.$store.commit("setAdmin", res.data);
            //console.log(this.$store.state.user)
            this.$router.push({ path: `/admin/home` });
          } else {
            console.log("密码错误");

            this.snackbar = true;
          }
        });
    },
    //仅测试使用，记得删除
    lightLog(){
      this.axios
        .post("http://127.0.0.1:3000/test/lightlog", {
          phone: 11111111111,
        })
        .then((res) => {
           this.$store.commit("setUser", res.data);
           this.$router.push({ path: `/home` });
        });
    }
  },
};
</script>

<style>
</style>