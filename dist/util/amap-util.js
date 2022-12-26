"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAMapGeocode = void 0;
const request_1 = __importDefault(require("request"));
const js_md5_1 = __importDefault(require("js-md5"));
const url_util_js_1 = require("./url-util.js");
// 默认天气地址
let defaultLocation = {
    lat: 23.148741,
    lon: 113.609226
};
// 高德地图配置
let amapConfig = {
    publicKey: process.env.amap_public_key,
    privateKey: process.env.amap_private_key,
    output: 'json'
};
/**
 * 根据地址获取坐标
 * @param { * } address 地址
 * @return { * } { lat: Number, lon: Number }
 */
let getAMapGeocode = (address) => {
    return new Promise((resolve, reject) => {
        let url = 'https://restapi.amap.com/v3/geocode/geo';
        let param = Object.assign({}, {
            key: amapConfig.publicKey,
            output: amapConfig.output,
        }, {
            address: address
        });
        param['sig'] = (0, js_md5_1.default)((0, url_util_js_1.objToGetParamStr)(param) + amapConfig.privateKey);
        url = encodeURI(url + '?' + (0, url_util_js_1.objToGetParamStr)(param));
        (0, request_1.default)(url, function (error, response, body) {
            body = JSON.parse(body);
            if (body && body['info'] === 'OK') {
                let locationArray = body['geocodes'][0]['location'].split(',');
                resolve({
                    lon: locationArray[0],
                    lat: locationArray[1]
                });
            }
            else {
                resolve(defaultLocation);
            }
        });
    });
};
exports.getAMapGeocode = getAMapGeocode;
exports.default = {
    getAMapGeocode
};
