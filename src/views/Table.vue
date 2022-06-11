<template>
  <v-container class="pa-0 mt-5">
    <p class="text-h4">选择您的餐桌</p>
    <div style="display: inline-block; width: 100px" class="mt-4">
      <p><v-icon>mdi-checkbox-marked</v-icon> 已被预订</p>
    </div>
    <div style="display: inline-block; width: 100px" class="mx-8">
      <p><v-icon>mdi-checkbox-blank-outline</v-icon> 可预订</p>
    </div>

    <v-divider class="my-5"></v-divider>
    <p class="text-h4">小桌<span class="pl-5 text-h6">(1~2人)</span> </p>
    <div
      v-for="table in smallTable"
      :key="table.id"
      style="display: inline-block; width: 100px"
    >
      <v-checkbox
        :label="table.id"
        color="indigo"
        :disabled="table.ischeck == 'false'"
        :indeterminate="table.ischeck == 'false'"
        indeterminate-icon="mdi-checkbox-marked"
        v-model="checkNow"
        :value="table.id"
      ></v-checkbox>
    </div>
    <v-divider class="my-5"></v-divider>
    <p class="text-h4">中桌<span class="pl-5 text-h6">(2~4人)</span></p>
    <div
      v-for="table in normalTable"
      :key="table.id"
      style="display: inline-block; width: 100px"
    >
      <v-checkbox
        :label="table.id"
        color="indigo"
        :disabled="table.ischeck == 'false'"
        :indeterminate="table.ischeck == 'false'"
        indeterminate-icon="mdi-checkbox-marked"
        v-model="checkNow"
        :value="table.id"
      ></v-checkbox>
    </div>
    <v-divider class="my-5"></v-divider>
    <p class="text-h4">大桌<span class="pl-5 text-h6">(4~6人)</span></p>
    <div
      v-for="table in largeTable"
      :key="table.id"
      style="display: inline-block; width: 100px"
    >
      <v-checkbox
        :label="table.id"
        color="indigo"
        :disabled="table.ischeck == 'false'"
        :indeterminate="table.ischeck == 'false'"
        indeterminate-icon="mdi-checkbox-marked"
        v-model="checkNow"
        :value="table.id"
      ></v-checkbox>
    </div>
    <div class="my-5">
      <v-btn color="primary" rounded @click="checkBox()" large width="200"
        >预订</v-btn
      >
    </div>
    <v-snackbar v-model="snackbar" top centered timeout="4000">
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tables: [],
    smallTable: [],
    normalTable: [],
    largeTable: [],
    checkNow: "",
    snackbarText: "您尚未选择餐桌",
    snackbar: false,
  }),
  created() {
    this.getAllTable();
  },
  methods: {
    getAllTable() {
      this.axios
        .get("http://127.0.0.1:3000/getalltable")
        .then((response) => {
          this.tables = response.data;
          this.divideTable();
        })
        .catch((err) => {
          alert(err);
        });
    },
    divideTable() {
      for (let i in this.tables) {
        if (this.tables[i].genre == "small") {
          this.smallTable.push(this.tables[i]);
        } else if (this.tables[i].genre == "normal") {
          this.normalTable.push(this.tables[i]);
        } else if (this.tables[i].genre == "large") {
          this.largeTable.push(this.tables[i]);
        }
      }
    },
    checkBox() {
      if (this.checkNow != "") {
        this.axios
          .post("http://127.0.0.1:3000/ordertable", {
            id: this.checkNow,
            ischeck: "false",
          })
          .then((res) => {
            console.log(res);
            this.$store.commit("setTable", this.checkNow);
            this.$router.push("/food");
          });
      } else {
        this.snackbar = true
      }
    },
  },
};
</script>

<style>
</style>