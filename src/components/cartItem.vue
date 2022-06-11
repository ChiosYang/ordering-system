<template>
  <v-sheet class="my-4">
    <v-row>
      <v-col lg="1" align-self="center">
        <v-checkbox color="black" v-model="sonCheckbox"></v-checkbox>
      </v-col>
      <v-col lg="3">
        <v-img :src="foodItem.foodImg" height="150" width="173"> </v-img>
      </v-col>
      <v-col lg="2">
        <div class="mt-2">
          <strong>{{ foodItem.foodName }} </strong>
          <p class="text-subtitle-2">{{ foodItem.foodCategory }}</p>
          <p class="text-subtitle-1">单价： ￥{{ foodItem.foodPrice }}</p>
          <div style="width: 122px">
            <v-text-field
              outlined
              append-icon="mdi-plus"
              prepend-inner-icon="mdi-minus"
              rounded
              dense
              @click:append="clickPlus"
              @click:prepend-inner="clickMinus"
              :value="num"
              readonly
            ></v-text-field>
          </div>
        </div>
      </v-col>
      <v-col align-self="end" class="pa-0">
        <v-btn
          class="mb-9 pa-0"
          icon
          color="black"
          large
          @click="deleteRealCart"
        >
          <v-icon> mdi-trash-can-outline </v-icon>
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col lg="2" align-self="center">
        <strong>￥{{ foodValue }}</strong>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-sheet>
</template>

<script>
export default {
  props: ["foodItem", "checkbox"],
  data: () => ({
    num: 1,
    food: [],
    foodValue: 0,
    sonCheckbox: false,
  }),
  created() {
    this.num = this.foodItem.foodQuantity;
    this.countValue();
    this.sonCheckbox = this.checkbox;
  },
  beforeDestroy() {
    this.updateNums();
  },
  watch: {
    checkbox(val) {
      this.sonCheckbox = val;
    },
    sonCheckbox() {
      if (this.sonCheckbox) {
        let foodInfo = {
          foodName: this.foodItem.foodName,
          foodQuantity: this.foodItem.foodQuantity,
          foodCategory:this.foodItem.foodCategory,
          foodValue:this.foodValue
        };
        this.$emit("addInfo", foodInfo);
        this.toPlusCart();
      } else {
        this.$emit("delInfo", this.foodItem.foodName);
        this.toMinusCart();
      }
    },
  },
  methods: {
    clickPlus() {
      this.num++;
      this.countValue();
      if (this.sonCheckbox) {
        this.$emit("value", this.foodItem.foodPrice);
      }
      //this.toPlusCart();
    },
    clickMinus() {
      if (this.num > 1) {
        this.num--;
        this.countValue();
        if (this.sonCheckbox) {
          this.$emit("minusvalue", this.foodItem.foodPrice);
        }
        //this.toMinusCart();
      }
    },
    countValue() {
      this.foodValue = this.num * this.foodItem.foodPrice;
    },
    toPlusCart() {
      if (this.sonCheckbox) {
        this.$emit("value", this.foodValue);
      }
    },
    toMinusCart() {
      if (!this.sonCheckbox) {
        this.$emit("minusvalue", this.foodValue);
      }
    },
    deleteRealCart() {
      this.axios
        .post("http://127.0.0.1:3000/delRealCart", {
          foodName: this.foodItem.foodName,
          userPhone: this.$store.state.user.phone,
        })
        .then((res) => {
          this.snackbar = true;
          this.$store.commit("setCartLength", this.$store.state.cartLength - 1);
          this.$emit("delete", this.foodItem.foodName);
          console.log(res);
        });
    },
    updateNums() {
      this.axios.post("http://127.0.0.1:3000/updateRealCart", {
        foodName: this.foodItem.foodName,
        userPhone: this.$store.state.user.phone,
        foodQuantity: this.num,
      });
    },
  },
};
</script>

<style>
</style>