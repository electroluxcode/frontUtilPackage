
// 使用示例 step1：eventBus.on('login', data => {
//     console.log(data + '用户已登录')
// })

// step2：eventBus.emit('login', "admin "
//         })


const eventBus = {
    // 保存类型与回调的容器
    callbacks: {

    }
};
// 绑定事件
eventBus.on = function(type, callback) {
    // 判断
    if (this.callbacks[type]) {
        this.callbacks[type].push(callback);
    } else {
        // 如果 callbacks 属性中不存在该类型事件,就往里存
        this.callbacks[type] = [callback];
    }
};
// 触发事件
eventBus.emit = function(type, data) {
    // 判断
    if (this.callbacks[type] && this.callbacks[type].length > 0) {
        this.callbacks[type].forEach(callback => {
            // 执行回调
            callback(data);
        })
    }
}

// 事件解绑
eventBus.off = function(eventName) {
    // 若传入了 eventName
    if (this.callbacks.hasOwnProperty(eventName)) {
        // 只是删除对应的事件回调
        delete this.callbacks[eventName];
    } else {
        this.callbacks = {};
    }
}

// export {eventBus}