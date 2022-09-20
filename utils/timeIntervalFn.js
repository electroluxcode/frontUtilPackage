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