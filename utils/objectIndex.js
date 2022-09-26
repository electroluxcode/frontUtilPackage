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

function deepFreeze(o){
  var prop,propKey;
  Object.freeze(o);//首先冻结第一层对象
  for(propKey in o){
      prop = o[propKey];
      if(!o.hasOwnProperty(propKey) || !(typeof prop === "object") || Object.isFrozen(prop)){
          continue;
      }
      deepFreeze(prop);//递归
  }
}