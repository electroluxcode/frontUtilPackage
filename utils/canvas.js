/**
 * 
 * @param {*} idName 
 * @des 返回一个能绘图的canvas
 * @eg write("test")
 */
function write(idName) {
    const cvs = document.getElementById(idName);
    const ctx = cvs.getContext('2d');
    let isDraw = false;
    cvs.addEventListener('mousedown', (e) => {
        e = e || window.event;
        isDraw = true;
        ctx.moveTo(e.pageX, e.pageY)
    })
    cvs.addEventListener('mousemove', (e) => {
        e = e || window.event;
        if (isDraw) {
            console.log(e.pageX, e.pageY)
            ctx.lineTo(e.pageX, e.pageY);
            ctx.stroke();
        }

    })
    cvs.addEventListener('mouseup', (e) => {
        isDraw = false;
    })
}
/**
 * 
 * @param {} idName 
 * @des 传入idName进行下载
 */
function downloadCanvas(idName) {
    var link = document.createElement("a");
    // 只能用于canvas 转化成base64
    var imgData = document.getElementById(idName).toDataURL({ format: 'png', quality: 1, width: 20000, height: 4000 });
    // var strDataURI = imgData.substr(22, imgData.length);
    var arr = imgData.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    var blob = new Blob([u8arr], { type: mime });
    var objurl = URL.createObjectURL(blob);
    link.download = "grid1.png";
    link.href = objurl;
    link.click();
}