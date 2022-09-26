// 类似于
// 选中的文件
/**
 * @des 原理：组装formdata filename，hash，chunk
 * 并发池（await Promise.race(pool)） 成功 失败池 通过slice进行文件分隔。
 * 
        项目中是formData.append("file", file.raw);
        formData.append("uploadKey", "product_material");
 */
var file = null
// 选择文件
document.getElementById('fileInput').onchange = function ({ target: { files } }) {
    file = files[0]
}

// 开始上传
document.getElementById('uploadBtn').onclick = function () {
    if (!file) return;
    // 创建切片   
    // let size = 1024 * 1024 * 10; //10MB 切片大小
    let size = 1024 * 50; //50KB 切片大小
    let fileChunks = [];
    let index = 0 //切片序号
    // step1:这里开始切片
    for (let cur = 0; cur < file.size; cur += size) {
        fileChunks.push({
            hash: index++,
            chunk: file.slice(cur, cur + size)
        })
    }

    // 控制并发和断点续传
    const uploadFileChunks = async function (list) {
        if (list.length === 0) {
            //所有任务完成,合并切片
            await axios({
                method: 'get',
                url: '/merge',
                params: {
                    filename: file.name
                }
            });
            console.log('上传完成')
            return
        }
        let pool = []//并发池
        let max = 3 //最大并发量
        let finish = 0//完成的数量

        let failList = []//失败的列表
        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            let formData = new FormData()
            formData.append('filename', file.name)
            formData.append('hash', item.hash)
            formData.append('chunk', item.chunk)
            // 上传切片
            let task = axios({
                method: 'post',
                url: '/upload',
                data: formData,
                // onUploadProgress: function (progressEvent) {
                //     console.log('进度', progressEvent)
                // }

            })
            task.then((data) => {
                // console.log(data, "数据")
                //请求结束后将该Promise任务从并发池中移除
                let index = pool.findIndex(t => t === task)
                pool.splice(index)
            }).catch(() => {
                failList.push(item)
            }).finally(() => {
                finish++
                console.log("进度：" + i / list.length)
                //所有请求都请求完成
                if (finish === list.length) {
                    uploadFileChunks(failList)
                }
            })
            pool.push(task)
            if (pool.length === max) {
                //每当并发池跑完一个任务，就再塞入一个任务
                await Promise.race(pool)
            }
        }
    }
}
    // uploadFileChunks(fileChunks)