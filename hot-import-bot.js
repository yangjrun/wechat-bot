import { WechatyBuilder } from 'wechaty'
import onFriend from './handlers/on-friend.js'
import onLogin from './handlers/on-login.js'
import onMessage from './handlers/on-message.js'
import onScan from './handlers/on-scan.js'
import onReady from './handlers/on-ready.js'

const bot = WechatyBuilder.build(
    {
        name: 'wechat-box',
        puppetOptions: {
            uos: true  // 开启uos协议
        },
    }
)
    .on('friend', onFriend)
    .on('login', onLogin)
    .on('message', onMessage)
    .on('scan', onScan)
    .on('ready', onReady)
    .start()
    .catch(console.error)