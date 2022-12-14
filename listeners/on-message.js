
import { getWeatherForDay } from '../weather/index.js'

async function onMessage(message) {
    /**
     * We can get the Wechaty bot instance from this:
     *   `const wechaty = this`
     * Or use `this` directly:
     *   `console.info(this.userSelf())`
     */
    console.log(`Message: ${message}`)
    const contact = message.talker();
    const content = message.text();
    if (message.self()) {
        return;
    }
    console.log(`contact: ${contact} content: ${content}`);
    if (content === 'ding') {
        await contact.say('dong');
    } else if (content.indexOf('天气') > -1) {
        let _content = content
        _content = _content.toString().replace(/\s*/g, "");
        _content = _content.toString().replace('天气', '')
        getWeatherForDay(_content.toString()).then((response) => {
            contact.say(response);
        })
    }
}

export {
    onMessage
}