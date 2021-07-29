<template>
  <div id="profile">
   <nav-bar class="nav"><div slot="center">小商城</div></nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "Profile",
  components: {
    NavBar
  }
}
</script>

<style scoped>
.nav {
  background-color: hotpink;
  color: #fff;
}
</style>