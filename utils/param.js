/**
 * 
 * @param {*} url 
 * @returns object
 * @example 直接getQueryObject就可以了
 * @example 获取get或者post里面的参数
 */
function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}


function getQueryObject() {
  let url = window.location.href;
  let tempData = url.split("?")[1]
  let tempDataT = tempData.split("&")
  let obj = {}
  tempDataT.forEach((value) => {
    const [index, val] = value.split("=")
    obj[index] = val;
  })
  return obj
  // console.log(tempDataT)
}