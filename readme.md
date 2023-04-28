<div align="center"><h1>
<br/>
🏆
<br />
frontutilpackage
<br /><br />
</h1>
<sup>
<br />
<br />
<a href="gitee.com/Electrolux"><img src="https://img.shields.io/static/v1?label=version&message=v0.1.4&color=blue" alt="npm package" /></a><a href=https://space.bilibili.com/286773126><img src="https://img.shields.io/static/v1?label=Bili&message=Electrolux&color=pink" alt="temp" /></a>
<a href="gitee.com/Electrolux">   <img src="https://img.shields.io/static/v1?label=Author&message=Electrolux&color=yellow" alt="demos" /></a>
<a href="gitee.com/Electrolux">   <img src="https://img.shields.io/static/v1?label=Contribute&message=welcome&color=green" alt="demos" /></a>
<br />
</a>
<br />
Translations: <a href="">🇨🇳 汉语</a>
</sup>
</div>

个人封装的常用工具类 


优化树状转化平面的逻辑和平面转化树状使得逻辑更加好懂

ver 0.1.7 添加手写webpack

ver 0.1.6 添加热键组合 hotkey.js | 添加objectIndex的hash 值判断算法(去重)


ver 0.1.5 添加sku的学习，添加邻接矩阵。项目中的实现可以查看 https://blog.csdn.net/weixin_44589540/article/details/122347089  。 自己做了一个实例 html/stu.html

```
关于我对该博主的一些思考。properties，有向图赋值 1 是有问题的。当我们选择到这个属性大类。相同的属性大类就可以被选中。而这个属性大类是超过skulist类别中的。这就会出现不在这个属性类中，用户还可以进行提交订单的操作。目前的想法是 将this.associateAttributes(prop.attributes, '1')这一行删掉。不然提交了错误的订单信息只会更恼火
至于他说的根据 properties来设置联系的情况。我认为在这种情况下可以引导用户去双击按钮来进行相同属性大类的切换
举一个实例：从上到下依次勾选1L,红色，套餐一。由于他 properties的设置，这时候的 properties是可以切换成套餐二的。但是skulist并没有1L,红色，套餐二的选项。这就是一个超出边界的bug了

```


ver 0.1.4 增加自适应demo.用于数据大屏 selfadaption.js html/adaption.html
ver 0.1.2 ts基础的学习的 防抖节流封装curry的封装（装饰器） 
目录在ts_utils/base/index.ts


ver 0.1.1 新建ts方法
增加手写promise 和一些类的方法
关于劫持console.log()
```js
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
ver 0.1.1 增加es6.js 里面有一些es6 以上的常用新特性实例
#ver 0.1.0 增加dom.js分页 功能 示例看html/pagelist.html
#ver 0.0.9 增加tree树状处理 tree.js 分块渲染 （列表性能优化,可看BlockList.html  方法引用在dom.js 10w条数据进行处理 看block.html）
#ver 0.0.8 增加domjs 虚拟列表 （列表性能优化）
#ver 0.0.7 增加下载函数。可以进行a标签下载 blob下载 showSaveFilePicker的下载
#ver 0.0.6 增加上传函数 upload，promise.all 全部sucess才执行。promise.race是看最先的。这个可以用作并发池子
#ver 0.0.5 增加函数canvas,objectIndex,dom(用户行为检测)，worker
#ver 0.0.4 增加函数curry，load，ajax
#用于vue的放在VUtils目录下，纯js的放在纯纯CUtils下面

