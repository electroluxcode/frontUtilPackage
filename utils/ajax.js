/**
 * 
 * @param {*} conf :object = {url:"x","data":"","async":}........
 * @example let conf={url:"https://bcfaf400-630a-4598-9617-c0d6337c9a9b.bspapp.com/login?name=ruibo&password=123456"}  ;ajax(conf)
 * @des 见下方示例
 */


const ajax = function (conf) { // ajax操作
    // 重要：这里我们可以做request 拦截器
    let url = conf.url,
        data = conf.data,
        senData = [], // 封装后的数据
        async = conf.async !== undefined ? conf.async : true, // ture为异步请求
        type = conf.type || 'get', // 默认请求方式get
        dataType = conf.dataType || 'json',
        contenType = conf.contenType || 'application/x-www-form-urlencoded',
        success = conf.success || "成功",
        error = conf.error || "失败",
        isForm = conf.isForm || false, // 是否formdata
        header = conf.header || {}, // 头部信息
        xhr = '' // 创建ajax引擎对象
    if (data == null) {
        senData = ''
    } else if (typeof data === 'object' && !isForm) { // 如果data是对象，转换为字符串
        for (var k in data) {
            senData.push(encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        }
        senData = senData.join('&')
    } else {
        senData = data
    }
    try {
        xhr = new ActiveXObject('microsoft.xmlhttp') // IE内核系列浏览器
    } catch (e1) {
        try {
            xhr = new XMLHttpRequest() // 非IE内核浏览器
        } catch (e2) {
            if (error != null) {
                error('不支持ajax请求')
            }
        }
    };
    // xhr.open(type, type !== 'get' ? url : url + '?' + senData, async)
    xhr.open(type, type == 'get' ? url : url + '?' + senData, async)
    if (type !== 'get' && !isForm) {
        xhr.setRequestHeader('content-type', contenType)
    }
    for (var h in header) {
        xhr.setRequestHeader(h, header[h])
    }
    xhr.send(type !== 'get' ? senData : null)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                if (dataType === 'json' && success != null) {
                    let res = ''
                    try {
                        res = eval('(' + xhr.responseText + ')')
                    } catch (e) {
                        console.log(e)
                    }
                    // console.log(res) 重要：这里我们可以做reponse 拦截器
                    success(res) // 将json字符串转换为js对象
                };
            } else {
                if (error != null) {
                    error('通讯失败!' + xhr.status)
                }
            }
        }
    }
}
// function success(res){
//     console.log(res)
// }
// function error(res){
//     console.log(res)
// }
// let conf={url:"https://bcfaf400-630a-4598-9617-c0d6337c9a9b.bspapp.com/login?name=ruibo&password=123456",success:success,error:error}  ;ajax(conf)


let ajax1 = (data,url)=>{
    //step1 : 设置请求头
    let xhr = new XMLHttpRequest(); 
    //step2：设置请求方式和请求头 //true表示异步
	xhr.open("POST", url, true);   
    xhr.setRequestHeader("Content-type", "application/json");
    //step3：请求数据
    xhr.send(data);
     // step4：readyState是xhr的请求状态
     //状态4表示已发送请求，服务器已完成返回响应，浏览器已完成了下载响应内容。0-4都有值的
    xhr.onreadystatechange = function() {
     
      if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.responseText);
      }
  };
}