/**
 * @des 热键的组合示例
 * @param {*} keys 
 * @returns 
 */
function combinationKey(keys) {
    let combinationKeyList = []
    let keyQueue = []
    const mouseMap = ["leftMouse", "wheelMouse", "rightMouse"]
    if (!keys) {
        console.warn('needs keys array')
        return
    }

    combinationKeyList = keys
    // console.log(combinationKeyList)
    const dispatchForCode = (event) => {
        return new Promise((resolve) => {
            let code = undefined

            if (event.key !== undefined) {
                code = event.key
            } else if (event.keyCode !== undefined) {
                // 未对 keyCode 做兼容
                code = event.keyCode
            }
            resolve(code)
        })
    }



    function indexOfCombinationKeyList(combinationKeyList, keyQueue) {
        // console.log(keyQueue) 输出['control', 's'] 之类的东西
        const _keyQueue = JSON.stringify(keyQueue)
        // console.log(_keyQueue) 输出字符串
        return combinationKeyList.findIndex((item) => JSON.stringify(item.keys) === _keyQueue)
    }

    function deleteKeyFromKeyQueue(code) {
        let deleteIndex = keyQueue.indexOf(code)
        keyQueue.splice(deleteIndex, 1)
    }
    // 重要：e 是事件名，不用管
    // up执行事件
    function keyUpTrigger(e) {
        //重要：combinationKeyList是自定义指令，keyQueue 是目前down的热键
        const index = indexOfCombinationKeyList(combinationKeyList, keyQueue)
        if (index > -1) {
            combinationKeyList[index].execute()
        } else {
            keyQueue = []
        }
        // console.log(keyQueue)
        dispatchForCode(e).then((code) => {
            // console.log(e)
            deleteKeyFromKeyQueue(code)
        })
    }
    function keyDownTrigger(e) {
        e.preventDefault()
        dispatchForCode(e).then((code) => {
            // console.log(code)
            if (typeof code === 'number') {
                keyQueue.push(code)
            } else {
                keyQueue.push(code.toLowerCase())
            }
        })
    }
    function mouseDownTrigger(e) {
        // console.log(e.button) //左键0，中键1，右键2
        // mouseMap[e.button] 0是left mouse 1是 wheel mouse
        keyQueue.push(mouseMap[e.button])

    }
    function mouseUpTrigger(e) {
        // console.log(e.button)
        keyUpTrigger(e)
    }

    // 可调用 destroy 方法用来销毁监听事件
    function destroy() {
        window.removeEventListener('keydown', keyDownTrigger)
        window.removeEventListener('keyup', keyUpTrigger)

        window.removeEventListener('mousedown', mouseDownTrigger)
        window.removeEventListener('mouseup', mouseUpTrigger)
    }

    window.addEventListener('keydown', keyDownTrigger, false)
    window.addEventListener('keyup', keyUpTrigger, false)
    window.addEventListener('mousedown', mouseDownTrigger, false)
    window.addEventListener('mouseup', mouseUpTrigger, false)

    return {
        destroy
    }
}
// event.key | event.keyCode收集 鼠标时间
// combinationKey.MOUSE = {
//     LEFT_MOUSE: 'leftMouse',
//     WHEEL_MOUSE: 'wheelMouse',
//     RIGHT_MOUSE: 'rightMouse',
// }
// event.key | event.keyCode收集 键盘事件
combinationKey.KEY = {
    TAB: 'tab',
    ENTER: 'enter',
    CTRL: 'control',
    SHIFT: 'shift',
    ALT: 'alt',
    ESC: 'escape',
    CAPS_LOCK: 'CapsLock',
    META: 'Meta',
    SPACE: ' ',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    BACKSPACE: 'Backspace',
    F1: 'F1',
    F2: 'F2',
    F3: 'F3',
    F4: 'F4',
    F5: 'F5',
    F6: 'F6',
    F7: 'F7',
    F8: 'F8',
    F9: 'F9',
    F10: 'F10',
    F11: 'F11',
    F12: 'F12',
    // 例如我现在想插入 Insert的定义.keyDownTrigger函数的dispatchForCode的code参数我们打印出来，就可以轻松得到我们的key和value
    // value是输出的东西，key我们在下面的combinationKey的keys中定义就可以了
    Insert: "Insert"
}

// combinationKey([
//     // {
//     //     // 要按下的键，数组的顺序是按下的顺序
//     //     keys: [combinationKey.KEY.SPACE],
//     //     // 按键触发后要执行的函数
//     //     execute: () => {
//     //         console.log('SPACE')
//     //     },
//     // },
//     // {
//     //     // key和value都是一样的所以不用定义，
//     //     keys: ['control', 's'],
//     //     execute: () => {
//     //         console.log('ctrl + s')
//     //     },
//     // },

//     // {
//     //     keys: ['shift', "leftMouse"],
//     //     execute: () => {
//     //         console.log('shift + leftMouse')
//     //     },
//     // },
//     // {
//     //     // 要按下的键，数组的顺序是按下的顺序
//     //     keys: [combinationKey.Insert],
//     //     // 按键触发后要执行的函数
//     //     execute: () => {
//     //         console.log('Insert')
//     //     },
//     // },
//     {
//         // 要按下的键，数组的顺序是按下的顺序
//         keys: ["control", "y"],
//         // 按键触发后要执行的函数
//         execute: () => {
//             console.log("sad")
           
//         }
//     },
// ])

// alert("document.querySelector('#old').innerHTML")


// window.open("./index.html")

// "action":{
// 	"default_title":"Chrome插件",
// 	"default_popup":"index.html"
// }