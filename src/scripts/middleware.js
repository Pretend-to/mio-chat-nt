import { getmain, savemain, setconfig, getcfg, setcode, getcode } from './stroge.js'
import { generateRandomId } from './stroge.js'
import initJson from '@/assets/json/main.json'
import initCfg from '@/assets/json/config.json'
import { Buffer } from 'buffer'

export function init(uin) {
    const b = getcfg()
    if (!uin) {
        const a = getmain()
        if (!a) {
            console.log(initJson)
            // const parsedData = JSON.parse(initJson);
            let parsedData = initJson
            parsedData.uuid = generateRandomId()
            savemain(parsedData)
        }
    } else {
        initcontactor(uin)
    }
    if (!b) {
        const config = initCfg
        setconfig(config)
    }
}

export function upmain(main) {
    savemain(main)
    location.reload()
}

export function upconfig(cfg) {
    setconfig(cfg)
    console.log('配置文件已更新')
}

export function getconfig() {
    console.log('配置文件已读取')
    return getcfg()
}


export function auth(code) {
    if (code) {
        const base64Encoded = Buffer.from(code).toString('base64')
        if (base64Encoded != '6Ym05p2D56CB') {  //不等于 鉴权码
            if (base64Encoded == 'NTI4MDcwMTcyNg==') { //等于 神秘数字
                setcode('root')
                return 'root'
            } else {
                setcode('fucker')
                return 'fucker'
            }
        } else {
            setcode('user')
            return 'user'
        }
    } else return getcode()
}

