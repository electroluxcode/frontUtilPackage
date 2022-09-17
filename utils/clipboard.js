/**
 * 
 * @param {*} copyValue
 * @eg 复制到剪切板的方法 
 */
function copyToClipboard(copyValue) {
    //创建一个新组件
    let oInput = document.createElement("input");
    //给新组件赋值
    oInput.value = copyValue;
    //添加新节点到页面body中
    document.body.appendChild(oInput);
    //选择对象
    oInput.select();
    //对选择对象的值进行复制到浏览器中
    document.execCommand("Copy");
    //删除新节点(重置操作)
    document.body.removeChild(oInput);
}