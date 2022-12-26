"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../lib/weather/index.js");
const index_js_2 = require("../lib/nice-sentence/index.js");
const index_js_3 = require("../lib/dishes/index.js");
async function onMessage(message) {
    /**
     * We can get the Wechaty bot instance from this:
     *   `const wechaty = this`
     * Or use `this` directly:
     *   `console.info(this.userSelf())`
     */
    console.log(`Message: ${message}`);
    const contact = message.talker();
    const content = message.text();
    if (message.self()) {
        return;
    }
    console.log(`contact: ${contact} content: ${content}`);
    if (content === 'ding') {
        await contact.say('dong');
    }
    else if (content.indexOf('天气') > -1) {
        let _content = content;
        _content = _content.toString().replace(/\s*/g, "");
        _content = _content.toString().replace('天气', '');
        contact.say(await (0, index_js_1.getWeatherForDay)(_content.toString()));
    }
    else if (content.indexOf('每日一句') > -1) {
        contact.say(await (0, index_js_2.getNiceSentence)());
    }
    else if (content.indexOf('找菜') > -1) {
        let _content = content;
        _content = _content.toString().replace(/\s*/g, "");
        _content = _content.toString().replace('找菜', '');
        (0, index_js_3.getDisheInfo)(contact, _content);
    }
}
exports.default = onMessage;
