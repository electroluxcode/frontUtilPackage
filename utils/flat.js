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
   let data = [{
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
let result = []
const res1 = treeToFlat(data, ["name", "id","pId"], result)
console.log('4. 树形数据扁平化', res1)
 */
function treeToFlat(data, key, result) {
    data.forEach(item => {
        let obj = {}
        for (i of key) {
            obj[i] = item[i]
        }
        result.push(obj)
        if (item.children?.length) {
            treeToFlat(item.children, key, result)
        }
    })
    return result
}
