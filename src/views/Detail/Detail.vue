<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"
                    @titleClick="titleClick"
                    ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll">
     <detail-swiper :top-images="topImages"/>
     <detail-base-info :goods="goods"/>
     <detail-shop-info :shop="shop"/>
     <detail-goods-info :detail-info="detailInfo" @imageLoad="detailImageLoad"/>
     <detail-param-info :param-info="paramInfo" ref="params"/>
     <detail-comment-info :comment-info="commentInfo" ref="comment"/>
     <goods-list :goods="recommends" ref="goods"/>
   </scroll>
    <detail-bottom-bar @addCart="addToCart" @addSelect="addToSelect" @buyClick="buyClick"/>
    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
    <toast />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";


import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";


import {getDetail, Goods, Shop, GoodsParam, getRecommends} from "network/detail";
import {itemListenerMixin} from "common/mixin";
import {backTopMixin} from "common/mixin";

import {mapActions} from 'vuex';
import Toast from "components/common/toast/Toast";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取顶部的图片轮播数据
      // console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    })

    //请求推荐数据(底部图片)
    getRecommends().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
    })
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.imgItemListener);
  },
  methods: {
    ...mapActions(['addCart','addSelect']),
    detailImageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.goods.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      const positionY = -position.y;
      const length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i &&
            (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      this.isShowBackTop = (-position.y) > 1000;
    },
    addToCart() {
      //获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //将商品添加到购物车
      // this.$store.dispatch('addCart', product).then(res => console.log(res));
      this.addCart(product).then(res => {
        this.$toast.show(res, 1500);
      })
    },
    addToSelect() {
      //获取当前商品的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      this.addSelect(product).then(res => {
        this.$toast.show(res, 1500);
      })
    },
    buyClick() {
      //将当前商品添加到购物车
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      product.checked = true;
      //判断列表是否已经包含当前商品
      if (this.$store.state.cartList.find(item => item.iid === product.iid)) {

      } else {
        product.count = 1;
        this.$store.state.cartList.push(product);
      }
      this.$router.push('/shopcar');
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
  background-color: white;
}
</style>