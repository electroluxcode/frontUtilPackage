/**
 * 
 * @param {*} data 
 * @param {*} key 
 * @returns object
 * @eg 用来快速排序object的数据
 * @eg object[{id:3,name:"ceshi1"},{id:1,name:"ceshi1"},{id:2,name:"ceshi1"}];console.log(quickSort(data,"id"))
 */

function quickSort(data,key){
    if(data.length<=1){return data}
    let temp = data[0]
    let left=[]
    let right =[]
    for (let i =1 ; i< data.length ; i++){
        if(temp[key]<data[i][key]){
            left=left.concat(data[i])
            
        }else{
            right=right.concat(data[i])
           
        }
    }
    
    return quickSort(left,key).concat([temp],quickSort(right,key))
}
