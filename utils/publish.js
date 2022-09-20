/**
 *  @example  //订阅一个频道
 *      let pid = PubSub.subscribe('pay', (data) => {
            console.log('商家接到了订单,准备开始制作', data)
        })
 *        // 发布消息
        PubSub.publish('pay', {
            title: '汉堡',
            price: 20000,
            pos: '一年一班'
        });
 */


const PubSub = {
    // 订阅的唯一id
    id: 1,
    // 评到与回调
    callbacks: {

    }
};
// 订阅频道 
PubSub.subscribe = function(channel, callback) {
    // 创建唯一的编号
    let token = "token_" + this.id++;
    // pay token_1
    // 判断 callback属性中是否存在 pay
    if (this.callbacks[channel]) {
        this.callbacks[channel][token] = callback
    } else {
        this.callbacks[channel] = {
            [token]: callback
        }
    }
    return token;
};
// 发布消息
PubSub.publish = function(channel, data) {
    // 获取当前频道中所有的回调
    if (this.callbacks[channel]) {
        Object.values(this.callbacks[channel]).forEach(callback => {
            // 执行回调
            callback(data);
        })
    }
};
// 取消订阅
// 1. 没有传值, flag 为 undefined
// 2. 传入 token 字符串
// 3. msgName 字符串
PubSub.unsubscribe = function(flag) {
    // 如果 flag没有传递,则清空所有订阅 
    if (flag === undefined) {
        this.callbacks = {}
    } else if (typeof flag === 'string') {
        // 判断是否为 token_开头
        if (flag.indexOf('token_') === 0) {
            console.log(Object.values(this.callbacks))
                // 如果是 一个订阅id
            let callbackObj = Object.values(this.callbacks).find(obj => obj.hasOwnProperty(flag))
                // 判断
            console.log(callbackObj)
            if (callbackObj) {
                delete callbackObj[flag];
            }
        } else {
            // 表明是一个频道的名称
            delete this.callbacks[flag]
        }
    }
}