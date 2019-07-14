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
        <el-button class="btn">发送验证码</el-button>
      </template>
      </el-input>
      
    </el-form-item>
    <el-form-item prop="nickname">
      <el-input v-model="ruleForm.nickname" placeholder="你的名字"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="ruleForm.password" placeholder="密码" type="password"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="ruleForm.password" placeholder="确认密码" type="password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" class="btnsubmit">注册</el-button>
      <!-- <el-button >重置</el-button> -->
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        captcha: "",
        nickname: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
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


