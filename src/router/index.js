import Vue from 'vue';
import VueRouter from 'vue-router';


import register from '../views/Register'
import home from '../views/Home'
import login from '../views/Login'
import allFood from '../views/AllFood'
import addFood from '../views/admin/addFood'
import cart from '../views/Cart'
import cash from '../views/Cash'
import cash2 from '../views/Cash2'
import payok from '../views/PaySuccess'
import user from '../views/User'

import table from '../views/Table'
import order from '../views/Order'
import beforeCash from '../views/BeforeCash'
import orderdetail from '../views/OrderDetail'

import adminuserinfo from '../views/admin/adminUserinfo'
import adminhome from '../views/admin/adminHome'
import adminfoodinfo from '../views/admin/adminFoodinfo'
import adminregister from '../views/admin/adminRegister'
import adminOrder from '../views/admin/adminOrder'
import adminRealOrder from '../views/admin/adminRealOrder'

Vue.use(VueRouter)
const routes = [
     {
         path: '/',
         component: home,
         meta:{
            title:'RANNI'
         }
     },
     {
        path: '/register',
        component: register,
        meta:{
            title:'注册用户'
         }
     },
     {
         path: '/home',
         component: home
     },
     {
         path: '/login',
         component: login,
         meta:{
            title:'登录'
         }
     },
     {
         path:'/food',
         component: allFood,
         meta:{
            title:'所有食品'
         }
     },
     {
         path:'/admin/addfood',
         component:addFood,
         meta:{
            title:'添加食品'
         }
     },
     {
         path:'/cart',
         component:cart,
         meta:{
            title:'购物袋'
         }
     },
     {
         path:'/cash',
         component:cash,
         meta:{
            title:'支付'
         }
     },
     {
        path:'/cash2',
        component:cash2,
        meta:{
           title:'支付'
        }
    },
     {
         path:'/payok',
         component:payok,
         meta:{
            title:'支付成功'
         }
     },
     {
         path:'/user',
         component:user,
         meta:{
            title:'我的账户'
         }
     },
     {
        path:'/orderdetail',
        component:orderdetail,
        meta:{
           title:'订单详情'
        }
    },

     {
         path:'/admin/userinfo',
         component:adminuserinfo,
         meta:{
            title:'RANNI-用户信息'
         }
     },
     {
         path:'/admin/home',
         component:adminhome,
         meta:{
            title:'RANNI-后台主页'
         }
     },
     {
         path:'/admin/foodinfo',
         component:adminfoodinfo,
         meta:{
            title:'RANNI-食物信息'
         }
     },
     {
         path:'/admin/register',
         component:adminregister,
         meta:{
            title:'RANNI-管理员注册'
         }
     },
     {
        path:'/admin/order',
        component:adminOrder
    },
     {
         path:'/table',
         component:table
     },
     {
         path:'/order',
         component:order
     },
     {
        path:'/beforecash',
        component:beforeCash
     },
     {
         path:'/admin/realorder',
         component:adminRealOrder
     }
     

 
 ]

 const router = new VueRouter({
 mode: 'history',
 base: process.env.BASE_URL,
 routes
 })

 export default router;