//nuxt 已经将关联到应用，
//一般模块需要暴露是是哪个属性

export const state=()=>{
    return{
        arr:{
         price:0,
         number:1,
        }
    }

}

export const mutations={
    setAllprice(state,data){
        state.arr=data
    }
}
