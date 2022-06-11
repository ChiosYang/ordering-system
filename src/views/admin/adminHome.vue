<template>
  <div>
    <v-row no-gutters>
      <v-col lg="2">
        <sideNavi></sideNavi>
      </v-col>
      <v-col>
        <v-row class="mt-5" no-gutters>
          <v-col lg="1">
            <v-avatar color="teal" size="62" style="margin-left: 30px">
              <v-img :src="$store.state.admin.avatar"></v-img>
            </v-avatar>
          </v-col>
          <v-col lg="2">
            <p class="text-h5 font-weight-bold mb-0">
              你好，{{ $store.state.admin.name }}
            </p>
            <p class="text-body-2 grey--text text--darken-2 mt-2">
              想更改用户？<a @click="exitUser()"> 退出</a>
            </p>
          </v-col>
        </v-row>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
          class="mt-8"
          style="width:500px"
        >
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="ml-5">
          <v-tab-item>
            <adminHomeTable></adminHomeTable>
          </v-tab-item>
          <v-tab-item>
            <adminHomeCheckOrder></adminHomeCheckOrder>
          </v-tab-item>
          <v-tab-item>
            <adminHomeCash></adminHomeCash>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import sideNavi from "../../components/admin/sideNavigation.vue";
import adminHomeTable from '../../components/admin/adminHomeTable.vue'
import adminHomeCheckOrder from '../../components/admin/adminHomeCheckOrder.vue'
import adminHomeCash from '../../components/admin/adminHomeCash.vue'
export default {
  components: {
    sideNavi,
    adminHomeTable,
    adminHomeCheckOrder,
    adminHomeCash
  },
  data() {
    return {
      user: "",
      items: ["餐桌信息", "点餐修改", "结账"],
      tab: null,
    };
  },
  methods: {
    exitUser() {
      this.$store.commit("setAdmin", "");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>