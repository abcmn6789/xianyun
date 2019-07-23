//引入element-ui
import {Message} from 'element-ui'
// this.$message=Message
//axios拦截器
//第一个参数是nuxt对象；$aioxs redirect是nuxt中解构出来的对象；
export default ( ({$axios,redirect})=>{
    //拦截axios的错误请求
    // console.log($axios)
    $axios.onError(err=>{
    //   console.log(err.response)
    //结构出来
    const {message,statusCode}=err.response.data
    //判断
    if(statusCode===400){
        Message.error(message)
    }
    if(statusCode===401||statusCode===403){
        // this.$router.push({path:'/user/login'})
        //跳转到到登录页
        redirect("/user/login")
    }
    })

})