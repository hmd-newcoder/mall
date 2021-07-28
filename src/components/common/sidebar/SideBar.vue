<template>
  <scroll id="content">
    <div class="side-bar">
      <ul>
        <li v-for="(item,index) in titles" :key="index"
            :class="{active: currentIndex === index}"
            @click="titlesClick(index)">{{item.title}}</li>
      </ul>
    </div>
  </scroll>
</template>

<script>

import Scroll from "../scroll/Scroll";
export default {
  name: "SideBar",
  components: {
    Scroll
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    titlesClick(index) {
      this.currentIndex = index
      this.$emit('sidebarClick', index)
    }
  }
}
</script>

<style scoped>
#content {
  height: 100%;
  width: 87px;
  overflow: hidden;
}
.side-bar {
  width: 87px;
}
.side-bar li {
  width: 87px;
  height: 44px;
  line-height: 44px;
  padding: 0 10px;
}
.active {
  border-left: 3px solid hotpink;
  color: hotpink;
}
</style>