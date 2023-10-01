import { getmain,getcfg } from './stroge.js';


function config(){
    const a = getmain();
    const b = getcfg();
    const url= `${b.baseurl}/v1/chat `
    return {
        name : a.name,
        url : url
    }
}

export function commitmessage(message, session_id) {
  return new Promise((resolve, reject) => {
    const cfg = config();
    const baseurl = cfg.url;
    const uuid = getmain().uuid;
    const id = `${uuid}-${session_id}`;
    const data = {
      session_id: id,
      username: cfg.name,
      message: message
    };

    fetch(baseurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to send message');
          reject(new Error('Failed to send message'));
        }
      })
      .then(data => {
        if (data) {
          const result = data.result;
          const messages = data.message;

          if (result === 'DONE') {
            resolve(messages);
          } else {
            console.error('Failed to get valid response');
            reject(new Error('Failed to get valid response'));
          }
        }
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      });
  });
}
