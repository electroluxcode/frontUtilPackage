function getPerformance() {
    if (window.performance) {
        try {
            var t = performance.timing;
            var times = {
                result: [
                    { key: 'FP', desc: 'First Paint(首次渲染)', value: t.loadEventEnd - t.loadEventStart, "soloution": "是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么" },
                    { key: 'FCP', desc: '(白屏)First Contentful Paint(首次内容渲染)表示浏览器渲染出第一个内容的时间', value: t.responseStart - t.navigationStart, solution: "这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？" },
                    { key: 'FID', desc: '首次输入延迟 交互响应时间', value: "performance没有定义交互。100ms内", },
                    { key: 'Redirect', desc: '重定向时间', value: t.redirectEnd - t.redirectStart, solution: "拒绝重定向.比如 http://example.com/ 就不该写成 http://example.com" },
                    { key: 'DNS', desc: 'dns解析时间', value: t.domainLookupEnd - t.domainLookupStart, solution: "DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长,可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)  " },
                    { key: 'requestAll', desc: '全部加载完', value: t.responseEnd - t.requestStart, solution: "页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么" },
                    { key: 'TCP', desc: '建立连接完成握手的时间', value: t.connectEnd - t.connectStart, solution: "tcp连接" },
                ], ua: window.navigator.userAgent
            };
            console.log(times)
        } catch (e) {
            console.log('你的浏览器不支持 performance 接口');
            console.log(e)
        }
    }
}
