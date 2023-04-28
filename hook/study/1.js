// document.cookie



// --1.函数hook

// js hook 的原理是”重新定义函数，通过调用位置中间走我们当前的函数，改变执行流程。
// 1.1.我们可以输出分析日志(用一个变量保存函数 . 写一个方法 覆盖前面的方法，然后用变量去console 调用的参数和结果)
// 1.2.定位关键点:(加上debug)
// 1.3.改变返回结果(比如 无限debug的情况)
// 我们hook的位置是在function 定义 和 调用函数 的中间

// 类似于
function add(a,b){
    return a+b
}
add = (a,b) =>{
    return a *b
}

// 这样就成功hook了


// --2.对象属性hook 的原理跟function差不多,在定义对象 和 调用位置 中间 进行 hook


// 类似于
let user = {
    name:"小明"
}
let _user = user.name
Object.defineProperties(user,"name",{
    get(){
        // 获取属性值执行  log
        return user
    },
    set(value){
        // 设置属性值执行  =
        _user = value
    }
})

// 这里可以监听document 上面的值


// --3.浏览器环境 hook . 可以在页面加载之前加载
_atob = atob
atob = function (str){
    console.log("正在执行atob方法",str)
    let result = _atob(str)
    return result
}

// --4.hook 检测点 和保护
// 有的会使用toString和原型链 方法来进行 访问和检测
// console.log(atob.toString()==xxx)
// Function.prototype.tostring.call(atob) === 'function atob() { [native code] } '
// 我们从原型链上hook他一下.注意 toString 和 原型链上面 hook 的有问题


Function.prototype.tostring = function (){
    return `function ${this.name}() { [native code] }`
}

// --4.包装成 native 方法
// globalThis 在node 是 global .在浏览器 是 window 都是全局变量
// 这里可以写  globalThis.set_native
function set_native(func) {
    func.toString = function () { return `function ${func.name}(){ [native code] }` }
    func.prototype.toString = toString
    return func
}

function add(){
    console.log("add")
}

//直接把自己函数自身native吧
console.log(set_native(add).toString())


// --5. symbol ,定义了之后就再也拿不到了，类似于私有属性
let obj = {}
let key = Symbol()
obj[ key] = 1

Object.defineProperty(obj,key,{
    enumerable:false
})


// --6. 函数重命名 每一个函数都有一个name 属性
function renameFn(fn,name){
    Object.defineProperty(fn,"name",{
        configurable:true,
        enumerable:false,
        writable:false,
        value:name
    })
}
Object.getOwnPropertyDescriptor(Document.prototype,"cookie").get.name



// hook 函数 封装

function hook({fn:fn,fnInfo:fnInfo,isDebug,})



// 登录：
// ctrl + shift +f
// 猜测＋断点 ，之后可以把上面的 变量名 输出一下。 这里输出的是空间，然后我们需要拿到数据那么我们就可以用val来进行
//  找到加密解密的过程，然后想aes需要16位的key 和 内容

// 可以写一个 crypto 的通用hook



// --------------例子------------------
// --1.监听cookie
let cookieTemp = ''
Object.defineProperties(document,'cookie',{
    set:function(val){
        // cookie加密就打断点
        if(val.indexOf("BIDUPSID") != -1){
            debugger;
        }
        console.log("cookies值:",val )
    },
    get:function(){
        return cookieTemp
    }
})



