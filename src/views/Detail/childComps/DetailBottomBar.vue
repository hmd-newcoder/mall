<template>
    <div class="bottom-bar">
      <div class="bar-item bar-left">
        <div>
          <i class="icon service"></i>
          <span class="text">客服</span>
        </div>
        <div>
          <i class="icon shop"></i>
          <span class="text">店铺</span>
        </div>
        <div>
          <i class="icon select" @click="selectClick" :class="{selected: isSelected}"></i>
          <span class="text">收藏</span>
        </div>
      </div>
      <div class="bar-item bar-right">
        <div class="cart" @click="addToCart">加入购物车</div>
        <div class="buy" @click="buyClick">购买</div>
      </div>
    </div>
</template>

<script>

export default {
  name: "DetailBottomBar",
  data() {
    return {
      isSelected: false
    }
  },
  methods: {
    selectClick() {
      this.isSelected = ! this.isSelected;
      this.$emit('addSelect');
    },
    addToCart() {
      this.$emit('addCart');
    },
    buyClick() {
      this.$emit('buyClick');
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 49px;
  background-color: pink;
  position: relative;
  display: flex;
  text-align: center;
}
.bar-item {
  flex: 1;
  display: flex;
}
.bar-item > div {
  flex: 1;
}
.icon {
  display: block;
  width: 24px;
  height: 24px;
  background: url(~assets/img/detail/detail_bottom.png);
}
.text {
  font-size: 12px;
}
.service {
  background-position:  0 107px;
  background-size: 24px;
  margin: 2px auto;
}
.shop {
  background-position:  0 221px;
  background-size: 24px;
  margin: 2px auto;
}
.select {
  background-position:  0 329px;
  background-size: 24px;
  margin: 2px auto;
}
.selected {
  background-position:  0 299px;
}
.bar-right {
  height: 49px;
  line-height: 49px;
  font-size: 14px;
}
.cart {
  color: #000;
  background-color: yellow;
  height: 49px;
}
.buy {
  color: #fff;
  background-color: hotpink;
  height: 49px;
}
</style>