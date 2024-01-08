import { getmain, getcfg } from './stroge.js'

let jieguo = {
    message: [],
    voice: [],
    image: []
}

function config() {
    const a = getmain()
    const b = getcfg()
    const url = b.baseurl
    return {
        name: a.name,
        uuid: a.uuid,
        url: url
    }
}

export function getRequest(message, session_id) {
    return new Promise((resolve, reject) => {
        const cfg = config()
        const url = `${cfg.url}/v2/chat`
        const data = {
            session_id: `${cfg.uuid}-${session_id}`,
            username: cfg.name,
            message: message
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
            .then(response => {
                if (response.ok) {
                    resolve(response.text())
                } else {
                    reject(new Error('Failed to get requestID'))
                }
            })
    })
}

export async function getResponse(requestID) {
    const cfg = config()
    const url = `${cfg.url}/v2/chat/response?request_id=${requestID}`
    let data = {
        result: 'SUCCESS',
        message: [],
        voice: [],
        image: []
    }
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('Failed to get response')
        }

        data = await response.json()

    } catch (error) {
        console.error('Error:', error)
        throw error
    }
    return data
}


export function commitmessage(message, session_id) {
    return new Promise((resolve, reject) => {
        const cfg = config()
        const baseurl = `${cfg.url}/v1/chat`
        const uuid = getmain().uuid
        const id = `${uuid}-${session_id}`
        const data = {
            session_id: id,
            username: cfg.name,
            message: message
        }

        fetch(baseurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    console.error('Failed to send message')
                    reject(new Error('Failed to send message'))
                }
            })
            .then(data => {
                if (data) {
                    const result = data.result
                    const messages = data.message

                    if (result === 'DONE') {
                        resolve(messages)
                    } else {
                        console.error('Failed to get valid response')
                        reject(new Error('Failed to get valid response'))
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error)
                reject(error)
            })
    })
}
