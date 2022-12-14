import { WechatyBuilder } from 'wechaty'
import { onFriend } from './listeners/on-friend.js'
import { onLogin } from './listeners/on-login.js'
import { onMessage } from './listeners/on-message.js'
import { onScan } from './listeners/on-scan.js'

const bot = WechatyBuilder.build()
    .on('friend', onFriend)
    .on('login', onLogin)
    .on('message', onMessage)
    .on('scan', onScan)
    .start()
    .catch(console.error)