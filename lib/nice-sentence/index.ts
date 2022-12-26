import request from 'request'

const getNiceSentence = () => {
    return new Promise<string>((resolve, reject) => {
        let url = 'https://api.xygeng.cn/one'
        request(url, function (error, response, body) {
            body = JSON.parse(body)
            if (body && body.code === 200) {
                resolve(`每天一句好心情：\n${body.data.content} - ${body.data.origin}`)
            } else {
                console.error(error)
                reject('每日一句接口请求异常')
            }
        })
    })
}

export {
    getNiceSentence
}

export default {
    getNiceSentence
}
