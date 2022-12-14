import { WechatyBuilder } from 'wechaty'
import { getWeatherForDay } from './weather.js'

let bot = ''
async function main() {
  bot = WechatyBuilder.build()
  bot
    .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`))
    .on('login', user => console.log(`User ${user} logged in`))
    .on('message', async message => {
      console.log(`Message: ${message}`)
      const contact = message.talker();
      const content = message.text();
      if (message.self()) {
        return;
      }
      console.log(`contact: ${contact} content: ${content}`);
      if (content === 'ding') {
        await contact.say('dong');
      } else if (content === '天气') {
        getWeatherForDay().then((response) => {
          console.log('response', response)
          contact.say(JSON.stringify(response));
        })
      }
    })
  await bot.start()
}

main()
  .catch(console.error)