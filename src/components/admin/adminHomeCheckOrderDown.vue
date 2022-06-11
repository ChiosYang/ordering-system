<template>
  <div class="mt-5">
    <v-row>
      <v-col lg="2" v-if="orderInfo != ''">
        <p class="text-body-1 grey--text text--darken-2">
          当前桌号：{{ orderInfo[0].orderTable }}
        </p>
        <p class="text-body-1 grey--text text--darken-2">
          当前用户：<v-avatar class="mr-2">
            <v-img :src="user.avatar"></v-img
          ></v-avatar>
          {{ user.name }}
        </p>

        <p class="text-body-1 grey--text text--darken-2">
          用户信息：{{ user.phone }}
        </p>
        <p class="text-body-1 grey--text text--darken-2">
          已点餐品: {{ orderFoodNums }}
        </p>
        <p class="text-body-1 grey--text text--darken-2">
          餐品总价值: {{ orderSumValue }}
        </p>
      </v-col>
      <v-col>
        <div class="Echarts">
          <div id="mainBar" style="width: 400px; height: 400px"></div>
        </div>
      </v-col>
      <v-col>
        <div class="Echarts">
          <div id="mainBar2" style="width: 400px; height: 400px"></div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["orderInfo"],
  components: {},
  data: () => ({
    user: [],
    orderSumValue: 0,
    orderFoodNums: 0,
    allFood: [],
    allFoodCategory: [],
    saleGoods: [],
    chartData2: [],
  }),
  created() {},
  watch: {
    orderInfo() {
      if (this.orderInfo != "") {
        this.getUser();
        this.countSumValue();
        this.cutArray();
        this.myEcharts();
        this.select();
      }
    },
  },
  methods: {
    getUser() {
      this.axios
        .post("http://127.0.0.1:3000/getuser", {
          phone: this.orderInfo[0].userPhone,
        })
        .then((response) => {
          this.user = response.data;
        });
    },
    countSumValue() {
      this.orderSumValue = 0;
      for (let i = 0; i < this.orderInfo.length; i++) {
        this.orderSumValue += parseInt(this.orderInfo[i].orderValue);
        this.orderFoodNums += parseInt(this.orderInfo[i].orderFoodQuantity);
      }
    },
    myEcharts() {
      var myChart = this.$echarts.init(document.getElementById("mainBar"));
      //配置图表
      var option = {
        title: {
          text: "所点食品种类所占比例",
          left: "center",
          top: "0%",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "6%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.allFoodCategory,
          },
        ],
      };
      option && myChart.setOption(option);
    },
    myEcharts2() {
      var myChart = this.$echarts.init(document.getElementById("mainBar2"));
      //配置图表
      var option = {
        title: {
          text: "热门菜品所占比例",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },

        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: this.chartData2,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
    cutArray() {
      this.allFoodCategory = [];
      let flag = true;
      for (let i = 0; i < this.orderInfo.length; i++) {
        flag = true;
        for (let j = 0; j < this.allFoodCategory.length; j++) {
          if (
            this.allFoodCategory[j].name == this.orderInfo[i].orderFoodCategory
          ) {
            flag = false;
            this.allFoodCategory[j].value += parseInt(
              this.orderInfo[i].orderFoodQuantity
            );
            break;
          }
        }
        if (flag) {
          this.allFoodCategory.push({
            name: this.orderInfo[i].orderFoodCategory,
            value: parseInt(this.orderInfo[i].orderFoodQuantity),
          });
        }
      }
    },
    select() {
      this.axios.get("http://127.0.0.1:3000/admin/select").then((response) => {
        this.allFood = response.data;
        this.salesSort();
        this.cutArray3();
        this.checkArray();
        this.myEcharts2();
      });
    },
    salesSort() {
      this.allFood.sort((a, b) => {
        return b.sales - a.sales;
      });
    },
    cutArray3() {
      this.saleGoods = this.allFood.splice(0, 6);
    },
    checkArray() {
      this.chartData2 = [];
      this.chartData2.push({ name: "已点的热门菜品", value: 0 });

      console.log(this.saleGoods);
      for (let i = 0; i < this.saleGoods.length; i++) {
        for (let j = 0; j < this.orderInfo.length; j++) {
          if (this.saleGoods[i].name == this.orderInfo[j].orderFoodName) {
            this.chartData2[0].value++;
          }
        }
      }
      let va = this.orderInfo.length - this.chartData2[0].value;
      this.chartData2.push({ name: "未点的热门菜品", value: va });
    },
  },
};
</script>

<style>
</style>