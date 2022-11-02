
// 使用示例 step1：eventBus.on('login', data => {
//     console.log(data + '用户已登录')
// })

// step2：eventBus.emit('login', "admin "
//         })

/**
 *  let test = new eventBus()
    test.on('login', data => {
     console.log(data + '用户已登录')
    })
    test.emit('login', "admin")
 */

class eventBus {
    constructor() {
        this.eventBus = {
            // 保存类型与回调的容器
            event: {
            }
        }
    }
    // 绑定事件
    on = (name, event) => {
        // 判断
        if (this.eventBus.event[name]) {
            this.eventBus.event[name].push(event);
        } else {
            // 如果 event 属性中不存在该类型事件,就往里存
            this.eventBus.event[name] = [event];
        }
    };
    // 触发事件
    emit = (name, data) => {
        // 判断
        if (this.eventBus.event[name] && this.eventBus.event[name].length > 0) {
            this.eventBus.event[name].forEach(event => {
                // 执行回调
                event(data);
            })
        }
    }

    // 事件解绑
    off = (eventName) => {
        // 若传入了 eventName
        if (this.eventBus.event.hasOwnProperty(eventName)) {
            // 只是删除对应的事件回调
            delete this.eventBus.event[eventName];
        } else {
            this.eventBus.event = {};
        }
    }
    say = ()=>{
        console.log(this.eventBus)
    }
}





// export {eventBus}