<template>
  <!-- 面包屑 -->
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="crumbs">
      <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
      <el-row type="flex" justify="flex start" class="search-top">
        <!-- 城市 -->
        <div>
           <el-autocomplete
          v-model="city"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
          class="city"
        ></el-autocomplete>
        </div>
       
        <!-- 带日期 -->
        <div class="block1">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="-"
            start-placeholder="入住日期"
            end-placeholder="离店日期"
          ></el-date-picker>
        </div>
        <!-- 人数 -->
        <div class="people_number">
          <el-input placeholder="人数未定" suffix-icon="el-input__icon iconfont iconuser" v-model="people"></el-input>
        </div>
        <!-- 按钮 -->
        <div class="btn"> 

           <el-button type="primary">主要按钮</el-button>
        </div>
        
      </el-row>

      <!-- 地图区域 -->
      <el-row type="flex" justify="space-between" class="search-adress">
        <div class="content">
          <el-row type="flex" justify="space-between" >
           <span>区域:</span>
           <div class="adress" >
             <div class="adress_name describe" 
            >    <span>全部</span>
               <span v-for="(item,index) in adressname"
                 :key="index">
                  <span class="adname">{{item}}</span>
               </span>
             </div>
             <div><i class="el-icon-d-arrow-right"></i>等43个区域</div>
           </div>

          </el-row>
          <el-row type="flex" justify="space-between" class="strategy">
           <span>攻略:</span>
           <div class="describe " >
             北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 
           景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，
           所以大多数人选择在天安门附近住宿。
           </div>
          </el-row>
          <!--  -->
          <el-row class="average_price">
            <span>均价 <i>?</i>： </span>
            <span class="star">
              <span>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <span class="price">￥332</span>
              </span>
              <span>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <span class="price">￥521</span>
              </span>
              <span>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <span class="price">￥768</span>
              </span>
               
            </span>
          </el-row>
        </div>
        <div class="map"></div>
      </el-row>

      <!-- 删选栏 -->
      <div class="condition"> 
        <el-row type="flex">
          <el-col :span="6">
            <div class="block3">
              <span class="demonstration">
                <span>价格</span>
                <span class="bl-price">0-4000</span>
              </span>
              <el-slider  class="tooltip" v-model="value4" :format-tooltip="formatTooltip"></el-slider>
            </div>
          </el-col>
          <el-col :span="4.5" class="grade"> 
             <div>住宿等级</div>
             <el-select v-model="value6" placeholder="请选择" >
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span style="float: left"><i class="iconfont iconcircle"></i>{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4.5" class="type">
            <div>住宿等级</div>
             <el-select v-model="value6" placeholder="请选择" >
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span style="float: left"><i class="iconfont iconcircle"></i>{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4.5" class="facility">
            <div>住宿等级</div>
             <el-select v-model="value6" placeholder="请选择" >
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span style="float: left"><i class="iconfont iconcircle"></i>{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4.5" class="brand">
            <div>住宿等级</div>
             <el-select v-model="value6" placeholder="请选择" >
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span style="float: left"><i class="iconfont iconcircle"></i>{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
       <!-- 分页部分 -->
      <div class="page-content">
      <div >
        <div class="page-row">
          <el-row type="flex" justify="space-between">
           <div class="img">
             <img src="@/images/111.png" alt="">
           </div>
           <div class="hotel-message">
             <div class="name">好来阁商务宾馆</div>
             <div class="zimu pd-heiht">hao lai ge shang wu hotel 
               <span>
                 <i class="iconfont iconhuangguan"></i>
               </span>
               经济型
             </div>
             <div class="xing pd-heiht">
               <span>
                 <i class="el-icon-star-off"></i>
               </span>
               <span>3.5分</span>
               <span><i>51</i>条评价</span>
               <span><i>19</i>篇游记</span>
             </div>
             <div class="dingwei pd-heiht">
               <i class="el-icon-location-outline"></i>
               <span>位于：高淳县淳溪镇镇兴路118号(高淳县委党校对面)</span>
             </div>
             <div>

             </div>
           </div>
           <div class="link-hotel">
             <div class="link">
               <span>携程</span>
               <span class="hotel-price">￥72起<i class="el-icon-arrow-right"></i></span>
             </div>
             <div class="link">
               <span>艺龙</span>
               <span class="hotel-price">￥88起<i class="el-icon-arrow-right"></i></span>
             </div>
             <div class="link">
               <span>Hotel.com</span>
               <span class="hotel-price">￥117起<i class="el-icon-arrow-right"></i></span>
             </div>
           </div>
          </el-row>
        </div>
      </div>

   </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value6:'',
      value4:100,
      people:'',
      date: "",
      city: "",
      adressname:[' 镇兴路沿线','视觉艺术学院','大成名店','南京西站','铜山镇','大桥南路',
               '宝塔路沿线','宝塔路/万辰苏果','珠江路沿线','华侨城','江浦东屏镇','南京南站/明发',
               '北岭路沿线','苜蓿园','弘阳广场/新一城','新街口地区','紫金山/孝陵卫','火车站/玄武湖','东坝镇'
               ,'禄口机场','奥体中心雨润大街','新模范马路','将军山','国际慢城','云鼎时尚街区','百家湖','湖南路',
               '竹山路沿线','南大/南师大','江宁滨江开发区','湖熟镇','南大和园君临紫金商业街','大西门','建邺万达',
               '江宁科学园','顾家欧亚达','高淳老街谷里','汤山镇','雄州'],
       cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
    };
  },
  methods: {
    //进度条
    formatTooltip(val){
      return val*30
    },
    //返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它
    //Function(queryString(输入框的值), callback（下拉菜单的列表项值）)
    querySearchAsync(queryString, callback) {},
    //选中的值；点击选中建议项时触发，值为选中项
    handleSelect(item) {}
  }
};
</script>
<style lang="less" scoped>
.container {
  margin-bottom: 50px;
  width: 1000px;
  margin: 20px auto;
  .page-content{
    margin-top: 20px;
    .page-row{
      .hotel-message{
        // margin-left: -20px;
        font-size: 14px;
        color: #666;
        width: 425px;
        .zimu{
          font-size: 16px;
          span{
            i{
              color: orange;
            }
          }
       .pd-heiht{
         padding-bottom: 10px;
       }
        .name{
          font-size: 24px;
          color: #000;
        }
      }
      .link-hotel{
        width: 225px;
       
        }
        .link{
           border-bottom: 1px #ddd solid;
        }
      }
      .img{
        width: 320px;
        height: 210px;
        img{
          width: 100%;
        }
      }
    }
  }
  .condition{
    margin-top: 20px;
    padding: 5px 20px;
    color: #666;
    border: 1px #ddd solid;
    .grade{
    border-right: 1px #ddd solid;
    }
    .type{
      border-right: 1px #ddd solid;
    }
    .facility{
       border-right: 1px #ddd solid;
    }
    .brand{

    }
    .block3{
      box-sizing: border-box;
       border-right: 1px #ddd solid;
       padding-right: 40px;
      .demonstration{
        display: inline-block;
        .bl-price{
          margin-left: 70px;
        }
     /deep/ .tooltip{
        width: 100px;
      }
      }
    }
  }
  .search-adress{
    margin-top: 20px;
    .describe{
      width: 515px;
    }
    .map{
      width: 410px;
      height: 305px;
      border: 1px #ddd solid;
    }
    .content{
      width: 580px;
      .average_price{
        margin-top: 20px;
        .star{
          span{
            margin-right: 20px;
            i{
              color: orange;
            }
            .price{
              margin-left: 10px;
            }
          }
        }
      }
      .adress{

        .adress_name{
          .adname{
            margin-left: 10px;
          }
        }
      }
      .strategy{
        margin-top: 20px;
      }
    }
  }
  .crumbs {
    padding-bottom: 20px;
  }
  .search-top{
    height: 42px;
    .city{
      margin-right: 10px;
      
    }
    .block1{  
    }
    .people_number{
     margin:0 10px;
      height: 42px;
    }
    .btn{
      margin-left: 5px;
    }
  }
}
</style>
