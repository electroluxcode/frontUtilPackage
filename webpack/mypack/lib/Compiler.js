// babylon
// @babel/traverse
// @babel/types
// @babel/generator

let babylon = require("babylon")
let traverse = require("@babel/traverse").default
let generator = require("@babel/generator").default
let types = require("@babel/types")

let ejs = require("ejs")

let path = require("path")
let fs = require("fs")



class Compiler {
    // config-webpack.config.js
    constructor(config) {
        this.config = config;
        this.entry = config.entry
        // 当前目录
        this.root = process.cwd()
        // 存储入口路径
        this.entryId;
        // 保存所有模块依赖----------------------忘了初始化
        this.modules={}
        // plugin ,很牛皮 let {SyncHook} = require("tapable")
        
        
    }

    // 编译方法
    run() {
        // 运行
        // this.hooks.entryOption.call()
        
        this.buildModule(path.resolve(this.root, this.entry), true)
        // this.hooks.run.call()
        this.emitFile()
        // this.hooks.done.call()
    }

    // 从root 节点 到所有依赖模块
    /**
     * 
     * @param {*} modulePath 入口路径 - modulePath D:\Electrolux_person\front-util-package\webpack\mypack\bin\my_pack.js
     * @param {*} isEntry 是否初始值
     */
    buildModule(modulePath, isEntry) {
        //  console.log(modulePath,isEntry)
        // 读取源文件
        let source = this.getSource(modulePath)
        // step1 ： 获得相对路径
        let moduleName = "./"+path.relative(this.root, modulePath)
        // src\index,js
        // console.log(moduleName)
        if (isEntry) {
            this.entryId = moduleName
        }
        //  step2 ： 递归读取代码 和 读取子路径
        // 是是否有依赖
        let { sourceCode, depends } = this.parse(source, path.dirname(moduleName))
        // console.log(moduleName, sourceCode,depends)
        // 保存解析后的代码 就是打包之后的代码

        this.modules[moduleName] = sourceCode 
        // console.log("modules:",this.modules)
        depends.forEach((value) => {
            this.buildModule(path.join(this.root,value),false)
        })
    }

    /**
     * 
     */
    getSource(param) {
        return fs.readFileSync(param, "utf8")

        let rules =this.config.modules.rules;
        let content =fs.readFileSync(moduleName,"utf8")
        for(let i = 0;i<rules.length;i++){
            let rule =rules[i]
            if(rules.test.test(modulePath)){
                let loader = require(最后一个--)
            }
        }
    }

    /**
     * 
     * @param {*} source 文件内容
     * @param {*} parentPath 文件目录
     * @des 关键是用babylon 解析 ast 然后发现require语句中
     identifier是 CallExpression 的 callee 的 name 是require
     然后 补全 代码 + require 变成 一个funciton
     */
    parse(source, parentPath) {
        const code = "const n = 1"
        // 解析ast
        // const ast = babylon.parse(code)
        const ast = babylon.parse(source)
        // 子模块依赖
        let depends = []
        traverse(ast, {

            // enter(path) {
            //     if (path.isIdentifier({ "name": "n" })) {
            //         // 解析出来的code
  
            //         // 修改变量
            //         path.node.name ="ooo"
            //     }
            // };
            CallExpression(p){
                let node =p.node
                // -----------------------------------------忘了 判断
                if(node.callee.name === "require"){
                    node.callee.name = "__webpack_require__"
                    // 这里是argument就是ast 里面直接定义好的，直接用就可以了
                    // 例如 require("xxx")这里的值就是 xxx
                    let moduleName = node.arguments[0].value
                    // console.log(moduleName)
                    // 假如是require(xx.js) 就不动他，不然就补上js后缀.括号是必须要加的
                    moduleName =moduleName+(path.extname(moduleName) ? "" :".js")
                    //./src/xx.js
                    moduleName = "./"+path.join(parentPath,moduleName) 
                    // 添加子模块依赖进来
                    depends.push(moduleName)
                    // 修改后
                    node.arguments = [types.stringLiteral(moduleName)]
                }
                
                
            }
        })
        // let sourceCode = generator(ast).code
        // source
        let sourceCode = generator(ast).code
        return {sourceCode,depends}
    }
    // 打包文件
    emitFile(){
        this.modules = {
            id:2,
            id1:3
        }
            
        let main = path.join(this.config.output.path,this.config.output.filename)
        let templeStr = this.getSource(path.join(__dirname,"bundle.ejs"))
        let result = ejs.render(templeStr,{entryId:this.entryId,modules:this.modules})
        this.assets = {}
        this.assets[main] = result //文件名和内容都有了
        fs.writeFileSync(main,this.assets[main])
    }
}

module.exports = Compiler