let path =require("path")
module.exports = {
    mode:"dev",
    entry:"./src/index.js",
    output:{
        filename:"output.js",
        path:path.resolve(__dirname,"dist")
    }
}