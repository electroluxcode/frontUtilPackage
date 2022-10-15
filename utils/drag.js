/**

父级必须长这样
display: flex;
flex - direction: column;
height: 300px;
width: 100 %;

 */

function dragPanel(btnElement) {
    const btn1 = document.querySelector(btnElement)
    const main1 = btn1.parentElement
    let isMove = false
    let mouseY = 0
    //每一次拖拽的坐标
    let currHeight = 0
    main1.addEventListener('mousedown', e => {
        e = e || window.event;
        mouseY = e.pageY
        isMove = true;
        currHeight = main1.offsetHeight
    })
    btn1.addEventListener('mouseup', e => {
        isMove = false
    })
    btn1.addEventListener('mousemove', e => {
        e = e || window.event;

        if (isMove) {
            const moveTop = e.pageY - mouseY
            console.log(currHeight - moveTop)
            main1.style.height = currHeight - moveTop + "px"
            console.log(main1.style.height)
        }
    })
}