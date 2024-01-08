class Contactor {
    constructor(info) {
        this.uin = info.uin || ''
        this.name = info.name || ''
        this.avatar = info.avatar || ''
        this.important = info.important || false
        this.title = info.title || ''
        this.history = []
        this.active = false
        this.toinit = true
    }

    lasttime() {
        const last = this.history[this.history.length - 1]
        if (!last) {
            return ''
        }

        const currentTime = new Date().getTime()
        const lastTime = new Date(last.time)
        const timeDiff = currentTime - lastTime.getTime()

        if (timeDiff < 24 * 60 * 60 * 1000) {
            this.toinit = false
            // 小于24小时，返回 xx:xx (小时:分钟)
            const hours = lastTime.getHours().toString().padStart(2, '0')
            const minutes = lastTime.getMinutes().toString().padStart(2, '0')
            return `${hours}:${minutes}`
        } else if (timeDiff < 48 * 60 * 60 * 1000) {
            // 小于48小时，显示昨天
            return '昨天'
        } else if (timeDiff < 7 * 24 * 60 * 60 * 1000) {
            // 小于7天，返回星期x
            const weekdays = ['日', '一', '二', '三', '四', '五', '六']
            const weekday = lastTime.getDay()
            return `星期${weekdays[weekday]}`
        } else {
            // 7天以上，返回xxxx/xx/xx（年/月/日）
            const year = lastTime.getFullYear()
            const month = (lastTime.getMonth() + 1).toString().padStart(2, '0')
            const day = lastTime.getDate().toString().padStart(2, '0')
            return `${year}/${month}/${day}`
        }
    }

    activeit() {
        this.active = true
        // if(this.toinit) this.init()
    }

    addmsg(msg) {
        this.history.push(msg)
    }

    content() {
        const msg = this.history[this.history.length - 1]
        if (!msg) return ''
        let type = ''
        if (msg.content.text.length) {
            type = msg.content.text[0]
        } else if (msg.content.image.length) {
            type = '[图片]'
        } else {
            type = '[语音]'
        }
        return type
    }

    clean() {
        this.history = []
    }
}

export default Contactor
