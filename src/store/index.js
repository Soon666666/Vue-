// store/index.js
import {createStore} from 'vuex';
//导入cart模块
import cart from './modules/cart.js';
import user from './modules/user.js';
//导入vuex持久化插件
import createPersistedState from 'vuex-persistedstate'
//使用vuex
// this.use(Vuex)
//生成store对象。并持久化存储
const store=createStore({
    modules:{
        cart,
        user
    },
    plugins:[createPersistedState(
        {
            storage:window.sessionStorage,
            reducer(data){
                return {
                    //存储模块cart,user的状态
                    cart:data.cart,
                    user:data.user
                }
            }
        }
    )]
});
export default store;

