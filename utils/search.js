/**
 *  
 * @param {*} data 
 * @param {*} name 
 * @param {*} value 
 * @returns  
 * @example var test=[{"id":1,"name":"小明"},{"id":2,"name":"小红"}];
 *      commonSearch(test,"name",2)
 * @example 对字符串进行正则模糊查询，int类会报错
 */
function  commonSearch(data, name,value) {
    let result=[];
    if (!data) {
        return;
    }
    for (var i = 0; i < data.length; i++) {
        let item = data[i];
        //模糊查询换成 JSON.stringify( value).indexOf(item[name])!=-1  item[name] == value 匹配到会是0以及以上
        console.log(item[name],value,item[name].indexOf(value))
        if ( item[name].indexOf(value)!=-1) {
            result.push(item);
            // break;
        } else if (item.children && item.children.length > 0) {
            result.push(this.recursion(item.children, name,value));
            if (result) {
                return result;
            }
        }
    }
    return result;
}




