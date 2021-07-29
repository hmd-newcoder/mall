<template>
  <div class="list-view">
    <div v-for="(item,index) in list" :key="index" class="list-item">
      <div class="list-img"><img :src="item.src" alt=""></div>
      <div class="list-info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    list: {
      type: Array,
      detail() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.list {
  display: flex;
  flex-flow: wrap;
}
.list-item {
  width: 100%;
  height: 40px;
  display: flex;
  border-bottom: 1px solid #eee;
}
.list-img {
  width: 40px;
  height: 40px;
  padding: 10px;
}
.list-img img {
  width: 20px;
  height: 20px;
}
.list-info {
  height: 40px;
  line-height: 40px;
}
</style>