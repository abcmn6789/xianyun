<template>
  <el-row class="container" type="flex" justify="space-between">
    <!-- 侧边栏 -->
    <div class="travel-aside">
      <travelAside @getchangeCity='getchangeCity'/>
    </div>
    <!-- 中心板块 -->
    <div class="main">
      <!-- 头部部分 -->
      <div class="title">
        <el-input placeholder="请输入想去的地方，比如：'广州'" v-model="city.name" class="search"
        @focus.native="handleSearchCity"></el-input>
        <i class="el-icon-search"></i>
        <div class="search-name">
          <span>推荐:</span>
          <span
            v-for="(item,index) in names"
            :key="index"
            @click="handleSearch(item.name)"
          >{{item.name}}</span>
        </div>
        <div class="psp_fu">
          <span class="psp">推荐攻略</span>
        </div>
        <nuxt-link to="/post/travel">
            <el-button type="primary" icon="el-icon-edit" class="btn">写游记</el-button>
        </nuxt-link>
       
      </div>

      <!-- 推荐攻略部分 -->
      <travelItem :city="city"/>
      
    </div>
  </el-row>
</template>
<script>
import travelAside from "@/components/post/travelAside ";
import travelItem from "@/components/post/travelItem";
export default {
  components: {
    travelAside,
    travelItem
  },
  data() {
    return {
      city:{name: ""},
      names: [{ name: "广州" }, { name: "上海" }, { name: "北京" }]
    };
  },
  methods: {
    handleSearchCity(){
      // this.city.name=''
    },
    //接收子组件传过来的城市名；
    getchangeCity(cityname){
      this.city.name=cityname
    },
    handleSearch(value) {
      this.city.name = value;
      // console.log(this.city.name)
      
    },
    
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
  box-sizing: border-box;
  .block{
    margin-top: 10px;
  }
  .travel-aside {
    width: 260px;
  }
  .main {
    width: 700px;
    .title {
      position: relative;
      //  border-bottom: 1px #ddd solid;
      .psp_fu {
        padding-bottom: 15px;
      }
      /deep/ .search {
        input.el-input__inner {
          border: 3px orange solid;
          //  position: relative;
        }
      }
      i {
        position: absolute;
        top: 8px;
        right: 15px;
        color: orange;
        font-size: 24px;
        font-weight: 700;
        z-index: 9;
      }
      .search-name {
        font-size: 12px;
        color: #757575;
        margin-top: 10px;
        margin-bottom: 15px;
        span {
          margin-right: 5px;
          cursor: pointer;
        }
      }
      .psp {
        color: orange;
        font-size: 18px;
        padding-bottom: 15px;
        border-bottom: 2px orange solid;
      }
      .btn {
        position: absolute;
        top: 75px;
        right: 0;
      }
    }
  }
}
</style>
