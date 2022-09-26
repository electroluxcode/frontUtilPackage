// 重要：基础知识
// ArrayBuffer、TypedArray、DataView是一组，主要是用来操纵二进制数据，用于处理音视频数据以及和WebGL等交互。
// Blob、File是一组，用来处理文件相关的东西。
// Base64就是一坨字符串

// 重要：类文件对象
// Blob： 对象表示一个不可变、原始数据的类文件对象。
const blob = new Blob(array, options)
// array 是一个由ArrayBuffer, ArrayBufferView, Blob, DOMString 等对象构成的数组，DOMStrings会被编码为UTF-8。
// options 是一个可选，它可能会指定如下两个属性：type/endings
// Blob url： 是一种伪协议，允许 Blob 和 File 对象用作图像、下载二进制数据链接等的 URL 源。在浏览器中，我们使用 URL.createObjectURL 方法来创建 Blob URL

// File是文件对象，可以简单理解为是Blob的子集。

/**
 * 第一个下载的方法（直接请求），别的好像都是流式接口
 * 点击a标签直接下载。这里有两种情况，如果是页面可以解析的类型，那么网站会直接打开。而不会进行下载
 * 如果要进行下载，我们需要<a href="./index.txt" download>下载txt</a>
 * 在后面加上download
 * 弊端：会有跨域问题 | 调用后台的接口也不行
 * download
 */

{/* <a href="./index.txt" >下载txt</a> */ }

// 还是window.location.href 好用
/**
 * 
 * @param {*} param 
 * @des 用来显式下载，可以避免跨域(先下载到本地，再从本地读取)
 * @eg document.getElementById('download').addEventListener('click', () => {
        download('http://localhost:3000/static/index.png')
    })
 * 
 */
async function download(param) {
    try {
        // 我们使用axios设置接口返回类型 responseType: "blob", 所以这里从后端返回的是blob。
        console.log(param,"url")
        // const res = await fetch("http://localhost:3000/static/files/t01b6ccc26385b75557.jpg")
        const res = await fetch(param, {
            method: 'POST',
            // responseType: "arraybuffer",
            // responseType: "blob",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({
            //   firstParam: 'yourValue',
            //   secondParam: 'secondValue',
            // })
        })
        //处理文件（二进制）
        const blob = await res.blob()
        //把url指向blob
        let url = URL.createObjectURL(blob)
        const alink = document.createElement('a');
        alink.href = url
        alink.download = "t01b6ccc26385b75557.jpg"
        alink.style.display = "none";
        alink.click();
        alink.remove()
        URL.revokeObjectURL(url)
    } catch (e) {
        console.error(e)
    }
}

/**
 * 
 * @param {*} param
 * @des 用来显式下载，可以下载大文件(直接下载到用户的机子上)
 *  
 */
async function downloadBig(param) {
    try {
        // 我们使用axios设置接口返回类型 responseType: "blob", 所以这里从后端返回的是blob。
        console.log(param, "url")
        // const res = await fetch("http://localhost:3000/static/files/t01b6ccc26385b75557.jpg")
        const res = await fetch(param, {
            method: 'GET',
            // responseType: "arraybuffer",
            // responseType: "blob",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({
            //   firstParam: 'yourValue',
            //   secondParam: 'secondValue',
            // })
        })
        //处理文件（二进制）
        const blob = await res.blob()
        //把url指向blob
        let url = URL.createObjectURL(blob)
        const handle = await window.showSaveFilePicker({
            suggestedName: "hello",
            types: [
            {
                    description: "jpeg file",
                    accept: {
                        "image/jpeg": [".jpeg"],
                    },
                },
                {
                    description: "text file",
                    accept: {
                        "text/plain": [".txt"],
                    },
                }, 
            ],
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();

    } catch (e) {
        console.error(e)
    }
}
  
