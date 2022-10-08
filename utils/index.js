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
function dataHandle(text){
  return text.replace(/^(.{3})(?:\w+)(.{3})$/, "\$1********\$2"); 
}