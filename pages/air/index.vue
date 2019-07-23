<template>
  <div class="container">
    <h2 class="air-title">
      <i class="iconfont iconfeiji"></i>
      <span>国内机票</span>
    </h2>
    <!-- 搜索部分 -->
    <el-row type="flex" class="air-tab" justify="space-between">
      <!-- 搜索表格部分 -->
      <SearchForm/>
      <!-- 右侧图片部分 -->
      <div class="sale-banner">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" />
      </div>
    </el-row>
    <!--认证部分  -->
    <el-row class="statement">
      <el-col :span="8" type="flex" justify="center" class="col">
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409eff"></i>
        <span>100%航协认证</span>
      </el-col>
      <el-col :span="8" class="col">
        <i i class="iconfont iconbaozheng" style="color:#008017"></i>
        <span>出行保证</span>
      </el-col>
      <el-col :span="8" class="col col-none">
        <i class="iconfont icondianhua" style="color:#409eff"></i>
        <span>7x24小时服务</span>
      </el-col>
    </el-row>
    <!-- 特价机票 -->
    <h2 class="air-sale-title">
      <i class="iconfont icontejiajipiao"></i>
      <span>特价机票</span>
    </h2>
    <!-- 特价机票 -->
    
    <div class="air-sale">
        <el-row type="flex" class="air-sale-pic" justify="space-between">
            <el-col :span="6" v-for="(item, index) in sales" :key="index">
                <nuxt-link :to="`/air/fligths?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`">
                    <img :src="item.cover"/>
                    <el-row class="layer-bar" type="flex" justify="space-between">
                        <span>{{item.departCity}}-{{item.destCity}}</span>
                        <span>￥699</span>
                    </el-row>
                </nuxt-link>
            </el-col>
        </el-row>
    </div>
  </div>
</template>
<script>
import SearchForm from "@/components/air/searchForm"
export default {
   components: {
        SearchForm
    },
    data(){
      return{
        sales:[]
      }
    },
    mounted(){
      this.$axios({
        url:'/airs/sale',   
      })
      .then(res=>{
        // console.log(res)
        this.sales=res.data.data
      })
    }
}
</script>
<style lang="less" scoped>



.air-sale{
  border: 1px #ddd solid;
  padding:20px;
  margin-bottom:50px;

  .air-sale-pic{
    > div{
      width:225px;
      height:140px;
      position: relative;
      overflow: hidden;

      img{
        width:100%;
      }

      .layer-bar{
        position:absolute;
        bottom:0;
        left:0;
        background: rgba(0,0,0,0.5);
        color:#fff;
        height:30px;
        line-height: 30px;
        width:100%;
        box-sizing: border-box;
        padding: 0 15px;
        font-size: 14px;

        span:last-child{
          font-size:18px;
        }
      }
    }
  }
}
.air-sale-group{
  margin-top:20px;
  padding-top:8px;
  border-right:1px #eee solid;

  &:last-child{
    border-right:none;
  }

  .air-sale-row{
    font-size:12px;
    color:#666;
    margin-bottom:8px;

    .air-sale-price{
      color:orange;
      font-size: 20px;
    }
  }
}

.container {
  width: 1000px;
  margin: 0 auto;
  .air-sale-title {
    margin-top: 20px;
  }
  .air-sale-title {
    font-size: 20px;
    color: #409eff;
    font-weight: normal;
    i {
      font-size: 30px;
    }
  }
  .air-title {
    margin: 20px 0;
    color: #ffa500;
    font-weight: normal;
    font-size: 20px;
    .iconfeiji {
      font-size: 20px;
    }
  }
  .statement {
    border: 1px #ddd solid;
    margin: 15px 0;
    height: 58px;
    padding: 10px 0;
    background: #f5f5f5;

    .col {
      border-right: 1px #ddd solid;
      text-align: center;
      line-height: 38px;
      i {
        font-size: 30px;
        vertical-align: middle;
        // font-weight: 600;
      }
    }
    .col-none {
      border-right: none;
    }
  }
}
</style>