<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="4">
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="姓名"
              rules="required|max:10"
            >
              <v-text-field
                v-model="name"
                :counter="10"
                :error-messages="errors"
                label="姓名"
                required
              ></v-text-field>
            </validation-provider>

            <v-file-input
              accept="image/*"
              label="上传头像"
              type="file"
              ref="uploadImg"
              v-model="img"
            ></v-file-input>

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
                v-model="phoneNumber"
                :counter="11"
                :error-messages="errors"
                label="手机号码"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="邮箱"
              rules="required|email"
            >
              <v-text-field
                v-model="email"
                :error-messages="errors"
                label="邮箱"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="密码"
              rules="required"
            >
              <v-text-field
                v-model="password"
                :error-messages="errors"
                label="密码"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                required
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              rules="box"
              name="checkbox"
            >
              <v-checkbox
                v-model="checkbox"
                :error-messages="errors"
                value="1"
                label="我已接受并同意RANNI隐私条款"
                type="checkbox"
                required
              ></v-checkbox>
            </validation-provider>

            <v-btn class="mr-4" type="submit" :disabled="invalid"> 提交 </v-btn>
            <v-btn @click="clear"> 重置 </v-btn>
          </form>
        </validation-observer>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" top centered timeout="4000">
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
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

extend("email", {
  ...email,
  message: "邮箱 需符合规范",
});

extend("box", {
  ...required,
  message: "请同意条款",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    name: "",
    img: null,
    imgStr: "",
    phoneNumber: "",
    email: "",
    password: "",
    checkbox: null,
    show1: false,
    snackbar: false,
    snackbarText: "该用户已存在",
  }),
  created() {
    // this.query();
  },

  methods: {
    submit() {
      this.$refs.observer.validate();
      this.codeBase64();
    },
    clear() {
      this.name = "";
      this.phoneNumber = "";
      this.email = "";
      this.password = "";
      this.checkbox = null;
      this.$refs.observer.reset();
    },
    codeBase64() {
      let base64 = "";
      let file = this.img;
      let reader = new FileReader();
      let that = this;
      reader.onload = (function () {
        return function () {
          base64 = this.result;
          that.imgStr = base64;
          that.checkUser();
        };
      })(file);
      reader.readAsDataURL(file);
    },
    checkUser() {
      if (this.phoneNumber.length > 10) {
        this.axios
          .post("http://127.0.0.1:3000/checkUser", {
            phone: this.phoneNumber,
          })
          .then((res) => {
            if (res.data == "No") {
              this.snackbar = true;
            } else {
              this.add();
            }
          });
      }
    },
    add() {
      this.axios
        .post("http://127.0.0.1:3000/add", {
          name: this.name,
          phonenumber: this.phoneNumber,
          email: this.email,
          password: this.password,
          img: this.imgStr,
        })
        .then((res) => {
          console.log(res);
          this.$router.push({ path: `/login` });
        });
    },
  },
};
</script>

<style>
</style>