import { getmsg } from "./middleware";

class Contactor {
    constructor({info = {}, lastchat = {}} = {}) {
        this.uin = info.uin || '';
        this.name = info.name || '';
        this.avatar = info.avatar || '';
        this.important = info.important || false;
        this.title = info.title || '';
        this.lasttime = this.time(lastchat?.time) || '';
        this.content = this.content(lastchat?.text) || '';
        this.active = false;
        this.history = getmsg(info.uin);
    }

    time(last) {
        if (!last) {
            return '';
        }
        
        const currentTime = new Date();
        const lastTime = new Date(last);
        const timeDiff = currentTime - lastTime;
        
        if (timeDiff < 24 * 60 * 60 * 1000) {
            // 小于24小时，返回 xx:xx (小时:分钟)
            const hours = lastTime.getHours().toString().padStart(2, '0');
            const minutes = lastTime.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        } else if (timeDiff < 48 * 60 * 60 * 1000) {
            // 小于48小时，显示昨天
            return '昨天';
        } else if (timeDiff < 7 * 24 * 60 * 60 * 1000) {
            // 小于7天，返回星期x
            const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
            const weekday = lastTime.getDay();
            return `星期${weekdays[weekday]}`;
        } else {
            // 7天以上，返回xxxx/xx/xx（年/月/日）
            const year = lastTime.getFullYear();
            const month = (lastTime.getMonth() + 1).toString().padStart(2, '0');
            const day = lastTime.getDate().toString().padStart(2, '0');
            return `${year}/${month}/${day}`;
        }
    }

    content(last) {
        if (!last) {
            return '';
        }
        
        if (last.length <= 10) {
            // 长度小于等于10，直接返回消息整体
            return last;
        } else {
            // 长度大于10，返回前8位并补充2位省略号
            return last.slice(0, 10) + '...';
        }
    }
}

export default Contactor;
