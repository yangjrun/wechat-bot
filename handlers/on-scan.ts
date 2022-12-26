import qrTerm from 'qrcode-terminal'
import { types } from 'wechaty'


async function onScan(qrcode: string, status: types.ScanStatus) {
    qrTerm.generate(qrcode, { small: true })

    const qrcodeImageUrl = [
        'https://wechaty.js.org/qrcode/',
        encodeURIComponent(qrcode),
    ].join('')

    console.log(status, qrcodeImageUrl)
}

export default onScan