

/**
 * @des 实现lodash 的 merage功能
 * @example
  let data = {
    "1": {
        "9": {
            "2": "ceshi"
        }
    }
   
}
let originData= { '1': { '1': { '2': "ceshi" } }}
merge(originData,data)
 */

const getRawType = (val) => {
  return Object.prototype.toString.call(val).slice(8, -1);
};
const isPlainObject = (val) => {
  return getRawType(val) === "Object";
};

const isPlainObjectOrArray = (val) => {
  return isPlainObject(val) || Array.isArray(val);
};

const merge = (object, ...sources) => {
  for (const source of sources) {
    for (const key in source) {
      if (source[key] === undefined && key in object) {
        continue;
      }
      if (isPlainObjectOrArray(source[key])) {
        if (
          isPlainObjectOrArray(object[key]) &&
          getRawType(object[key]) === getRawType(source[key])
        ) {
          if (isPlainObject(object[key])) {
            merge(object[key], source[key]);
          } else {
            object[key] = object[key].concat(source[key]);
          }
        } else {
          object[key] = source[key];
        }
      } else {
        object[key] = source[key];
      }
    }
  }
};

let data = {
  "1": {
      "9": {
          "2": "ceshi"
      }
  }
 
}
let originData= { '1': { '1': { '2': "ceshi" } }}
merge(originData,data)


/**
 * @example 
  let arr = [1, 2, 5]
  let struct = arrayToStruct(arr)
  let b = { id: "3" } //元数据
  merge(b, struct)

 * @param {*} array  [1,2,5]
 * @returns {
  {
      "1": {
          "2": {
              "5": true
          }
      }
  }

 */

function arrayToStruct(array) {
  let str = ''
  for (let i in array) {
    if (i == array.length - 1) {
      str = str + `{"${array[i]}":"ceshi" `
      let reg = /\{/g;
      let test = str.match(reg)
      // debugger
      for (let j = 0; j < test.length; j++) {
        str = str + `}`
      }
      continue
    }
    str = str  + `{"${array[i]}":`
  }
  return eval("(" + str + ")");
}
let arr = [1, 2, 5]
arrayToStruct(arr)
/**
 * @des 跟上面的arrayToStruct合起来用
 * @param {*} 
 let struct = {
    "1": {
      "2": {
        "5": true
      }
    }
  }
  let keyArray = [1, 2, 5]
  readKeyStruct(struct,keyArray)
 * @param {*} keyArray  [1, 2, 5]
 * @returns  如果有值就是key，不然就是false
 */
function readKeyStruct(struct, keyArray) {
  temp = struct
  let flag = true
  for (let i of keyArray) {
    console.log(temp)
    if (!temp[i]) {
      flag = false
      break
    }
    temp = temp[i]
    if (temp == "ceshi") {
      flag = true;
    } else {
      flag = false;
    }
  }
  if (flag) {
    return true
  } else {
    return false
  }
}
let vis = { '1': { '1': { '2': "ceshi" } },"2":{"1":{"2":"ceshi"}} }
let param = [1, 2, 1]
readKeyStruct(vis, param)


Object.assign(vis,{ '1': { '9': { '2': "ceshi" } }})


/**
 * 
 * @param {*} arr 
 * @param {*} e 
 * @returns object
 * @example 数组去重 
 * @example var arr=   [{ id: 3, name: "ceshi1" },{ id: 1, name: "ceshi1" }, { id: 1, name: "ceshi1" }, { id: 9, name: "ceshi1" }, { id: 3, name: "ceshi1" }]
 *  unique(arr,"id")
 */
function unique(arr, e) {
  let hash = {}; //定义一个hash表
  let arr1 = []; //定义一个新数组
  for (let i = 0; i < arr.length; i++) {
    if (!hash[arr[i][e]]) {
      hash[arr[i][e]] = true;
      arr1.push(arr[i]);
    }
  }
  return arr1;
}


/**
* @param {Array} arr
* @returns {Array}
*/
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}