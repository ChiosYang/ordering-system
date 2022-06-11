<template>
  <div>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <p class="text-h4 my-5">欢迎来到Ranni</p>
        <validation-provider
          v-slot="{ errors }"
          name="邮箱"
          rules="required|email"
        >
          <v-text-field
            v-model="email"
            label="邮箱"
            :error-messages="errors"
            required
            outlined
          
          ></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" name="验证码" rules="required">
          <v-text-field
            v-model="code"
            label="验证码"
            :error-messages="errors"
            outlined
            :disabled="isSendCode"
          >
          </v-text-field>
        </validation-provider>
        <div class="mt-4">
          <v-btn
            rounded
            color="#1565C0"
            large
            dark
            depressed
            width="200"
            class="mr-5"
            @click="checkEmail()"
            >获取验证码</v-btn
          >
          <v-btn
            class="mr-4"
            rounded
            color="primary"
            large
            type="submit"
            width="250px"
            :disabled="invalid"
          >
            登录
          </v-btn>
        </div>

        <validation-provider v-slot="{ errors }" rules="box" name="checkbox">
          <v-checkbox
            v-model="checkbox"
            :error-messages="errors"
            value="1"
            label="我已接受并同意隐私条款"
            type="checkbox"
            required
            class="ml-2 mt-8"
          ></v-checkbox>
        </validation-provider>
      </form>
    </validation-observer>
    <div class="text-body-2 mt-1" route="/register">
      <router-link to="/register" style="text-decoration: none">
        <span style="color: #bcbcbc">立即创建您的账号</span>
        <v-icon x-small color="#bcbcbc">mdi-arrow-top-right</v-icon>
      </router-link>
    </div>
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
  message: "{_field_} 需要 {length} 位. ",
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
    code: "",
    email: "",
    checkbox: null,
    snackbarText: "请输入正确的验证码",
    snackbar: false,
    tab: null,
    items: ["密码登录", "邮箱登录"],
    isSendCode: true,
  }),
  methods: {
    submit() {
      this.queryLog();
    },
    queryLog() {
      this.axios
        .post("http://127.0.0.1:3000/loginCode", {
          email: this.email,
          code: this.code,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data != "No") {
            console.log("登录成功");
            this.$store.commit("setUser", res.data);
            this.$router.push({ path: `/home` });
          } else {
            console.log("验证码错误");
            this.snackbarText = "请输入正确的验证码";
            this.snackbar = true;
          }
        });
    },
    checkEmail() {
      if (this.email != "") {
        this.axios
          .post("http://127.0.0.1:3000/checkemail", {
            email: this.email,
          })
          .then((res) => {
            if (res.data == "No") {
              this.snackbarText = "此邮箱尚未注册";
              this.snackbar = true;
            } else {
              this.sendCode();
            }
          });
      } else {
        this.snackbarText = "邮箱为空";
        this.snackbar = true;
      }
    },
    sendCode() {
      this.axios
        .post("http://127.0.0.1:3000/sendcode", {
          email: this.email,
        })
        .then((res) => {
          console.log(res.data);
          this.isSendCode = false;
        });
    },
  },
};
</script>

<style>
</style>