<template>
  <div>
    <div class="my-5">
      <v-expansion-panels accordion flat>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row>
              <v-col>
                <v-icon large> mdi-account </v-icon>
                <span class="ml-5 text-h6 pt-1">
                  {{ user.name }}
                </span>
              </v-col>
            </v-row>
            <template v-slot:actions>
              <span
                class="
                  font-weight-bold
                  text-subtitle-1 text-decoration-underline
                "
                >修改</span
              >
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-sheet class="d-flex align-center">
              <v-sheet width="600"
                ><v-text-field label="新的名字" counter="20" v-model="newName">
                </v-text-field
              ></v-sheet>
              <v-sheet width="200" class="ml-4">
                <v-btn icon x-large @click="changeName()"
                  ><v-icon size="40">mdi-check</v-icon></v-btn
                >
              </v-sheet>
            </v-sheet>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-divider></v-divider>
    <div class="my-5">
      <v-expansion-panels accordion flat>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row>
              <v-col>
                <v-icon large> mdi-email </v-icon>
                <span class="ml-5 text-h6 pt-1">
                  {{ user.email }}
                </span>
              </v-col>
            </v-row>
            <template v-slot:actions>
              <span
                class="
                  font-weight-bold
                  text-subtitle-1 text-decoration-underline
                "
                >修改</span
              >
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-sheet class="d-flex align-center">
              <v-sheet width="600"
                ><v-text-field label="新的邮箱" counter="20" v-model="newEmail">
                </v-text-field
              ></v-sheet>
              <v-sheet width="200" class="ml-4">
                <v-btn icon x-large @click="changeEmail()"
                  ><v-icon size="40">mdi-check</v-icon></v-btn
                >
              </v-sheet>
            </v-sheet>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-divider></v-divider>
    <div class="my-5">
      <v-expansion-panels accordion flat readonly>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row>
              <v-col>
                <v-icon large> mdi-phone </v-icon>
                <span class="ml-5 text-h6 pt-1">
                  {{ user.phone }}
                </span>
              </v-col>
            </v-row>
            <template v-slot:actions> <p></p> </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field></v-text-field>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      newName: "",
      newEmail: "",
    };
  },
  methods: {
    changeName() {
      this.axios
        .post("http://127.0.0.1:3000/changeUser", {
          userInfo: this.newName,
          userPhone: this.$store.state.user.phone,
        })
        .then((res) => {
          this.$emit("changeUser", res.data);
        });
    },
    changeEmail() {
      this.axios
        .post("http://127.0.0.1:3000/changeUserEmail", {
          userInfo: this.newEmail,
          userPhone: this.$store.state.user.phone,
        })
        .then((res) => {
          this.$emit("changeUser", res.data);
          
        });
    },
  },
};
</script>

<style>
</style>