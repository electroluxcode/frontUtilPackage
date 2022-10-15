


function fenjie(){
    let url =window.location.href;
    let tempData = url.split("?")[1]
    let tempDataT=tempData.split("&")
    let obj = {}
    tempDataT.forEach((value)=>{
        const [index,val] = value.split("=")
        obj[index]=val;
    })
    return obj
    // console.log(tempDataT)
}