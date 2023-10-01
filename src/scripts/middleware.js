import { commitmessage } from './chat.js'
import { getmain, savemain, gethistory, savehistory,setconfig,getcfg } from './stroge.js'
import { generateRandomId } from './stroge.js';
import { initcontactor,reset } from './function.js';
import initJson from '@/assets/json/main.json'
import initCfg from '@/assets/json/config.json'
import Contactor from './friends.js';

export function getmsg(uin) {
    let history = gethistory(uin);
    const messagechain = [];
    const data = getmain();
    let person
    //console.log("读取uin为" + uin + "的记录")
    if (history) {
        history.forEach(element => {
            if (element.role == "other") {
                person = data.contactor.find(item => item.uin === uin);
            } else { person = data }
            if(!person){return []}

            element.text.forEach(message => {
                const msg = {
                    role: element.role,
                    name: person.name,
                    title: person.title,
                    avatar: person.avatar,
                    text: message,
                    time: element.time
                }
                messagechain.push(msg)
            });
        });
    }
    return messagechain
}


export async function sentmsg(msg, uin) {
    return new Promise((resolve, reject) => {
        let timestamp = new Date().getTime();
        let container = {
            "role": "user",
            "text": [msg],
            "time": timestamp
        };
        let history = gethistory(uin);
        history.push(container);
        savehistory(uin, history);
        commitmessage(msg, uin)
            .then(result => {
                timestamp = new Date().getTime();
                const msg = result;
                container = {
                    "role": "other",
                    "text": msg,
                    "time": timestamp
                };
                msg.forEach(element => {
                    let history = gethistory(uin);
                    history.push(container);
                    savehistory(uin, history);
                });
                resolve(msg);
            })
            .catch(error => {
                console.error('操作失败:', error);
                reject(error);
            });
    });
}

export function systemchat(msg, uin) {
    return new Promise((resolve, reject) => {
      commitmessage(msg, uin)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          console.error('操作失败:', error);
          reject(error);
        });
    });
  }  


export function init(uin) {
    const b = getcfg()
    if (!uin) {
        const a = getmain()
        if (!a) {
            console.log(initJson)
            // const parsedData = JSON.parse(initJson);
            let parsedData = initJson
            parsedData.uuid = generateRandomId()
            savemain(parsedData);
        }
    } else {
        initcontactor(uin)
    }
    if(!b) {
        const config = initCfg
        setconfig(config)
    }
}   

export function makelist() {
    const main = getmain()
    const list = []
    main.contactor.forEach(element => {
        
        const messagechain = getmsg(element.uin)
        //console.log(messagechain)

        //console.log(messagechain[messagechain.length - 1])
        const contactor = new Contactor({ info: element, lastchat: messagechain[messagechain.length - 1] });
        list.push(contactor);
    });
    return list;
}

export function getinfo(uin){
    const main = getmain()
    if (uin == 10000){
        return main;
    }else {
        const one = main.contactor.find(item => item.uin === uin);
        return one;
    }
}

export function upmain(main){
    savemain(main)
    location.reload();
}

export function upconfig(cfg){
    setconfig(cfg)
    console.log("配置文件已更新")
}

export function getconfig(){
    console.log("配置文件已读取")
    return getcfg()
}

export function updatesb(sb){
    const current = getmain();
    const index = current.contactor.findIndex(item => item.uin === sb.uin);
    if (index !== -1) {
        current.contactor.splice(index, 1, sb);
    }
    upmain(current)
}