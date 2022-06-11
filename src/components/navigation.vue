<template>
  <v-app-bar app :color="showDark ? '#121212' : 'white'" elevation="0">
    <div class="d-flex align-center">
      <router-link to="/" style="text-decoration: none">
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/freebsd.svg"
          transition="scale-transition"
          width="40"
        /> -->
        <v-icon size="45" :color="showDark ? 'white' : 'black'"> mdi-freebsd </v-icon>
      </router-link>
    </div>
    <div class="d-flex align-center text-h4">
      <router-link
        to="/"
        style="text-decoration: none; color: black; font-family: Century Gothic"
        class="mr-5 ml-2"
        :class="showDark ? 'white--text' : 'black--text'"
        >RANNI</router-link
      >
    </div>
    <div class="mx-4">
      <v-btn color="black" lighten to="/table" text v-show="!adminNavi" :class="showDark ? 'white--text' : 'black--text'">
        <v-icon size="20" :color="showDark ? 'white' : 'black'" > mdi-silverware-fork-knife </v-icon>
        选桌
      </v-btn>
    </div>
    <div class="">
      <v-btn color="black" lighten to="/food" text v-show="!adminNavi" :class="showDark ? 'white--text' : 'black--text'">
        <v-icon size="20" :color="showDark ? 'white' : 'black'"> mdi-menu </v-icon>
        菜单
      </v-btn>
    </div>
    <v-spacer></v-spacer>
    <h1 v-show="adminNavi">RANNI-后台</h1>
    <v-spacer></v-spacer>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          icon
          color="black"
          to="/login"
          v-bind="attrs"
          v-on="on"
          v-show="!adminNavi"
        >
          <v-avatar size="40">
            <v-icon v-show="!icon" :color="showDark ? 'white' : 'black'"> mdi-account-outline </v-icon>
            <v-img :src="$store.state.user.avatar" v-show="icon"></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <span>我的个人档案</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          icon
          color="black"
          to="/cart"
          v-bind="attrs"
          v-on="on"
          v-show="!adminNavi"
        >
          <v-badge :content="cartLength" :value="showCartLength">
            <v-icon :color="showDark ? 'white' : 'black'"> mdi-shopping-outline </v-icon>
          </v-badge>
        </v-btn>
      </template>
      <span>购物袋</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
export default {
  name: "navigation",
  props: ["adminNavi", "showDark"],
  data: () => ({
    items: [
      { title: "主食" },
      { title: "小吃" },
      { title: "饮料" },
      { title: "酒水" },
      { title: "甜品" },
    ],
    icon: false,
    cartLength: 0,
    showCartLength: false,
  }),
  watch: {
    "$store.state.user": function () {
      this.changeUserIcon();
    },
    "$store.state.cartLength": function () {
      this.cartLength = this.$store.state.cartLength;
      if (this.cartLength > 0) {
        this.showCartLength = true;
      } else {
        this.showCartLength = false;
      }
    },
  },
  methods: {
    changeUserIcon() {
      if (this.$store.state.user == "") {
        this.icon = false;
        this.showCartLength = false;
      } else {
        this.icon = true;
        this.getRealCartLength();
      }
    },
    getRealCartLength() {
      this.axios
        .post("http://127.0.0.1:3000/getRealCartLength", {
          userPhone: this.$store.state.user.phone,
        })
        .then((res) => {
          this.cartLength = res.data;
          if (this.cartLength > 0) {
            this.showCartLength = true;
            this.$store.commit("setCartLength", this.cartLength);
          }
        });
    },
  },
};
</script>

<style>
</style>