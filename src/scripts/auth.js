import { Buffer } from "buffer";

export function auth(code){
    const base64Encoded = Buffer.from(code).toString('base64');
    if (base64Encoded != '6Ym05p2D56CB'){  //不等于 鉴权码
        if (base64Encoded == 'NTI4MDcwMTcyNg=='){ //等于 神秘数字
            return 'root'
        }else return 'fucker'
    }else return 'user'
}