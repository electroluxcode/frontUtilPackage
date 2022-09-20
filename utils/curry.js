


/**
 * 
 * @param {*} fn 
 * @des 固定参数
 * @des 初始化函数的时候，我们直接传函数进来，然后用初始化的函数传形参进来
 * @des 之后在参数足够的时候会直接返回值-形参有数量限制的情况-知识点：2次闭包。第一次闭包用来接受函数，第二次闭包用来接收剩下的参数并调用第一个闭包用concat连接
 * @example const sum = (x, y) => x + y; const cSum = curry(sum);  const cSum1 = cSum(1); cSum1(2);  // => 3 cSum(1)(2, 6, 40) 
 */

const curry = (fn) => {
    return function recursive(...arguments) {
        // 满足形参数量就返回,即使超过了数，由于形参就那么多，只会取那几个值的
        if (arguments.length >= fn.length) {
            return fn(...arguments);
        }
        // ...arguments代表的是第一个整体，
        // 返回一个函数,用这个函数接受后面传递的新参数
        return (...newArgs) => {
            // 递归调用recursive函数,并返回
            console.log(...arguments, "...arguments", ...newArgs, "...newArgs", newArgs)
            return recursive(...arguments.concat(newArgs));
        };
    };
};


/**
 * 
 * @param {*} fn 
 * @des 不固定参数（object下面有示例）
 * @return 返回一个结果。我们用window.arr对他做持久化
 * @example  见下面
 */

const curryObject = (fn) => {
    window.arr = []
    return function recursive(arguments) {
        // 返回一个函数,用这个函数接受后面传递的新参数
        return (newArgs) => {
            // window.arr=fn(...arguments.concat(newArgs))  不这样做object要糟糕
            let output = arguments.concat(newArgs)
            console.log(output,"output")
            window.arr=fn(output)
            // return recursive(...arguments.concat(newArgs));
            return recursive(arguments.concat(newArgs));
        };
    };
};
// function quickSort(data) {

//     if (data.length <= 1) {
//         // console.log(data[0].length, data);
//         return data
//     }
//     let temp = data[0]
//     let left = []
//     let right = []

//     for (let i = 1; i < data.length; i++) {
//         // console.log(data[i]["id"],temp[0]["id"])
//         if (temp["id"] < data[i]["id"]) {
//             left = left.concat(data[i])
//         } else {
//             right = right.concat(data[i])
//         }
//     }
//     return quickSort(left).concat([temp], quickSort(right))
// }

// const cSum = curryObject(quickSort);
// let test = cSum([{ id: 3, name: "ceshi1" },{ id: 9, name: "ceshi1" }])([{ id: 1, name: "ceshi1" }])([{ id: 8, name: "ceshi1" }])([{ id: 58, name: "ceshi1" }])([{ id: 7, name: "ceshi1" }])([{ id: -1, name: "ceshi1" }]);
// console.log((window.arr))




/**
 * 
 * @param {*} fn 
 * @des 不固定参数（array格式）
 * @return 返回一个结果。我们用window.arr对他做持久化
 * @example const sum = (...args) => {return Math.max(...args)}; const cSum = curryArray(sum);  let test=cSum(1)(2, 6, 40)(50);console.log(window.arr)
 */

 const curryArray = (fn) => {
    window.arr = []
    return function recursive(...arguments) {
        // 返回一个函数,用这个函数接受后面传递的新参数
        return (...newArgs) => {
            window.arr=fn(...arguments.concat(newArgs))
            // return recursive(...arguments.concat(newArgs));
            return recursive(...arguments.concat(newArgs));
        };
    };
};
