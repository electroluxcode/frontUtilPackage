
/**
 * @des 平面转化成树状数据
 * @param {*} arr 
 * @returns 
  let data =[
    { id: 1, parentId: 0, name: "一级菜单A", rank: 1 },
    { id: 2, parentId: 1, name: "一级菜单B", rank: 1 },
    { id: 3, parentId: 1, name: "一级菜单C", rank: 1 },
    { id: 4, parentId: 1, name: "二级菜单A-A", rank: 2 },
    { id: 5, parentId: 4, name: "二级菜单A-A", rank: 2 },
    { id: 6, parentId: 5, name: "二级菜单A-A", rank: 2 },
    { id: 7, parentId: 6, name: "二级菜单A-A", rank: 2 },
    { id: 8, parentId: 6, name: "二级菜单A-A", rank: 2 }
]
 arrayToTree(data)
 */
function arrayToTree(arr){
    let result = []
    arr.forEach((value) => {
        value.children = arr.filter((res)=>{
            return res.parentId == value.id
        })
        if(value.parentId==0){
            result.push(value)
        }
    });
    return result
  
}



/**
 * 
 * @param {*} data 
 * @param {*} key 
 * @param {*} result 
 * @des 树形数据的平面化
 * @returns 
 * @eg
   


let output1 = [
    {
        "id": 1,
        "parentId": 0,
        "name": "一级菜单A",
        "rank": 1,
        "children": [
            {
                "id": 4,
                "parentId": 1,
                "name": "二级菜单A-A",
                "rank": 2,
                "children": [
                    {
                        "id": 5,
                        "parentId": 4,
                        "name": "二级菜单A-A",
                        "rank": 2,
                        "children": [
                            {
                                "id": 6,
                                "parentId": 5,
                                "name": "二级菜单A-A",
                                "rank": 2,
                                "children": [
                                   
                                    {
                                        "id": 8,
                                        "parentId": 6,
                                        "name": "二级菜单A-A",
                                        "rank": 2,
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
treeToArray(output1)

 */



function treeToArray(arr){
    let result = []
    for(let i = 0 ; i<arr.length ; i++){
        console.log()
        if(JSON.stringify(arr[i].children)=='[]'){
            result.push(arr[i])
        }else{
            result.push(arr[i])
            result = result.concat(treeToArray(arr[i].children)) 
        }
    }
    return result
}


/**
 * 
 * @param {*} data 
 * @param {*} value 
 * @param {*} originKey 
 * @des 树状的查找。如果递归想要保存值可以 传一个需要保存的参数，然后携带参数进行递归
 * let data=[{
    "id": "11",
    "name": "测试11",
    "pId": "1",
    "children": [
        {
            "id": "111",
            "name": "测试111",
            "pId": "11",
        },
        {
            "id": "112",
            "name": "测试112",
            "pId": "11",
            "children": [
                {
                    "id": "1112",
                    "name": "测试1121",
                    "pId": "112"
                }
            ]
        }
    ]
}];
 findRecursion(data, "id",'1112')
 */
function findRecursion(data, originKey, value) {
    data.forEach((item) => {
        console.log(item[originKey], value, item[originKey] == value)
        if (item[originKey] == value) {
            console.log(item)
            return item
        }
        if (item.children) {
            // console.log(item)
            return findRecursion(item.children, value, originKey)
        }
    })
}

//跟上面差不多，不过会多存一个东西
function findRecursion2(data, originKey, value, result) {
    data.forEach((item) => {
        console.log(item[originKey], value, item[originKey] == value)
        if (item[originKey] == value) {
            console.log(item)
            result.push(item)
            return result
        }
        if (item.children) {
            // console.log(item)
            return findRecursion(item.children, value, originKey, result)
        }
    })
}