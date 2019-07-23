<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    class="demo-ruleForm"
    style="width:350px;"
  >
    <el-form-item prop="username">
      <el-input v-model="ruleForm.username" placeholder="用户名手机"></el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-input v-model="ruleForm.captcha" placeholder="验证码" class="rule">
        <template slot="append">
        <el-button class="btn" @click="handSendcaptacha">发送验证码</el-button>
      </template>
      </el-input>
      
    </el-form-item>
    <el-form-item prop="nickname">
      <el-input v-model="ruleForm.nickname" placeholder="你的名字"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="ruleForm.password" placeholder="密码" type="password" ></el-input>
    </el-form-item>
    <el-form-item prop="checkpassword">
      <el-input v-model="ruleForm.checkpassword" placeholder="确认密码" type="password"  auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" class="btnsubmit" @click="registerSubmit">注册</el-button>
      <!-- <el-button >重置</el-button> -->
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
       //value:输入域的值
    //rule:当前规则
    //callback:回调函数
     var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
    return {
      ruleForm: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkpassword:""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
     checkpassword: [
                 { validator: validatePass, trigger: 'blur' }//自定义函数
              ],
      }
    };
   
  },
  methods:{
      //发送验证码
      handSendcaptacha(){
       var tel=this.ruleForm.username
       //判断号码填写是否为空并提醒
       if(!tel.trim()){
           return this.$message({
               type:'warning',
               message:'请输入手机号码'
           })
       }
     //调用store，请求；
      this.$store.dispatch('user/mycode',tel)
      .then(code=>{
          this.$alert(`手机验证码是${code}`, '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        });
      })
      },
      //注册
      registerSubmit(){
          //验证
          this.$refs.ruleForm.validate((valid)=>{
              if(valid){
                  //取出ruleform 里面的checkpassWord
                  const {checkpassword,...from}=this.ruleForm
                  //发送请求；调用vuex 
                  this.$store.dispatch('user/register',from)

                    //跳转返回页面
                     this.$router.back()
              }else{
                  return false
              }
          })
      }
       
  },

  mounted(){
    //   console.log(this.ruleForm)
  }

};
</script>
<style lang="less" scoped>
.demo-ruleForm {
  padding-left: 25px;
  margin-top: 20px;
  .btn {
    width: 100px;
    background-color: #f5f7fa;
    text-align: center;
  }
  .btnsubmit {
    width: 350px;
  }
}
</style>


