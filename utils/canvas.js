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
    cvs.addEventListener('mousedown', (e)=> {
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
