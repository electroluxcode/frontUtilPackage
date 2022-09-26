/**
 * 
 * @param {*} fn 
 * @param {*} time 
 * @example 两个的示例是一样的 function a(){console.log("data")};let b=new debounce(a,1000);b()
 */
// 最后一次 input输入 防抖
function debounce(fn,time){
    window.flag =null;
    return function(){
        clearTimeout(window.flag)
        window.flag=setTimeout(()=>{
            fn()
        },time)
    }
}

// 第一次 滚动 节流
/**
 * 
 * @param {*} fn  方法
 * @param {*} time  时间
 * @returns 节流用于下拉加载
 */
function thorttle(fn,time){
    window.flag =null;
    return function(){
        if(!window.flag){
            window.flag =true;
            fn();
            setTimeout(()=>{
                window.flag =false;
            },time)
        }
    }
}

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
