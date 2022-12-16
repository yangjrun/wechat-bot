import request from 'request'
import convert from 'xml-js'
import { getAMapGeocode } from '../../util/amap-util.js'

/**
 * 获取当天天气
 * @param {*} address 地址
 * @returns { * } {
                        location: '',
                        weather: '',
                        temperature: ''
                    }
 */
const getWeatherForDay = (address) => {
    return new Promise((resolve, reject) => {
        getAMapGeocode(address).then((response) => {
            let lon = response.lon
            let lat = response.lat
            let url = `http://api.msn.com/weather/LiveTile/front?locale=zh-CN&lat=${lat}&lon=${lon}&apiKey=OkWqHMuutahBXs3dBoygqCjgXRt6CV4i5V7SRQURrT`
            request(url, function (error, response, body) {
                if (response && response.body) {
                    let result1 = convert.xml2json(response.body, { compact: true, spaces: 4 });
                    result1 = JSON.parse(result1)
                    let i = result1["tile"]["visual"]["binding"][2]
                    let n = i["_attributes"]['DisplayName']
                    let g = i["group"]["subgroup"]
                    let t = g[1]["text"]["_text"] + "°"
                    let l = g[3]["text"]["_text"]
                    let c = g[0]["image"]['_attributes']["src"]


                    let lastWeekGroupBeDay = result1["tile"]["visual"]["binding"][3]["group"][1]
                    let lastWeekGroupBeTemperature = result1["tile"]["visual"]["binding"][3]["group"][2]
                    let lastWeekTip = '未来七天内温度情况: \n'
                    if (lastWeekGroupBeDay['subgroup']) {
                        lastWeekGroupBeDay['subgroup'].forEach((item, index) => {
                            lastWeekTip += item['text']['_text'] + `：最高气温：${lastWeekGroupBeTemperature['subgroup'][index]['text'][0]['_text']}，最低气温：${lastWeekGroupBeTemperature['subgroup'][index]['text'][1]['_text']}。\n`
                        })
                    }
                    resolve(`· ${address} 实时天气情况，天空状况：${l}，温度：${t}，\n ${lastWeekTip} `)
                } else {
                    resolve(`数据异常，请稍后重试。`)
                }
            })
        })
    })
}

export {
    getWeatherForDay
}

