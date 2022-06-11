<template>
  <v-container>
    <v-sheet class="d-flex justify-center mt-12">
      <v-icon size="300" color="#2E7D32">mdi-check-decagram</v-icon>
    </v-sheet>
    <v-sheet class="d-flex justify-center mt-12">
      <p>订单提交成功，正在为您准备菜品</p>
    </v-sheet>
    <v-card class="d-flex justify-center mt-12" flat tile>
      <!-- <v-sheet>
        <v-btn depressed width="200" height="50" rounded outlined class="mr-5"
          >修改菜品</v-btn
        ></v-sheet
      > -->
      <v-sheet>
        <v-btn depressed width="200" height="50" rounded outlined class="mr-5" to='/cash'
          >立即结账</v-btn
        ></v-sheet
      >
    </v-card>
  </v-container>
</template>

<script>
export default {
  created() {
    this.sendToOrder()

  },
  methods: {
    sendToOrder() {
      this.axios
        .post("http://127.0.0.1:3000/addRealOrder", {
          userPhone: this.$store.state.user.phone,
          orderInfo:this.$store.state.order.foodInfo,
          orderTable:this.$store.state.table,
          orderDate:new Date(),
          isPay:'No'
        })
        .then((res) => {
          let orderId = res.data
           this.$store.commit("setOrderId", orderId);
        });
    },
  },
};
</script>

<style>
</style>