<template>
  <v-container>
    <strong class="text-h4">购物袋</strong>
    <div style="width: 120px">
      <v-checkbox
        label="全选"
        type="checkbox"
        color="black"
        class="mx-5"
        v-model="checkbox"
      ></v-checkbox>
    </div>
    <v-divider></v-divider>
    <v-row>
      <v-col lg="8">
        <v-row>
          <v-col lg="12" v-for="foodItem in realCart" :key="foodItem.foodName">
            <cartItem
              :foodItem="foodItem"
              @value="plusValue($event)"
              @minusvalue="minusValue($event)"
              @delete="deleteFoodInfo($event)"
              @addInfo="addInfo($event)"
              @delInfo="delInfo($event)"
              :checkbox="checkbox"
            ></cartItem>
          </v-col>
        </v-row>
      </v-col>
      <v-divider vertical class="my-4"></v-divider>
      <v-col lg="4">
        <cartCard
          :foodValue="foodValue"
          :foodInfoCheck="foodInfoCheck"
        ></cartCard>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" top centered timeout="4000">
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script>
import cartItem from "../components/cartItem.vue";
import cartCard from "../components/cartCard.vue";

export default {
  components: {
    cartItem,
    cartCard,
  },

  data: () => ({
    i: 0,
    cart: [],
    realCart: [],
    foodInfo: [],
    foodValue: 0,
    checkbox: false,
    foodInfoCheck: [],
    showCartItem: false,
    snackbarText: "删除成功",
    snackbar: false,
  }),
  created() {
    this.isLog();

  },
  methods: {
    isLog() {
      if (this.$store.state.user == "") {
        alert("请先登录");
        this.$router.push({ path: `/login` });
      } else {
        this.getRealCart();
      }
    },

    getRealCart() {
      this.axios
        .post("http://127.0.0.1:3000/getRealCart", {
          userPhone: this.$store.state.user.phone,
        })
        .then((res) => {
          // console.log(res.data);
          this.realCart = res.data;
        });
    },
    divideInfo() {
      let item = this.cart.foodInfo.split(",");
      this.foodInfo = item;
    },
    plusValue(data) {
      this.foodValue += parseInt(data);
      console.log(this.foodValue);
    },
    minusValue(data) {
      this.foodValue -= data;
    },
    deleteFoodInfo(data) {
      for (let i = 0; i < this.realCart.length; i++) {
        if (this.realCart[i].foodName == data) {
          this.realCart.splice(i, 1);
        }
      }
      this.snackbar = true;
    },
    addInfo(data) {
      this.foodInfoCheck.push(data);
    },
    delInfo(data) {
      for (let i = 0; i < this.foodInfoCheck.length; i++) {
        if (this.foodInfoCheck[i].foodName == data) {
          this.foodInfoCheck.splice(i, 1);
          break
        }
      }
    },
  },
};
</script>

<style>
</style>