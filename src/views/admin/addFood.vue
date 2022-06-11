<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="4">
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="食品名"
              rules="required|max:10"
            >
              <v-text-field
                v-model="name"
                :counter="10"
                :error-messages="errors"
                label="食品名"
                required
              ></v-text-field>
            </validation-provider>
            <v-file-input
              accept="image/*"
              label="上传食物图片"
              type="file"
              ref="uploadImg"
              v-model="img"
            ></v-file-input>
            <validation-provider
              v-slot="{ errors }"
              name="价格"
              rules="required"
            >
              <v-text-field
                v-model="price"
                :error-messages="errors"
                label="价格"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="食品描述"
              rules="required|max:30"
            >
              <v-text-field
                v-model="description"
                :error-messages="errors"
                label="食品描述"
                :counter="30"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="库存"
              rules="required"
            >
              <v-text-field
                v-model="reserve"
                :error-messages="errors"
                label="库存"
                required
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="类别"
              rules="required"
            >
              <v-select
                v-model="select"
                :items="items"
                :error-messages="errors"
                label="类别"
                data-vv-name="select"
                required
              ></v-select>
            </validation-provider>

            <v-btn class="mr-4" type="submit" :disabled="invalid"> 提交 </v-btn>
            <v-btn @click="clear"> 重置 </v-btn>
          </form>
        </validation-observer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} 需要 {length} 位. ({_value_})",
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
  message: "{_field_} {_value_} 不匹配 {regex}",
});

extend("email", {
  ...email,
  message: "邮箱 需符合规范",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    name: "",
    price: "",
    img: null,
    imgStr: "",
    description: "",
    reserve: "",
    select: null,
    items: ["主食", "小吃", "饮品"],
  }),
  created() {},

  methods: {
    submit() {
      this.$refs.observer.validate();
      this.codeBase64();
    },
    clear() {
      this.name = "";
      this.price = "";
      this.description = "";
      this.reserve = "";
      this.select = null;
      this.img = null;
      this.$refs.observer.reset();
    },
    add() {
      this.axios
        .post("http://127.0.0.1:3000/admin/add", {
          name: this.name,
          price: this.price,
          img: this.imgStr,
          description: this.description,
          reserve: this.reserve,
          category: this.select,
        })
        .then((res) => {
          console.log(res);
        });
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
          that.add();
          alert('添加完成')
          that.clear()
        };
      })(file);
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style>
</style>