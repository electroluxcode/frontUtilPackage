/**
 * 
 * @param {*} data 
 * @param {*} key 
 * @returns object
 * @example 用来快速排序object的数据
 * @example object [{id:3,name:"ceshi1"},{id:1,name:"ceshi1"},{id:2,name:"ceshi1"}];console.log(quickSort(data,"id"))
 */

function quickSort(data, key) {
    if (data.length <= 1) { return data }
    let temp = data[0]
    let left = []
    let right = []
    for (let i = 1; i < data.length; i++) {
        if (temp[key] < data[i][key]) {
            left = left.concat(data[i])
        } else {
            right = right.concat(data[i])
        }
    }
    return quickSort(left, key).concat([temp], quickSort(right, key))
}
/**
 * 
 * @param {*} data :array  
   let temp = [1,5,2,5,6,9]
   quickSort(temp)
 */
function quickSort(data){
    if(data.length<=1){
        return data
    }
    let left = []
    let right = []
    let temp = data[0]
    for(let i=1;i<data.length;i++){
        if(data[i]>=temp){
            right.push(data[i])
        }else{
            left.push(data[i])
        }
    }
    return quickSort(left).concat([temp],quickSort(right))
}


















