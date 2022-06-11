<template>
  <v-container class="mt-8">
    <v-row justify="center" no-gutters>
      <v-col lg="8">
        <v-row no-gutters>
          <v-col lg="1">
            <v-dialog v-model="dialog" width="800">
              <template v-slot:activator="{ on, attrs }">
                <v-badge
                  bordered
                  color="black"
                  icon="mdi-pencil"
                  overlap
                  bottom
                  avatar
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-avatar
                    
                    size="52"
                    style="margin-left: 30px; cursor: pointer"
                    @click="dialog = true"
                  >
                    <v-img :src="$store.state.user.avatar"></v-img>
                  </v-avatar>
                </v-badge>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  修改您的头像
                </v-card-title>

                <v-card-text>
                  <div class="d-flex justify-space-around">
                    <v-sheet>
                      <p
                        class="
                          mb-6
                          text-subtitle-1
                          mt-5
                          grey--text
                          text--darken-1
                        "
                      >
                        当前头像
                      </p>
                      <v-avatar size="300"
                        ><v-img :src="$store.state.user.avatar"></v-img
                      ></v-avatar>
                    </v-sheet>
                    <v-sheet>
                      <v-file-input
                        accept="image/*"
                        label="上传新的头像"
                        type="file"
                        ref="uploadImg"
                        v-model="img"
                      ></v-file-input>
                      <v-avatar size="300">
                        <v-img
                          :src="img == null ? null : imgStr"
                          width="300"
                          height="300"
                        ></v-img>
                      </v-avatar>
                    </v-sheet>
                  </div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="changeAvatar()">
                    确定
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col lg="2">
            <p class="text-h5 font-weight-bold mb-0">你好，{{ user.name }}</p>
            <p class="text-body-2 grey--text text--darken-2 mt-2">
              想更改用户？<a @click="exitUser()"> 退出</a>
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="4">
            <v-btn depressed outlined text width="380" height="100" to="/order">
              <p class="text-subtitle-1 mt-5 font-weight-bold">
                <v-icon>mdi-card-text</v-icon>
                我的订单
                <v-icon style="margin-left: 200px">mdi-arrow-right</v-icon>
              </p>
            </v-btn>
          </v-col>
          <!-- <v-col lg="4">
            <v-btn depressed outlined text width="380" height="100">
              <p class="text-subtitle-1 mt-5 font-weight-bold">
                <v-icon>mdi-ticket</v-icon>
                优惠券
                <v-icon style="margin-left: 200px">mdi-arrow-right</v-icon>
              </p>
            </v-btn>
          </v-col>
          <v-col lg="4">
            <v-btn depressed outlined text width="380" height="100">
              <p class="text-subtitle-1 mt-5 font-weight-bold">
                <v-icon>mdi-card-text</v-icon>
                我的订单
                <v-icon style="margin-left: 200px">mdi-arrow-right</v-icon>
              </p>
            </v-btn>
          </v-col> -->
        </v-row>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
          class="mt-8"
        >
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <userInfo :user="user" @changeUser="userChange($event)"></userInfo>
          </v-tab-item>
          <v-tab-item>
            <userCode :user="user2"  @changeUser="userChange($event)"></userCode>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" top centered timeout="4000">
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script>
import userInfo from "../components/userInfo.vue";
import userCode from '../components/userCode.vue'

export default {
  components: {
    userInfo,
    userCode
  },
  data() {
    return {
      user: "",
      user2:'',
      items: ["个人信息", "修改密码"],
      tab: null,
      snackbarText: "修改成功",
      snackbar: false,
      dialog: false,
      img: null,
      imgStr: null,
    };
  },
  created() {
    this.user = this.$store.state.user;
    this.user2 = this.$store.state.user;
  },
  watch: {
    img() {
      if (this.img != null) {
        this.codeBase64();
      } else {
        this.imgStr == null;
      }
    },
  },
  methods: {
    exitUser() {
      this.$store.commit("setCartLength", 0);
      this.$store.commit("setUser", "");
      this.$router.push("/login");
    },
    userChange(data) {
      this.snackbar = true;
      this.$store.commit("setUser", data);
      this.user = this.$store.state.user;
      this.user2 = this.$store.state.user;
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
        };
      })(file);
      reader.readAsDataURL(file);
    },
    changeAvatar() {
      this.axios
        .post("http://127.0.0.1:3000/changeUserAvatar", {
          userInfo: this.imgStr,
          userPhone: this.$store.state.user.phone,
        })
        .then((res) => {
          this.$store.commit("setUser", res.data);
          this.dialog = false;
          this.img = null
        });
    },
  },
};
</script>

<style>
</style>