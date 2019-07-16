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
    <!-- <el-row class="air-sale" type="flex" justify="space-around">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </el-row>-->
    <div data-v-30e5dc60 class="air-sale">
      <div data-v-30e5dc60 class="air-sale-pic el-row is-justify-space-between el-row--flex">
        <div data-v-30e5dc60 class="el-col el-col-6">
          <a
            data-v-30e5dc60
            href="/air/flights?departCity=%E5%B9%BF%E5%B7%9E&amp;departCode=CAN&amp;destCity=%E4%B8%8A%E6%B5%B7&amp;destCode=SHA&amp;departDate=2019-07-15"
            class
          >
            <img
              data-v-30e5dc60
              src="https://imgsrc.baidu.com/baike/pic/item/a71ea8d3fd1f41340d8f3dec281f95cad0c85ee3.jpg"
            />
            <div data-v-30e5dc60 class="layer-bar el-row is-justify-space-between el-row--flex">
              <span data-v-30e5dc60>广州-上海</span>
              <span data-v-30e5dc60>￥699</span>
            </div>
          </a>
        </div>
        <div data-v-30e5dc60 class="el-col el-col-6">
          <a
            data-v-30e5dc60
            href="/air/flights?departCity=%E5%B9%BF%E5%B7%9E&amp;departCode=CAN&amp;destCity=%E4%B8%8A%E6%B5%B7&amp;destCode=SHA&amp;departDate=2019-07-15"
            class
          >
            <img
              data-v-30e5dc60
              src="https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=d4e2f29522381f309a198aab99004c67/6a63f6246b600c33cd891e65104c510fd8f9a1af.jpg"
            />
            <div data-v-30e5dc60 class="layer-bar el-row is-justify-space-between el-row--flex">
              <span data-v-30e5dc60>广州-上海</span>
              <span data-v-30e5dc60>￥699</span>
            </div>
          </a>
        </div>
        <div data-v-30e5dc60 class="el-col el-col-6">
          <a
            data-v-30e5dc60
            href="/air/flights?departCity=%E5%B9%BF%E5%B7%9E&amp;departCode=CAN&amp;destCity=%E4%B8%8A%E6%B5%B7&amp;destCode=SHA&amp;departDate=2019-07-15"
            class
          >
            <img
              data-v-30e5dc60
              src="https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=9154c841bcfd5266a32b3b169b199799/3812b31bb051f8199687c7e0d0b44aed2f73e7fe.jpg"
            />
            <div data-v-30e5dc60 class="layer-bar el-row is-justify-space-between el-row--flex">
              <span data-v-30e5dc60>广州-上海</span>
              <span data-v-30e5dc60>￥699</span>
            </div>
          </a>
        </div>
        <div data-v-30e5dc60 class="el-col el-col-6">
          <a
            data-v-30e5dc60
            href="/air/flights?departCity=%E5%B9%BF%E5%B7%9E&amp;departCode=CAN&amp;destCity=%E4%B8%8A%E6%B5%B7&amp;destCode=SHA&amp;departDate=2019-07-15"
            class
          >
            <img
              data-v-30e5dc60
              src="https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=a1b035c61a38534388cf8023a312b01f/9c16fdfaaf51f3de20157fce9eeef01f3b2979f1.jpg"
            />
            <div data-v-30e5dc60 class="layer-bar el-row is-justify-space-between el-row--flex">
              <span data-v-30e5dc60>广州-上海</span>
              <span data-v-30e5dc60>￥699</span>
            </div>
          </a>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import SearchForm from "@/components/air/searchForm"
export default {
   components: {
        SearchForm
    }
}
</script>
<style lang="less" scoped>
// .air-sale {
//   border: 1px #ddd solid;
//   padding: 20px;
//   margin-bottom: 50px;
//   margin-top: 20px;
//   div {
//     width: 225px;
//     height: 140px;
//     overflow: hidden;
//     border: 1px #ccc solid;
//   }
// }


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