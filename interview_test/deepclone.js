function deepClone(obj,hash = new WeakMap()){
    if(!obj) return obj
    if(obj instanceof Date){
        return new Date(obj)
    }
    if(typeof obj !== "object"){
        return obj
    }
    // 这里的has 写成 get 了
    if(hash.has(obj)){return hash.get(obj)}
    
    let res = Array.isArray(obj)?[]:{}
    // 这里的hash.set 漏了
    hash.set(obj,res)
    for(let i in obj){
        res[i] = deepClone(obj[j],hash)
    }
    return obj
}

let a = {
    b:33,
    c:function d(){
        console.log("这是c")
    },
    e:{
        id:1
    }
}