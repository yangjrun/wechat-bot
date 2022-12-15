import qrTerm from 'qrcode-terminal'

async function onScan(qrcode, status) {
    qrTerm.generate(qrcode, { small: true })

    const qrcodeImageUrl = [
        'https://wechaty.js.org/qrcode/',
        encodeURIComponent(qrcode),
    ].join('')

    console.log(status, qrcodeImageUrl)
}

export default onScan