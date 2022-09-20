/**
 * 
 * @example  h5文字转语音
 * @example : speech("有效")
 */

 function speech(txt){
    var synth = null;
    var msg = null;
    synth = window.speechSynthesis;
    msg = new SpeechSynthesisUtterance();
    msg.text = txt;
    msg.lang = "zh-CN";
    synth.speak(msg);
    if(window.speechSynthesis.speaking){
      console.log("音效有效");
     } else {
     console.log("音效失效");
     }
 }
 