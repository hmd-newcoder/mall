<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="titles" @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore" >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
// import BackTop from "components/content/backTop/BackTop";

import {getHomeMultidata, getHomeGoods} from "../../network/home";

import {itemListenerMixin} from "../../common/mixin";
import {backTopMixin} from "../../common/mixin";


export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ['流行','新款','精选'],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      type: 'pop',
      // isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  computed: {
    showGoods() {
      return this.goods[this.type].list
    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  created() {
    // 获取轮播图、推荐等数据
    this.getHomeMultidata()
    //获取主页商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //保留离开页面时的位置
    this.saveY = this.$refs.scroll.getScrollY()
    //离开页面后取消对图片加载事件的监听
    this.$bus.$off('itemImgLoad', this.imgItemListener);
  },
  methods: {
    /**
     *事件监听相关方法
    */

    tabClick(index) {
      switch (index) {
        case 0:
          this.type = 'pop';
          break;
        case 1:
          this.type = 'new';
          break;
        case 2:
          this.type = 'sell';
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000;
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.type);
      this.$refs.scroll.refresh();
    },
    swiperImageLoad() {
     this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
    网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      })
    }
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
}
.home-nav {
  background-color: hotpink;
  color: white;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>