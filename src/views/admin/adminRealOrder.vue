<template>
  <div>
    <v-row no-gutters>
      <v-col lg="2">
        <sideNavi></sideNavi>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>
            订单信息
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="搜索"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="allorder"
            :search="search"
            class="mt-5"
          >
            <template v-slot:[`item.orderDate`]="{ item }">
              <p>{{ dateFormat(item.orderDate) }}</p>
            </template>
            <template v-slot:no-results>
              <p class="text-h6 mt-5">不存在此数据</p>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import sideNavi from "../../components/admin/sideNavigation.vue";
export default {
  components: {
    sideNavi,
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "订单编号",
          sortable: false,
          value: "orderId",
        },
        { text: "用户手机", value: "userPhone" },
        { text: "订单食品名", value: "orderFoodName" },
        { text: "订单日期", value: "orderDate" },
        { text: "订单桌号", value: "orderTable" },
        { text: "订单金额", value: "orderValue" },
      ],
      allorder: [],
    };
  },
  created() {
    this.judgeAuthority();
  },

  methods: {
    judgeAuthority() {
      if (this.$store.state.admin.level == "管理员") {
        this.getAllFood();
      } else if (this.$store.state.admin.level == "服务员") {
        alert("您暂无此权限");
        this.$router.push({ path: `/admin/home` });
      } else {
        alert("请先登录");
        this.$router.push({ path: `/login` });
      }
    },
    getAllFood() {
      this.axios
        .get("http://127.0.0.1:3000/getallrealorder")
        .then((response) => {
          this.allorder = response.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    dateFormat(item) {
      let date = new Date(item);
      var year = date.getFullYear(); //年
      var month = date.getMonth(); //月
      var day = date.getDate(); //日
      var hours = date.getHours(); //时
      var min = date.getMinutes(); //分
      var second = date.getSeconds(); //秒
      let formatDate =
        year +
        "-" +
        (month + 1 > 9 ? month + 1 : "0" + (month + 1)) +
        "-" +
        (day > 9 ? day : "0" + day) +
        " " +
        (hours > 9 ? hours : "0" + hours) +
        ":" +
        (min > 9 ? min : "0" + min) +
        ":" +
        (second > 9 ? second : "0" + second);
      return formatDate;
    },
  },
};
</script>

<style>
</style>