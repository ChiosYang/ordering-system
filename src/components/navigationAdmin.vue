<template>
   
    <v-app-bar
      app
      color="white"
      elevation='1'
    >

      <div class="d-flex align-center">
        <router-link to='/'>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/xilanhua.svg"
          transition="scale-transition"
          width="40"
        />
        </router-link>
      </div>
      <div class="d-flex align-center text-h4">
        <router-link to='/' style="text-decoration:none;color:black " >Ranni</router-link>
      </div>
      <div 
        class="mx-4"
      >
        <v-menu
        open-on-hover
        bottom
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="black"
            lighten
            v-bind="attrs"
            v-on="on"
            to="/food"
            text
          >
            所有食品
          </v-btn>
        </template>
  
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      </div>
      
      <v-spacer></v-spacer>
      <v-tooltip bottom>
         <template v-slot:activator="{ on, attrs }">
           <v-btn
            class="mx-2"
            icon
            color="black"
            to='/login'
            v-bind="attrs"
            v-on="on"
          >
          <v-avatar size="40" >
            <v-icon v-show="!icon">
              mdi-account-outline
            </v-icon> 
             <v-img :src='$store.state.user.avatar' v-show="icon"></v-img>
            </v-avatar>
          </v-btn>
          </template>
          <span>我的个人档案</span>
      </v-tooltip>


    </v-app-bar>

    
 
</template>

<script>
export default {
        name:'navigation',
        data: () => ({
          items: [
            { title: '中餐' },
            { title: '小吃和甜食' },
            { title: '饮料' },
            { title: '酒水' },
          ],
          icon:false
        }),
        watch : {
          '$store.state.user': function (){
            this.changeUserIcon()
          }
        },
        methods: {
          changeUserIcon () {
            if(this.$store.state.user == ''){
              this.icon = false
            }else{
              this.icon = true
            }

          }

        }


}
</script>

<style>

</style>