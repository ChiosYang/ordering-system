<template>
  <v-row class="my-4 mx-4">
    <v-col lg="4"> 商品小记： </v-col>
    <v-col lg="6"></v-col>
    <v-col lg="1">￥{{ foodValue }} </v-col>
    <v-col lg="4"> 促销优惠： </v-col>
    <v-col> </v-col>
    <v-col lg="2"> — 0 </v-col>

    <v-col lg="12">
      <!-- <v-divider  class="mr-6"> </v-divider> -->
      <hr color="black" class="mr-6" />
    </v-col>
    <v-col lg="4"> 合计： </v-col>
    <v-col> </v-col>
    <v-col lg="2">
      <p class="text-h5">￥{{ foodValue }}</p>
    </v-col>
    <v-col lg="12">
      <v-btn
        class="mr-4"
        type="submit"
        rounded
        color="primary"
        width="400px"
        height="50px"
        @click="toStore()"
      >
        立即结算
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["foodValue", "foodInfoCheck"],
  created() {},
  data: () => ({
    order: {
      foodInfo: "",
      foodValue: "",
    },
  }),
  watch: {
    foodInfoCheck() {
      //console.log(this.foodInfoCheck);
    },
  },
  methods: {
    toStore() {
       
        if (this.foodInfoCheck == "" || this.foodValue == 0) {
          alert('尚未选中商品')
        } else if(this.$store.state.table == ''){
          alert('尚未选择餐桌')
        }
        else {
          this.order.foodValue = this.foodValue;
          this.order.foodInfo = this.foodInfoCheck;
          
          this.$store.commit("setOrder", this.order);
          //console.log(this.$store.state.order)
          this.$router.push({ path: `/beforecash` });
        }
      
    },
  },
};
</script>

<style>
</style>