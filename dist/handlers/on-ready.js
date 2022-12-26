"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schedule_util_js_1 = require("../util/schedule-util.js");
const index_js_1 = require("../lib/weather/index.js");
async function onReady() {
    try {
        let that = this;
        let item = {
            name: '缬草素',
            alias: '缬草素'
        };
        let contact = item.name && (await that.Contact.find({ name: item.name })) || item.alias && (await that.Contact.find({ alias: item.alias })); // 获取你要发送的联系人
        // getNiceSentence().then(async (response) => {
        //     await contact.say(response)
        // })
        (0, index_js_1.getWeatherForDay)('增城1号智谷').then(async (response) => {
            await contact.say(response);
        });
        (0, schedule_util_js_1.setLocalSchedule)('30 1 1 * * *', async () => {
            (0, index_js_1.getWeatherForDay)('增城1号智谷').then(async (response) => {
                await contact.say(response);
            });
        }, item.name);
    }
    catch (e) {
        console.log('on ready error :', e);
    }
}
exports.default = onReady;
