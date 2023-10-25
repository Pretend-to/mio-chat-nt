import { init } from '../middleware';
import { getmain, savemain, gethistory, savehistory,setconfig,getcfg } from './stroge.js'


class Lss233 {
    constructor(concator){
        this.baseurl = "https://pi.fcip.top:2888",
        this.resetprompt = "重置会话",
        this.loadprompt = "变成赛博",
        this.title = concator.title,
        this.session_id = `${getmain.uuid}-${concator.uin}`
    }

    getRequest(message) {
        return new Promise((resolve, reject) => {
          const cfg = getmain();
          const url = `${cfg.url}/v2/chat`;
          const data = {
            session_id: session_id,
            username: cfg.name,
            message: message,
          };
      
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (response.ok) {
                resolve(response.text());
              } else {
                reject(new Error('Failed to get requestID'));
              }
            })
            .catch((error) => {
              reject(error);
            });
        });
      }

    async getResponse(requestID) {
        const url = `${this.baseurll}/v2/chat/response?request_id=${requestID}`;
        let data = {
            result: 'SUCCESS',
            message: [],
            voice: [],
            image: []
        }
            try {
                const response = await fetch(url,{rejectUnauthorized: false});
    
                if (!response.ok) {
                    throw new Error('Failed to get response');
                }
    
                data = await response.json();
    
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        return data;
    }

    init (){
        const msg = this.loadprompt + this.title
        const id = this.getRequest(msg)
        data = this.getResponse(id)
        if(data.result = 'DONE'){
            return data.message[0]
        }else return false
    }

    getVoices(){
        const msg = "切换语音 XXX"
        const id = this.getRequest(msg)
        data = this.getResponse(id)
        const voiceIds = data.message[0].match(/(?:\b)[a-z]+(?:\b)/g);
        return voiceIds;
    }

    getModels(){
        const msg = "切换模型 XXX"
        const id = this.getRequest(msg)
        data = this.getResponse(id)
        const modelIds = data.message[1].match(/(?:\')(.*?)(?:\')/g).map(str => str.replace(/\'/g, ''));
        return modelIds;
    }

}

export default Lss233;