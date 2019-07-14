<template>
  <div class="container">
    <el-row type="flex" class="main" justify="space-between">
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <div v-if="!$store.state.user.userInfo.token">
        <!-- <span>消息</span> -->
        <nuxt-link to="/user/login">登录/注册</nuxt-link>
      </div>
      <div v-else>
        <el-dropdown>
          <span class="el-dropdown-link">
            <img :src="$axios.defaults.baseURL+$store.state.user.userInfo.user.defaultAvatar" alt="">
            {{$store.state.user.userInfo.user.nickname}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item  @click.native="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  methods:{
    handleLogout(){
      this.$store.commit('user/clearUserInfo')
      this.$router.push({path:'/user/login'})
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  box-shadow: 0 3px 3px 3px #cccccc;
  position: relative;
}
.main {
  height: 60px;
  width: 1000px;
  margin: 0 auto;
  line-height: 60px;
}
.logo {
  margin-right: 20px;
}
img {
  width: 160px;
  height: 51px;
  margin-top: 9px;
}
.navs {
  flex: 1;
}
.navs a {
  padding: 0 20px;
  font-size: 16px
}
.navs a:hover {
  color: #409eff;
  border-bottom: 5px solid #409eff;
}
.navs .nuxt-link-exact-active {
  background-color: #409eff;
  color: #fff;
  &:hover {
    color: #fff;
  }
}
.el-dropdown-link{
  img{
    width: 36px;
    height: 36px;
    vertical-align: middle;
    &:hover{
      outline: 2px solid #409eff
    }
  }
  
}
</style>


