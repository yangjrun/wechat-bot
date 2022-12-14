import request from 'request'
import convert from 'xml-js'
import md5 from 'js-md5'
import { md5Crypto } from './md5Util.js'
import { objToGetParamStr } from './urlUtil.js'


let lat = 23.148741
let lon = 113.609226
let url = `http://api.msn.com/weather/LiveTile/front?locale=zh-CN&lat=${lat}&lon=${lon}&apiKey=OkWqHMuutahBXs3dBoygqCjgXRt6CV4i5V7SRQURrT`

let amapConfig = {
    publicKey: '5a391bf8f16816db6355076dfaaa8c18',
    privateKey: '0742d1de74a22e5396c03ff38bf22f18',
    output: 'json'
}

let geocode = (address) => {
    let url = 'https://restapi.amap.com/v3/geocode/geo'
    let param = Object.assign({}, {
        key: amapConfig.publicKey,
        output: amapConfig.output
    }, {
        address: address
    })
    param['sig'] = md5(objToGetParamStr(param) + amapConfig.privateKey)
    url = url + '?' + objToGetParamStr(param)
    console.log(url)
    request(url + '?' + objToGetParamStr(param), function (error, response, body) {
        console.log('error', error)
        console.log('response', response)
        console.log('body', body)
    })
}

const getWeatherForDay = (str) => {
    return new Promise((resolve, reject) => {
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
                resolve({
                    location: n,
                    weather: l,
                    temperature: t
                })
            } else {
                reject({
                    location: '',
                    weather: '',
                    temperature: ''
                })
            }

        })
    })
}

geocode('广州市天河区')

export {
    getWeatherForDay
}

