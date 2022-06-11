<template>
  <div class="mt-5">
    <v-row>
      <v-col lg="1"
        ><p class="grey--text text-body-1 text--darken-1">
          餐桌总数: {{ allTable.length }}
        </p></v-col
      >
      <v-col lg="1"
        ><p class="grey--text text-body-1 text--darken-1">
          可订餐桌: {{ freeTableNum }}
        </p></v-col
      >
      <v-col lg="1"
        ><p class="grey--text text-body-1 text--darken-1">
          已订餐桌: {{ disabledTableNum }}
        </p></v-col
      >
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-5">
      <v-col lg="1">
        <p class="text-h6 mt-4">预订餐桌</p>
      </v-col>
      <v-col lg="5">
        <v-select
          :items="freeTableId"
          label="选择桌号"
          no-data-text="无空闲餐桌"
          v-model="checkFreeTable"
        ></v-select>
      </v-col>
      <v-col align-self="center">
        <v-btn depressed color="primary" rounded @click="setTableDisable()">确认</v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col lg="1">
        <p class="text-h6 mt-4">解除预订</p>
      </v-col>
      <v-col lg="5">
        <v-select
          :items="disabledTableId"
          label="选择桌号"
          no-data-text="无已订餐桌"
          v-model="checkDisabledTable"
        ></v-select>
      </v-col>
      <v-col align-self="center">
        <v-btn depressed color="primary" rounded @click="setTableFree()"
          >确认</v-btn
        >
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
      freeTableNum: 0,
      disabledTableNum: 0,
      freeTableId: [],
      disabledTableId: [],
      checkFreeTable: "",
      checkDisabledTable: "",
      snackbarText: "您尚未选择餐桌",
      snackbar: false,
    };
  },
  created() {
    this.getAllTable();
  },
  methods: {
    getAllTable() {
      this.axios
        .get("http://127.0.0.1:3000/getalltable")
        .then((response) => {
          this.allTable = response.data;
          this.cutTable();
          this.countTableNum();
        })
        .catch((err) => {
          alert(err);
        });
    },
    countTableNum() {
      this.freeTableNum = this.freeTableId.length;
      this.disabledTableNum = this.disabledTableId.length;
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
    setTableFree() {
      if (this.checkDisabledTable != "") {
        this.axios
          .post("http://127.0.0.1:3000/ordertable", {
            id: this.checkDisabledTable,
            ischeck: "true",
          })
          .then((res) => {
            console.log(res);
            this.snackbarText = "设置成功";
            this.snackbar = true;
            this.freeTableId.push(this.checkDisabledTable);
            this.disabledTableId.splice(
              this.disabledTableId.indexOf(this.checkDisabledTable),
              1
            );
            this.countTableNum();
            this.checkDisabledTable = ''
          });
      } else {
        this.snackbarText = "您尚未选择餐桌";
        this.snackbar = true;
      }
    },
    setTableDisable() {
      if (this.checkFreeTable != "") {
        this.axios
          .post("http://127.0.0.1:3000/ordertable", {
            id: this.checkFreeTable,
            ischeck: "false",
          })
          .then((res) => {
            console.log(res);
            this.snackbarText = "设置成功";
            this.snackbar = true;
            this.disabledTableId.push(this.checkFreeTable);
            this.freeTableId.splice(
              this.freeTableId.indexOf(this.checkFreeTable),
              1
            );
            this.countTableNum();
            this.checkFreeTable = ''
          });
      } else {
        this.snackbarText = "您尚未选择餐桌";
        this.snackbar = true;
      }
    },
  },
};
</script>

<style>
</style>