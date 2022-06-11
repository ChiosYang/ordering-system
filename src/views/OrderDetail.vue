<template>
  <v-container>
    <v-row justify="center" no-gutters class="mt-5 mb-10">
      <v-col lg="6">
        <p class="text-h5 font-weight-bold">
          <v-icon color="black" size="40">mdi-check-circle-outline</v-icon>
          订单已完成
        </p>

        <div class="d-flex mt-10 mb-4">
          <div>
            <v-icon size="60" color="#0058a3">mdi-clock-outline</v-icon>
            <p class="font-weight-bold mt-3" style="text-align: center">
              准备中
            </p>
          </div>
          <div
            style="width: 200px; height: 30px; border-bottom: 4px solid #0058a3"
          ></div>
          <div>
            <v-icon size="60" color="#0058a3"
              >mdi-arrow-right-circle-outline</v-icon
            >
            <p class="font-weight-bold mt-3" style="text-align: center">
              正在上菜
            </p>
          </div>
          <div
            style="width: 200px; height: 30px; border-bottom: 4px solid #0058a3"
          ></div>
          <div>
            <v-icon size="60" color="#0058a3">mdi-check-circle-outline</v-icon>
            <p class="font-weight-bold mt-3 text-h6" style="text-align: center">
              已完成
            </p>
         
          </div>
        </div>
        <fooddetail
          v-for="item in order"
          :key="item.orderFoodName"
          :order="item"
        ></fooddetail>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col lg="3">
        <orderDetailInfo v-if = "isShow == true" :order="order"></orderDetailInfo>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import fooddetail from "../components/orderDetailFood.vue";
import orderDetailInfo from "../components/orderDetailInfo.vue";
export default {
  components: {
    fooddetail,
    orderDetailInfo,
  },
  data() {
    return {
      orderId: "",
      order: [],
      order2: [],
      isShow:false
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
          this.order2 = this.order;
          this.isShow = true
         
        });
    },
  },
};
</script>

<style>
</style>