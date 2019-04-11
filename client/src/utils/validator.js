export function checkReg(value) {
    const reg= /^[a-zA-Z]\w{2,5}$/;
    return reg.test(value);
}

export function checkFloatNumberReg(value){
    const reg=/^\d+(\.\d+)?$/;
    return reg.test(value);
}

export function checkIntNumberReg(value){
    const reg=/^([1-9]\d*|[0]{1,1})$/;
    return reg.test(value);
}

