import { getmsg } from "./middleware";
import { systemchat, getconfig } from "./middleware";


class Contactor {
    constructor(info ) {
        this.uin = info.uin || '';
        this.name = info.name || '';
        this.avatar = info.avatar || '';
        this.important = info.important || false;
        this.title = info.title || '';
        this.history = getmsg(info.uin);
        this.lastchat = this.history[this.history.length - 1] 
        this.lasttime = this.time(this.lastchat?.time) || '';
        this.content = this.content(this.lastchat?.text) || '';
        this.active = false;
        this.toinit = true;
    }

    time(last) {
        if (!last) {
            return '';
        }
        
        const currentTime = new Date();
        const lastTime = new Date(last);
        const timeDiff = currentTime - lastTime;
        
        if (timeDiff < 24 * 60 * 60 * 1000) {
            this.toinit = false
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
        }else {
            // 长度大于10，返回前8位并补充2位省略号
            return last;
        }
    }

    init() {

        const config = getconfig()
    
        const msg = `${config.loadprompt}${this.title}`
    
        console.log(msg)
    
        systemchat(msg, this.uin)
            .then(result => {
                console.log('操作成功:', result);
                // 在这里处理操作成功的结果
            })
            .catch(error => {
                console.error('操作失败:', error);
                // 在这里处理操作失败的错误
            });
    }

    activeit(){
        this.active = true
        // if(this.toinit) this.init()
    }
}

export default Contactor;
