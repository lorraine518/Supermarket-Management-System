export function randomCode(){
    //生成随机条形码工具函数(6位：100000~999999)
    const result=Math.floor(Math.random()*900000+100000);
    return result.toString();
}