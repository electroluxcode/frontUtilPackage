/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 * @eg parseTime("1548221490638") 会输出 '2019-01-23 13:31:30'
 * @eg parseTime("1548221490638",'{y}-{m}-{d}') 会输出 '2019-01-23'
 * @eg 用来进行时间戳的转化
 */

// var time = {day:4,mouth:6,year:1930}
 export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if ((typeof time === 'string')) {
        if ((/^[0-9]+$/.test(time))) {
          // support "1548221490638"
          time = parseInt(time)
        } else {
          // support safari
          // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
          time = time.replace(new RegExp(/-/gm), '/')
        }
      }
  
      if ((typeof time === 'number') && (time.toString().length === 10)) {
        time = time * 1000
      }
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
      const value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
      return value.toString().padStart(2, '0')
    })
    return time_str
  }
/**

 * @eg  dateStrForma('20190626', 'YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
 * @eg  dateStrForma('121220190626', '----YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
 * @eg  dateStrForma('2019年06月26日', 'YYYY年MM月DD日', 'YYYYMMDD') ==> 20190626
 * @eg  dateStrForma('20050106', 'YYYYMMDD', 'YYYY---MMDD') '2005---0106'
 * @eg  用来转化时间字符串
 */
 export function dateStrForma(str, from, to){
	//'20190626' 'YYYYMMDD' 'YYYY年MM月DD日'
	str += ''
	let Y = ''
	if(!(Y = from.indexOf('YYYY'))){
        console.log(Y = from.indexOf('YYYY'),"yyyy")
		Y = str.substr(Y, 4)
        
		to = to.replace(/YYYY|yyyy/g,Y)
	}else if(!(Y = from.indexOf('YY'))){
        console.log(Y = from.indexOf('YY'),"yy")
		Y = str.substr(Y, 2)
		to = to.replace(/YY|yy/g,Y)
	}

	let k,i
	['M','D','H','h','m','s'].forEach(s =>{
		i = from.indexOf(s+s)
		k = i ? str.substr(i, 2) : ''
		to = to.replace(s+s, k)
	})
	return to
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 * @eg  formatTime(new Date() - 60 * 60 * 24 * 1 * 1000))  两分钟前
 * @eg  标准时间转化 const d = new Date('2018-07-13 17:54:01');
 * @eg  formatTime(d, '{y}-{m}-{d} {h}:{i}')
 */
 export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}