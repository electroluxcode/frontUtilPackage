let temp =[{
    id:1,
    name:"小明",
    children:[{
        id:2,
        name:"小红",
        children:[{
            id:4,
            name:"小白",
            children:{}
        }]
    }]
}]

function treeToArray(object){
    let res = [ ]
    //  这里不能用 let in 不然 [ ] 和 {} 会不一样
    for(let i = 0 ;i<object.length;i++){
  

        if(JSON.stringify(object[i]["children"])!=="{}"){
            // 先push
            res.push(object[i])
            res = res.concat(treeToArray(object[i]["children"]))
        }else{
            // 这里忘了
            res.push(object[i])
        }
    }
    return res
}
console.log(treeToArray(temp))






// 这题能够完美的做出来呢
let arr= [{id:1,name:"小红",parent:0},{id:2,name:"小华",parent:1},{id:3,name:"小明",parent:2} ]

function arrayToTree(arr){
    let res = []
    arr.forEach(element => {
        element.children = arr.filter((fliterItem)=>{
        return fliterItem.parent == element.id
       })
       if(element.parent == 0){
        res.push(element)
       }
    });
    return res
}

console.log(arrayToTree(arr))
// function arrayToTree(){
//     r
// }

