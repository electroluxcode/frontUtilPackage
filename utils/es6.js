
// 知识点1：es6导出 和 esm引用
// function test(){
//     console.log("sad");
// }
// const varible=1;
// // module.exports ={test,varible};
// export {test}

//另外一个文件中
// const {test, varible}= require('./es6.js');
// test()
// console.log(varible)


//知识点2：字符串变量
let a = "测试数据";
console.log(`这玩意是${a}`);
//知识点3：数据结构，这玩意太简单就不讲了

//知识点4：箭头函数和function的区别
// 4.1 首先是this的指向，箭头函数是唯一的，function不唯一（所以这玩意才能用来new function 可以作为构造函数，因为this会根据new 指向空对象 箭头函数  无法作为构造函数，因为thsi不会变动。）
// 4.2 function 有变量提升
// 4.3 function 函数存在arguments集合（所有集合）,使用剩余操作符那么可能会有
let paramA = 1;
let paramB = 1;
const b = (param, ...args) => {
    console.log("params:", param);
    console.log("args:", args);
}
b(paramA, paramB)
// let paramA= 1;
// let paramB= 1;

// function c(a){
//     console.log("形参：",a)
//     //
//     console.log("arguments：",arguments)
// }
// c(paramA,paramB)


//知识点5：class 

// 对了，关于继承 我们通过原型链可以 xxx.prototype = new parent()来进行继承。也可以利用call函数，子组件中parent.call(this)就行，就可以拿到父的值
// es5定义 prototype 是在函数之外定义的
class Parent {
    constructor(params) {
        this.name = params.name;
        this.age = params.age;
        // console.log(params,"父级")
    }
    outputParent() {
        return this;
    }
}
class ChildRen extends Parent {
    constructor(params) {
        // super关键字用于访问和调用对象父类上的函数。可以调用父类的构造函数，也可以调用父类的普通函数
        // super.say() 就是调用父类中的普通函数 say()
        super(params);//调用父类的构造函数，继承类的时候，必须要这样子做，不然会报错。super(this); 必报错
        // Must call super constructor in derived class before accessing 'this'
        this.params = params;
    }
    output() {
        return this;
    }
}
let temp = {
    test: "ddddddddddddd",
    age: "dsadsaasd"
}
let ceshi = new ChildRen(temp)  //返回一个functio
let ceshi1 = new Parent(temp)
let output = ceshi.output()  //output.test 可以输出相对应的参数
let outputParent = ceshi.outputParent()  //output.test 可以输出相对应的参数

// 知识点6：发布订阅
const event1 = {
    _listener: [],
    emit(name, data) {
        this._listener.forEach((value) => {
            if (value.name == name) {
                value.callback(data);
            }
        })
    },
    on(name, callback) {
        this._listener.push({ name, callback });
    },
    off(name) {
        this._listener = this._listener.filter((value) => {
            return !(value.name == name);
        })
    }
}

let testFunction = ((params) => {
    console.log(params)
})

event1.on("测试", testFunction)
event1.emit("测试", "23232");
event1.off("测试1");

// 知识点7:随便写了一个快排



function quickSort(param) {
    if (param.length <= 1) {
        return param
    }
    let temp = param[0];
    let left = [];
    let right = [];
    for (let i = 1; i < param.length; i++) {
        if (temp < param[i]) {
            right.push(param[i]);
        } else {
            left.push(param[i])
        }
    }
    return quickSort(left).concat(temp, quickSort(right))
}
let test = [1, 5, 89, 0]
quickSort(test)


//知识点8：手写promise 
const resolvePromise = (promise2, x, resolve, reject) => {
    // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise  Promise/A+ 2.3.1
    if (promise2 === x) { 
      return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    // Promise/A+ 2.3.3.3.3 只能调用一次
    let called;
    // 后续的条件要严格判断 保证代码能和别的库一起使用
    if ((typeof x === 'object' && x != null) || typeof x === 'function') { 
      try {
        // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）  Promise/A+ 2.3.3.1
        let then = x.then;
        if (typeof then === 'function') { 
          // 不要写成 x.then，直接 then.call 就可以了 因为 x.then 会再次取值，Object.defineProperty  Promise/A+ 2.3.3.3
          then.call(x, y => { // 根据 promise 的状态决定是成功还是失败
            if (called) return;
            called = true;
            // 递归解析的过程（因为可能 promise 中还有 promise） Promise/A+ 2.3.3.3.1
            resolvePromise(promise2, y, resolve, reject); 
          }, r => {
            // 只要失败就失败 Promise/A+ 2.3.3.3.2
            if (called) return;
            called = true;
            reject(r);
          });
        } else {
          // 如果 x.then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
          resolve(x);
        }
      } catch (e) {
        // Promise/A+ 2.3.3.2
        if (called) return;
        called = true;
        reject(e)
      }
    } else {
      // 如果 x 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.4  
      resolve(x)
    }
  }

// 三个状态：PENDING、FULFILLED、REJECTED
class Promise1 {
    constructor(executor) {
        this.status = 'PENDING';// 默认状态为 'PENDING'
        this.value = undefined;// 存放成功状态的值
        this.reason = undefined;// 存放失败状态的值

        //step0:下面这两个为了解决异步不生效问题
        this.onResolvedCallbacks = [];// 存放成功的回调 
        this.onRejectedCallbacks = []; // 存放失败的回调 

        // step1:定义resolve和reject方法（初始化中）
        // 给函数变量赋值就可以了
        let resolve = (value) => {
            // 状态为 'PENDING' 时才可以更新状态，防止 executor 中调用了两次 resolve/reject 方法
            console.log("resolve里面的resolve：" + this.status + "   value的值：" + value)
            if (this.status === 'PENDING') {
                this.status = 'FULFILLED';
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        let reject = (reason) => {
            // 状态为 'PENDING' 时才可以更新状态，防止 executor 中调用了两次 resolve/reject 方法
            if (this.status === 'PENDING') {
                this.status = 'REJECTED';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            // step2：调用promise，立即执行两个形参（初始化中）
            // 这里的executor一般来说实际上就是 es6 的箭头函数()，这玩意也是一个函数，传参传的就是函数
            // 但是函数里面的形参是在promise对象里面定义的，这点还是挺罕见的。这就代表 resolve, reject我们只用赋值就可以了
            // 注意，如果这里是异步，在我们new resolve方法的时候，异步方法就开始执行，我们如果隔久一点调用then，是已经执行完的状态。
            // 因此 这里是一个reason的赋值，和执行。
            // 只有resolve进来后才能调用这个方法，executor(resolve('成功222222222222222'), reject) ;
            executor(resolve, reject)
        } catch (error) {
            // 发生异常时执行失败逻辑
            reject(error)
        }
    }

    // step3：then也是传入两个方法就可以了，一个是成功的箭头函数 一个是错误的箭头函数 
    then(onFulfilled, onRejected) {
        //重要：同步这里会直接执行，但是异步不会
        // if (this.status === 'FULFILLED') {
        //     onFulfilled(this.value);
        //     
        // }
        // if (this.status === 'REJECTED') {
        //     onRejected(this.reason)
        // }
        // // 解决then里面的值拿不到
        // if (this.status === 'PENDING') {
        //     // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来进集合里面。
        //     //因为是在之后异步执行，然后集合里会早就有这些元素
        //     // 等待状态确定后，再依次将对应的函数执行
        //     this.onResolvedCallbacks.push(() => {
        //         onFulfilled(this.value)
        //     });
        //     this.onRejectedCallbacks.push(() => {
        //         onRejected(this.reason);
        //     })
        // }
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === "FULFILLED") {
              //Promise/A+ 2.2.2
              //Promise/A+ 2.2.4 --- setTimeout
              setTimeout(() => {
                try {
                  //Promise/A+ 2.2.7.1
                  let x = onFulfilled(this.value);
                  // x可能是一个proimise
                  resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                  //Promise/A+ 2.2.7.2
                  reject(e)
                }
              }, 0);
            }
      
            if (this.status === "REJECTED") {
              //Promise/A+ 2.2.3
              setTimeout(() => {
                try {
                  let x = onRejected(this.reason);
                  resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                  reject(e)
                }
              }, 0);
            }
      
            if (this.status === "PENDING") {
              this.onResolvedCallbacks.push(() => {
                setTimeout(() => {
                  try {
                    let x = onFulfilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                  } catch (e) {
                    reject(e)
                  }
                }, 0);
              });
      
              this.onRejectedCallbacks.push(()=> {
                setTimeout(() => {
                  try {
                    let x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject)
                  } catch (e) {
                    reject(e)
                  }
                }, 0);
              });
            }
          });
      
          return promise2;
        
    }
}

//resolve在这里算是代理者模式和一种另类的订阅模式
// executor是一个方法（构造器里面的方法，理解到这一点的我真是吐了），通过resolve的参数是包在同步还是异步来进行调用
const promise = new Promise1((resolve, reject) => {
    setTimeout(() => {
        //只要new这里就会执行
        resolve('成功222222222222222');
    }, 2000);
})
promise.then((data) => {
    //如果不用订阅者那一套，连着写不能输出
    console.log("一次调用："+data)
    return('success'+data)
}
).then((res)=>{
    console.log("二次调用："+res)
})


//总结：难点主要有两个  第一个是异步（这个用发布者订阅者模式可以做到）
// 第二个是then 值穿透 和 链式调用（这个主要用递归）

class ab {
    constructor(executor) {
        console.log(executor)
        let resolve = (value) => {
            console.log(value)
        }

        executor(resolve)
    }

}

let abController = new ab((resolve) => {
    setTimeout(() => {
        resolve("测试23232323");
    }, 2000)
});





