export default {
    //存入本地
    save(key,value){
        window.localStorage.setItem(key,JSON.stringify(value));
    },
    get(key){
        return JSON.parse(window.localStorage.getItem(key));
    },
    remove(key){
        window.localStorage.removeItem(key);
    }
}