"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objToGetParamStr = void 0;
/**
 * 对象转get参数
 * @param {*} obj 数据对象
 * @returns
 */
const objToGetParamStr = (obj) => {
    let str = '';
    let _obj = Object.assign({}, obj);
    Object.keys(_obj).sort((item1, item2) => {
        return item1.charCodeAt(0) - item2.charCodeAt(0);
    }).forEach((item, index) => {
        str += item + '=' + _obj[item];
        if (index < Object.keys(_obj).length - 1) {
            str += '&';
        }
    });
    return str;
};
exports.objToGetParamStr = objToGetParamStr;
