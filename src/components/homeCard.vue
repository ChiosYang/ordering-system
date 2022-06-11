<template>
  <v-card class="mx-auto" :color="item.color" dark max-width="400">
    <v-img
      :src="require('../assets/' + item.img)"
      height="400"
    ></v-img>
    <v-card-title>
      <span class="text-h4 font-weight-bold">{{ item.title }}</span>
    </v-card-title>

    <v-card-text class="text-h5">
      <div style="height: 200px" class="d-flex align-baseline flex-column">
        <div style="height: 130px">{{ item.text }}</div>

        <v-dialog v-model="dialog" width="900">
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab light small color="white" v-bind="attrs" v-on="on">
              <v-icon light> mdi-arrow-right </v-icon>
            </v-btn>
          </template>

          <v-card>
            <div class="black">
              <v-img
                :src="require('../assets/' + item.introImg )"
                height="300"
                style="opacity: 0.8"
              ></v-img>
            </div>
            <v-card-title class="text-h5">
              {{ item.title }}
            </v-card-title>

            <v-card-text>
              <p>{{ item.text }}</p>
              <v-row no-gutters>
                <v-col v-for="(it, i) in item.content" :key="i">
                  <p class="text-h5">{{ it.title }}:</p>
                  <p v-for="(itext, j) in it.text" :key="j">{{ itext }}</p>
                </v-col>
              </v-row>
            </v-card-text>

 
          </v-card>
        </v-dialog>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      dialog: false,
    };
  },
  created() {
    //console.log(this.item.title)
  },
};
</script>

<style>
</style>