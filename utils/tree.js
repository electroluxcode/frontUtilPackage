/**
 * 
 * @param {*} source 
 * @param {*} id 
 * @param {*} parentId 
 * @param {*} children 
 * @des flat形状的转化成树状的
 * @returns 
 * source: [{ id: 1, parentId: 0, name: "一级菜单A", rank: 1 },
            { id: 2, parentId: 0, name: "一级菜单B", rank: 1 },
            { id: 3, parentId: 0, name: "一级菜单C", rank: 1 },
            { id: 4, parentId: 1, name: "二级菜单A-A", rank: 2 }]
     this.source = this.treeData(this.source, 'id', 'parentId', 'children')
 */
function treeData(source, id, parentId, children) {
    //深复制
    let cloneData = JSON.parse(JSON.stringify(source))
    //所有项目添加children
    let output = []
    cloneData.forEach((father) => {
        let temp = []
        //在这里找parentId，先组装temp 接下来组装father。
        // 这个循环中 father[id] 和 children[id] 始终相等 ,一轮循环后.father是每一个二级菜单。父带一个children
        cloneData.forEach((child) => {
            //每个只执行一次
            if (father[id] == child[parentId]) {
                temp.push(child)
                //淦，利用 浅复制来进行嵌套赋值
                // temp.length > 0 ? father[children] = JSON.parse(JSON.stringify(temp)) : '11'
                temp.length > 0 ? father[children] = temp : '11'
            }
            // return temp
        });
        //最后组装一下
        if (father[parentId] == 0) {
            output.push(father)
        }
    })

    return output
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