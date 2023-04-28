function flat(arr){
    let res = []
    for(let i in arr){
        if(Array.isArray(arr[i])){
            res = res.concat(flat(arr[i]))
        }else{
            res.push(arr[i])
        }
    }
    return res
}


let arr =[[1,5,3],2]
console.log(flat(arr))