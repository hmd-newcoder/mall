<template>
  <div id="shopcar">
    <nav-bar  class="category-nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list/>
    <shopcar-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import ShopcarBottomBar from "./childComps/ShopcarBottomBar";

import {mapGetters} from 'vuex';

export default {
  name: "Shopcar",
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      length: 'cartLength',
    })
  },
  components: {
    NavBar,
    CartList,
    ShopcarBottomBar
  }
}
</script>

<style scoped>
#shopcar {
  height: 100vh;
}
.category-nav-bar {
  background-color: hotpink;
  color: #fff;
  font-weight: 700;
}
</style>