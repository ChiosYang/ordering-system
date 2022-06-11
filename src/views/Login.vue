<template>
  <div style="height: 95vh; background-color: #121212">
    <div class="d-flex justify-center logbox">
      <v-card class="mt-10" width="800" height="550" flat dark>
        <v-row justify="center">
          <v-col lg="8">
            <v-tabs
              v-model="tab"
              background-color="transparent"
              color="basil"
              grow
              class="mt-5"
            >
              <v-tab v-for="item in items" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" class="mt-5" dark>
              <v-tab-item>
                <logBox></logBox>
              </v-tab-item>
              <v-tab-item>
                <logBoxEmail></logBoxEmail>
              </v-tab-item>
              <v-tab-item>
                <logBoxAdmin></logBoxAdmin>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import logBox from "../components/logBox";
import logBoxEmail from "../components/logBoxEmail.vue";
import logBoxAdmin from "../components/logBoxAdmin.vue";

export default {
  name: "Login",
  components: {
    logBox,
    logBoxEmail,
    logBoxAdmin,
  },
  data: () => ({
    tab: null,
    items: ["密码登录", "邮箱登录", "管理员登录"],
  }),
  created() {
    if (this.$store.state.user != "") {
      this.$router.push({ path: `/user` });
    }
  },
  methods: {},
};
</script>

<style>
.videoContainer {
  opacity: 0.5;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -100;
}
.fullscreenVideo {
  width: 100%;
  position: absolute;
  left: 0;
  top: -300px;
  z-index: -1;
}
</style>