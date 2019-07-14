<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名/手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 16, message: "密码输入格式不正确", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      // 数据验证
      this.$refs.form.validate(valid => {
        if (valid) {
        //   console.log(this.form);
        //   console.log(this);
          //调用函数
          this.$store.dispatch('user/login',this.form)
          //提示
          this.$message({
              type:'success',
              message:'登录成功，正在跳转'
          })
           //实现页面跳转
           setTimeout(()=>{
                this.$router.push({path:'/'})
           },2000)
       
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>

