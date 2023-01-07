


/**
 * 
 * @param {*} key 
 * @param {*} data 
 * 
 [{id:1},{id:2}] 自己维护一个数据，用来解决hook持久化的问题
 */
function save(key,data,status){
  let temp =[]
  if(status==true){
    localStorage.clear(key)
    return '清除完成'
  }
  if(localStorage.getItem(key)){
    temp = JSON.parse(localStorage.getItem(key))
    temp.push(data)
    localStorage.setItem(key,JSON.stringify(temp))
    return  JSON.parse(localStorage.getItem(key))
  }else{
    localStorage.setItem(key,JSON.stringify(data))
    return  JSON.parse(localStorage.getItem(key))
  }
  
  
}

function unique(arr,e){
  let hash = {}; //定义一个hash表
  let arr1 = []; //定义一个新数组
  for(let i=0;i<arr.length;i++){
    if(!hash[arr[i][e]]){
      hash[arr[i][e]] = true;
      arr1.push(arr[i]);
    }
  }
  return arr1;  
}

function save(key,data,status){
  let temp =[]
  if(status==true){
    localStorage.clear(key)
    return '清除完成'
  }
  if(localStorage.getItem(key)){
    temp = JSON.parse(localStorage.getItem(key))
    temp.push(data)
    // 自己添加
    unique(temp,"name")
    temp[0].filters((value,index)=>{
      return 
    })
    localStorage.setItem(key,JSON.stringify(temp))
    return  JSON.parse(localStorage.getItem(key))
  }else{
    localStorage.setItem(key,JSON.stringify(data))
    return  JSON.parse(localStorage.getItem(key))
  }
  
  
}




let data =  {id:1}
let key = "te"
save(key,data)






/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 * @example 合并数组
 * @example var b={"i2d":5} var a={"i":5} objectMerge(a,b)
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}


/**
* This is just a simple version of deep copy
* Has a lot of edge cases bug
* If you want to use a perfect deep copy, use lodash's _.cloneDeep
* @param {Object} source
* @returns {Object}
* @example 深拷贝
*/
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/** 
 * @param {Object} source
 * @returns {Object}
 * @example 给数据所有的元素初始化一个属性
 * @example 
 * let array = [{ id: 1 }, { id: 3 }, { id: 9 }]
    objectAddAttribute(array, "key1", true)
 */

export function objectAddAttribute(target, key, value) {
  console.log(target, key, value)
  for (let i = 0; i < target.length; i++) {
    target[i][key] = value
  }
  return target
}

/**
 * 
 * @param {*} o 
 * @des 性能优化里面的东西，可以冻结对象
 */

function deepFreeze(o) {
  var prop, propKey;
  Object.freeze(o);//首先冻结第一层对象
  for (propKey in o) {
    prop = o[propKey];
    if (!o.hasOwnProperty(propKey) || !(typeof prop === "object") || Object.isFrozen(prop)) {
      continue;
    }
    deepFreeze(prop);//递归
  }
}


/**
 * 
 * @param {*} o 
 * @des 将两个object里面的key转化成指定的
 */
let originObject = [
  {
    "key": 0,
    "name": "未知"
  },
  {
    "key": 1,
    "name": "0.2s"
  },
  {
    "key": 2,
    "name": "0.3s"
  },
  {
    "key": 3,
    "name": "0.5s"
  },
  {
    "key": 4,
    "name": "0.6s"
  },
  {
    "key": 5,
    "name": "0.9s"
  }
]
let fromKey = ["key", "name"]
let toKey = ["label", "value"]
function objectConvertKey(originObject, fromKey, toKey) {
  let length = fromKey.length
  let res = []
  originObject.forEach((e)=>{
    let temp = {}
    for(let i = 0 ;i<length;i++){
      temp[toKey[i]]=e[fromKey[i]]
    }
    res.push(temp)
  })
  return res
}

objectConvertKey(originObject,fromKey,toKey)