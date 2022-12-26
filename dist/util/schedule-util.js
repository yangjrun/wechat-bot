"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = exports.cancelAllSchedule = exports.cancelLocalSchedule = exports.setLocalSchedule = void 0;
const schedule = __importStar(require("node-schedule"));
//其他规则见 https://www.npmjs.com/package/node-schedule
// 规则参数讲解    *代表通配符
//
// *  *  *  *  *  *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │ |
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
// 每分钟的第30秒触发： '30 * * * * *'
//
// 每小时的1分30秒触发 ：'30 1 * * * *'
//
// 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
//
// 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
//
// 每周1的1点1分30秒触发 ：'30 1 1 * * 1'
function setLocalSchedule(date, callback, name) {
    if (name) {
        schedule.scheduleJob(name, { rule: date, tz: 'Asia/Shanghai' }, callback);
    }
    else {
        schedule.scheduleJob({ rule: date, tz: 'Asia/Shanghai' }, callback);
    }
}
exports.setLocalSchedule = setLocalSchedule;
// 取消任务
function cancelLocalSchedule(name) {
    schedule.cancelJob(name);
}
exports.cancelLocalSchedule = cancelLocalSchedule;
// 取消指定任务
function cancelAllSchedule(type) {
    for (let i in schedule.scheduledJobs) {
        if (i.includes(type)) {
            cancelLocalSchedule(i);
        }
    }
}
exports.cancelAllSchedule = cancelAllSchedule;
/**
 * 延时函数
 * @param {*} ms 毫秒
 */
async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.delay = delay;
exports.default = {
    setLocalSchedule,
    cancelLocalSchedule,
    cancelAllSchedule,
    delay
};
