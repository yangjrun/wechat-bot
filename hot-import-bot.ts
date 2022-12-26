import { WechatyBuilder } from 'wechaty'
import onLogin from './handlers/on-login.js'
import onMessage from './handlers/on-message.js'
import onScan from './handlers/on-scan.js'
import onReady from './handlers/on-ready.js'
import onFriendship from './handlers/on-friendship.js'

const bot = WechatyBuilder.build(
    {
        name: 'wechat-box',
        puppetOptions: {
            uos: true  // 开启uos协议
        },
    }
)
    .on('login', onLogin)
    .on('message', onMessage)
    .on('scan', onScan)
    .on('ready', onReady)
    .on('friendship', onFriendship)
    .start()
    .catch(console.error)