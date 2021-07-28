<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="d">
      <side-bar :titles="categories" @sidebarClick="sidebarClick" />
      <scroll class="content">
        <content-category :content-data="showSubcategory"/>
        <tab-control :titles="['综合','新品','销量']" @tabClick="tabClick"/>
        <goods-list :goods="showCategoryDetail" />
      </scroll>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "components/common/navbar/NavBar";
import SideBar from "components/common/sidebar/SideBar";
import ContentCategory from "./childComps/ContentCategory";

import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import {getCategory, getSubcategory, getCategoryDetail} from "network/category";

export default {
  name: 'Category',
  components: {
    NavBar,
    SideBar,
    Scroll,
    ContentCategory,
    TabControl,
    GoodsList
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: 'pop'
    }
  },
  created() {
    this._getCategory();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods: {
    _getCategory() {
      //请求侧边栏数据
      getCategory().then(res => {
        this.categories = res.data.category.list
        for (let i = 0; i < this.categories.length; i++) {
          //请求商品数据
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }

        this._getSubcategories(0)
      })
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },

    sidebarClick(index) {
      this.currentIndex = index;
      this._getSubcategories(index);
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          this._getCategoryDetail('pop');
          break;
        case 1:
          this.currentType = 'new';
          this._getCategoryDetail('new');
          break;
        case 2:
          this.currentType = 'sell';
          this._getCategoryDetail('sell');
          break;
      }
    }
  }
}
</script>

<style scoped>
#category {
  height: 100vh;
}
.nav-bar {
  background-color: hotpink;
  color: white;
}
.d {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
}

.content {
  height: 100%;
  flex: 1;
  overflow: hidden;

}

</style>