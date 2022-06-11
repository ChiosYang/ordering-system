<template>
  <div>
    <v-row no-gutters>
      <v-col lg="2">
        <sideNavi></sideNavi>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>
            食品信息
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
            :items="allfood"
            :search="search"

          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-dialog v-model="dialog" max-width="800px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      fab
                    >
                      <v-icon> mdi-plus </v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="12">
                            <v-file-input
                              accept="image/*"
                              label="上传图片"
                              type="file"
                              ref="uploadImg"
                              v-model="img"
                            ></v-file-input>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedItem.name"
                              label="食品名"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <!-- <v-text-field
                              v-model="editedItem.category"
                              label="分类"
                            ></v-text-field> -->
                            <v-select
                              v-model="editedItem.category"
                              :items="categories"
                              
                              label="类别"
                              data-vv-name="select"
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.price"
                              label="价格"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.sales"
                              label="销量"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.reserve"
                              label="库存"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="12">
                            <v-text-field
                              v-model="editedItem.description"
                              label="描述"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        取消
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        保存
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >确定要删除这个食品？</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >取消</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >确定</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.img`]="{ item }">
              <v-img :src="item.img" width="60"></v-img>
            </template>
            <template v-slot:[`item.opt`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
          text: "图片",
          align: "start",
          sortable: false,
          value: "img",
        },
        {
          text: "食品名",
          sortable: false,
          value: "name",
        },
        { text: "价格", value: "price" },
        { text: "分类", value: "category" },
        { text: "销量", value: "sales" },
        { text: "库存", value: "reserve" },
        { text: "描述", value: "description" },
        { text: "操作", value: "opt" },
      ],
      img: null,
      imgStr: "",
      allfood: [],
      opt: ["aa"],
      categories:['主食','小吃','饮料'],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      deleteName: "",
      editedItem: {
        img: null,
        name: "",
        price: "",
        category: "",
        sales: "",
        reserve: "",
        description: "",
      },
      defaultItem: {
        img: null,
        name: "",
        price: "",
        category: "",
        sales: "",
        reserve: "",
        description: "",
      },
    };
  },
  created() {
    this.judgeAuthority();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "添加食品" : "修改食品";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    judgeAuthority() {
      if (this.$store.state.admin.level == "管理员") {
        this.getAllFood();
      } else if(this.$store.state.admin.level == "服务员"){
        alert("您暂无此权限");
        this.$router.push({ path: `/admin/home` });
      }else{
        alert("请先登录");
        this.$router.push({ path: `/login` });
      }
    },
    getAllFood() {
      this.axios
        .get("http://127.0.0.1:3000/admin/select")
        .then((response) => {
          this.allfood = response.data;
          console.log(this.allfood);
        })
        .catch((err) => {
          alert(err);
        });
    },
    editItem(item) {
      this.editedIndex = this.allfood.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.allfood.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.deleteName = item.name;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.allfood.splice(this.editedIndex, 1);
      this.delUSer();
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.img = null;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        if (this.img == null) {
          if (this.editedItem.img == "") {
            Object.assign(this.allfood[this.editedIndex], this.editedItem);
            this.updateFood();
            this.close();
          } else {
            this.imgStr = this.editedItem.img;
            Object.assign(this.allfood[this.editedIndex], this.editedItem);
            this.updateFood();
            this.close();
          }
        } else {
          this.codeBase64Update();
        }
      } else {
        if (this.img == null) {
          this.addFoodToBase();
          this.alluser.push(this.editedItem);
          this.close();
        } else {
          this.codeBase64();
        }
      }
    },
    codeBase64() {
      let base64 = "";
      let file = this.img;
      let reader = new FileReader();
      let that = this;

      reader.onload = (function () {
        return function () {
          base64 = this.result;
          that.imgStr = base64;
          that.addFoodToBase();
          that.editedItem.img = that.imgStr;
          that.allfood.push(that.editedItem);

          that.close();
        };
      })(file);

      reader.readAsDataURL(file);
    },
    codeBase64Update() {
      let base64 = "";
      let file = this.img;
      let reader = new FileReader();
      let that = this;

      reader.onload = (function () {
        return function () {
          base64 = this.result;
          that.imgStr = base64;
          that.updateFood();
          that.editedItem.img = that.imgStr;
          Object.assign(that.allfood[that.editedIndex], that.editedItem);

          that.close();
        };
      })(file);

      reader.readAsDataURL(file);
    },
    addFoodToBase() {
      this.axios
        .post("http://127.0.0.1:3000/admin/add", {
          name: this.editedItem.name,
          price: this.editedItem.price,
          category: this.editedItem.category,
          reserve: this.editedItem.reserve,
          description: this.editedItem.description,
          img: this.imgStr,
        })
        .then((res) => {
          console.log(res);
        });
    },
    delUSer() {
      this.axios
        .post("http://127.0.0.1:3000/delfood", {
          name: this.deleteName,
        })
        .then((res) => {
          console.log(res);
        });
    },
    updateFood() {
      this.axios
        .post("http://127.0.0.1:3000/admin/updatefood", {
          name: this.editedItem.name,
          price: this.editedItem.price,
          description: this.editedItem.description,
          reserve: this.editedItem.reserve,
          category: this.editedItem.category,
          sales: this.editedItem.sales,
          img: this.imgStr,
        })
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style>
</style>