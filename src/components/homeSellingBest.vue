<template>
  <div>
    <p class="text-h4 mt-5">销量排行</p>
    <v-sheet class="d-flex">
      <v-sheet class="mt-2">
        <v-img :src="saleChampion.img" width="600" height="600">
          <v-hover v-slot="{ hover }" close-delay="200">
            <div>
              <v-btn
                color="grey"
                absolute
                fab
                style="right: 40px; top: 200px; opacity: 0.5"
                small
              >
                <v-icon color="white" :size="hover ? 19 : 30"
                  >mdi-circle</v-icon
                >
              </v-btn>
              <v-scale-transition origin="right">
                <v-card
                  width="200"
                  style="position: absolute; right: 90px; top: 200px"
                  v-if="hover"
                >
                  <div class="mt-2 ml-2 orange" style="width: 74px">
                    <p class="mb-0 pl-1 white--text">销量冠军</p>
                  </div>
                  <v-card-title class="pa-0 ml-3 font-weight-bold mt-2">{{
                    saleChampion.name
                  }}</v-card-title>
                  <v-card-text class="pa-0 ml-3 mb-2">
                    <div class="d-flex">
                      <div class="text-h6 black--text">
                        <p class="ma-0 text-body-2 grey--text">
                          {{ saleChampion.category }}
                        </p>
                        <small class="text-subtitle-1">￥</small>
                        <strong>{{ saleChampion.price }}</strong>
                      </div>
                      <v-btn
                        class="ml-12 mt-2"
                        fab
                        color="primary"
                        light
                        small
                        depressed
                      >
                        <v-icon light> mdi-basket-plus </v-icon>
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-scale-transition>
            </div>
          </v-hover>
        </v-img>
      </v-sheet>
      <v-sheet class="d-flex flex-wrap">
        <v-sheet class="my-2 mx-8" v-for="(saleFood, i) in saleGoods" :key="i">
          <v-img :src="saleFood.img" width="300" height="300">
            <v-hover v-slot="{ hover }" close-delay="200">
              <div>
                <v-btn
                  color="grey"
                  absolute
                  fab
                  style="right: 40px; top: 120px; opacity: 0.5"
                  small
                >
                  <v-icon color="white" :size="hover ? 20 : 30"
                    >mdi-circle</v-icon
                  >
                </v-btn>
                <v-scale-transition origin="right">
                  <v-card
                    width="200"
                    style="position: absolute; right: 90px; top: 120px"
                    v-if="hover"
                  >
                    <div class="mt-2 ml-2 primary" style="width: 74px">
                      <p class="mb-0 pl-1 white--text">销量NO.{{ i + 2 }}</p>
                    </div>
                    <v-card-title class="pa-0 ml-3 font-weight-bold mt-2">{{
                      saleFood.name
                    }}</v-card-title>
                    <v-card-text class="pa-0 ml-3 mb-2">
                      <div class="d-flex">
                        <div class="text-h6 black--text">
                          <p class="ma-0 text-body-2 grey--text">
                            {{ saleFood.category }}
                          </p>
                          <small class="text-subtitle-1">￥</small>
                          <strong>{{ saleFood.price }}</strong>
                        </div>
                        <v-btn
                          class="ml-12 mt-2"
                          fab
                          color="primary"
                          light
                          small
                          depressed
                          @click="addRealCart(saleFood)"
                        >
                          <v-icon light> mdi-basket-plus </v-icon>
                        </v-btn>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-scale-transition>
              </div>
            </v-hover>
          </v-img></v-sheet
        >
      </v-sheet>
      <v-snackbar v-model="snackbar" top centered timeout="4000">
        {{ snackbarText }}
      </v-snackbar>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    allFood: [],
    saleChampion: "",
    saleGoods: [],
    snackbarText: "已添加购物车",
    snackbar: false,
  }),
  created() {
    this.select();
  },
  methods: {
    select() {
      this.axios
        .get("http://127.0.0.1:3000/admin/select")
        .then((response) => {
          this.allFood = response.data;
          this.salesSort();
          this.cutArray();
        })
        .catch((err) => {
          alert(err);
        });
    },
    salesSort() {
      this.allFood.sort((a, b) => {
        return b.sales - a.sales;
      });
    },
    cutArray() {
      this.saleChampion = this.allFood[0];
      this.saleGoods = this.allFood.splice(1, 6);
    },
    addRealCart(item) {
      if (this.$store.state.user == "") {
        alert("请先登录");
      } else {
        this.axios
          .post("http://127.0.0.1:3000/addRealCart", {
            userPhone: this.$store.state.user.phone,
            foodName: item.name,
            foodQuantity: 1,
            foodPrice: item.price,
            foodCategory: item.category,
            foodImg: item.img,
          })
          .then((res) => {
            (this.snackbarText = item.name + " 已添加购物袋"),
              (this.snackbar = true);
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