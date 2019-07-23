<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in datalist.users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" 
        v-for="(item,index) in data.insurances" 
        :key="index"
         @change="changeInsurances( item )">
          <el-checkbox :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`" border></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="datalist.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入手机号码" v-model="datalist.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="datalist.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
      <input type="hidden" :value="allprice">
    </div>
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
    return {
      datalist: {
        users: [{ username: "", id: "" }],
        insurances: [], //保险id
        contactName: "", //联系人的名字
        contactPhone: "", //联系人电话
        invoice: false, //是否需要发票
        seat_xid: '', //座位id
        air: '' ,//航班id
        captcha:''
      }
    };
  },
  //computed监听数据的变化；
  computed:{
      allprice(){
           //计算飞机票总价钱；         
           let price=0;
           //判断是否有订购；
           if(!this.data.airport_tax_audlet){
               return
           }
      //1.单价
       price=this.data.seat_infos.par_price
      //燃油费
      price+=this.data.airport_tax_audlet
      //保险费
      price+=this.datalist.insurances.length*30
      //用以上费用和乘以总人数；
      price*=this.datalist.users.length
      var  data={
                price,
                number:this.datalist.users.length
            }

      //输出机票总费用；
      return this.$store.commit('air/setAllprice',data)
      }
     
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.datalist.users.push({ username: "", id: "" });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.datalist.users.splice(index, 1);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      this.$store
        .dispatch("user/mycode", this.datalist.contactPhone)
        .then(code => {
          this.$alert(`手机验证码是${code}`, "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
        });
    },
    //获取保险id的数组；
    changeInsurances(item){
      var index=this.datalist.insurances.indexOf(item.id)
      if(index>-1){
          this.datalist.insurances.splice(index,1)
      }else{
         this.datalist.insurances.push(item.id)
      }
     
    },
    // 提交订单
    handleSubmit() {
        this.datalist.seat_xid=this.$route.query.seat_xid
        this.datalist.air= this.$route.query.id
        //判断状态的对象、
        const rules={
            users:{
                value:this.datalist.users[0].username&&this.datalist.users[0].id,
                message:'乘坐人不能为空'
            },
            contactName:{
                value:this.datalist.contactName,
                message:'联系人不能为空'
            },
            contactPhone:{
                value:this.datalist.contactPhone,
                message:'联系人电话不能为空'
            },
            captcha:{
               value:this.datalist.captcha,
               message:'验证码不能为空'
            }
        }
        //对对象进行遍历；使用Object.keys()返回一个对象；v:为键
         var valid=true;
        Object.keys(rules).forEach(v=>{
           //假设一个验证为true；
           if(!valid){
               return
           }
            if(!rules[v].value){
                valid=false
               this.$message.error(rules[v].message)
            }
        })
         if(!valid){
             return
            }

    
        // console.log(this.datalist)
        this.$axios({
            url:'/airorders',
            method:"POST",
            data:this.datalist,
            headers:{Authorization:`Bearer ${this.$store.state.user.userInfo.token}`}
        })
        .then(res=>{
            console.log(res)
            var id=res.data.data.id;
            this.$message.success(res.data.message)
            this.$router.push({
              path:'/air/pay',
              query:{id}
            })
        })
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>