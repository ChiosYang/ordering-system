<template>
  <div>
    <v-snackbar v-model="snackbar" top centered timeout="4000">
      {{ snackbarText }}
    </v-snackbar>
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
        <v-dialog v-model="dialog" width="800">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              color="primary"
              rounded
              @click="getOrderInfo()"
              v-bind="attrs"
              v-on="on"
              >确认</v-btn
            >
          </template>
          <v-card>
            <v-card-title class="text-h5 d-flex justify-space-between">
              <div>{{ checkTable }}</div>
              <div>
                <v-dialog v-model="dialog2" width="900">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      depressed
                      small
                      dark
                      color="grey"
                      v-bind="attrs"
                      v-on="on"
                      @click="selectAllFood()"
                      ><v-icon>mdi-plus</v-icon></v-btn
                    >
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      添加菜品
                    </v-card-title>

                    <v-card-text>
                      <v-row class="mt-5">
                        <v-col v-for="food in allFood" :key="food.name" lg="2">
                          <v-img
                            :src="food.img"
                            width="100"
                            height="100"
                            @click="checkFood(food)"
                            ><v-scale-transition origin="center center">
                              <div
                                v-if="food.isOrder"
                                class="grey d-flex align-center justify-center"
                                style="height: 100%; widtg: 100%; opacity: 0.6"
                              >
                                <v-icon size="90" dark>mdi-check</v-icon>
                              </div>
                            </v-scale-transition>
                          </v-img>

                          <p class="mb-0">{{ food.name }}</p>
                          <p class="mb-0 text-caption">{{ food.category }}</p>
                          <p class="font-weight-bold">
                            <span class="text-caption">￥</span>
                            {{ food.price }}
                          </p>
                        </v-col>
                      </v-row>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="saveAddOrder()">
                        确认
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-card-title>

            <v-card-text class="mt-5">
              <v-row class="mb-2">
                <v-col class="font-weight-bold text-body-1">食品名</v-col>
                <v-col class="font-weight-bold text-body-1">食品数量 </v-col>
                <v-col class="font-weight-bold text-body-1">食品价格</v-col>
                <v-col class="font-weight-bold text-body-1">操作</v-col>
              </v-row>
              <div v-for="(order, i) in orderInfo" :key="i">
                <v-row>
                  <v-col align-self="center">{{ order.orderFoodName }} </v-col>
                  <v-col align-self="center">
                    <v-sheet width="75">
                      <v-text-field
                        append-icon="mdi-plus"
                        prepend-inner-icon="mdi-minus"
                        @click:append="clickPlus(order)"
                        @click:prepend-inner="clickMinus(order)"
                        :value="order.orderFoodQuantity"
                        readonly
                      ></v-text-field>
                    </v-sheet>
                  </v-col>
                  <v-col align-self="center">￥{{ order.orderValue }} </v-col>
                  <v-col align-self="center"
                    ><v-btn icon @click="delFood(order)"
                      ><v-icon small> mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="saveChange()">
                确认修改
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-divider class="mt-2"></v-divider>
    <orderDown :orderInfo="orderInfo"></orderDown>
  </div>
</template>

<script>
import orderDown from "../../components/admin/adminHomeCheckOrderDown.vue";
export default {
  components: {
    orderDown,
  },
  data() {
    return {
      allTable: [],
      disabledTableId: [],
      freeTableId: [],
      snackbarText: "您尚未选择餐桌",
      snackbar: false,
      orderInfo: [],
      checkTable: "",
      dialog: false,
      dialog2: false,
      changedItem: [],
      allFood: [],
      orderAddFood: [],
    };
  },
  created() {
    this.getAllTable();
  },
  watch: {
    dialog() {
      this.changedItem = [];
    },
  },
  methods: {
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
          this.disabledTableId.push(this.allTable[i].id);
        } else {
          this.freeTableId.push(this.allTable[i].id);
        }
      }
    },
    getOrderInfo() {
      this.axios
        .post("http://127.0.0.1:3000/getOrderInfo", {
          orderTable: this.checkTable,
        })
        .then((response) => {
          this.orderInfo = response.data;
        });
    },
    delFood(item) {
      this.axios
        .post("http://127.0.0.1:3000/delOrderFood", {
          orderId: item.orderId,
          orderFoodName: item.orderFoodName,
        })
        .then((res) => {
          console.log(res);
          this.orderInfo.splice(this.orderInfo.indexOf(item), 1);
        });
    },
    clickPlus(item) {
      if (item.orderFoodQuantity < 99) {
        let univalent = item.orderValue / item.orderFoodQuantity;
        item.orderFoodQuantity = parseInt(item.orderFoodQuantity) + 1;
        item.orderValue = univalent * item.orderFoodQuantity;
        let index = this.changedItem.indexOf(item);
        if (index == -1) {
          this.changedItem.push(item);
        } else {
          this.changedItem.splice(index, 1);
          this.changedItem.push(item);
        }
      }
    },
    clickMinus(item) {
      if (item.orderFoodQuantity > 1) {
        let univalent = item.orderValue / item.orderFoodQuantity;
        item.orderFoodQuantity = parseInt(item.orderFoodQuantity) - 1;
        item.orderValue = univalent * item.orderFoodQuantity;
        let index = this.changedItem.indexOf(item);
        if (index == -1) {
          this.changedItem.push(item);
        } else {
          this.changedItem.splice(index, 1);
          this.changedItem.push(item);
        }
      }
    },
    saveChange() {
      this.updateNums();

      this.dialog = false;
    },
    updateNums() {
      this.axios
        .post("http://127.0.0.1:3000/updateOrderFood", {
          orderInfo: this.changedItem,
        })
        .then((res) => {
          console.log(res);
          this.changedItem = [];
          this.getOrderInfo();
        });
    },
    selectAllFood() {
      this.axios
        .get("http://127.0.0.1:3000/admin/select")
        .then((response) => {
          this.allFood = [];
          this.orderAddFood = [];
          let allFoodOrign = response.data;
          //删除已经预订过食物
          for (let i = 0; i < this.orderInfo.length; i++) {
            for (let j = 0; j < allFoodOrign.length; j++) {
              if (this.orderInfo[i].orderFoodName == allFoodOrign[j].name) {
                allFoodOrign.splice(allFoodOrign.indexOf(allFoodOrign[j]), 1);
              }
            }
          }

          for (let i = 0; i < allFoodOrign.length; i++) {
            this.allFood.push(
              Object.assign(allFoodOrign[i], { isOrder: false })
            );
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    checkFood(item) {
      if (item.isOrder) {
        item.isOrder = false;
        for (let i = 0; i < this.orderAddFood.length; i++) {
          if (this.orderAddFood[i].foodName == item.name) {
            this.orderAddFood.splice(i, 1);
            break;
          }
        }
      } else {
        item.isOrder = true;
        this.orderAddFood.push({
          foodName: item.name,
          foodValue: item.price,
          foodCategory: item.category,
          foodQuantity: 1,
        });
      }
    },
    saveAddOrder() {
      this.axios
        .post("http://127.0.0.1:3000/addOrderFood", {
          orderId: this.orderInfo[0].orderId,
          orderTable: this.orderInfo[0].orderTable,
          orderDate: new Date(),
          userPhone: this.orderInfo[0].userPhone,
          isPay: "No",
          orderFoodInfo: this.orderAddFood,
        })
        .then((res) => {
          console.log(res);
          this.getOrderInfo();
        });

      this.dialog2 = false;
    },
  },
};
</script>

<style>
</style>