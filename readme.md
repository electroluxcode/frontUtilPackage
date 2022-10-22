# 个人封装的常用工具类 

# ver 0.1.4 增加自适应demo.用于数据大屏 selfadaption.js html/adaption.html
# ver 0.1.2 ts基础的学习的 防抖节流封装curry的封装（装饰器） 
目录在ts_utils/base/index.ts


# ver 0.1.1 新建ts方法
增加手写promise 和一些类的方法
关于劫持console.log()
```
class ConsoleError  {
    
    constructor(params){
        // super(params);获取父级的消息
        console.warn("参数是："+JSON.stringify(params))
    }

    /**
     * 处理console事件
     */
    handleError(){
        this.registerInfo();

    }

    /**
     * 处理信息
     */
    registerInfo(){
        let t = this;
        console.log=function(){
            // t.handleLog(ErrorLevelEnum.INFO,ErrorCategoryEnum.CONSOLE_INFO,arguments);
            t.handleLog("info","console_info",arguments);
        }
    }


    /**
     * 处理日志
     */
    handleLog(level,category,args){
        try {
            this.level = level;
            let params = [...args];
            this.msg = params.join("\r\n"); //换行符分割
            // this.url = location.href;   //当前地址
            this.category = category;
            let temp ={
                level:this.level,
                params:params,
                msg:this.msg,
                category:category
            }
            console.warn("处理info数据：",temp)
        } catch (error) {
            console.log("console统计错误异常",level,error);
        }
    }

}

/**
 * 初始化console事件
 */
(function(){  
    //创建空console对象，避免JS报错  
    if(!window.console){
        window.console = {};
    }
    let funcs = ['log','tWarn','tError'];
    //这里劫持 console.log console.tWarn tError数据
    funcs.forEach((func,index)=>{
        if(!console[func]){
            console[func] = function(){};
        }
    });
})()
//试验
new ConsoleError({
    "test":"12"
}).handleError()
console.log("测试数据")



```
# ver 0.1.1 增加es6.js 里面有一些es6 以上的常用新特性实例
## ver 0.1.0 增加dom.js分页 功能 示例看html/pagelist.html
## ver 0.0.9 增加tree树状处理 tree.js 分块渲染 （列表性能优化,可看BlockList.html  方法引用在dom.js 10w条数据进行处理 看block.html）
## ver 0.0.8 增加domjs 虚拟列表 （列表性能优化）
## ver 0.0.7 增加下载函数。可以进行a标签下载 blob下载 showSaveFilePicker的下载
## ver 0.0.6 增加上传函数 upload，promise.all 全部sucess才执行。promise.race是看最先的。这个可以用作并发池子
## ver 0.0.5 增加函数canvas,objectIndex,dom(用户行为检测)，worker
## ver 0.0.4 增加函数curry，load，ajax
## 用于vue的放在VUtils目录下，纯js的放在纯纯CUtils下面

