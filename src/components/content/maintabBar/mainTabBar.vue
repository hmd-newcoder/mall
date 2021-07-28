<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="pink">
      <img src="@/assets/img/tabbar/home.svg" alt="" slot="item-icon">
      <img src="@/assets/img/tabbar/home-active.svg" alt="" slot="item-icon-active">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="lightpink">
      <img src="@/assets/img/tabbar/category.svg" alt="" slot="item-icon">
      <img src="@/assets/img/tabbar/category-active.svg" alt="" slot="item-icon-active">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shopcar" activeColor="pink">
      <img src="@/assets/img/tabbar/shopcar.svg" alt="" slot="item-icon">
      <img src="@/assets/img/tabbar/shopcar-active.svg" alt="" slot="item-icon-active">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="deeppink">
      <img src="@/assets/img/tabbar/profile.svg" alt="" slot="item-icon">
      <img src="@/assets/img/tabbar/profile-active.svg" alt="" slot="item-icon-active">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import tabBar from "../../common/tabbar/tabBar";
import tabBarItem from "../../common/tabbar/tabBarItem";
export default {
  name: "mainTabBar",
  components: {
    tabBar,
    tabBarItem
  }
}
</script>

<style scoped>

</style>