<template>
  <div class="container2">
    <div class="main"
    v-for="(item,index) in cecondData"
    :key="'trave'+index"
    @click="handleSubmit(item.id)">
      <nuxt-link to="/post/postpar">
        <h3>{{item.title}}</h3>
        <div class="content">
         {{item.summary}}
        </div>
        <el-row class="img" type="flex" justify="space-between">
          <img :src="`${item.images[0]}`" alt />
          <img :src="`${item.images[1]}`" alt />
          <img :src="`${item.images[2]}`" alt />
         
        </el-row>
        <el-row class="message" type="flex" justify="space-between">
          <div class="user">
            <span class="el-icon-location-outline"></span>
            <span>{{item.cityName}}</span>
            <span class="by">by</span>
            <img :src="`${$axios.defaults.baseURL+item.account.defaultAvatar}`" alt="">
            <span class="earth">{{item.account.nickname}}</span>
            <span class="el-icon-view"></span>
            <span>{{item.watch}}</span>
          </div>
          <div class="praise">
            <span class="number">{{item.like||0}}</span>
            <span>赞</span>
          </div>
        </el-row>
      </nuxt-link>
      
      
    </div>
        
    <div class="main2"
    v-for="(value,index) in firstData"
    :key="index"
     @click="handleSubmit(value.id)">
      <nuxt-link to="/post/postpar">
        <el-row type="flex" justify="space-between">
          <div class="img1">
            <img :src="`${value.images[0]}`" alt />
          </div>
          <div class="content-right">
            <h3>{{value.title}}</h3>
            <div class="content">
               {{value.summary}}
            </div>
            <el-row class="message" type="flex" justify="space-between">
              <div class="user2">
                <span class="el-icon-location-outline"></span>
                <span>{{value.cityName}}</span>
                <span class="by">by</span>
                <img :src="`${$axios.defaults.baseURL+value.account.defaultAvatar}`" alt="">
                <span class="earth">{{value.account.nickname}}</span>
                <span class="el-icon-view"></span>
                <span>{{value.watch}}</span>
              </div>
              <div class="praise">
                <span class="number">{{value.like||0}}</span>
                <span>赞</span>
              </div>
            </el-row>
          </div>
        </el-row>
      </nuxt-link>
    </div>
    <!-- 分页部分 -->
      <div class="block">      
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <!-- 监听城市名的变化 -->
        <input type="hidden" :value="changcity">
      </div>
  </div>
</template>
<script>
export default {
  props:{
     city:{
      type:Object,
      default:{
        name:''
      }
    }
  },
   
  data() {
    return {
      dataid:[],
      firstData:[],
      cecondData:[],
      total:0,
      pagenum:1,
      pagesize:5,
      post:'',
      _sort:'',

      
    };
  },
  mounted() {
   this.allnumber()
  },
  computed:{
    changcity(){
      // if(this.city.name===''){
      //   this.allnumber()
      // }else{
     let city=this.city.name
      this.init()
      // }
      
    }
  },
  methods:{
    //点击跳转；
    handleSubmit(id){
       console.log(id)
      this.$router.push({path:'/post/detail',query:{id}})
    },
    //默认请求全部数据；
    allnumber(){
      
      // console.log(this.city)
      this.firstData=[];
      this.cecondData=[]
      
      var  start=(this.pagenum-1)*this.pagesize
       this.$axios({
      url: "http://157.122.54.189:9095/posts",
      params: {
      _limit:this.pagesize,
      _start:start,
      //  city:''
      }
    }).then(res => {

      console.log(res);
      res.data.data.forEach(v=>{
        this.total=res.data.total
              if(v.images.length>1){
                this.cecondData.push(v)
              }else {
                this.firstData.push(v)               
              }         
      })
     
    });
    },
    //每页条数数改变时，触发，
    handleSizeChange(val){
      // console.log(val)
     this.pagesize=val
     this.city.name=''
     this.pagenum=1;
     if(this.city.name===''){
       this.allnumber()
     }else{
        this.init()
     }
    
    
    },
    //当前页改变时触发；
    handleCurrentChange(val){
      // console.log(val)
      
      this.pagenum=val;
      this.city.name=''
     
      console.log(this.city.name)
      if(this.city.name===''){
       this.allnumber()
     }else{
        this.init()
     }
    },
    //封装函数；
    init(){
      // console.log(this.city)
      this.firstData=[];
      this.cecondData=[]
      
      var  start=(this.pagenum-1)*this.pagesize
       this.$axios({
      url: "http://157.122.54.189:9095/posts",
      params: {
      _limit:this.pagesize,
      _start:start,
      city:this.city.name
      }
    }).then(res => {
      // console.log(res);
      res.data.data.forEach(v=>{
        this.total=res.data.total
              if(v.images.length>1){
                this.cecondData.push(v)
              }else {
                this.firstData.push(v)               
              }         
      })
      //  console.log(this.firstData)
      // console.log( this.cecondData)
    });
    }
  }
};
</script>
<style lang="less" scoped>
.container2 {
  border-top: 1px #ddd solid;
  .block{
    margin-top:20px;
  }
  .img1 {
      // height: 200px;
      width: 226px;
      height: 120px;
      border: 1px #ddd solid;
      // padding: 0;
      overflow: hidden;
      img {
        // width: 226px;
        width: 100%;
        // height: 120px;
        
        
        
        // height: 200px;
      }
      // padding-top: 5px;
      padding-bottom: 20px;
      // padding-top: 10px;
    //   line-height: 100%
    }
  .main {
    padding: 25px 0;
    border-bottom: 1px #ddd solid;
    .content-right{
        padding-left: 10px;
        width: 460px;
    }
    h3 {
      font-weight: normal;
      padding-bottom: 20px;
      &:hover {
        color: orange;
      }
    }

    .content {
      font-size: 14px;
      color: #666666;
      margin-bottom: 10px;
      height: 59px;
      overflow: hidden;
      // border: 1px #ddd solid;
    }
    .img {
      height: 200px;
      // width: 226px;
     
      img {
        width: 226px;
        
        //  border: 1px #ddd solid;
        
        // height: 200px;
      }
      padding-top: 5px;
      padding-bottom: 20px;
      // padding-top: 10px;
    //   line-height: 100%
    }
    .message {
      .user {
        font-size: 12px;
        color: #666666;
        // height: 20px;
        //   border: 1px #ddd solid;
        img{
          width: 20px;
          vertical-align: middle
        }
        .el-icon-view {
          padding-left: 5px;
        }
        .earth {
          color: orange;
        }
        .by {
          padding-left: 5px;
        }
      }
      .user2 {
        font-size: 12px;
        color: #666666;
        margin-top:15px;
        // height: 20px;
        //   border: 1px #ddd solid;
        img{
          width: 20px;
          vertical-align: middle
        }
        .el-icon-view {
          padding-left: 5px;
        }
        .earth {
          color: orange;
        }
        .by {
          padding-left: 5px;
        }
      }
      .praise {
        width: 100px;
        //   border: 1px #ddd solid;
        text-align: right;
        color: orange;
        .number {
          padding-right: 5px;
        }
      }
    }
  }
  .main2 {
    padding: 25px 0;
    border-bottom: 1px #ddd solid;
    .content-right{
        padding-left: 10px;
        width: 460px;
    }
    h3 {
      font-weight: normal;
      padding-bottom: 20px;
      &:hover {
        color: orange;
      }
    }

    .content {
      font-size: 14px;
      color: #666666;
      margin-bottom: 10px;
      height: 59px;
      overflow: hidden;
      // border: 1px #ddd solid;
    }
    .img {
      height: 200px;
      // width: 226px;
     
      img {
        width: 226px;
        
        //  border: 1px #ddd solid;
        
        // height: 200px;
      }
      padding-top: 5px;
      padding-bottom: 20px;
      // padding-top: 10px;
    //   line-height: 100%
    }
    .message {
      .user {
        font-size: 12px;
        color: #666666;
        // height: 20px;
        //   border: 1px #ddd solid;
        img{
          width: 20px;
          vertical-align: middle
        }
        .el-icon-view {
          padding-left: 5px;
        }
        .earth {
          color: orange;
        }
        .by {
          padding-left: 5px;
        }
      }
      .user2 {
        font-size: 12px;
        color: #666666;
        margin-top:15px;
        // height: 20px;
        //   border: 1px #ddd solid;
        img{
          width: 20px;
          vertical-align: middle
        }
        .el-icon-view {
          padding-left: 5px;
        }
        .earth {
          color: orange;
        }
        .by {
          padding-left: 5px;
        }
      }
      .praise {
        width: 100px;
        //   border: 1px #ddd solid;
        text-align: right;
        color: orange;
        .number {
          padding-right: 5px;
        }
      }
    }
  }
}
</style>


