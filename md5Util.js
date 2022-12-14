import crypto from 'crypto'


const md5Crypto = (str) => {
    const hash = crypto.createHash('md5')
    hash.update(str)
    const md5Str = hash.digest('hex')
    return md5Str;
}

export {
    md5Crypto
}