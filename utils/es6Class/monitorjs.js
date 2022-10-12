import { ConsoleError  } from './error';

// import './utils/extends';

class MonitorJS {

    constructor() {
        this.consoleError = true; //console.error默认不处理
    }
   
    /**
     * 处理异常信息初始化
     * @param {*} options 
     * {consoleError:true}
     */
    init(options) {
        // let param = { reportUrl, extendsInfo };
        options = options || {};
        this.consoleError = options.consoleError === true;  //显式配置
        if (this.consoleError) {
            new ConsoleError(param).handleError();
            console.log("初始化方法")
        }
    }

}
// new MonitorJS().init({
//     consoleError:true
// })
export default MonitorJS;