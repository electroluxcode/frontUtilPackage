// for循环，如果子元素还是数组，则递归调用该方法
function flatten(arr) {
    var rets = [];
    for(var i = 0; i < arr.length; i ++) {
        if (Array.isArray(arr[i])) {
            rets = rets.concat(flatten(arr[i]));
        } else {
            rets.push(arr[i]);
        }
    }
    return rets;
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
