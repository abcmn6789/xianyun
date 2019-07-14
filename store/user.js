

//nuxt 已经把store关联到应用，只需要维护各个模块
//每个模块通常需要暴露三个属性；

export  const state=()=>{
    return{
        userInfo:{
            token:'',
            user:{
              //   username:'小球'
            }
          }
          
    }
}
//修改state数据
export const  mutations={
    setUserInfo(state,data){
        state.userInfo=data
    },
    clearUserInfo(state){
        state.userInfo={
            token:'',
            user:{}
        }
    }

}

//异步修改state 数据
export const actions={
  login({commit},data){
      //处理登录请求
    this.$axios({
        url: "/accounts/login",
        method:"POST",
        data,
      }).then(res => {
        // console.log(res);
        let data=res.data
        //回调函数，将值传递给setUserInfo函数,把数据保存到Vuex;
        commit('setUserInfo',data)
        // console.log(store)
      });
     
   }
}

