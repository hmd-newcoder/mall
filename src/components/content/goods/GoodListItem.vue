<template>
  <div class="goods-item" @click="itemClick" >
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.img || this.goodsItem.image|| this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('itemImageLoad')
    },
    itemClick() {
      this.$router.push('./detail/' + this.goodsItem.iid);
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  margin-right: 20px;
  color: hotpink;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -17px;
  /*top: -1px;*/
  width: 14px;
  height: 14px;
  /*第一个0:背景颜色  第二个0:背景位置  14px:背景大小  最后14px可省略*/
  background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>