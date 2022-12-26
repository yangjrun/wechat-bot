"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDisheInfo = exports.seachDishes = exports.getDishesClassList = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const schedule_util_js_1 = require("../../util/schedule-util.js");
const dishesPath = path_1.default.join(process.cwd(), '/lib/dishes');
/**
 * 获取菜单
 * @returns
 */
const getDishesClassList = () => {
    let dishes = [];
    return new Promise((resolve, reject) => {
        fs_1.default.readdir(dishesPath, (error, files) => {
            if (error) {
                console.error('读取菜单失败', error);
                reject(error);
                return;
            }
            if (files && files.length > 0) {
                files.forEach((fileName) => {
                    if (fs_1.default.lstatSync(dishesPath + '/' + fileName).isDirectory()) {
                        dishes.push(fileName);
                    }
                });
            }
            resolve(dishes);
        });
    });
};
exports.getDishesClassList = getDishesClassList;
const dishesSeachHandle = (superiorPath, seach, disheList) => {
    let _dishesPath = dishesPath + superiorPath;
    fs_1.default.readdir(_dishesPath, (error, files) => {
        if (error) {
            console.error('读取菜单失败', error);
            return;
        }
        if (files && files.length > 0) {
            files.forEach(async (fileName) => {
                if (fs_1.default.lstatSync(_dishesPath + '//' + fileName).isDirectory()) {
                    dishesSeachHandle(superiorPath + '//' + fileName, seach, disheList);
                }
                else {
                    if (fileName.indexOf(seach) > -1 && fileName.indexOf('.md') > -1) {
                        disheList.push({
                            name: fileName,
                            path: _dishesPath + '//' + fileName
                        });
                    }
                }
            });
        }
    });
};
const seachDishes = (seach) => {
    return new Promise(async (resolve, reject) => {
        let disheList = [];
        dishesSeachHandle('', seach, disheList);
        await (0, schedule_util_js_1.delay)(500);
        resolve(disheList);
    });
};
exports.seachDishes = seachDishes;
const getDisheInfo = async (contact, seach) => {
    let disheList = [];
    dishesSeachHandle('', seach, disheList);
    await (0, schedule_util_js_1.delay)(500);
    if (disheList && disheList.length > 0) {
        let data = fs_1.default.readFileSync(disheList[0].path, 'utf-8');
        contact.say(data);
    }
    else {
        contact.say('没有找到当前菜肴。');
    }
};
exports.getDisheInfo = getDisheInfo;
exports.default = {
    getDishesClassList,
    seachDishes,
    getDisheInfo
};
