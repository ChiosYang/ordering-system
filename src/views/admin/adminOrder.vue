<template>
  <div>
    <v-row no-gutters>
      <v-col lg="2">
        <sideNavi></sideNavi>
      </v-col>
      <v-col>
        <v-btn-toggle v-model="toggle_exclusive" mandatory >
          <v-btn>
            <v-icon>mdi-format-align-left</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-format-align-center</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-format-align-right</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-format-align-justify</v-icon>
          </v-btn>
        </v-btn-toggle>
        <homeChart v-show="showNightingale"></homeChart>
        <homeChartBar v-show="showBar"></homeChartBar>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import sideNavi from "../../components/admin/sideNavigation.vue";
import homeChart from "../../components/admin/adminHomeChart.vue";
import homeChartBar from "../../components/admin/adminHomeChartBar.vue";

export default {
  components: {
    sideNavi,
    homeChart,
    homeChartBar,
  },
  data: () => ({
    allFood: [],
    allFoodSales: [],
    allFoodNames: [],
    allChartInfo: [],
    toggle_exclusive: 0,
    showBar: false,
    showNightingale: true,
  }),
  created() {},
  watch: {
    toggle_exclusive() {
      if (this.toggle_exclusive == 1) {
        this.showBar = true;
        this.showNightingale = false;
      }
      if (this.toggle_exclusive == 0) {
        this.showBar = false;
        this.showNightingale = true;
      }
    },
  },
  methods: {},
};
</script>

<style>
</style>