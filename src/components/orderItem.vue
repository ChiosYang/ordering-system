<template>
  <div>
    <v-row no-gutters class="mt-10">
      <v-col>
        <p class="text-caption mb-1">下单时间：{{ formatDate }}</p>
      </v-col>
      <v-col>
        <p class="text-caption mb-1">订单编号：{{ order.orderId }}</p>
      </v-col>
      <v-col>
        <p class="text-caption mb-1">下单桌号：{{ order.orderTable }}</p>
      </v-col>
    </v-row>

    <div style="width: 100%; height: 220px; border: 1px solid #dfdfdf">
      <div
        style="
          width: 60%;
          height: 220px;
          border: 1px solid #dfdfdf;
          float: left;
        "
      >
        <v-row no-gutters>
          <v-col v-for="food in exhibitFoods" :key="food.name" class="mt-2">
            <v-img :src="food.img" height="200" width="150" contain></v-img>
          </v-col>
          <v-col align-self="center" v-show="showDots">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-col>
          <v-spacer></v-spacer>
          <v-col lg="1" align-self="center"> 共{{ counts }}件 </v-col>
        </v-row>
      </div>
      <div
        style="
          width: 15%;
          height: 220px;
          border: 1px solid #dfdfdf;
          float: left;
        "
      >
        <v-row style="height: 220px" no-gutters>
          <v-col align-self="center">
            <p
              style="text-align: center"
              class="text-h6 green--text font-weight-bold"
              v-show="havePay"
            >
              已完成
            </p>
            <p
              style="text-align: center"
              class="text-h6 red--text font-weight-bold"
              v-show="!havePay"
            >
              未完成
            </p>
          </v-col>
        </v-row>
      </div>
      <div
        style="
          width: 25%;
          height: 220px;
          border: 1px solid #dfdfdf;
          float: left;
        "
      >
        <v-row style="height: 220px" no-gutters>
          <v-col align-self="center">
            <div style="text-align: center">
              <v-btn
                depressed
                rounded
                class=""
                width="124"
                height="40"
                dark
                v-show="havePay"
                :to="{
                  path: '/orderdetail',
                  query: { orderId: order.orderId },
                }"
                >查看详情</v-btn
              >
              <v-btn
                depressed
                rounded
                class="indigo darken-1"
                width="124"
                height="40"
                dark
                v-show="!havePay"
                :to="{ path: '/cash2', query: { orderId: order.orderId } }"
                >立即支付</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["order", "ispay"],
  data() {
    return {
      foods: [],
      counts: "",
      exhibitFoods: [],
      showDots: false,
      formatDate: "",
      havePay: false,
    };
  },
  created() {
    this.getMoreInfo();
    this.dateFormat();
    this.counts = this.order.orderFoodInfo.length;
    if (this.ispay) {
      this.havePay = true;
    } else {
      this.havePay = false;
    }
  },
  methods: {
    getMoreInfo() {
      this.axios
        .post("http://127.0.0.1:3000/getMoreInfo", {
          foodInfo: this.order.orderFoodInfo,
        })
        .then((res) => {
          this.foods = res.data;
          this.checkExhibitFoods();
        })
        .catch((err) => {
          alert(err);
        });
    },
    checkExhibitFoods() {
      if (this.counts > 4) {
        this.exhibitFoods.push(this.foods[0]);
        this.exhibitFoods.push(this.foods[1]);
        this.exhibitFoods.push(this.foods[2]);
        this.exhibitFoods.push(this.foods[3]);
        this.showDots = true;
      } else {
        this.exhibitFoods = this.foods;
      }
    },
    dateFormat() {
      let date = new Date(this.order.orderDate);
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