<template>
  <div>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <p class="text-h4 my-5">欢迎来到Ranni</p>
        <validation-provider
          v-slot="{ errors }"
          name="手机号码"
          :rules="{
            required: true,
            digits: 11,
            regex: '^1[3|4|5|7|8][0-9]{9}$',
          }"
        >
          <v-text-field
            v-model="phone"
            label="手机号"
            :error-messages="errors"
            required
            outlined
            dark
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
      <div class="text-body-2 blue--text" route="/register">
        <router-link to="/register" style="text-decoration: none">
          <span style="color: #bcbcbc">立即创建您的账号</span>
          <v-icon x-small color="#bcbcbc">mdi-arrow-top-right</v-icon>
        </router-link>
      </div>
    </validation-observer>
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
  message: "{_field_}不符合格式",
});

extend("box", {
  ...required,
  message: "请同意条款",
});
export default {
  name: "Login",
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
  }),
  methods: {
    submit() {
      this.queryLog();
    },
    queryLog() {
      this.axios
        .post("http://127.0.0.1:3000/log", {
          phonenumber: this.phone,
          password: this.pass,
        })
        .then((res) => {
          if (res.data != "No") {
            this.$store.commit("setUser", res.data);
            this.$router.push({ path: `/home` });
          } else {
            this.snackbar = true;
          }
        });
    },
  },
};
</script>

<style>
</style>