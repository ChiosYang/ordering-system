<template>
  <v-card height="840px">
    <v-navigation-drawer absolute permanent left width="317" dark>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-img :src="$store.state.admin.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ $store.state.admin.name }}</v-list-item-title>
            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "主页", icon: "mdi-home-city" ,route:"/admin/home"},
        { title: "用户信息", icon: "mdi-account-group-outline",route:"/admin/userinfo"},
        { title: "食品信息", icon: "mdi-food",route:"/admin/foodinfo" },
        { title: "订单信息", icon: "mdi-notebook",route:"/admin/realorder" },
        { title: "订单图表", icon: "mdi-chart-pie",route:"/admin/order" },
      ],
    };
  },
};
</script>

<style>
</style>