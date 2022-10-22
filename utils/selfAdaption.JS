/**
 * 
 * @param rootEle 
 * 
 */
 function adapition(rootEle) {
    let scale = "";
    let width = 1920;
    let height = 937;
    function getScale() {
        // let { width, height } = this;
        let wh = window.innerHeight / height;
        let ww = window.innerWidth / width;
        console.log(ww < wh ? ww : wh);
        return ww < wh ? ww : wh;
    }
    function setScale() {
        console.log("执行到这里了")
        if (window.innerHeight == 1080) {
            document.querySelector(".ScaleBox").style.cssText = `height:1080px ;width:1920px`;
            // document.querySelector(".ScaleBox").style.cssText = `width:1920px `;
        } else {
            document.querySelector(".ScaleBox").style.cssText = `height:937px;width:1920px `;
 
        }
        scale = getScale();
        console.log(scale)
        // if (this.$refs.ScaleBox) {
        //   this.$refs.ScaleBox.style.setProperty("--scale", this.scale);
        // }
        document.body.style.setProperty("--scale", scale);
    }
    function debounce(fn, time) {
        window.flag = null;
        return function () {
            clearTimeout(window.flag)
            window.flag = setTimeout(() => {
                fn()
            }, time)
        }
    }
    // setScale();
    window.addEventListener("resize", debounce(setScale, 100));
    // setInterval(setScale(),1000)
}
adapition()