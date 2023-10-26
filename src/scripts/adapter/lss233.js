import { get } from 'lodash';
import { getmain,getcfg } from '@/scripts/stroge.js'


class Lss233 {
    constructor(concator){
        this.baseurl = this.readconfig().baseurl,
        this.resetprompt = this.readconfig().resetprompt,
        this.loadprompt = this.readconfig().loadprompt,
        this.title = concator.title,
        this.session_id = `${getmain.uuid}-${concator.uin}`
        this.requestid = []
    }

    async  getRequest(message) {
      try {
        const cfg = getmain();
        const url = `${this.baseurl}/v2/chat`;
        const data = {
          session_id: this.session_id,
          username: cfg.name,
          message: message,
        };
    
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    
        if (response.ok) {
          const responseData = await response.text();
          console.log(responseData);
          // this.requestid.push(responseData);
          // return responseData;
        } else {
          throw new Error('Failed to get requestID');
        }
      } catch (error) {
        console.error(error);
        // throw error;
      }
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

    readconfig(){
        const config = getcfg()
        console.log(config)
        return config.lss233
    }
}

export default Lss233;