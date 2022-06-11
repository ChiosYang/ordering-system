<template>
  <v-card
    class="mx-2 my-3"
    max-width="350"
    width="350"
    elevation="0"
    @mouseleave="hideIcon"
    @mouseenter="showIcon"
  >
    <v-img height="250" :src="require('../assets/' + item.img + '.jpg')">
    </v-img>

    <v-card-text>
      <v-row>
        <v-col lg="8" class="ml-2">
          <p class="text-h5 font-weight-bold mt-5">{{ item.title }}</p>
          <div class="text-h5 black--text">
            <small class="text-subtitle-1">￥</small>
            <strong>{{ food.price }}</strong>
          </div>
        </v-col>
        <v-col lg="3">
          <v-scale-transition origin="center center">
            <v-btn
              class="mt-8 ml-6"
              fab
              color="primary"
              light
              v-show="isIcon"
              @click="checkUser()"
            >
              <v-icon light> mdi-basket-plus </v-icon>
            </v-btn>
          </v-scale-transition>
        </v-col>
      </v-row>
    </v-card-text>
    <v-snackbar v-model="snackbar" top centered timeout="4000">
      {{ snackbarText }}
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  props: ["item"],
  data: () => ({
    isIcon: false,
    food: [],
    snackbarText: "已添加购物车",
    snackbar: false,
  }),
  created() {
    this.getFood();
  },
  methods: {
    hideIcon() {
      this.isIcon = false;
    },
    showIcon() {
      this.isIcon = true;
    },
    getFood() {
      this.axios
        .post("http://127.0.0.1:3000/getFood", {
          foodName: this.item.title,
        })
        .then((res) => {
          this.food = res.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    checkUser() {
      if (this.$store.state.user == "") {
        alert("请先完成登录");
      } else {
        this.addRealCart();
      }
    },
    addRealCart() {
      if (this.$store.state.user == "") {
        alert("请先登录");
      } else {
        this.axios
          .post("http://127.0.0.1:3000/addRealCart", {
            userPhone: this.$store.state.user.phone,
            foodName: this.food.name,
            foodQuantity: 1,
            foodPrice: this.food.price,
            foodCategory: this.food.category,
            foodImg: this.food.img,
          })
          .then((res) => {
            (this.snackbarText = this.food.name + " 已添加购物袋"),
              (this.snackbar = true);
            console.log(res.data);
            let flag = res.data;
            if (flag == "Ok") {
              this.$store.commit(
                "setCartLength",
                parseInt(this.$store.state.cartLength) + 1
              );
            }
          });
      }
    },
  },
};
</script>

<style>
</style>