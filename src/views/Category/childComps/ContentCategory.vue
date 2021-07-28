<template>
  <div class="content">
    <div v-for="item in contentData.list" class="content-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentCategory",
  props: {
    contentData: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.content {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.content-item {
  width: 30%;
  text-align: center;
}
.content-item img {
  width: 100%;
  border-radius: 50%;
}
</style>