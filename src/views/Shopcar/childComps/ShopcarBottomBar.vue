<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
                    :is-checked="isSelectAll"
                    @click.native="checkAllClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total">合计:{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">
      去计算({{checkedLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import {mapGetters} from "vuex";
export default {
  name: "ShopcarBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return "￥" + this.cartList.filter(item => {
        return item.checked;
      }).reduce((pre, item) => {
        return pre += item.count * item.price;
      }, 0).toFixed(2);
    },
    checkedLength() {
      return this.cartList.filter(item => {
        return item.checked;
      }).length
    },
    isSelectAll() {
      if (this.cartList.length ===0)  return false;
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkAllClick() {
      if(this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(this.cartList.find(item => item.checked)) {

      } else {
        this.$toast.show('请选择购买的商品', 1500);
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-left: 10px;
  margin-right: 5px;
}
.total {
  margin-left: 20px;
}
.calculate {
  width: 90px;
  position: absolute;
  font-weight: 700;
  color: #fff;
  background-color: orangered;
  right: 0;
  text-align: center;
}
.checked {
  border-color: red;
  background-color: red;
}
</style>