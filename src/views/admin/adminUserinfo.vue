<template>
  <div>
    <v-row no-gutters>
      <v-col lg="2">
        <sideNavi></sideNavi>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>
            用户信息
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
            :items="alluser"
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
                    <validation-observer ref="observer" v-slot="{ invalid }">
                      <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="12">
                              <v-file-input
                                accept="image/*"
                                label="上传头像"
                                type="file"
                                ref="uploadImg"
                                v-model="img"
                              ></v-file-input>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <validation-provider
                                v-slot="{ errors }"
                                name="姓名"
                                rules="required|max:10"
                              >
                                <v-text-field
                                  v-model="editedItem.name"
                                  label="姓名"
                                  :error-messages="errors"
                                ></v-text-field>
                              </validation-provider>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <validation-provider
                                v-slot="{ errors }"
                                name="手机号码"
                                :rules="{
                                  required: true,
                                  digits: 11,
                                  regex: '^1[3|4|5|7|8][0-9]{9}$',
                                }"
                              >
                                <v-text-field
                                  v-model="editedItem.phone"
                                  label="手机号"
                                  :error-messages="errors"
                                  required
                                ></v-text-field>
                              </validation-provider>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <validation-provider
                                v-slot="{ errors }"
                                name="密码"
                                rules="required"
                              >
                                <v-text-field
                                  v-model="editedItem.password"
                                  label="密码"
                                  :error-messages="errors"
                                ></v-text-field>
                              </validation-provider>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <validation-provider
                                v-slot="{ errors }"
                                name="邮箱"
                                rules="required|email"
                              >
                                <v-text-field
                                  v-model="editedItem.email"
                                  label="邮箱"
                                  :error-messages="errors"
                                ></v-text-field>
                              </validation-provider>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                          取消
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="save"
                          :disabled="invalid"
                        >
                          保存
                        </v-btn>
                      </v-card-actions>
                    </validation-observer>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >确定要删除这个用户？</v-card-title
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
            <template v-slot:[`item.avatar`]="{ item }">
              <v-avatar size="40">
                <v-img :src="item.avatar"></v-img>
              </v-avatar>
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
import { required, digits, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} 需要 {length} 位.",
});

extend("required", {
  ...required,
  message: "{_field_} 不可为空",
});

extend("max", {
  ...max,
  message: "{_field_} 不可超过 {length} 个字符",
});

extend("regex", {
  ...regex,
  message: "{_field_}不符合格式",
});

extend("box", {
  ...required,
  message: "请同意条款",
});
export default {
  components: {
    sideNavi,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "头像",
          align: "start",
          sortable: false,
          value: "avatar",
        },
        {
          text: "用户名",
          sortable: false,
          value: "name",
        },
        { text: "手机号", value: "phone" },
        { text: "密码", value: "password" },
        { text: "邮箱", value: "email" },
        { text: "操作", value: "opt" },
      ],
      img: null,
      imgStr: "",
      alluser: [],
      opt: ["aa"],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      deletePhone: "",
      editedItem: {
        name: "",
        phone: "",
        password: "",
        email: "",

        avatar: "",
      },
      defaultItem: {
        name: "",
        phone: "",
        password: "",
        email: "",

        avatar: "",
      },
    };
  },
  created() {
    this.judgeAuthority();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "添加用户" : "修改用户";
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
        this.getAllUser();
      } else if (this.$store.state.admin.level == "服务员") {
        alert("您暂无此权限");
        this.$router.push({ path: `/admin/home` });
      } else {
        alert("请先登录");
        this.$router.push({ path: `/login` });
      }
    },
    getAllUser() {
      this.axios
        .get("http://127.0.0.1:3000/getalluser")
        .then((response) => {
          this.alluser = response.data;
          console.log(this.alluser);
        })
        .catch((err) => {
          alert(err);
        });
    },
    editItem(item) {
      this.editedIndex = this.alluser.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.alluser.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.deletePhone = item.phone;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.alluser.splice(this.editedIndex, 1);
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
          if (this.editedItem.avatar == "") {
            Object.assign(this.alluser[this.editedIndex], this.editedItem);
            this.updateUser();
            this.close();
          } else {
            this.imgStr = this.editedItem.avatar;
            Object.assign(this.alluser[this.editedIndex], this.editedItem);
            this.updateUser();
            this.close();
          }
        } else {
          this.codeBase64Update();
        }
      } else {
        if (this.img == null) {
          this.addUserToBase();
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
          that.addUserToBase();
          that.editedItem.avatar = that.imgStr;
          that.alluser.push(that.editedItem);

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
          that.updateUser();
          that.editedItem.avatar = that.imgStr;
          Object.assign(that.alluser[that.editedIndex], that.editedItem);

          that.close();
        };
      })(file);

      reader.readAsDataURL(file);
    },
    addUserToBase() {
      this.axios
        .post("http://127.0.0.1:3000/add", {
          name: this.editedItem.name,
          phonenumber: this.editedItem.phone,
          email: this.editedItem.email,
          password: this.editedItem.password,
          img: this.imgStr,
        })
        .then((res) => {
          console.log(res);
        });
    },
    delUSer() {
      this.axios
        .post("http://127.0.0.1:3000/deluser", {
          phonenumber: this.deletePhone,
        })
        .then((res) => {
          console.log(res);
        });
    },
    updateUser() {
      this.axios
        .post("http://127.0.0.1:3000/updateuser", {
          name: this.editedItem.name,
          phone: this.editedItem.phone,
          email: this.editedItem.email,
          password: this.editedItem.password,
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