//引入request
import request from "../utils/request"

export function accountaddRequest (url,params) {
    return new Promise((resolve,reject) => {
        request.post(url,params)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}