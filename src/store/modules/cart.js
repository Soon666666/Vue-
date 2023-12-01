const state = {
  items: []
}
//mutations
const mutations = {
  //添加商品到购物车中
  pushProductToCart(state, { id, image, title, price, quantity }) {
    if (!quantity)
      quantity = 1;
    state.items.push({ id, image, title, price, quantity });
  },

  //增加商品数量
  incrementItemQuantity(state, { id, quantity }) {
    let cartItem = state.items.find(item => item.id == id);
    cartItem.quantity += quantity;
  },
  //用于清空购物车
  setCartItems(state, { items }) {
    state.items = items
  },

  //删除购物车中的商品
  deleteCartItem(state, id) {
    let index = state.items.findIndex(item => item.id === id);
    if (index > -1)
      state.items.splice(index, 1);
  }
}

//getters
const getters = {
  //计算购物车中所有商品的总价
  cartTotalPrice: (state) => {
    return state.items.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  },
  //计算购物车中单项商品的价格
  cartItemPrice: (state) => (id) => {
    if (state.items.length > 0) {
      const cartItem = state.items.find(item => item.id === id);
      if (cartItem) {
        return cartItem.price * cartItem.quantity;
      }
    }
  },
  //获取购物车中商品的数量
  itemsCount: (state) => {
    return state.items.length;
  }
}

//actions
const actions = {
  //增加任意数量的商品到购物车
  addProductToCart({ state, commit },
    { id, image, title, price, inventory=999, quantity }) {
    //修改代码，因为我们数据库没有库存inventory字段，故这里设置为999，
    //表示库存充足
    if (inventory > 0) {
      const cartItem = state.items.find(item => item.id == id);
      if (!cartItem) {
        commit('pushProductToCart', { id, image, title, price, quantity })
      } else {
        commit('incrementItemQuantity', { id, quantity })
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}