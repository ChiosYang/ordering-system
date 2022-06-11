<template>
  <v-app>
    <navigation :adminNavi="showAdminNavi" :showDark="showDark"></navigation>
    <v-main>
      <router-view />
    </v-main>
    <thisFooter></thisFooter>
  </v-app>
</template>

<script>
import navigation from "./components/navigation.vue";
import thisFooter from "./components/footer.vue";

export default {
  name: "App",
  components: {
    navigation,
    thisFooter,
  },
  data: () => ({
    showAdminNavi: false,
    showDark: false,
  }),
  watch: {
    "$route.path": function () {
      if (
        this.$route.path == "/admin/userinfo" ||
        this.$route.path == "/admin/home" ||
        this.$route.path == "/admin/foodinfo"
      ) {
        this.showAdminNavi = true;
        this.showDark = false;
      } else if (this.$route.path == "/login") {
        this.showDark = true;
      } else {
        this.showAdminNavi = false;
        this.showDark = false;
      }
    },
  },
  methods: {
    isHaveLog() {
      let userFlag = this.$store.state.user;
      if (userFlag == "") {
        console.log("you人");
      } else {
        console.log("wu ren ");
      }
    },
  },
};
</script>

