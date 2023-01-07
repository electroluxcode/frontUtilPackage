

function timeInterval(fun){
  if(localStorage.getItem("onchange")){
    if(Number(new Date().getTime())-localStorage.getItem("onchange")>1000){
      console.log("超过了1秒")
      fun()
      localStorage.setItem("onchange",Number(new Date().getTime()))
    }else{
      console.log("1秒內")
      
      localStorage.setItem("onchange",Number(new Date().getTime()))
    }
  }else{
    fun()
    localStorage.setItem("onchange",Number(new Date().getTime()))
    console.log("初始化")
  }
}









/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 * @example parseTime("1548221490638") 会输出 '2019-01-23 13:31:30'
 * @example parseTime("1548221490638",'{y}-{m}-{d}') 会输出 '2019-01-23'
 * @example 用来进行时间戳的转化
 */

// var time = {day:4,mouth:6,year:1930}
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
/**

 * @example  dateStrForma('20190626', 'YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
 * @example  dateStrForma('121220190626', '----YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
 * @example  dateStrForma('2019年06月26日', 'YYYY年MM月DD日', 'YYYYMMDD') ==> 20190626
 * @example  dateStrForma('20050106', 'YYYYMMDD', 'YYYY---MMDD') '2005---0106'
 * @example  用来转化时间字符串
 */
export function dateStrForma(str, from, to) {
  //'20190626' 'YYYYMMDD' 'YYYY年MM月DD日'
  str += ''
  let Y = ''
  if (!(Y = from.indexOf('YYYY'))) {
    console.log(Y = from.indexOf('YYYY'), "yyyy")
    Y = str.substr(Y, 4)

    to = to.replace(/YYYY|yyyy/g, Y)
  } else if (!(Y = from.indexOf('YY'))) {
    console.log(Y = from.indexOf('YY'), "yy")
    Y = str.substr(Y, 2)
    to = to.replace(/YY|yy/g, Y)
  }

  let k, i
  ['M', 'D', 'H', 'h', 'm', 's'].forEach(s => {
    i = from.indexOf(s + s)
    k = i ? str.substr(i, 2) : ''
    to = to.replace(s + s, k)
  })
  return to
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 * @example  formatTime(new Date() - 60 * 60 * 24 * 1 * 1000))  两分钟前
 * @example  标准时间转化 const d = new Date('2018-07-13 17:54:01');
 * @example  formatTime(d, '{y}-{m}-{d} {h}:{i}')
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}


/**
 * 
 * @param {*} count 倒计时的秒数
 * @des 倒计时的时候用的
 * @eg timeCount(60)
 */
function timeCount(count) {
  let time = Number(new Date()) + count * 1000;
  let dingshiqi = setInterval(() => {
    countDown(time)
  }, 1000);

  function countDown(deadline) {
    //获取当前时间的时间戳（单位毫秒）
    var nowTime = +new Date();
    //把剩余时间毫秒数转化为秒
    var times = (deadline - nowTime) / 1000;
    if (times < 0) {
      console.log("结束了")
      clearInterval(dingshiqi)
    }
    //计算小时数 转化为整数
    var h = parseInt(times / 60 / 60 % 24);
    //如果小时数小于 10，要变成 0 + 数字的形式 赋值给盒子
    let hour = h < 10 ? "0" + h : h;
    //计算分钟数 转化为整数
    var m = parseInt(times / 60 % 60);
    //如果分钟数小于 10，要变成 0 + 数字的形式 赋值给盒子
    let minute = m < 10 ? "0" + m : m;
    //计算描述 转化为整数
    var s = parseInt(times % 60);
    //如果秒钟数小于 10，要变成 0 + 数字的形式 赋值给盒子
    let second = s < 10 ? "0" + s : s;
    console.log(hour, minute, second)
  }
}
/**
 * 
 * @param {*} n_hour 
 * @param {*} n_min 
 * @param {*} n_sec 
 * @returns 
 * @des 计时器
 * @eg 
var n_timer = timer(0,0,0);
clearInterval(n_timer);
var n_timer =timer( window.str_hour , window.str_min, window.str_sec);
 */
function timer(n_hour, n_min, n_sec) {
  // var n_sec = 0; //秒
  // var n_min = 0; //分
  // var n_hour = 0; //时
  return setInterval(function () {

    window.str_sec = n_sec;
    window.str_min = n_min;
    window.str_hour = n_hour;
    if (n_sec < 10) {
      // window.str_sec = "0" + n_sec;
      window.str_sec = n_sec;
    }
    if (n_min < 10) {
      // window.str_min = "0" + n_min;
      window.str_min = n_min;
    }

    if (n_hour < 10) {
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

function addMonitorElement(idName) {
        function timer(n_hour, n_min, n_sec) {
            // var n_sec = 0; //秒
            // var n_min = 0; //分
            // var n_hour = 0; //时
            return setInterval(function () {

                window.str_sec = n_sec;
                window.str_min = n_min;
                window.str_hour = n_hour;
                if (n_sec < 10) {
                    // window.str_sec = "0" + n_sec;
                    window.str_sec = n_sec;
                }
                if (n_min < 10) {
                    // window.str_min = "0" + n_min;
                    window.str_min = n_min;
                }

                if (n_hour < 10) {
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



