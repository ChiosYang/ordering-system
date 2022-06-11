<template>
  <div class="ml-4">
    <v-card flat>
      <v-card-title>用户信息</v-card-title>
      <v-card-text>
        <p class="mb-1">点单用户：{{ user.name }}</p>
        <p>联系方式：{{ user.phone }}</p>
      </v-card-text>
    </v-card>
    <v-card flat>
      <v-card-title>订单信息</v-card-title>
      <v-card-text>
        <p class="mb-1">订单编号：{{ order[0].orderId }}</p>
        <p class="mb-1">下单时间：{{ formatDate }}</p>
      </v-card-text>
    </v-card>
    <v-card flat>
      <v-card-title>支付信息</v-card-title>
      <v-card-text>
        <p class="mb-1">支付方式：在线支付</p>
      </v-card-text>
    </v-card>
    <v-card flat class="mt-4">
      <v-card-text class="d-flex justify-space-between pb-0">
        <p class="">商品总额:</p>
        <p class="black--text font-weight-bold">￥{{ sumValue }}</p>
      </v-card-text>
      <v-card-text class="d-flex justify-space-between align-end pt-0">
        <p class="">实付金额:</p>
        <p class="black--text font-weight-bold text-h5">￥{{ sumValue }}</p>
      </v-card-text>
    </v-card>

    <v-card class="grey lighten-3 mt-5" flat>
      <v-card-text>
        <p class="mb-0 grey--text text--darken-3">
          若您通过扫码点餐或向服务人员购买了部分食品，发现有任何问题如菜品遗漏等，请联系服务人员。
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["order"],
  data: () => ({
    user: [],
    formatDate: "",
    sumValue: 0,
  }),
  created() {
    this.getUser();
    this.dateFormat();
    this.countValue();
  },
  methods: {
    getUser() {
      this.axios
        .post("http://127.0.0.1:3000/getuser", {
          phone: this.order[0].userPhone,
        })
        .then((response) => {
          this.user = response.data;
        });
    },
    countValue() {
      for (let i = 0; i < this.order.length; i++) {
        this.sumValue += parseInt(this.order[i].orderValue);
      }
    },
    dateFormat() {
      let date = new Date(this.order[0].orderDate);
      var year = date.getFullYear(); //年
      var month = date.getMonth(); //月
      var day = date.getDate(); //日
      var hours = date.getHours(); //时
      var min = date.getMinutes(); //分
      var second = date.getSeconds(); //秒
      this.formatDate =
        year +
        "-" +
        (month + 1 > 9 ? month + 1 : "0" + (month + 1)) +
        "-" +
        (day > 9 ? day : "0" + day) +
        " " +
        (hours > 9 ? hours : "0" + hours) +
        ":" +
        (min > 9 ? min : "0" + min) +
        ":" +
        (second > 9 ? second : "0" + second);
    },
  },
};
</script>

<style>
</style>