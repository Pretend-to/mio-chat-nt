import { getmain, getcfg } from '@/scripts/stroge.js'
import makeTips from '@/scripts/tipsappend.js'


class Lss233 {
  constructor(contactor) {
    this.baseurl = this.readconfig().baseurl,
      this.resetprompt = this.readconfig().resetprompt,
      this.loadprompt = this.readconfig().loadprompt,
      this.title = contactor.title,
      this.session_id = `${getmain().uuid}-${contactor.uin}`
    this.requestid = []
    this.toinit = contactor.toinit
  }

  async getRequest(message) {
    if (this.toinit) {
      await this.init();
    }
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
        return responseData;
      } else {
        throw new Error('Failed to get requestID');
      }
    } catch (error) {
      console.error(error);
      // throw error;
    }
  }


  async getResponse(requestID) {
    const url = `${this.baseurl}/v2/chat/response?request_id=${requestID}`;
    let data = {
      result: 'SUCCESS',
      message: [],
      voice: [],
      image: []
    }
    let container
    let final
    try {
      const response = await fetch(url, { rejectUnauthorized: false });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      data = await response.json();
      if (data.result === 'FALSE') {
        throw new Error('返回 FALSE');
      }
      container = {
        role: 'other',
        time: new Date().getTime(),
        content: {
          text: data.message,
          image: data.image,
          voice: data.voice
        }
      }
      final = {
        continue: data.result == 'DONE' ? false : true,
        container: container
      }
      console.log("请求结果" + data.result)

    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
    return final;
  }

  async init() {
    const msg = this.loadprompt + this.title
    this.toinit = false
    const id = await this.getRequest(msg)
    console.log(id)
    const data = await this.getResponse(id)
    if (data.continue == false) {
      makeTips.info("进行人格初始化操作")
      console.log(data.container.content.text[0])
    } else return false
  }

  async getVoices() {
    const msg = "切换语音 XXX"
    const id = await this.getRequest(msg)
    const data = await this.getResponse(id)
    console.log(data)
    const message = data.container.content.text[0]
    const voiceIds = message.match(/(?:\b)[a-z]+(?:\b)/g);
    return voiceIds;
  }

  getModels() {
    const msg = "切换模型 XXX"
    const id = this.getRequest(msg)
    data = this.getResponse(id)
    const modelIds = data.message[1].match(/(?:\')(.*?)(?:\')/g).map(str => str.replace(/\'/g, ''));
    return modelIds;
  }

  readconfig() {
    const config = getcfg()
    return config.lss233
  }
}

export default Lss233;