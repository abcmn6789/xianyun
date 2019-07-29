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
          v-model="cityname"
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
             <div class="adress_name describe" :class="{changheiht:isshow2}"
            >    <span>全部</span>
               <span v-for="(item,index) in  citynames.scenics"
                 :key="index"
               >
                   <span :class="{adress_address:curent===index,adname:true}"  @click="handleshow(index)">{{item.name}}</span>
               </span>
             </div>
             <div class="dengd"><span :class="{changerotate:isshow2,rotateicon:!isshow2}"><i class="el-icon-d-arrow-right" @click="isshow2=!isshow2"></i></span>等43个区域</div>
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
        <!-- 地图区域 -->
        <div class="map" id="map"></div>
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
             <div class="type_name">酒店等级</div>
             <el-select v-model="form.levels" placeholder="不限定" >
              <el-option
                v-for="item in hotelselect.levels"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                class="border-none">
                <span style="float: left"><i class="iconfont iconcircle"></i>{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4.5" class="type">
            <div class="type_name">酒店类型</div>
             <el-select v-model="form.types" placeholder="不限定" >
              <el-option
                v-for="item in hotelselect.types"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                class="border-none">
                <span style="float: left"><i class="iconfont iconcircle"></i>{{ item.name }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4.5" class="facility">
            <div class="type_name">酒店设施</div>
             <el-select v-model="form.assets" placeholder="不限定" >
              <el-option
                v-for="item in hotelselect.assets"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                class="border-none">
                <span style="float: left"><i class="iconfont iconcircle"></i>{{ item.name }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4.5" class="brand">
            <div class="type_name">酒店品牌</div>
             <el-select v-model="form.brands" placeholder="不限定" >
              <el-option
                v-for="item in hotelselect.brands"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                class="border-none">
                <span style="float: left"><i class="iconfont iconcircle"></i>{{ item.name }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
       <!-- 分页展示内容部分 -->
      <div class="page-content">
      <div 
      v-for="(item,index) in hotelform"
      :key="index">
        <div class="page-row">
          <el-row type="flex" justify="space-between">
            <nuxt-link to="#">
           <div class="img">
             <img :src="item.photos" alt="">
           </div>
           </nuxt-link>
           <div class="hotel-message">
             <nuxt-link to="#">
             <div class="name">{{item.name}}</div>
             <div class="zimu pd-heiht">{{item.alias}} 
               <span>
                 <i class="iconfont iconhuangguan"></i>
                 <i class="iconfont iconhuangguan"></i>
                 <i class="iconfont iconhuangguan"></i>
               </span>
               {{item.hoteltype.name}}
             </div>
             <div class="xing pd-heiht">
               <span>
                 <i class="el-icon-star-on"></i>
                 <i class="el-icon-star-on"></i>
                 <i class="el-icon-star-on"></i>
                 <i class="el-icon-star-on"></i>
               </span>
               <span class="fen">{{item.stars}}分</span>
               <span class="zicolor"><span class="fen">{{item.common_remarks}}</span>条评价</span>
               <span class="zicolor"><span class="fen">{{item.good_remarks}}</span>篇游记</span>
             </div>
             <div class="dingwei pd-heiht">
               <i class="el-icon-location"></i>
               <span>位于：{{item.address}}</span>
             </div>
             <div>

             </div>
             </nuxt-link>
           </div>
           <div class="link-hotel">
             <nuxt-link to="#">
             <el-row class="link" type="flex" justify="space-between">
               <span>{{item.products[0].name}}</span>
               <span class="hotel-price"><span>￥{{item.products[0].price}}</span>起<i class="el-icon-arrow-right"></i></span>
             </el-row>
             </nuxt-link>
             <nuxt-link to="#">
             <el-row class="link" type="flex" justify="space-between">
               <span>{{item.products[1].name}}</span>
               <span class="hotel-price"><span>￥{{item.products[1].price}}</span>起<i class="el-icon-arrow-right"></i></span>
             </el-row>
             </nuxt-link>
             <nuxt-link to="#">
             <el-row class="link" type="flex" justify="space-between">
               <span>{{item.products[2].name}}</span>
               <span class="hotel-price"><span>￥{{item.products[2].price}}</span>起<i class="el-icon-arrow-right"></i></span>
             </el-row>
             </nuxt-link>
           </div>
          </el-row>
        </div>
      </div>
     </div>
   <!-- 分页栏 -->
    <div class="paging">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 3, 5]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isshow2:false,
      isshow:false,
      curent:100,
      cityname:'',
      citynames:{},
      pagesize:5,
      pagenum:1,
      total:0,
      value6:'',
      value4:100,
      people:'',
      date: "",
       form:{
         levels:'',
         types:'',
         assets:'',
         brands:''
       },
      hotelselect:{
        levels:[],
        types:[],
        assets:[],
        brands:[]
      },
      hotel:{
        id:1,
        city:74,
        price_in:1000,
        scenic:1,
        name_contains:'',
        hotellevel:1,
        hoteltype:1,
        hotelbrand:1,
        hotelasset:1,
        enterTime:'2019-07-25',
        leftTime:'2019-7-26',
        person:1,
        _sort:'',
        _limit:3,
        _start:0
      },
      hotelform:[],
      loaded:false
    };
  },
  mounted(){
      //将创建的key拿过来；
       var key=`5142108617ccd3f7dfd91bdeae739f4a`;
       var url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad`;
       const jsapi = document.createElement('script');
      jsapi.charset = 'utf-8';
      jsapi.src = url;
      document.head.appendChild(jsapi);

      window.onLoad =  () => {
        const map = new AMap.Map('map')
        this.map = map

        this.addMarks()
      }
     
    //获取页面的酒店的信息；
    this.gethotellist()
   
    //刷选框中刷选信息；
    this.$axios({
      url:'http://157.122.54.189:9095/hotels/options',
    })
    .then(res=>{
      console.log(res)
      this.hotelselect=res.data.data
    })
  },
  //  watch: {
  //     $hotelform: function () {
  //       // this.loaded = !!this.hotelform
  //       if (this.map) {
  //         if (!this.hotelform) {
  //           this.map.clearMap()
  //         } else {
  //           this.addMarks()
  //         }
  //       }
  //     }
  //   },
  methods: {
    //动态获取元素的坐标位置；
    addMarks() {
        if (typeof AMap !== 'object' || !this.hotelform) {
          return
        }
        const map = this.map
        const markers = this.hotelform.map((hotel, i) => {
          const { name, address, location:{longitude,latitude} } =hotel
          const position = new AMap.LngLat(longitude, latitude)
          const marker = new AMap.Marker({
            position,
            title: name,
            content: `<span class="marker">${i + 1}</span>`,
            text: address,
            // topWhenClick: true,
          })
          const infoWindow = new AMap.InfoWindow({
            content: `<span style="font-size: 12px;color: #333">${name}</span>`,
            offset: new AMap.Pixel(0, -32),
          })
          function showInfoWin() {
            infoWindow.open(map, position)
          }
          function closeInfoWin() {
            infoWindow.close()
          }
          marker.on('mouseover', showInfoWin)
          marker.on('mouseout', closeInfoWin)
          return marker
        })
        map.clearMap()
        map.add(markers);//添加到地图
        map.setFitView();
      },


    //图表区域点击改变底层颜色；
    handleshow(index){ 
        this.curent=index
        this.$axios({
          url:'http://157.122.54.189:9095/hotels',
          params:{
            city: 74,
            scenic: 3225,
            price_lt: 4000,
          }
        })
        .then(res=>{
          console.log(res)
          this.hotelform=res.data.data;
          this.addMarks()
        })
    },
     //获取酒店列表数据；
     gethotellist(){
       const {city,enterTime,leftTime,_limit,_start}=this.hotel
      this.$axios({
        url:'http://157.122.54.189:9095/hotels',
        params:{         
          city,
          enterTime,
          leftTime,
          _limit,
          _start
        }
      })
      .then(res=>{
        console.log(res)
        this.hotelform=res.data.data
        this.total=res.data.total
      })
     },
    //每页天数改变时触发
    handleSizeChange(val){
      this.pagesize=val
      this.hotel._limit=this.pagesize
      this.gethotellist()
    },
    //当前页改变时触发
    handleCurrentChange(val){
      this.pagenum=val
      this.hotel._start=(this.pagenum-1)*this.pagesize
      this.gethotellist()
    },
    //进度条
    formatTooltip(val){
      return val*30
    },
    //返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它
    //Function(queryString(输入框的值), callback（下拉菜单的列表项值）)
    async querySearchAsync(vall, callback) {
      //promise对象 返回一个成功回调的值；res=newdata
      let val=vall ||'南京市'
     const res=await this.querySearch(val)
     if(res.length>0){
      //  默认选中第一个
        this.cityname = res[0].name;
     
     }
     callback(res)//res是一个数组，
    },
    querySearch(value) { 
     return new Promise((resolve,reject)=>{
        if (!value) {
        return resolve([]);
      }
      this.$axios({
        url:"http://157.122.54.189:9095/cities",
        params: { name: value }
      }).then(res => {
        console.log(res)
        const data = res.data.data;
        this.citynames=res.data.data[0]
        // console.log(data)
        var newdata = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        //默认选中第一个
        resolve(newdata);
      });

     })
    },
    //选中的值；点击选中建议项时触发，值为选中项
    handleSelect(item) {
      // console.log(item)//item是一个对象；
      this.cityname=item.name;

    }
  }
};
</script>
<style lang="less" scoped>
.infowindow{
  width: 200px;
  height: 200px;
  background-color: #ccc;
}
 /deep/ .marker {
    display: inline-block;
    width: 22px;
    height: 36px;
    background-image: url(https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png);
    background-size: 22px 36px;
    text-align: center;
    line-height: 24px;
    color: #fff;
  }
.container {
  margin-bottom: 50px;
  width: 1000px;
  margin: 20px auto;
  
  .changheiht{
    height: 40px;
    overflow: hidden;
  }
  .adress_address{
    background-color: #eee;
  }
  .paging{
    margin-top: 20px;
  }
  .page-content{
    margin-top: 20px;
    .page-row{
      padding-bottom: 30px;
      border-bottom: 1px #ddd solid;
      .hotel-message{
        // margin-left: -20px;
        font-size: 14px;
        color: #666;
        width: 425px;
       .pd-heiht{
         padding-bottom: 10px;
       }
       .xing{
         .el-icon-star-on{
           color: #f7ba2a;
           font-size: 20px;
          //  background-color: #f7ba2a;
         }
         .zicolor{
           font-size: 16px;
           color: #000;
           margin-left: 20px;
         }
         .fen{
           color: #ff9939;
         }
       }
        .name{
          font-size: 24px;
          color: #000;
        }
        .zimu{
          font-size: 16px;
          span{
            i{
              color: orange;
            }
          }
        }
      }
      .link-hotel{
        width: 225px;
        
        .link{
           border-bottom: 1px #ddd solid;
           padding: 15px;
           color: #606266;
           .hotel-price{
             span{
               color: #ff9a00;
             }
           }
        }
      }
      .img{
        width: 320px;
        height: 210px;
        overflow: hidden;
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
    .type_name{
      padding-left: 10px;
    }
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
      /deep/.border-none{
        border:none;
      }
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
      height: 250px;
      border: 1px #ddd solid;
    }
    .content{
      width: 580px;
        color: #666666;
        font-size: 14px;
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
        .dengd{
          cursor: pointer;
          // .el-icon-d-arrow-right{
          //   color: #ffbb4a;
          //   transform: rotate(-90deg)
          // }
        }
        .adress_name{
         span{
           cursor: pointer;
            &:hover{
            // background-color: #eeeeee;
            color: #4b9aff;
            text-decoration: underline;
          }
         }
          .adress-search{
          
          }
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
    .people_number{
     margin:0 10px;
      height: 42px;
    }
    .btn{
      margin-left: 5px;
    }
  }
  .changerotate{
    .el-icon-d-arrow-right{
        color: #ffbb4a;
      transform: rotate(-270deg)
    }
  
  }
  .rotateicon{
    .el-icon-d-arrow-right{
          color: #ffbb4a;
    transform: rotate(-90deg)
    }
 
  }
}
</style>
