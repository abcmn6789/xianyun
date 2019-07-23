<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <flightsFilters :data="cachefliglist" @changeFligths="changeFligths" />

        <!-- 航班头部布局 -->

        <flightsListHead />

        <!-- 航班信息 -->
        <flightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageindex"
            :page-sizes="[2, 4, 5, 10]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <flightsAsides />
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import flightsListHead from "@/components/air/flightsListHead";
import flightsItem from "@/components/air/flightsItem";
import flightsFilters from "@/components/air/flightsFilters";
import flightsAsides from "@/components/air/flightsAsides";

export default {
  components: {
    flightsListHead,
    flightsItem,
    flightsFilters,
    flightsAsides
  },
  data() {
    return {
      flightslist: {
        flights: [],
        info: {},
        options: {},
        total: 0
      },
      cachefliglist: {
        flights: [],
        info: {},
        options: {},
        total: 0
      },
      dataList: [],
      pagesize: 5,
      pageindex: 1,
      total: 0
    };
  },
  computed: {
    //  dataList(){
    //      return this.dataList=this.flightslist.flights.slice(
    //           (this.pageindex-1)*this.pagesize,this.pageindex*this.pagesize)
    //  }
  },
  //第一种方法，监听URL变化
//   watch:{
//      //监听URL的变化；
//      $route:function(){
//          this.getdata()
//      }
//   },
  //第二种方法监听URL变化；组件内守卫（导航守卫）
  beforeRouteUpdate(from,to,next){
      next()
      this.getdata()
      
  },
  methods: {
    //每页数量切换时
    handleSizeChange(val) {
      this.pagesize = val;
      this.pageindex = 1;
      this.setpage();
    },
    //当前页数量改变时触发
    handleCurrentChange(val) {
      this.pageindex = val;
      this.setpage();
    },
    setpage() {
      this.dataList = this.flightslist.flights.slice(
        (this.pageindex - 1) * this.pagesize,
        this.pageindex * this.pagesize
      );
    },
    //准备一个事件函数，准备接受数据；
    //arr接收的事件值
    changeFligths(arr) {
      //让传递过来的值覆盖原来的值，实现页面内容的刷新。；
      this.dataList = arr;
    },
    //封装一个函数获取动态数据；
    getdata(){
        //默认是在第一页
        this.pageindex=1
       this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
        console.log(res);
      this.flightslist = res.data;
      //重新准备一个装数据的盒子，这个值不会改变，深度拷贝；
      this.cachefliglist = { ...res.data };
      this.setpage();
      // console.log(this.dataList)
      this.total = res.data.total;
    });
    }
  },
  mounted() {
   this.getdata()
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
