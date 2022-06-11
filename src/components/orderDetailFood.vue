<template>
  <div>
    <div class="d-flex align-center">
      <div>
        <v-img
          width="200"
          height="200"
          :src="
            (food == '') ? require('../assets/stop_selling_product.jpg') : food.img
          "
        ></v-img>
      </div>

      <v-sheet width="500" class="ml-5">
        <p class="mb-1 text-h6 font-weight-bold grey--text text--darken-2">
          {{ order.orderFoodName }}
        </p>
        <p class="grey--text text--darken-2">{{ order.orderFoodCategory }}</p>
        <p class="grey--text text--darken-2">
          {{ order.orderFoodQuantity }} 件
        </p>
      </v-sheet>

      <div>
        <p class="text-h5 font-weight-bold">￥{{ order.orderValue }}</p>
      </div>
    </div>
    <v-divider class="my-6 mr-5"></v-divider>
  </div>
</template>

<script>
export default {
  props: ["order"],
  data: () => ({
    food: [],
  }),
  created() {
    this.getFoodInfo();
  },
  methods: {
    getFoodInfo() {
      this.axios
        .post("http://127.0.0.1:3000/getFood", {
          foodName: this.order.orderFoodName,
        })
        .then((res) => {
          this.food = res.data;
 
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>

<style>
</style>