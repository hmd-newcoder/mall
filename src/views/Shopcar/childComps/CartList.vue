<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="item in cartList" :cart-list-item="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";
import Scroll from "components/common/scroll/Scroll";

import {mapGetters} from "vuex"
export default {
  name: "CartList",
  computed: {
    ...mapGetters(['cartList'])
  },
  components: {
    CartListItem,
    Scroll
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>