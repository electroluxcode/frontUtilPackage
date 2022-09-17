/**
 * 
 * @param {*} arr 
 * @param {*} e 
 * @returns object
 * @eg 数组去重 
 * @eg var arr=   [{ id: 3, name: "ceshi1" },{ id: 1, name: "ceshi1" }, { id: 1, name: "ceshi1" }, { id: 9, name: "ceshi1" }, { id: 3, name: "ceshi1" }]
 *  unique(arr,"id")
 */
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