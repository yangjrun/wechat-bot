
import { setLocalSchedule, delay } from '../util/schedule-util.js'
import { getWeatherForDay } from '../lib/weather/index.js'
import { getNiceSentence } from '../lib/nice-sentence/index.js'

async function onReady(this: any) {
    try {
        let that = this
        let item = {
            name: '缬草素',
            alias: '缬草素'
        }
        let contact = item.name && (await that.Contact.find({ name: item.name })) || item.alias && (await that.Contact.find({ alias: item.alias }))  // 获取你要发送的联系人

        // getNiceSentence().then(async (response) => {
        //     await contact.say(response)
        // })
        getWeatherForDay('增城1号智谷').then(async (response) => {
            await contact.say(response)
        })

        setLocalSchedule(
            '30 1 1 * * *',
            async () => {
                getWeatherForDay('增城1号智谷').then(async (response) => {
                    await contact.say(response)
                })

            },
            item.name
        )
    } catch (e) {
        console.log('on ready error :', e)
    }
}

export default onReady