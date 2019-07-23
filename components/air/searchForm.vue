<template>
  <div class="search-form">
    <!-- 表单头部 -->
    <el-row class="search-tab" type="flex">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        @click="handsearchtab(item,index)"
        :class="{active:courent===index}"
      >
        <i :class="item.icn">{{item.name}}</i>
      </span>
    </el-row>
    <!-- 表单内容 -->

    <el-form ref="form" label-width="80px" class="search-form-content">
      <!-- 出发城市 -->
      <el-form-item label="出发城市">
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="querydepartSearch"
          placeholder="请搜索出发城市"
          style="width: 80%;"
          @select="handledepartSelect"
        ></el-autocomplete>
      </el-form-item>
      <!-- 到达城市 -->
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="querydestSearch"
          placeholder="请搜索到达城市"
          style="width: 80%;"
          @select="handledestSelect"
        ></el-autocomplete>
      </el-form-item>
      <!-- 出发时间 -->
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 80%;"
          @change="handleDate"
          v-model="form.departDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" style="width: 80%;" @click="handlesubmit">搜索</el-button>
      </el-form-item>
      <div class="reserve">
        <div>
          <span @click="handleReverse">换</span>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      courent: 0,
      form: {
        departCity: "", //出发城市
        departCode: "", //出发城市代码
        destCity: "", //到达城市
        destCode: "", // 到达城市代码
        departDate: "" //出发时间
      },

      tabs: [
        { name: "单程", icn: "iconfont icondancheng" },
        { name: "往返", icn: "iconfont iconshuangxiang" }
      ]
    };
  },
  methods: {
    //切换时触发；
    handsearchtab(item, index) {
      //   this.courent = index;
      if (index === 1) {
        this.$alert("暂时没有往返", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    },

    querySearch(value) { 
     return new Promise((resolve,reject)=>{
        if (!value) {
        return resolve([]);
      }
      // console.log(value)
      // console.log(callback)
      this.$axios({
        url: "/airs/city",
        params: { name: value }
      }).then(res => {
        // console.log(res)
        const { data } = res.data;
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

    //利用sysnc来做

    //输入时触发；
    //value:为输入框中输入的值
   async querydepartSearch(val, callback) {
      //promise对象 返回一个成功回调的值；res=newdata
     const res=await this.querySearch(val)
     if(res.length>0){
      //  默认选中第一个
        this.form.departCity = res[0].value;
       this.form.departCode = res[0].sort;
     }
     callback(res)
    },



    //下拉选中时触发;返回值：选中建议项
    handledepartSelect(item) {
      // console.log(item)
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },
    //时间选中时触发；组件绑定值。格式与绑定值一致
    handleDate(time) {
      //引用moment.js
      this.form.departDate = moment(time).format("YYYY-MM-DD");
      // console.log(this.form.departDate)
    },
    
    //利用.then来做
    
    //输入时触发；
    querydestSearch(val, callback) {
      //得到一个成功回调；
      this.querySearch(val)
      .then(res=>{
        if(res.length>0){
          // 默认选中第一个
        this.form.destCity = res[0].value;
       this.form.destCode = res[0].sort;
        }
        callback(res)
      })
    },
    //选中下拉时触发
    handledestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },
    //点击换城市发生交换
    handleReverse() {
      const { departCity, destCity, departCode, destCode } = this.form;
      this.form.departCity = destCity;
      this.form.destCity = departCity;

      this.form.destCode = departCode;
      this.form.departCode = destCode;
    },
    //  搜索请求
    handlesubmit() {
      console.log(this.form);
      // this.$axios({
      //   url: "/airs",
      //   data: this.form
      // }).then(res => {
      //   console.log(res);
      // });
      const rules={
        departCity:{
          value:this.form.departCity,
          message:'请输入触发城市'
        },
        destCity:{
          value:this.form.destCity,
          message:'请输入到达城市'
        },
        departDate:{
          value:this.form.departDate,
          message:'请选择出发时间'
        }
      }

      var valid=true;
      //对象遍历
      Object.keys(rules).forEach(v=>{
        if(!valid){
          return
        }
        if(!rules[v].value){
          valid=false
          this.$message.warning(rules[v].message); 
        }
        //跳转
       
      })
       if(valid){
         

          this.$router.push({path:'/air/fligths',query:this.form})
        }
        //把当前本地存储的搜索记录拿出；
         var airs=localStorage.getItem('airs') 
          var  arr=JSON.parse(airs)|| []
              arr.unshift(this.form)
          //让页面保留5张最新的数据；
          if(arr.length>5){
                 arr.length=5
          }
         
         //搜索的记录存起来；
         localStorage.setItem('airs',JSON.stringify(arr))
    }
  }
};
</script>
<style lang="less" scoped>
.reserve {
  position: absolute;
  right: 39px;
  top: 80px;
  div {
    position: relative;
    height: 70px;
    width: 25px;
    border: 1px #ddd solid;
    border-left: none;
    span {
      background-color: #999999;
      color: #fff;
      position: absolute;
      right: -13px;
      top: 20px;
      display: block;
      width: 25px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      cursor: pointer;
    }
  }
}
.search-form-content {
  margin: 15px 15px;
}
.search-form {
  position: relative;
  width: 360px;
  height: 350px;
  border: 1px #ddd solid;
  border-top: none;
  box-sizing: border-box;
  .search-tab {
    .active {
      &::after {
        background-color: #fff;
      }
      border-top: 3px orange solid;
    }
    span {
      display: block;
      flex: 1;
      height: 48px;
      line-height: 48px;
      position: relative;
      box-sizing: border-box;
      text-align: center;
      cursor: pointer;

      i {
        position: absolute;
        display: block;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
      }
      &:after {
        display: block;
        width: 100%;
        height: 100%;
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        box-sizing: border-box;
        background: #eee;
      }
    }
  }
}
</style>


