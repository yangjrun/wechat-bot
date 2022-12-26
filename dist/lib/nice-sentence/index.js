"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNiceSentence = void 0;
const request_1 = __importDefault(require("request"));
const getNiceSentence = () => {
    return new Promise((resolve, reject) => {
        let url = 'https://api.xygeng.cn/one';
        (0, request_1.default)(url, function (error, response, body) {
            body = JSON.parse(body);
            if (body && body.code === 200) {
                resolve(`每天一句好心情：\n${body.data.content} - ${body.data.origin}`);
            }
            else {
                console.error(error);
                reject('每日一句接口请求异常');
            }
        });
    });
};
exports.getNiceSentence = getNiceSentence;
exports.default = {
    getNiceSentence
};
