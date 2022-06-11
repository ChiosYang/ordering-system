import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        user: [],
        order: [],
        admin:[],
        table:[],
        cartLength:'',
        orderId:''

    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setOrder(state, order) {
            state.order = order
        },
        setAdmin(state, admin){
            state.admin = admin
        },
        setTable(state, table){
            state.table = table
        },
        setCartLength(state, cartLength){
            state.cartLength = cartLength
        },
        setOrderId(state, orderId){
            state.orderId = orderId
        },
    },

});

export default store;
