
import { setLocalSchedule, delay } from '../util/schedule-util.js'

async function onReady() {
    try {
        let that = this
        let item = {
            name: '缬草素',
            alias: '缬草素'
        }
        let contact = item.name && (await that.Contact.find({ name: item.name })) || item.alias && (await that.Contact.find({ alias: item.alias }))  // 获取你要发送的联系人
        // setLocalSchedule(
        //     '30 * * * * *',
        //     async () => {
        //         let content = '我是定时发送' + new Date().getTime()
        //         await delay(1000)
        //         await contact.say(content)
        //     },
        //     item.name
        // )
        // contact.say('chat 开始主动推送')
    } catch (e) {
        console.log('on ready error :', e)
    }
}

export default onReady