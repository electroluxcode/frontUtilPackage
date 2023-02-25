/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * 
 * @param {*} text 传入文本
 * @eg 前端脱敏示例（手机号）
 * let a="430151111111";dataHandle(a)
 */
function dataHandle(text) {
  return text.replace(/^(.{3})(?:\w+)(.{3})$/, "\$1********\$2");
}

//不能够 new object 的 原因
// function deepClone(obj, hash = new WeakMap()) {
//   if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操if (obj instanceof Date) return new Date(obj);
//   if (obj instanceof RegExp) return new RegExp(obj);
//   // 可能是对象或者普通的值 如果是函数的话是不需要深拷贝
//   if (typeof obj !== "object") return obj;
//   //是对象的话就要进行深拷贝
//   if (hash.get(obj)) return hash.get(obj);
//   // let cloneObj = new Object();
//   let cloneObj = new obj.constructor()
//   //找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本
//   hash.set(obj, cloneObj);
//   for (let key in obj) {
//       //实现一个递归拷贝
//       cloneObj[key] = deepClone(obj[key], hash);
//   }
//   return cloneObj
// }

// class temp{
 
//   constructor(param){
//     this.param = param
//   }
// }
// let obj = [6,[5,6,1],{id:4}]
// obj.c = obj
// let testParam1 = new temp(obj)
// let testParam2 = deepClone(testParam1)
// testParam2.param[0] = 23
// console.log(testParam1,testParam2) 




//hasOwnProperty 的 原因
//https://blog.csdn.net/weixin_34375233/article/details/88356527



function deepClone(obj,hash=new Map()){

}