/**
 * @des 字符串转化   
 * @param {*} s 
 * @returns 
 analy("ssssrrr")
{s: 4, r: 3}
 */
function analy(s){
    let hash = {}
    let temp = s.split("")
    temp.forEach((value)=>{
        if(hash[value]){
            hash[value] = hash[value]+1
        }else{
            hash[value] = 1
        }
    })
    return hash
}