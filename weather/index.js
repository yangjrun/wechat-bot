import request from 'request'
import convert from 'xml-js'
import md5 from 'js-md5'
import { objToGetParamStr } from '../util/url-util.js'


// 默认天气地址
let defaultLocation = {
    lat: 23.148741,
    lon: 113.609226
}

// 高德地图配置
let amapConfig = {
    publicKey: '5a391bf8f16816db6355076dfaaa8c18',
    privateKey: '0742d1de74a22e5396c03ff38bf22f18',
    output: 'json'
}

/**
 * 根据地址获取坐标
 * @param { * } address 地址
 * @return { * } { lat: Number, lon: Number }
 */
let getAMapGeocode = (address) => {
    return new Promise((resolve, reject) => {
        let url = 'https://restapi.amap.com/v3/geocode/geo'
        let param = Object.assign({}, {
            key: amapConfig.publicKey,
            output: amapConfig.output
        }, {
            address: address
        })
        param['sig'] = md5(objToGetParamStr(param) + amapConfig.privateKey)
        url = encodeURI(url + '?' + objToGetParamStr(param))
        console.log(url)
        request(url, function (error, response, body) {
            body = JSON.parse(body)
            if (body && body['info'] === 'OK') {
                let locationArray = body['geocodes'][0]['location'].split(',')
                resolve({
                    lon: locationArray[0],
                    lat: locationArray[1]
                })
            } else {
                resolve(defaultLocation)
            }
        })
    })
}

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
                if (response.body) {
                    let result1 = convert.xml2json(response.body, { compact: true, spaces: 4 });
                    result1 = JSON.parse(result1)
                    let i = result1["tile"]["visual"]["binding"][2]
                    let n = i["_attributes"]['DisplayName']
                    let g = i["group"]["subgroup"]
                    let t = g[1]["text"]["_text"] + "℃"
                    let l = g[3]["text"]["_text"]
                    let c = g[0]["image"]['_attributes']["src"]
                    resolve(`· ${n} 实时天气情况，天空状况：${l}，温度：${t}`)
                } else {
                    reject(`数据异常，请稍后重试。`)
                }
            })
        })
    })
}

export {
    getWeatherForDay
}

