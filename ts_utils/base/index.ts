
/**
 * 
 * @param time 
 * @des 防抖
 * @ex ： 下面的节流也是一样的使用
class cb {
    @debounce(1000) 
    onClickTest() {
        console.log("dsa")
    }
}
let paramDebounce = new cb();
paramDebounce.onClickTest()
setTimeout(() => {
    paramDebounce.onClickTest()
}, 1500); 
 */
function debounce(time: number = 0.3) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let fn = descriptor.value;
        let flag: any = null;
        descriptor.value = function () {
            clearTimeout(flag)
            flag = setTimeout(() => {
                fn()
            }, time)
        }
        return descriptor
    }
}

/**
 * 
 * @param time 
 * @returns  节流
 * @ex 使用在class 中 @thorttle(500) 这样就可以了
 */
function thorttle(time: number = 100) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let fn = descriptor.value;
        let flag: any = null;
        descriptor.value = function () {
            if (!flag) {
                flag = true;
                fn();
                setTimeout(() => {
                    flag = false;
                }, time)
            }
        }
        return descriptor
    }
}





/**
 * 
 * @param target 
 * @param key 
 * @param descriptor 
 * @des 指定个数的参数 
 */
function curry(target: any, key: string | symbol, descriptor: PropertyDescriptor) {
    //这个origin可以拿到下面装饰方法的数据
    const origin = descriptor.value;
    descriptor.value = function (...args: any) {
        //这一段是覆盖原来的方法
        // console.log("参数重新写一下",origin.arguments.length)
        // 执行原来的方法，可以考虑在这里加上一个 xx.call方法
        // console.log(origin.call(this,...args))
        return origin.bind(this, ...args)
    };
}

class cb {
    @curry
    add(a: number, b: number = 0, c: number = 0) {
        return (a + b + c)
    }
}
let temp: any = new cb().add(1)
// console.log(temp(3,6))







/**
 * 
 * @param target 
 * @param key 
 * @param descriptor 
 * @des 不指定个数的参数的curry化 
 * @ex 
   很不优雅的封装，但是勉强实现了装饰器的curry化
   //@ts-ignore
    let tempMult:any = new caseMult().add()([4])([6])([1,4])
    console.log(tempMult()) //输出

 */
function curryMult(target: any, key: string | symbol, descriptor: PropertyDescriptor) {
    const origin = descriptor.value;
    descriptor.value = function a(...args: any) {
        //这一段是覆盖原来的方法 并且避免一开始
        return (newArray: any) => {
            if (newArray != undefined) {
                origin(args.concat(newArray))
            } else {

            }
            return a(...args.concat(newArray))
        }
    };
}
class caseMult {
    //@ts-ignore  后必须有这玩意（@ts-ignore）
    @curryMult
    add(arg: any) {

        function flatten(arr) {
            let rets = [];

            for (let i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])) {
                    rets = rets.concat(flatten(arr[i]));
                } else {
                    rets.push(arr[i]);
                }
            }
            return rets;
        }
        arg = flatten(arg)
        let temp = 0
        for (let i: number = 0; i < arg.length; i++) {
            temp = temp + arg[i]
        }
        console.log(temp)
        return (temp)
    }
}
