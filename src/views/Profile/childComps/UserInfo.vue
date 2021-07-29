<template>
  <div class="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <img src="@/assets/img/profile/avatar.svg" alt="" class="user-icon">
      </slot>
      <div class="login-info">
        <slot name="user-nickname">
          <div class="user-nickname">登录/注册</div>
        </slot>
        <div class="phone">
          <img src="@/assets/img/profile/phone.svg" alt="">
          <slot name="user-phone"><span>暂无绑定手机号</span></slot>
        </div>
      </div>
      <img src="@/assets/img/common/arrow-left.svg" alt="" class="detail">
    </a>
  </div>
</template>

<script>
export default {
  name: "UserInfo"
}
</script>

<style scoped>
.clear-fix {
  display: block;
  height: 100px;
  background-color: hotpink;
}
.user-icon {
  float: left;
  width: 70px;
  height: 70px;
  margin: 10px;
}
.login-info {
  float: left;
  width: 120px;
  height: 50px;
  margin-top: 25px;

}
.user-nickname {
  float: left;
  color: #fff;
}
.phone {
  float: left;
  width: 100%;
  font-size: 12px;
  color: #fff;
  padding-top: 2px;
}
.phone img {
  height: 20px;
  vertical-align: bottom;
  margin-left: -4px;
}
.detail {
  width: 20px;
  height: 20px;
  float: right;
  margin: 35px 10px 40px 0;
}
</style>