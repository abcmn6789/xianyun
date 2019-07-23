<template>
  <div class="aside-menu">
    <div class="menu-list"
    @mouseleave="handlemove">  
      <el-row
        class="menu"
        type="flex"
        justify="space-between"
        v-for="(item,index) in itemList"
        :key="index"      
         @mousemove.native="handleitem(index)"
      >
        <el-col class="hot-city">{{item.type}}</el-col>
        <el-col class="el-icon-arrow-right"></el-col>
      </el-row>
      <div class="big-item">
        <div v-for="(items,index) in itemList"
        :key="index"
        v-show="curent===index"
         class="item-list">
          <div class="item" 
          v-for="(item,index) in items.children"
          :key="index">
            <i class="org">{{index+1}}</i>
            <nuxt-link to="#">
              <span class="beijign org underline"
              @click="handleCity(item.city)">{{item.city}}</span>
              <span class="miaosu underline">{{item.desc}}</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend">
      <div class="re-city">推荐城市</div>
      <img src="@/images/pic_sea.jpeg" alt />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      curent:7,
    
      itemList: []
    };
  },
  methods: {
    //点击城市名传过来一个城市名称；
    handleCity(cityname){
      this.$emit('getchangeCity',cityname)
    },
    handleitem(value){
      // console.log(value)
       this.curent=value;
    },
    handlemove(){
      this.curent=7
    }
  },
  mounted(){
       this.$axios({
          url:'/posts/cities',
      })
      .then(res=>{
          // console.log(res)
          this.itemList=res.data.data
      })
  }
};
</script>
<style lang="less" scoped>
.aside-menu {
  width: 100%;
  box-sizing: border-box;

  .menu-list {
    border-top: 1px #ddd solid;
    border-left: 1px #ddd solid;
    // border-bottom: none;
    position: relative;
    .big-item{
     position: absolute;
      top: -1px;
      right: -346px;
      z-index: 7;
    }
    .item-list {
      border: 1px #ddd solid;
      width: 344px;
      background-color: #fff;
      padding: 10px 0;
      .underline:hover{
        text-decoration: underline;
      }
      .item {
        box-sizing: border-box;
        padding-left: 25px;
        padding-bottom: 3px;
        cursor: pointer;
        .miaosu {
          color: #999999;
        }
        span {
          padding-left: 12px;
          font-size: 14px;
          cursor: pointer;
        }
        i {
          font-size: 23px;
        }
        .org {
          color: orange;
        }
      }
    }

    .menu {
      height: 40px;
      border-bottom: 1px #ddd solid;
      border-right: 1px #ddd solid;
      line-height: 40px;
      padding-right: 15px;
      &:hover{
        color: orange;
        border-right:1px #fff solid;
        .el-icon-arrow-right{
          color: orange
        }
      }
      .hot-city {
        font-size: 14px;
        padding-left: 20px;
      }
      .el-icon-arrow-right {
        text-align: right;
        line-height: 40px;
        font-size: 22px;
        color: #999999;
      }
    }
  }

  .recommend {
    margin-top: 20px;
    .re-city {
      padding-bottom: 10px;
      border-bottom: 1px #ddd solid;
      margin-bottom: 20px;
    }
    img {
      width: 100%;
    }
  }
}
</style>


