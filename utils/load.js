/**
 * 
 * @param {*} name 
 * @param {*} type 
 * @param {*} fn 
 * @example load("网址","css")
 */
export function loadRes(name, type, fn) {
    let ref
    if (type === 'js') { // 外部js
        ref = document.createElement('script')
        ref.setAttribute('type', 'text/JavaScript')
        ref.setAttribute('src', name)
    } else if (type === 'css') { // 外部css
        ref = document.createElement('link')
        ref.setAttribute('rel', 'stylesheet')
        ref.setAttribute('type', 'text/css')
        ref.setAttribute('href', name)
    } else if (type === 'style') { // style
        ref = document.createElement('style')
        ref.innerhtml = name
    }
    if (typeof ref !== 'undefined') {
        document.getElementsByTagName('head')[0].appendChild(ref)
        ref.onload = function () { // 加载完成执行
            typeof fn === 'function' && fn()
        }
    }
}

// 多线程弄worker 这段


// 父进程
//1. 实例化woker,会执行一次里面的方法
/**
 * 
 * @param {*} url 
 * @des 加载worker
 * @eg loadWorder('index.js')
 */
function loadWorder(url) {
    let w1 = new Worker(url);
    w1.postMessage("父发送");
    w1.addEventListener("message", function (evt) {
        console.log(evt.data, "父接受")
    });
    // 子进程
    //  2. 数据的获取（主线程发送消息给woker）
    // addEventListener("message", function (evt) {
    //     // evt.data
    //     console.log(evt.data, "接受：子组件的数据");
    // });
    // postMessage("发送：子组件的数据");
    // 最后会打印出来  父接收的数据（message里面的），然后是子接受的数据
}








