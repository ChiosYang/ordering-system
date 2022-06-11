import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';


Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // 默认值 - 仅用于展示目的
    },
});
