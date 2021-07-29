<template>
  <div id="profile">
    <nav-bar class="nav"><div slot="center">小商城</div></nav-bar>
    <user-info />
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item c">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

    <list-view :list="orderList"></list-view>
    <div class="border"></div>
    <list-view :list="serviceList"></list-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import UserInfo from "./childComps/UserInfo";
import ListView from "./childComps/ListView";
export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    ListView
  },
  data() {
    return {
      orderList: [
        {info: "我的消息", src: "@/assets/img/profile/message.svg"},
        {info: "积分商城", src: "@/assets/img/profile/pointer.svg"},
        {info: "会员卡", src: "@/assets/img/profile/vip.svg"}
      ],
      serviceList: [
        {info: "我的购物车", src: "@/assets/img/profile/cart.svg"},
        {info: "下载购物app", src: "@/assets/img/profile/shopping.svg"}
      ]

    }
  }
}
</script>

<style scoped>
.nav {
  background-color: hotpink;
  color: #fff;
  border-bottom: 2px solid deeppink;
}
.account {
  display: flex;
  border-bottom: 10px solid #ccc;
}
.account-item {
  flex: 1;
  height: 80px;
  text-align: center;
}
.c {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
.number {
  margin-top: 19px;
  font-size: 12px;
}
.balance {
  color: hotpink;
  font-size: 20px;
  font-weight: 700;
}
.account-info {
  font-size: 12px;
}
.border {
  height: 10px;
  background-color: #ccc;
}
</style>