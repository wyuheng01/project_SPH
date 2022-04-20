//Vue拆件一定暴露一个对象

let myPlugins = {}

myPlugins.install = function (Vue,options) {
    //全局指令
    Vue.directive(options.name,(element,params) =>{
        element.innerHTML = params.value.toUpperCase()
    })
}

export default myPlugins