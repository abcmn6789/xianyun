<template>
  <div class="container">
    <!-- 轮播图 -->
    <el-carousel :interval="2000" arrow="always">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`
          background:url(${$axios.defaults.baseURL + item.url}) center center no-repeat;
          background-size:contain contain;
          `"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索栏 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row class="search-tab" type="flex">
          <span 
          v-for="(item,index) in tabs"
          :key="index"
          @click="handClick(index)"
          :class='{active:current===index}'>
            <i>{{item.title}}</i>
          </span>
        </el-row>

        <!-- 输如框 -->
        <el-row class="search-input" type="flex" align="middle">
          <input type="text" :placeholder="tabs[current].placeholder" />
          <i class="el-icon-search"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      banners: [],
      tabs:[
        {title:'攻略',placeholder:'搜索城市'},
        {title:'酒店',placeholder:'请输入城市搜索酒店'},
        {title:'机票',placeholder:''}
      ],
      current:0
    };
  },
  methods: {
    handClick(index){
      if(index===2){
        this.$router.push({path:'/air'})
      }
 this.current=index

    }
  },
  mounted() {
    //怎么把axios添加到实例
    // Vue.prototype.$axios=axios

    //请求轮播图；
    this.$axios({
      url: "/scenics/banners"
    })
      .then(res => {
        console.log(res);
        const { data } = res.data;
        this.banners = data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="less" scoped>
.container {
  min-width: 1000px;
  //如果引用了组件的需要对calss属性更改时，必须使用、/deep/
  /deep/ .el-carousel__container {
    height: 700px;
  }
  position: relative;
  margin: 0 auto;
  .banner-image {
    width: 100%;
    height: 100%;
  }
  .banner-content {
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    z-index: 9;
    margin-left: -300px;
    border-top: 1px transparent solid;
    .search-tab {
      .active{
        i{
          color: #333;
        }
        &::after{
          background: #eee;
        }
      }
      span {
        display: block;
        width: 82px;
        height: 36px;
        position: relative;
        cursor: pointer;
        margin-right: 8px;
        i {
          position: absolute;
          z-index: 2;
          color: #fff;
          display: block;
          text-align: center;
          line-height: 30px;
          width: 100%;
          height: 100%;
        }
        &:after {//伪类元素
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          background:rgba(0,0,0,.5);
          border: 1px rgba(255,255,255,.2);
          transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);//perspective背景阴影透明度
          transform-origin: bottom left;
          border-radius: 1px,2px,0,0;
          box-sizing: border-box
          
        }
      }
    }
    .search-bar {
      width: 552px;
      .search-input {
        width: 100%;
        width: 550px;
        height: 46px;
        background-color: #fff;
        border-radius: 0 4px 4px 4px;
        box-sizing: unset;
        border: 1px rgba(255, 255, 255, .2) solid;
        border-top: none;
        input {
          flex: 1;
          width: 550px;
          height: 20px;
          border: none;
          text-indent: 1em;
          font-size: 16px;
          outline: none;
        }
        .el-icon-search {
          font-weight: bold;
          font-size: 22px;
          padding: 0 10px;
        }
      }
    }
  }
}
</style>


