export default {
  addCartCount(state, payload) {
    payload.count++
  },

  addTOCartList(state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },

  // changeTrue(state) {
  //   state.isAllChecked = true;
  // },
  //
  // changeFalse(state) {
  //   state.isAllChecked = false;
  // }
  addTOSelectList(state, payload) {
    state.selectList.push(payload);
  }
}