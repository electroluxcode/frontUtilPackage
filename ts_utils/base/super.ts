type test1 = string
type test2 = number | string

let a=(param):test1 & test2 =>{
    return(param)
}

console.log(a(true))