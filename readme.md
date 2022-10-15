# 个人封装的常用工具类 


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

# 个人面经

vue生命周期（分vue2和vue3来回答就好了）

## cider(一面)

1.自我介绍--学校，实习的地方(巴拉巴怕)

2.讲一下你项目的难点，最有意思的地方(讲了一个射线选择器 一个设计模式-装饰器和发布订阅和js还有一些前端工程化的东西)

3.居中布局的几种实现形式（绝对 和 flexbox）

4.有没有做过移动端项目，设备适配问题是怎么解决的 （媒体查询）

5.普通函数和箭头函数的区别，然后问了一道html题：题目记不清了，知识点是bfc的高度塌陷

6.Generator应用以及原理（没答上来。事后查资料是async和await的内容。学艺不精了.....）

7.代码题（下面这玩意会怎么输出。答案是1，2，4，3，6.知识点是event loop，简单）

```
new Promise(resolve => {
        console.log(1);
        resolve(3);
        Promise.resolve().then(()=> console.log(4))
    }).then(num => {
        console.log(num);
        setTimeout(()=>{console.log(6)},0);
    });
    console.log(2);
```


8.实现一个3*3的九宫格布局，每个小方块100*100，间距20，红绿相间（简单）
```html
<div class="container">
        <div class="line">
            <div class="box green"></div>
            <div class="box red"></div>
            <div class="box green"></div>
        </div>
        <div class="line">
            <div class="box red"></div>
            <div class="box green"></div>
            <div class="box red"></div>
        </div>
        <div class="line">
            <div class="box green"></div>
            <div class="box red"></div>
            <div class="box green"></div>
        </div>
    </div>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .container {
            width: 400px;
            height: 400px;
            display: flex;
            flex-direction: row
        }

        .box {

            width: 100px;
            height: 100px;
            margin: 20px;
        }

        .green {
            background: green;
        }

        .red {
            background: red;
        }

        .line {
            display: inline;
            width: 30%;
        }
    </style>

```

9.  js题(简单)


```js
//temp =[1,[2,[3,[4]]]] 用js使得数据扁平化
function flatten(data){
    let output =[]
    for(let i=0;i<data.length;i++){
        if(Array.isArray(data[i])){
            output=output.concat(flatten(data[i]))
        }else{
            output.push(data[i])
        }
    }
    return output
}
let temp =[1,[2,[3,[4]]]]
console.log(flatten(temp))


```



## 道一云(一，二面)


最近的面试
一面

1.自我介绍

2.vue双向绑定的原理(vue2是input+value ，vue3是modelvalue+update:modelvalue)

3.vue 的生命周期。(create mount update active destory 以及前面加before，vue3的setup=create + 都加上on + destory变成unmount)

4.怎么封装一个axios(baseurl,拦截器响应器之类的)

5.如何优化项目（

​	lighthouse方向。

​	项目体积(js是terser，css是nano，image是imageMinity这个包吧，问了一下image压缩的原理)。

​	项目渲染(总结一下是glspf-prefer girls) g是gzip，l是自己写的babel-loader，s是splitchunk，还讲了一下cachegroup分包策略。pf就是prefetch和preload预渲染

），要是他不打断我我还能接着编 哈哈哈哈哈


5.深拷贝 和浅拷贝

6.跟着项目问了技术栈和一些实现起来的问题。大概就这么多



二面

1.自我介绍

2.动态绑定class(声明变量)

3.后端传了一个json形式的东西过来，里面包括了一堆的转义字符。怎么转化成json的对象(当时说了一个json.parse或者正则,面试官说不行会报错。现在这个知识点还没搞懂。看下面我回去复盘的一个例子，这不是可以正常转吗)

```js
// 前后端交互的时候，后端传了一个json形式的东西过来，里面包含了一堆的转义字符
let temp="{\"src\":\"1.png\"}"
console.log(JSON.parse(temp))  //输出{ src: '1.png' }
```



4.组件传参(这个简单)，然后问我父子组件传参并且跨域（不同的域名之间传参 。当时没答上来。。。正解是类似的postmessage或者用类似qiankun框架的东西）。 



后面就是在拉家常，聊未来的规划。接着直接挂了。面试前跟我说随便闲聊一下，没想到暗藏杀机。。。。





简单的聊一下工作，目前在某不知名小厂中从事前端实习这一份工作，注册资本在5000w（知道没啥用，图个乐）。公司本身是做智慧停车这一行业的，然后拥有一整个停车库来做停车和实验基地-我当时进来很大程度就是被这栋楼给唬住了。然后什么博士带队啥的，我想这尼玛小公司博士也有，没准是下一个国内独角兽。

果断拿了offer后就来了.....

接着说一下我当时的面试。面试的时候也是很奇葩。当时这个厂的员工都去团建去了，约的是下午15：30的面试。然后直到16：00才看到人，接下来就是差不多两个小时的面试（交流）。



---------------------------------------

问题（由于问题有点离谱，大家图个乐就行了）

1.自我介绍
2.我看你项目上有一个xxx，xxxx。聊了一下项目

3.怎么实现存储数据
session localstorage cookie 

4.产品经理跟主要面试我的leader相互看看。

产品经理：“你接着问啊”。
leader：“我又不是搞前端的，我也不熟啊”。

然后沉默了一会，问我：“小曾啊，你看看我们这里怎么样。让你未来leader跟你聊聊吧” 然后产品就跑了。。。。。。。。

为了打破尴尬，leader开始介绍起公司来。
“我们公司xxxxxxxxxxxx”

介绍了差不多了，然后我们聊起了python。是的，面试前端的我跟leader聊起了python，聊起了公司的算法项目

“小曾啊，你看一下咱们的这个车牌识别模型还可以从哪一些角度优化”

我的人工智能知识仅限于能pytorch，paddle和tenorslow调库的几个模型（alexnet vgg ResNet之类的）以及打标，调参，炼丹。把我脑子里残留的几个知识点吐了出来。

接着又问了我几道关于python和算法之类的东西。

“leader，我不是来面试前端的吗”

“哦，对啊。哈哈哈哈。没事，就随便聊聊，你已经过了”

啊这。。。。。。。。。。。。。


---------------------------------------

面试问题问完了，leader就开始向我展示他的github开源项目。包括爬取xxx同人图的网站以及xxxx的站点以及他一些不可名状的游戏和站点。放几张他的git和b站账户的图



最后汇成一句话：伊莉雅赛高 ！！！


就这样我入职了这家成份复杂的公司。。。


