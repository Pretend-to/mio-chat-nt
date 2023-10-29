import localforage from 'localforage';

export function getmain(){
    const storedData = JSON.parse(localStorage.getItem('main'));
    return storedData;
}

export function savemain(main){
    localStorage.setItem("main", JSON.stringify(main));
}

export function savehistory(uin,chain){
    const chainame = `ch-${uin}`;
    //console.log("存储了名为" + chainame + "的" + history)
    localStorage.setItem(chainame, JSON.stringify(chain));
}

export function gethistory(uin){
    let history=[];
    const name = `ch-${uin}`
    if(localStorage.getItem(name)){
        history = JSON.parse(localStorage.getItem(name));
    }
    //console.log("给" + name + "执行gethistory：\n" + history)
    return history;
}

export function generateRandomId() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = 'sk-';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
    return id;
  }

export function setconfig(cfg){
    localStorage.setItem("config", JSON.stringify(cfg));
}

export function getcfg(){
    const storedData = JSON.parse(localStorage.getItem('config'));
    return storedData;
}

export function setglobal(cfg){
    localStorage.setItem("global", JSON.stringify(cfg));
}

export function getglobal(){
    let storedData
    try {
        storedData = JSON.parse(localStorage.getItem('global'));
    } catch (error) {
        return undefined
    }
    
    return storedData;
}

export function setcode(cfg){
    localStorage.setItem("code", cfg);
}

export function getcode(){
    const storedData = localStorage.getItem('code');
    return storedData;
}
