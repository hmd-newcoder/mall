export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = this.state.cartList.find(item => item.iid === payload.iid);
      if (oldProduct) {
        context.commit('addCartCount', oldProduct);
        resolve('商品数量加1')
      } else {
        payload.count = 1;
        context.commit('addTOCartList', payload);
        resolve('添加成功!')
      }
    })
  },
  addSelect(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = this.state.selectList.find(item => item.iid === payload.iid);
      if (oldProduct) {
        resolve('该商品收藏过了!')
      } else {
        context.commit('addTOSelectList', payload);
        resolve('收藏成功!')
      }
    })
  }
}