/**
 * 
 * @param {*} idName 
 * @des 替换dom
 * @eg replaceDom("id的名字")
 * 
 */
function replaceDom(idName) {
    let data = [{ id: 1, name: "测试" }, { id: 2, name: "测试2" }]
    // document.getElementById(idName).innerHTML = function () {
    //     var arr = [];
    //     for (i = 0; i < data.length; i++) {
    //         arr.push("<blockquote'>" + "<p>" + data[i].id + "-----------" + data[i].name + "</p>" + "</blockquote>");
    //     }
    //     return arr.join('');
    // }()
    document.getElementById(idName).innerHTML = function () {
        return '<h1 style="color:red">测试</h1>';
    }()
}

/**
 * 
 * @param {*} idName 
 * @des 添加dom
 * @eg appendDom("id的名字") 同级添加等方法
 * 
 */
function appendDom(idName) {
    let data = [{ id: 1, name: "测试" }, { id: 2, name: "测试2" }]
    // document.getElementById(idName).innerHTML = function () {
    //     var arr = [];
    //     for (i = 0; i < data.length; i++) {
    //         arr.push("<blockquote'>" + "<p>" + data[i].id + "-----------" + data[i].name + "</p>" + "</blockquote>");
    //     }
    //     return arr.join('');
    // }()
    var p = document.createElement("div");
    p.innerHTML = function () {
        return '<h1 style="color:red">测试</h1>';
    }()
    // var parent = test.parentNode; // 父节点
    // var chils = test.childNodes; // 全部子节点
    // var first = test.firstChild; // 第一个子节点
    // var last = test.lastChild; // 最后一个子节点　
    // var previous = test.previousSibling; // 上一个兄弟节点
    // var next = test.nextSibling; // 下一个兄弟节点
    //1.把一个子节点添加到父节点的最后一个子节点。
    document.getElementById(idName).parentNode.appendChild(p);
    // 2.prepend  在头部插入
    // document.getElementById(idName).prepend(p)
}


/**
 * 
 * @param {*} idName 
 * @des 删除dom
 * @eg removeDom("id的名字")  //removeDom("container")
 * 
 */
function removeDom(idName) {
    document.getElementById(idName).remove()
}

// 遍历dom
// document.querySelectorAll('div')





/**
 * 
 * @param {*} idName 
 * @des 删除dom
 * @eg removeDom("id的名字")  //removeDom("container")
 * 
 */
function removeDom(idName) {
    document.getElementById(idName).remove()
}

// 遍历dom
// document.querySelectorAll('div')

/**
 * @des 监控是不是到达底部/顶
 * @eg addListenerPos()
 */
function addListenerPos() {
    // 滚动方向枚举值
    const DIRECTION_ENUM = {
        DOWN: "down",
        UP: "up",
    };
    // 记录前一个滚动位置
    let beforeScrollTop = 0;
    function handleScroll() {
        // 距顶部 有指定了DTD 是前者（DOCTYPE） 不然是后者
        // safiri的函数  window.pageYOffset 
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 可视区高度
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // 滚动条总高度
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        // 确定滚动方向
        let direction = DIRECTION_ENUM.DOWN;
        if (beforeScrollTop > scrollTop) {
            direction = DIRECTION_ENUM.UP;
        }
        // 通过滚动方向判断是触底还是触顶
        if (direction == DIRECTION_ENUM.DOWN) {
            // 滚动触底
            if (scrollTop + clientHeight + 40 >= scrollHeight) {
                console.log("滚动触底");
            }
        } else {
            // 滚动到顶部
            if (scrollTop - 40 <= 0) {
                console.log("滚动到顶部");
            }
        }
        beforeScrollTop = scrollTop;
        // 打印数值
        console.table([{
            label: "可视区高度",
            value: clientHeight,
        },
        {
            label: "滚动条总高度",
            value: scrollHeight,
        },
        {
            label: "距顶部",
            value: scrollTop,
        },
        {
            label: "距底部",
            value: scrollHeight - (scrollTop + clientHeight),
        },
        ]);
    }
    function thorttle(fn, time) {
        window.flag = null;
        return function () {
            if (!window.flag) {
                window.flag = true;
                fn();
                setTimeout(() => {
                    window.flag = false;
                }, time)
            }
        }
    }
    // 滚动节流
    const throttleHandleScroll = thorttle(handleScroll, 100)
    // 监听滚动
    window.addEventListener('scroll', throttleHandleScroll);
}



/**
 * @des 监控是不是看到了xx id 元素
 * @eg new addListenerIdPos("help")
 */
function addListenerIdPos(idName) {
    this.idName = idName
    function handleScroll() {
        // 距顶部 有指定了DTD 是前者（DOCTYPE） 不然是后者
        // safiri的函数  window.pageYOffset 
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 可视区高度
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // 元素位置
        console.log("id的name：" + idName + "  new之后这个没有值，前面的有值 this.idname：" + this.idName)
        var eleHeight = document.getElementById(idName).offsetTop
        // console.log("bu能看见元素",eleHeight,scrollTop,clientHeight)
        if (eleHeight < clientHeight + scrollTop + 20) {
            console.log("能看见元素", eleHeight, scrollTop, clientHeight)
        }
        // if ( clientHeight + scrollTop + 20<eleHeight+window.innerHeight) {
        //     console.log("超过了xxx元素", eleHeight, scrollTop, clientHeight)
        // }

        // console.table([{
        //     label: "可视区高度",
        //     value: clientHeight,
        // },
        // {
        //     label: "滚动条总高度",
        //     value: scrollHeight,
        // },
        // {
        //     label: "距顶部",
        //     value: scrollTop,
        // },
        // {
        //     label: "距底部",
        //     value: scrollHeight - (scrollTop + clientHeight),
        // },
        // ]);
    }
    function thorttle(fn, time) {
        window.flag = null;
        return function () {
            if (!window.flag) {
                window.flag = true;
                fn();
                setTimeout(() => {
                    window.flag = false;
                }, time)
            }
        }
    }
    // 滚动节流
    const throttleHandleScroll = thorttle(handleScroll, 100)
    // 监听滚动
    window.addEventListener('scroll', throttleHandleScroll);
}

/**
 * @des 监控用户行为（界面停留时间） #详情可以看 html/monitor
 */
function addMonitorPage() {
    try {
        window.addEventListener("pageshow", () => {
            window.timeStr=new Date().getTime()
            // alert("开始监控")
        });
        window.addEventListener("load", () => {
            window.timeStr=new Date().getTime()
            // alert("开始监控")
        });
        window.addEventListener('pagehide', () => {
            let t = (new Date().getTime() - window.timeStr) / 1000
            localStorage.setItem("time", t)
            window.timeStr = new Date().getTime()
            let result = {
                curTime: new Date(),
                url: window.location.href,
                stayTime: localStorage.getItem("time")
            };
            //重置数据
            window.timeStr = new Date().getTime()
            //发送监控数据
            console.table(result)
            // localStorage.clear("timestr")
            // alert("停留了"+localStorage.getItem("time")+"秒")
        })

        // onhashchange 好像是vue的
        window.addEventListener('hashchange', () => {
            let t = (new Date().getTime() - window.timeStr) / 1000
            localStorage.setItem("time", t)
            window.timeStr = new Date().getTime()
            let result = {
                curTime: new Date(),
                url: window.location.href,
                stayTime: localStorage.getItem("time")
            };
            //重置数据
            window.timeStr = new Date().getTime()
            //发送监控数据
            console.table(result)
            // localStorage.clear("timestr")
            // alert("停留了"+localStorage.getItem("time")+"秒")
        })


    } catch (error) {
        console.log("性能信息上报异常", error);
    }
}


/**
 * @des监控用户行为（界面停留时间） #详情可以看 html/monitor
 * @eg addMonitorElement("blue")
 */
 function addMonitorElement(idName) {
    function timer(n_hour, n_min, n_sec) {
        // var n_sec = 0; //秒
        // var n_min = 0; //分
        // var n_hour = 0; //时
        console.log(n_hour, n_min, n_sec)
        return setInterval(function () {

            window.str_sec = n_sec;
            window.str_min = n_min;
            window.str_hour = n_hour;
            if (window.str_sec < 10) {
                // window.str_sec = "0" + n_sec;
                window.str_sec = n_sec;
            }
            if (window.str_min < 10) {
                // window.str_min = "0" + n_min;
                window.str_min = n_min;
            }

            if (window.str_hour < 10) {
                // window.str_hour = "0" + n_hour;
                window.str_hour = n_hour;
            }

            var time = window.str_hour + ":" + window.str_min + ":" + window.str_sec;
            console.log(time, "时间")
            n_sec++;
            if (n_sec > 59) {
                n_sec = 0;
                n_min++;
            }
            if (n_min > 59) {
                n_sec = 0;
                n_hour++;
            }


        }, 1000);
    }
    //暂停
    window.isFirstEle = true
    window.str_hour=0,window.str_min=0, window.str_sec = 0
    

    this.idName = idName
    function handleScroll() {
        // 距顶部 有指定了DTD 是前者（DOCTYPE） 不然是后者
        // safiri的函数  window.pageYOffset 
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 可视区高度
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // 元素位置
        // console.log("id的name：" + idName + "  new之后这个没有值，前面的有值 this.idname：" + this.idName)
        var eleHeight = document.getElementById(idName).offsetTop
        // console.log("bu能看见元素",eleHeight,scrollTop,clientHeight)
        //元素高度
        var Height = Number(document.getElementById("blue").style.height.replace('px', ''))
        if (eleHeight < clientHeight + scrollTop + 20 && clientHeight + scrollTop + 20 < eleHeight + Height + window.innerHeight) {
            console.log("能看见元素", eleHeight, scrollTop, clientHeight)
            //初始化计时器
            if (window.isFirstEle == true) {
                window.n_timer = timer(0, 0, 0);
                window.isFirstEle=false
            } else {             
                clearInterval(window.n_timer);
                window.n_timer = timer(window.str_hour, window.str_min, window.str_sec);
            }
        } else {
            clearInterval(window.n_timer);
        }


    }
    function thorttle(fn, time) {
        window.flag = null;
        return function () {
            if (!window.flag) {
                window.flag = true;
                fn();
                setTimeout(() => {
                    window.flag = false;
                }, time)
            }
        }
    }
    // 滚动节流
    const throttleHandleScroll = thorttle(handleScroll, 100)
    // 监听滚动
    window.addEventListener('scroll', throttleHandleScroll);
}