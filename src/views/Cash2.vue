<template>
  <v-container class="mt-8" style="margin-left: 300px">
    <p class="text-h4 font-weight-bold">收银台</p>
    <p class="text-h6">订单提交成功，请尽快付款</p>
    <p class="text-subtitle-1 mb-0">桌号：{{ orderTable }}</p>
    <p class="text-subtitle-1 mb-0">订单编号：{{ orderId }}</p>
    <p class="text-subtitle-1">
      待付金额：<strong class="text-h6 font-weight-bold"
        >￥{{ orderPrice }}</strong
      >
    </p>
    <p>
      请您在
      <span class="pink--text text--lighten-2"
        >{{ minutes }}分{{ second }}秒</span
      >
      内完成付款，否则订单会被取消
    </p>
    <p class="text-h5 font-weight-bold">支付方式</p>
    <v-sheet width="520">
      <v-radio-group v-model="payment">
        <v-row>
          <v-col lg="2">
            <v-img src="../assets/ZFB.svg" width="60"></v-img>
          </v-col>
          <v-col lg="9"><p class="mt-2 font-weight-bold">支付宝</p></v-col>
          <v-col lg="1">
            <v-radio color="black" value="Alipay"> </v-radio>
          </v-col>
          <v-col lg="12"><v-divider></v-divider></v-col>
          <v-col lg="2"
            ><v-img src="../assets/weChatLogo.svg" width="60"></v-img
          ></v-col>
          <v-col lg="9"><p class="mt-2 font-weight-bold">微信支付</p> </v-col>
          <v-col lg="1">
            <v-radio color="black" value="Wechat"> </v-radio>
          </v-col>
          <v-col lg="12"><v-divider></v-divider></v-col>
        </v-row>
      </v-radio-group>
    </v-sheet>
    <v-btn
      class="mr-4 mt-8"
      type="submit"
      rounded
      color="primary"
      width="400px"
      height="50px"
      @click="checkPayment()"
    >
      立即支付
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      payment: "Alipay",
      minutes: 15, //分
      seconds: 0, //秒
      data: {},
      orderId: "",
      orderPrice: 0,
      orderInfo: "",
      orderTable:'',
      order: "",
    };
  },
  created() {
    this.orderId = this.$route.query.orderId;
    this.getRealOrder();
  },
  methods: {
    getRealOrder() {
      this.axios
        .post("http://127.0.0.1:3000/getRealOrder", {
          orderId: this.orderId,
        })
        .then((res) => {
          this.order = res.data;
          this.orderTable = this.order[0].orderTable
          for (let i = 0; i < this.order.length; i++) {
              this.orderPrice += parseInt(this.order[i].orderValue)
          }
   
        });
    },
    // 倒计时
    num(n) {
      if (this.minutes === 0 && this.seconds === 0) {
        //window.location.reload();
      }
      return n < 10 ? "0" + n : "" + n;
    },
    // 倒计时
    timer() {
      var _this = this;
      var time = window.setInterval(function () {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59;
          _this.minutes -= 1;
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.seconds = 0;
          window.clearInterval(time);
        } else {
          _this.seconds -= 1;
        }
      }, 1000);
    },
    checkPayment() {
      if (this.payment == "Alipay") {
        this.goPay();
      } else {
        this.goWechatPay();
      }
    },
    goPay() {
      let data = {
        orderId: this.orderId,
        orderPrice: this.orderPrice,
      };
      var instance = this.axios.create({
        headers: { "content-type": "application/x-www-form-urlencoded" },
      });

      console.log(this.qs.stringify(data));
      instance
        .post(`http://localhost:3000/api/pcpay`, this.qs.stringify(data))
        .then((res) => {
          console.log(res);
          this.data = res;
          window.open(res.data.result);
        });
    },
    goWechatPay() {
      alert("暂不支持微信付款");
    },
  },
  mounted() {
    // 倒计时
    this.timer();
  },
  watch: {
    // 倒计时
    second: {
      handler(newVal) {
        this.num(newVal);
      },
    },
    // 倒计时
    minute: {
      handler(newVal) {
        this.num(newVal);
      },
    },
  },
  computed: {
    // 倒计时
    second: function () {
      return this.num(this.seconds);
    },
    minute: function () {
      return this.num(this.minutes);
    },
  },
};
</script>

<style>
</style>