"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wechaty_1 = require("wechaty");
const on_login_js_1 = __importDefault(require("./handlers/on-login.js"));
const on_message_js_1 = __importDefault(require("./handlers/on-message.js"));
const on_scan_js_1 = __importDefault(require("./handlers/on-scan.js"));
const on_ready_js_1 = __importDefault(require("./handlers/on-ready.js"));
const on_friendship_js_1 = __importDefault(require("./handlers/on-friendship.js"));
const bot = wechaty_1.WechatyBuilder.build({
    name: 'wechat-box',
    puppetOptions: {
        uos: true // 开启uos协议
    },
})
    .on('login', on_login_js_1.default)
    .on('message', on_message_js_1.default)
    .on('scan', on_scan_js_1.default)
    .on('ready', on_ready_js_1.default)
    .on('friendship', on_friendship_js_1.default)
    .start()
    .catch(console.error);
