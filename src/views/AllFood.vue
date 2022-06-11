<template>
  <v-container class="pa-0 mt-5">
    <p class="text-h4">所有食品</p>
    <p>
      探索我们广泛的食品谱系——从适用于小聚的快餐，到适用于聚会派对的各种情景的饮食，如披萨和宫保鸡丁，这里应有尽有。找到适合你喜好和空间的食品，开始享受生活吧！
    </p>
    <v-row>
      <v-col lg="8">
        <!-- <v-btn rounded class="mx-4" depressed> 食品类别 </v-btn> -->
        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn lighten v-bind="attrs" v-on="on" depressed rounded>
              食品类别
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in categories"
              :key="index"
              @click="getCatogrey(item)"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn rounded class="mx-4" depressed @click="checkPriceSort()">
          价格
          <v-icon small v-show="priceSortIcon">{{ priceIcon }}</v-icon></v-btn
        >
        <v-btn rounded class="mx-4" depressed @click="salesSort()">
          销量
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col lg="1">
        <small>总计{{ total }}个结果</small>
      </v-col>
    </v-row>

    <v-divider class="my-6"></v-divider>

    <foodItem v-for="(item, i) in items" :key="i" :food="item"></foodItem>

  </v-container>
</template>

<script>
import foodItem from "../components/foodItem.vue";
export default {
  components: {
    foodItem,
  },
  data: () => ({
    item: "",
    items: [],
    total: 0,
    priceSortIcon: false,
    priceIcon: "mdi-arrow-up",
    categories: ["所有食品", "主食", "小吃", "饮品"],
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
          this.items = response.data;

          this.countTotal();
        })
        .catch((err) => {
          alert(err);
        });
    },
    countTotal() {
      this.total = this.items.length;
    },
    checkPriceSort() {
      this.priceSortIcon = true;
      if (this.priceIcon == "mdi-arrow-down") {
        this.priceIcon = "mdi-arrow-up";
        this.priceSort();
      } else {
        this.priceIcon = "mdi-arrow-down";
        this.priceDownSort();
      }
    },
    priceSort() {
      this.items.sort((a, b) => {
        return a.price - b.price;
      });
    },
    priceDownSort() {
      this.items.sort((a, b) => {
        return b.price - a.price;
      });
    },
    salesSort() {
      this.items.sort((a, b) => {
        return b.sales - a.sales;
      });
    },
    getCatogrey(item) {
      if (item == "所有食品") {
        this.select();
      } else {
        this.axios
          .post("http://127.0.0.1:3000/getfoodcategory", {
            category: item,
          })
          .then((res) => {
            this.items = res.data;
            this.countTotal();
          });
      }
    },
  },
};
</script>

<style>
</style>