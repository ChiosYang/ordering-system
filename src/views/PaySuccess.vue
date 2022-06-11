<template>
  <v-container>
    <h1>支付成功</h1>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    orderId:''
  }),
created(){
  this.orderId = this.$route.query.out_trade_no
  this.paySuccess()
},
methods:{
  paySuccess(){
      this.axios
        .post("http://127.0.0.1:3000/addRealOrderOk", {
          orderId: this.orderId,
        })
        .then((res) => {
          console.log(res);
        });

  },


}

};
</script>

<style>
</style>