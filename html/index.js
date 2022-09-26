console.log("js里面的东西")
addEventListener("message", function (evt) {
    // evt.data
    console.log(evt.data, "子接受");
});
// postMessage("发送：子组件的数据");

