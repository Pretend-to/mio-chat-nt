import localForage from 'localforage';

export function getmain(){
    const storedData = JSON.parse(localStorage.getItem('main'));
    return storedData;
}

export function savemain(main){
    localStorage.setItem("main", JSON.stringify(main));
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
    localForage.setItem('global', JSON.stringify(cfg)).then(function (value) {
        // 当值被存储后，可执行其他操作
        console.log("存储成功");
    }).catch(function(err) {
        // 当出错时，此处代码运行
        console.log(err);
    });
}

export async function getglobal() {
    try {
      const storedData = await localForage.getItem('global');
      console.log("读取成功");
      return JSON.parse(storedData);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  

export function setcode(cfg){
    localStorage.setItem("code", cfg);
}

export function getcode(){
    const storedData = localStorage.getItem('code');
    return storedData;
}
