<template>
  <div>
    <div class="my-5">
      <v-expansion-panels accordion flat>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row>
              <v-col lg='3'>
                <!-- <v-sheet width="400">
                  <v-text-field
                    label="密码"
                    :value="$store.state.user.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    readonly
                  >
                    <template v-slot:prepend>
                      <v-icon large class="mr-4">mdi-lock</v-icon>
                    </template>
                  </v-text-field>
                </v-sheet> -->
                <v-icon large> mdi-lock </v-icon>
                <span class="ml-5 text-h6 pt-1">
                  {{ show1 ? user.password : "●●●●●●●●●●●" }}
                </span>
              </v-col>
              <v-col>
                <v-btn icon @click="show1 = !show1" class="ml-4"
                  ><v-icon>{{
                    show1 ? "mdi-eye-off" : "mdi-eye"
                  }}</v-icon></v-btn
                >
              </v-col>
            </v-row>
            <template v-slot:actions>
              <span
                class="
                  font-weight-bold
                  text-subtitle-1 text-decoration-underline
                "
                >修改</span
              >
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="d-flex align-center">
              <v-sheet>
                <v-btn
                  class="white--text black"
                  rounded
                  @click="sendCode()"
                  :disabled="codeFlag"
                  >获取验证码</v-btn
                >
              </v-sheet>
              <v-sheet width="200">
                <v-otp-input
                  v-model="otp"
                  length="4"
                  class="ml-5"
                  @finish="onFinish"
                  :disabled="codeFlag"
                ></v-otp-input>
                <v-overlay absolute :value="loading" opacity="0.1">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-overlay>
              </v-sheet>
              <v-sheet class="ml-5">
                <v-icon
                  size="30"
                  :color="codeIcon ? 'teal' : 'red'"
                  v-show="showIcon"
                  >{{
                    codeIcon ? "mdi-check-circle" : "mdi-close-circle"
                  }}</v-icon
                >
              </v-sheet>
            </div>

            <v-sheet class="d-flex align-center">
              <v-sheet width="600" class="ml-4"
                ><v-text-field
                  label="新的密码"
                  counter="20"
                  v-model="newCode"
                  :disabled="!codeFlag"
                >
                </v-text-field
              ></v-sheet>
              <v-sheet width="200" class="ml-4">
                <v-btn icon x-large :disabled="!codeFlag" @click="changePass()"
                  ><v-icon size="40">mdi-check</v-icon></v-btn
                >
              </v-sheet>
            </v-sheet>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-divider></v-divider>
    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="2000" top>
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      newCode: "",
      show1: false,
      loading: false,
      snackbar: false,
      snackbarColor: "default",
      otp: "",
      text: "",
      expectedOtp: "4444",
      codeIcon: false,
      showIcon: false,
      codeFlag: false,
    };
  },
  created() {
    console.log(this.user);
  },
  methods: {
    onFinish() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.showIcon = true;
        this.queryCode();
      }, 1000);
    },
    sendCode() {
      this.axios
        .post("http://127.0.0.1:3000/sendcode", {
          email: this.user.email,
        })
        .then((res) => {
          console.log(res.data);
          this.snackbarColor = "black";
          this.text = "验证码已发送";
          this.snackbar = true;
        });
    },
    queryCode() {
      this.axios
        .post("http://127.0.0.1:3000/changeCode", {
          email: this.email,
          code: this.otp,
        })
        .then((res) => {
          if (res.data != "No") {
            this.snackbarColor = "success";
            this.text = "验证码正确";
            this.codeIcon = true;
            this.codeFlag = true;
          } else {
            this.snackbarColor = "warning";
            this.text = "验证码错误";
            this.codeIcon = false;
          }
          this.snackbar = true;
        });
    },
    changePass() {
      this.axios
        .post("http://127.0.0.1:3000/changeUserPass", {
          userInfo: this.newCode,
          userPhone: this.$store.state.user.phone,
        })
        .then((res) => {
          this.$emit("changeUser", res.data);
          this.snackbarColor = "black";
          this.text = "修改成功";
          this.snackbar = true;
          console.log(res.data);
        });
    },
  },
};
</script>

<style>
</style>