import crypto from 'crypto'
const a = {
    key: '123',
    address: '234',
    output: '234'
}

function md5Crypto(str) {
    const hash = crypto.createHash('md5')
    hash.update(str)
    const md5Str = hash.digest('hex')
    return md5Str;
}

let newA = {}
let str = ''
Object.keys(a).sort().forEach((item, index) => {
    str += item + '=' + a[item]
    if (index < Object.keys(a).length - 1) {
        str += '&'
    }
})

str += '0742d1de74a22e5396c03ff38bf22f18'

console.log(str)
console.log('md5Crypto(str)', md5Crypto(str))