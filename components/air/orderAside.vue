<template>
  <div class="order-aside">
    <el-row class="order-adress" type="flex" justify="space-between">
      <span>{{data.dep_date}}</span>
      <span>
        {{data.org_city_name}}
        <span class="line">-</span>
        {{data.dst_city_name}}
      </span>
    </el-row>
    <el-row class="order-time" type="flex" justify="space-between">
      <el-col class="time-left">
        <div class="shijian">{{data.dep_time}}</div>
        <div class="hui plane">{{data.org_airport_name}}{{data.org_airport_quay}}</div>
      </el-col>
      <el-col class="time-center hui">
        <div>---{{rankTime}}---</div>
        <div>{{data.airline_name}}{{data.flight_no}}</div>
      </el-col>
      <el-col class="time-right">
        <div class="shijian">{{data.arr_time}}</div>
        <div class="hui plane">{{data.dst_airport_name}}{{data.dst_airport_quay}}</div>
      </el-col>
    </el-row>
    <el-row class="order-price" type="flex" justify="space-between">
      <span>订单总价</span>
      <span>金额</span>
      <span>数量</span>
    </el-row>
    <el-row class="order-order" type="flex" justify="space-between">
      <span>成人机票</span>
      <span>￥{{data.seat_infos.par_price}}</span>
      <span>x{{$store.state.air.arr.number}}</span>
    </el-row>
    <el-row class="order-number" type="flex" justify="space-between">
      <span>机键+燃油</span>
      <span>￥{{data.airport_tax_audlet}}/人/单程</span>
      <span>x{{$store.state.air.arr.number}}</span>
    </el-row>
    <el-row class="order-money" type="flex" justify="space-between">
      <span>应付总额</span>
      <span>￥{{$store.state.air.arr.price}}</span>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  //计算属性
  computed: {

        // 相隔时间
        rankTime(){
            const arr = this.data.arr_time; // 19:30
            const dep = this.data.dep_time; // 17:00
            //  console.log(arr,dep)
            let end = (arr||'').split(":");
            let start = (dep||'').split(":");

            // 第二天凌晨
            if(end[0] < start[0]){
                end[0] =+end[0]+ 24;
            }

            const dis = (end[0] * 60 + +end[1]) - (start[0] * 60 + +start[1]);
            const hours = Math.floor( dis / 60 );
            const min = dis % 60;

            return `${hours}时${min}分钟`;
        }
    },

};
</script>
<style lang="less" scoped>
.order-aside {
  margin-top: 15px;

  box-sizing: border-box;
  .order-adress {
    padding: 0 10px;
    width: 100%;
    font-size: 14px;
    .line {
      margin: 0 5;
    }
    span:nth-child(1) {
      font-size: 16px;
    }
  }
  .order-time {
    padding: 10px 10px 15px 10px;
    border-bottom: 1px #ddd dashed;
    .shijian {
      font-size: 22px;
    }
    .hui {
      font-size: 12px;
      color: #999999;
    }
    .plane {
      margin-top: 3px;
    }
    .time-center {
      width: 100%;
      text-align: center;
      padding-top: 8px;
    }
    .time-right {
      box-sizing: border-box;
      div {
        padding-left: 45px;
      }
    }
  }
  .order-price {
    padding: 10px 10px;
    font-size: 14px;
    color: #666;
    border-bottom: 1px #ddd dashed;
  }
  .order-order {
    padding: 10px 10px;
    font-size: 14px;
    color: #666;
    border-bottom: 1px #ddd dashed;
  }
  .order-number {
    padding: 10px 10px;
    font-size: 14px;
    color: #666;
    border-bottom: 1px #ddd dashed;
  }
  .order-money {
    line-height: 50%;
    font-size: 14px;
    padding: 25px 10px;
    color: #666;
    span:nth-child(2) {
      color: orange;
      font-size: 30px;
    }
  }
}
</style>


