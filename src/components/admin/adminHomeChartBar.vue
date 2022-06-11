<template>
  <div class="Echarts">
    <div id="mainBar" style="width: 1280px; height: 600px"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    allFood: [],
    allFoodSales: [],
    allFoodNames: [],
    allChartInfo: [],
  }),
  created() {
    this.getFoodInfo();
  },
  mounted() {},
  methods: {
    myEcharts() {
      var myChart = this.$echarts.init(document.getElementById("mainBar"));
      //配置图表
      var option = {
        xAxis: {
          type: "category",
          data: this.allFoodNames,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.allFoodSales,
            type: "bar",
          },
        ],
      };
      option && myChart.setOption(option);
    },
    getFoodInfo() {
      this.axios
        .get("http://127.0.0.1:3000/admin/select")
        .then((response) => {
          this.allfood = response.data;
          //console.log(this.allfood);
          this.cutArray();
        
          this.myEcharts();
        })
        .catch((err) => {
          alert(err);
        });
    },
    cutArray() {
      for (let i = 0; i < 8; i++) {
        this.allFoodSales.push(this.allfood[i].sales);
      }
      for (let i = 0; i < 8; i++) {
        this.allFoodNames.push(this.allfood[i].name);
      }
    },
    assignInfo() {
      for (let i = 0; i < 8; i++) {
        let a = { name: "", value: "" };
        a.name = this.allfood[i].name;
        a.value = this.allfood[i].sales;

        this.allChartInfo.push(a);
      }
      console.log(this.allChartInfo);
    },
  },
};
</script>

<style>
</style>