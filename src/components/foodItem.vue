<template>
  <v-card
    class="mx-2 my-3"
    max-width="340"
    elevation="0"
    style="display: inline-block; width: 340px"
  >
    <v-hover v-slot:default="{ hover }">
      <v-img height="250" :src="food.img">
        <v-expand-transition>
          <div
            v-if="hover"
            class="
              d-flex
              transition-fast-in-fast-out
              white
              darken-2
              v-card--reveal
            "
            style="height: 100%"
          >
            <div class="grey--text">{{ food.description }}</div>
          </div>
        </v-expand-transition>
      </v-img>
    </v-hover>
    <v-card-text>
      <v-row>
        <v-col lg="8" class="ml-2">
          <p class="text-h5 font-weight-bold mt-5 mb-1">{{ food.name }}</p>
          <p class="mb-0">{{ food.category }}</p>
          <div class="text-h5 black--text">
            <small class="text-subtitle-1">￥</small>
            <strong>{{ food.price }}</strong>
          </div>
          <p>销量：{{ food.sales }}</p>
        </v-col>
        <v-col lg="3">
          <v-btn class="mt-8 ml-6" fab color="primary" light @click="addRealCart()">
            <v-icon light> mdi-basket-plus </v-icon>
          </v-btn>
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
  data: () => ({
    loading: false,
    selection: 1,
    snackbarText: "已添加购物车",
    snackbar: false,
  }),
  props: ["food"],
  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    addCart() {
      if (this.$store.state.user == "") {
        alert("请先登录");
      } else {
        this.axios
          .post("http://127.0.0.1:3000/addCart", {
            userPhone: this.$store.state.user.phone,
            foodName: this.food.name,
          })
          .then((res) => {
            this.snackbar = true;
            console.log(res);
          });
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
            foodQuantity:1,
            foodPrice: this.food.price,
            foodCategory:this.food.category,
            foodImg:this.food.img

          })
          .then((res) => {
            this.snackbarText= this.food.name + " 已添加购物袋",
            this.snackbar = true;
            console.log(res.data);
            let flag = res.data;
            if(flag == 'Ok'){
              this.$store.commit("setCartLength", parseInt(this.$store.state.cartLength) + 1);
            }
          });
      }
    },
  },
  created() {
    //console.log(this.food)
  },
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>