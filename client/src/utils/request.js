//引入axios
const axios=require("axios");
//引入qs
const qs=require("qs");
//设置请求服务器根目录
axios.defaults.baseURL="http://127.0.0.1:666";

export default {
    get(url,params={}){
        return new Promise((resolve,reject) => {
            axios.get(url,{
                params
            })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    post(url,params={}){
        return new Promise((resolve,reject) => {
            axios.post(url,qs.stringify(params))
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}