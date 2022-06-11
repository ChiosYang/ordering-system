<template>
  <v-container class="mb-10">
    <h1 class="my-5">我的订单</h1>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
      class="mt-8"
      style="width: 800px"
    >
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <orderItem
          v-for="order in allPayOrder"
          :key="order.orderId"
          :order="order"
          :ispay="payed"
        ></orderItem>
      </v-tab-item>
      <v-tab-item>
        <orderItem
          v-for="order in allUnPayOrder"
          :key="order.orderId"
          :order="order"
          :ispay="unpay"
        ></orderItem>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import orderItem from "../components/orderItem.vue";
export default {
  components: {
    orderItem,
  },
  data: () => ({
    items: ["已完成", "未完成"],
    payed: true,
    unpay: false,
    tab: null,
    allOrder: [],
    allOrderOrigin: [],
    allPayOrder: [],
    allUnPayOrder: [],
  }),
  created() {
    this.getOrder();
  },
  methods: {
    getOrder() {
      this.axios
        .post("http://127.0.0.1:3000/getAllRealOrder", {
          userPhone: this.$store.state.user.phone,
        })
        .then((res) => {
          this.allOrderOrigin = res.data;
          this.divideOrder();
          this.divideOrderByIsPay();
        })
        .catch((err) => {
          alert(err);
        });
    },
    divideOrder() {
      let idArray = [];
      let otherInfo = [];
      for (let i = 0; i < this.allOrderOrigin.length; i++) {
        if (!idArray.includes(this.allOrderOrigin[i].orderId)) {
          idArray.push(this.allOrderOrigin[i].orderId);
          otherInfo.push({
            table: this.allOrderOrigin[i].orderTable,
            date: this.allOrderOrigin[i].orderDate,
            isPay: this.allOrderOrigin[i].isPay,
          });
        }
      }

      let allFoodInfo = [];
      var midFoodInfo = [];

      for (let i = 0; i < idArray.length; i++) {
        for (let j = 0; j < this.allOrderOrigin.length; j++) {
          if (idArray[i] == this.allOrderOrigin[j].orderId) {
            let foodInfo = {
              foodName: "",
              foodQuantity: "",
              foodValue: "",
            };
            foodInfo.foodName = this.allOrderOrigin[j].orderFoodName;
            foodInfo.foodQuantity = this.allOrderOrigin[j].orderFoodQuantity;
            foodInfo.foodValue = this.allOrderOrigin[j].orderValue;
            //console.log(foodInfo);
            midFoodInfo.push(foodInfo);
          }
        }
        allFoodInfo.push(midFoodInfo);
        midFoodInfo = [];
      }
      console.log(otherInfo);
      for (let i = 0; i < idArray.length; i++) {
        let order = {
          orderId: idArray[i],
          orderFoodInfo: allFoodInfo[i],
          userPhone: this.$store.state.user.phone,
          orderTable: otherInfo[i].table,
          orderDate: otherInfo[i].date,
          isPay: otherInfo[i].isPay,
        };

        this.allOrder.push(order);
      }
    },
    divideOrderByIsPay() {
      for (let i = 0; i < this.allOrder.length; i++) {
        if (this.allOrder[i].isPay == "No") {
          this.allUnPayOrder.push(this.allOrder[i]);
        } else {
          this.allPayOrder.push(this.allOrder[i]);
        }
        this.allPayOrder = this.allPayOrder.reverse();
        this.allUnPayOrder = this.allUnPayOrder.reverse();
      }
    },
  },
};
</script>

<style>
</style>