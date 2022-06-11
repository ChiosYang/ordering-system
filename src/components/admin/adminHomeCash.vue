<template>
  <div>
    <v-row class="mt-4">
      <v-col lg="1">
        <p class="text-h6 mt-4">选择桌号</p>
      </v-col>
      <v-col lg="5">
        <v-select
          :items="disabledTableId"
          label="选择桌号"
          no-data-text="无已订餐桌"
          v-model="checkTable"
        ></v-select>
      </v-col>
      <v-col align-self="center">
        <v-btn depressed color="primary" rounded @click="getOrderInfo()"
          >确认</v-btn
        >
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-5">
      <v-col lg="3" v-if="orderInfo != ''">
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
          订单编号: {{ orderInfo[0].orderId }}
        </p>
        <p class="text-body-1 grey--text text--darken-2">
          已点餐品: {{ orderFoodNums }}
        </p>
        <p class="text-body-1 grey--text text--darken-2">
          餐品总价值: {{ orderSumValue }}
        </p>
      </v-col>
      <v-col v-if="orderInfo != ''">
        <p class="text-h5 font-weight-bold mb-10">支付方式</p>
        <v-sheet width="520">
          <v-radio-group v-model="payment">
            <v-row>
              <v-col lg="2">
                <v-img src="../../assets/ZFB.svg" width="60"></v-img>
              </v-col>
              <v-col lg="9"><p class="mt-2 font-weight-bold">支付宝</p></v-col>
              <v-col lg="1">
                <v-radio color="black" value="Alipay"> </v-radio>
              </v-col>
              <v-col lg="12"><v-divider></v-divider></v-col>

              <v-col lg="2"
                ><v-img src="../../assets/YL.svg" width="60"></v-img
              ></v-col>
              <v-col lg="9"
                ><p class="mt-2 font-weight-bold">现金支付</p>
              </v-col>
              <v-col lg="1">
                <v-radio color="black" value="Wechat"> </v-radio>
              </v-col>
              <v-col lg="12"><v-divider></v-divider></v-col>
            </v-row>
          </v-radio-group>
        </v-sheet>
        <v-btn
          depressed
          dark
          rounded
          width="200"
          height="50"
          class="mt-4"
          @click="openDialog()"
          >立即结算
          <v-icon color="white" class="pl-3">mdi-arrow-right-circle</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="text-h5 d-flex justify-space-between">
              <div style="font-family: Century Gothic">
                <v-icon color="black">mdi-freebsd</v-icon> RANNI
              </div>
              <div>账单</div>
            </v-card-title>

            <v-card-text class="mt-5">
              <v-card flat class="grey lighten-4 pa-2">
                <div class="d-flex">
                  <div>
                    <p class="mb-0 grey--text text--darken-1">订单ID</p>
                    <p>{{ orderInfo[0].orderId }}</p>
                    <p class="mb-0 grey--text text--darken-1">日期</p>
                    <p>{{ formatDate }}</p>
                  </div>
                  <div class="ml-9">
                    <p class="mb-0 grey--text text--darken-1">订单桌号</p>
                    <p>{{ checkTable }}</p>
                    <p class="mb-0 grey--text text--darken-1">用户帐号</p>
                    <p>{{ orderInfo[0].userPhone }}</p>
                  </div>
                </div>
              </v-card>

              <v-row class="mb-2 mt-2">
                <v-col class="font-weight-bold text-body-1">食品名</v-col>
                <v-col class="font-weight-bold text-body-1">食品数量 </v-col>
                <v-col class="font-weight-bold text-body-1">食品价格</v-col>
              </v-row>
              <div v-for="(order, i) in orderInfo" :key="i">
                <v-row>
                  <v-col align-self="center">{{ order.orderFoodName }} </v-col>
                  <v-col align-self="center"
                    ><span class="ml-5">{{ order.orderFoodQuantity }}</span>
                  </v-col>
                  <v-col align-self="center">￥{{ order.orderValue }} </v-col>
                </v-row>
              </div>
              <v-divider class="my-5"></v-divider>
              <p class="text-right mb-0 mr-5">
                合计：￥
                <span class="black--text text-h6">{{ orderSumValue }}</span>
              </p>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="checkPayment()">
                确认结算
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog2" width="300">
          <v-card>
            <v-card-title> <p>确认已经完成支付？</p></v-card-title>
             <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="updateOrder" >
                确认结算
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" top centered timeout="4000">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allTable: [],
      freeTable: [],
      disabledTable: [],
      freeTableId: [],
      disabledTableId: [],
      checkTable: "",
      orderInfo: [],
      user: [],
      orderSumValue: 0,
      orderFoodNums: 0,
      payment: "",
      formatDate: "",
      dialog: false,
      dialog2: false,
      snackbarText: "",
      snackbar: false,
    };
  },
  watch: {
    orderInfo() {
      if (this.orderInfo != "") {
        this.getUser();
        this.countSumValue();
        this.dateFormat();
      }
    },
  },
  created() {
    this.getAllTable();
  },
  methods: {
    getOrderInfo() {
      this.axios
        .post("http://127.0.0.1:3000/getOrderInfo", {
          orderTable: this.checkTable,
        })
        .then((response) => {
          this.orderInfo = response.data;
          if (this.orderInfo == '') {
            this.snackbarText='该桌不存在未结算订单'
            this.snackbar = true
          }
        });
    },
    getAllTable() {
      this.axios
        .get("http://127.0.0.1:3000/getalltable")
        .then((response) => {
          this.allTable = response.data;
          this.cutTable();
        })
        .catch((err) => {
          alert(err);
        });
    },

    cutTable() {
      for (let i = 0; i < this.allTable.length; i++) {
        if (this.allTable[i].ischeck == "false") {
          this.disabledTable.push(this.allTable[i]);
          this.disabledTableId.push(this.allTable[i].id);
        } else {
          this.freeTable.push(this.allTable[i]);
          this.freeTableId.push(this.allTable[i].id);
        }
      }
    },
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
      this.orderFoodNums = 0;
      this.orderSumValue = 0;
      for (let i = 0; i < this.orderInfo.length; i++) {
        this.orderSumValue += parseInt(this.orderInfo[i].orderValue);
        this.orderFoodNums += parseInt(this.orderInfo[i].orderFoodQuantity);
      }
    },
    openDialog() {
      if (this.payment == "") {
        this.snackbarText = "尚未选择支付方式";
        this.snackbar = true;
      } else {
        this.dialog = true;
      }
    },
    checkPayment() {
      if (this.payment == "Alipay") {
        this.goPay();
      } else {
        this.dialog2 = true;
      }
    },
    goPay() {
      let data = {
        orderId: this.orderInfo[0].orderId,
        orderPrice: this.orderSumValue,
      };
      var instance = this.axios.create({
        headers: { "content-type": "application/x-www-form-urlencoded" },
      });
      instance
        .post(`http://localhost:3000/api/pcpay`, this.qs.stringify(data))
        .then((res) => {
          console.log(res);
          this.data = res;
          window.open(res.data.result);
        });
    },
    updateOrder(){
      this.axios
        .post("http://127.0.0.1:3000/addRealOrderOk", {
          orderId: this.orderInfo[0].orderId,
        })
        .then((response) => {
          this.dialog2 = false
         console.log(response);
        });
    },
    dateFormat() {
      let date = new Date(this.orderInfo[0].orderDate);
      var year = date.getFullYear(); //年
      var month = date.getMonth(); //月
      var day = date.getDate(); //日
      var hours = date.getHours(); //时
      var min = date.getMinutes(); //分
      var second = date.getSeconds(); //秒
      this.formatDate =
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
    },
  },
};
</script>

<style>
</style>