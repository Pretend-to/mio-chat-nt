<script>
import 'emoji-picker-element';
import { watch } from 'vue'; // 或 import { watch } from 'pinia';
import { useContactorstore } from '@/stores/contactor'
import { MdPreview } from 'md-editor-v3';
import { sentmsg, getmsg, init, getinfo } from '@/scripts/middleware';
import { getmain } from '../scripts/stroge';
import { initcontactor } from '../scripts/function';

export default {
    data() {
        const contactor = useContactorstore()
        const messagechain = getmsg(contactor.uin);
        const main = getmain()
        const info = {}
        //console.log(contactor)
        return {
            messagechain,
            contactor,
            userInput: '',
            showemoji: false,
            main,
            info
        }
    }, methods: {
        handleKeyDown(event) {
            if (event.ctrlKey && event.key === "Enter") {
                // 处理按下 Ctrl+Enter 键的逻辑
                this.send();
            }
        }, appendmessage(isme, msg) {
            // const message =  msg.replace(/\n/g, "<br>");
            const sb = getinfo(this.contactor.uin)
            const newtext =
            {
                role: isme ? "user" : "other",
                name: isme ? this.main.name : sb.name,
                title: isme ? this.main.title : sb.title,
                avatar: isme ? this.main.avatar : sb.avatar,
                text: msg
            }
            this.messagechain.push(newtext)
            if (isme) { this.userInput = "" }
        }, async send(e, prompt) {
            //console.log(prompt)
            const message = prompt || this.userInput
            const currernt = this.contactor.uin
            this.$refs.textarea.focus()
            this.appendmessage(true, message);
            this.toupdate = true;
            const msg = await sentmsg(message, this.contactor.uin);
            msg.forEach(element => {
                const now = this.contactor.uin
                this.contactor.newmsg = true
                if (now==currernt){
                    this.appendmessage(false, element);
                    this.toupdate = true;
                }
            });

        }, eemoji() {
            this.showemoji = !this.showemoji
        }, getemoji(e) {
            const unicode = e.detail.unicode;
            const textarea = this.$refs.textarea;
            const startPos = textarea.selectionStart;
            const endPos = textarea.selectionEnd;
            const textBeforeCursor = this.userInput.substring(0, startPos);
            const textAfterCursor = this.userInput.substring(endPos);
            this.userInput = textBeforeCursor + unicode + textAfterCursor;
            const newCursorPos = startPos + unicode.length;
            textarea.selectionStart = newCursorPos;
            textarea.selectionEnd = newCursorPos;
            textarea.focus();
            this.showemoji = !this.showemoji
        }, updateCursorPosition() {
            const textarea = this.$refs.textarea;
            this.cursorPosition = textarea.selectionStart;
        }, tobuttom() {
            const chatWindow = this.$refs.chatWindow;
            //console.log("滑动条位置顶部与元素顶部间距："+ chatWindow.scrollTop + "元素高度" + chatWindow.scrollHeight)
            chatWindow.scrollTop = chatWindow.scrollHeight
            //console.log(chatWindow.scrollHeight)
        }, cleanScreen() {
            const name = `ch-${this.contactor.uin}`
            localStorage.removeItem(name);
            this.messagechain = [];
            this.toupdate = true;
            init();
        }, reset() {
            const sb = getinfo(this.contactor.uin)
            initcontactor(sb)
            this.messagechain = [];
            const name = `ch-${this.contactor.uin}`
            localStorage.removeItem(name);
        }
    }, computed: {
        showwindow() {
            //console.log("recalculated")
            return this.contactor.uin == 10000 ? false : true;
        },
        sbinfo() {
            return getinfo(this.contactor.uin)
        }
    }, mounted() {
        // getmsg(currentuin);
        this.tobuttom();
        //console.log("初始渲染并滚动到底部理论完成")
        watch(() => this.contactor.uin, (newValue, oldValue) => {
            //console.log('property 变化了：', newValue, oldValue);
            if (getmsg(newValue).length) {
                this.messagechain = getmsg(this.contactor.uin);
                this.tobuttom();
                console.log(getmsg(newValue).length)
            } else {
                console.log("未找到聊天记录，进行初始化操作")
                this.reset()
            }
        });
        setTimeout(this.tobuttom, 0)
    }, updated() {
        if (this.toupdate) {
            this.tobuttom();
            this.toupdate = false;
        }
        setTimeout(this.tobuttom, 0)
    }, components: {
        MdPreview
    }
}
</script>

<template>
    <div id="chatwindow">
        <div class="upsidebar" id="chat" v-show="showwindow">
            <div class="somebody">{{ sbinfo.name }}</div>
            <div class="options">
                <svg t="1695145479477" class="chat-upbar-icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3566">
                    <path
                        d="M874.666667 544c-17.066667 0-32 14.933333-32 32v256c0 6.4-4.266667 10.666667-10.666667 10.666667H192c-6.4 0-10.666667-4.266667-10.666667-10.666667V192c0-6.4 4.266667-10.666667 10.666667-10.666667h256c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H192C151.466667 117.333333 117.333333 151.466667 117.333333 192v640c0 40.533333 34.133333 74.666667 74.666667 74.666667h640c40.533333 0 74.666667-34.133333 74.666667-74.666667V576c0-17.066667-14.933333-32-32-32z"
                        p-id="3567"></path>
                    <path
                        d="M874.666667 117.333333H640c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h157.866667L509.866667 467.2c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333l285.866667-285.866667V384c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V149.333333c0-17.066667-14.933333-32-32-32z"
                        p-id="3568"></path>
                </svg>
            </div>
        </div>
        <div class="message-window" ref="chatWindow" v-show="showwindow">
            <div v-for="(item, index) of messagechain" :key="index" class="message-container" :id="item.role" ref="message">
                <div class="avatar">
                    <img :src="item.avatar" :alt="item.name">
                </div>
                <div class="msg">
                    <div class="wholename">
                        <div class="title">{{ item.title }}</div>
                        <div class="name">{{ item.name }}</div>
                    </div>
                    <div class="content">
                        <MdPreview editorId="preview-only" :modelValue="item.text" />
                        <img v-for="picture of item.pic" :src="picture">
                    </div>
                </div>
            </div>
        </div>
        <div class="inputbar" v-show="showwindow">
            <div class="options">
                <div class="bu-emoji">
                    <emoji-picker v-show="showemoji" ref="emojiPicker" @emoji-click="getemoji"></emoji-picker>
                    <p id="ho-emoji">表情</p>
                    <svg @click="eemoji" t="1695146956319" class="chat-icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3988">
                        <path
                            d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"
                            p-id="3989"></path>
                        <path
                            d="M674.133333 608c-46.933333 57.6-100.266667 85.333333-162.133333 85.333333s-115.2-27.733333-162.133333-85.333333c-10.666667-12.8-32-14.933333-44.8-4.266667-12.8 10.666667-14.933333 32-4.266667 44.8 59.733333 70.4 130.133333 106.666667 211.2 106.666667s151.466667-36.266667 211.2-106.666667c10.666667-12.8 8.533333-34.133333-4.266667-44.8-12.8-10.666667-34.133333-8.533333-44.8 4.266667zM362.666667 512c23.466667 0 42.666667-19.2 42.666666-42.666667v-64c0-23.466667-19.2-42.666667-42.666666-42.666666s-42.666667 19.2-42.666667 42.666666v64c0 23.466667 19.2 42.666667 42.666667 42.666667zM661.333333 512c23.466667 0 42.666667-19.2 42.666667-42.666667v-64c0-23.466667-19.2-42.666667-42.666667-42.666666s-42.666667 19.2-42.666666 42.666666v64c0 23.466667 19.2 42.666667 42.666666 42.666667z"
                            p-id="3990"></path>
                    </svg>
                </div>
                <div class="bu-emoji">
                    <p id="ho-emoji">滑到底部</p>
                    <svg @click="tobuttom" t="1695147151930" class="chat-icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4438" width="20" height="20">
                        <path
                            d="M896 864H128c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h768c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM488.533333 727.466667c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466667-8.533333l213.333333-213.333334c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0l-157.866667 157.866667V170.666667c0-17.066667-14.933333-32-32-32s-34.133333 14.933333-34.133333 32v456.533333L322.133333 469.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l211.2 213.333334z"
                            p-id="4439"></path>
                    </svg>
                </div>
                <div class="bu-emoji">
                    <p id="ho-emoji">重置</p>
                    <svg @click="reset" t="1695146872454" class="chat-icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3849">
                        <path
                            d="M934.4 206.933333c-17.066667-4.266667-34.133333 6.4-38.4 23.466667l-23.466667 87.466667C797.866667 183.466667 654.933333 96 497.066667 96 264.533333 96 74.666667 281.6 74.666667 512s189.866667 416 422.4 416c179.2 0 339.2-110.933333 398.933333-275.2 6.4-17.066667-2.133333-34.133333-19.2-40.533333-17.066667-6.4-34.133333 2.133333-40.533333 19.2-51.2 138.666667-187.733333 232.533333-339.2 232.533333C298.666667 864 138.666667 706.133333 138.666667 512S300.8 160 497.066667 160c145.066667 0 277.333333 87.466667 330.666666 217.6l-128-36.266667c-17.066667-4.266667-34.133333 6.4-38.4 23.466667-4.266667 17.066667 6.4 34.133333 23.466667 38.4l185.6 49.066667c2.133333 0 6.4 2.133333 8.533333 2.133333 6.4 0 10.666667-2.133333 17.066667-4.266667 6.4-4.266667 12.8-10.666667 14.933333-19.2l49.066667-185.6c0-17.066667-8.533333-34.133333-25.6-38.4z"
                            p-id="3850"></path>
                    </svg>
                </div>
                <div class="bu-emoji">
                    <p id="ho-emoji">清屏</p>
                    <svg @click="cleanScreen" t="1695147353549" class="chat-icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4763" width="20" height="20">
                        <path
                            d="M874.666667 241.066667h-202.666667V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667h-170.666666c-40.533333 0-74.666667 34.133333-74.666667 74.666667v70.4H149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h53.333334V853.333333c0 40.533333 34.133333 74.666667 74.666666 74.666667h469.333334c40.533333 0 74.666667-34.133333 74.666666-74.666667V305.066667H874.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM416 170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h170.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v70.4h-192V170.666667z m341.333333 682.666666c0 6.4-4.266667 10.666667-10.666666 10.666667H277.333333c-6.4 0-10.666667-4.266667-10.666666-10.666667V309.333333h490.666666V853.333333z"
                            p-id="4764"></path>
                        <path
                            d="M426.666667 736c17.066667 0 32-14.933333 32-32V490.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v213.333333c0 17.066667 14.933333 32 32 32zM597.333333 736c17.066667 0 32-14.933333 32-32V490.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v213.333333c0 17.066667 14.933333 32 32 32z"
                            p-id="4765"></path>
                    </svg>
                </div>
            </div>
            <div class="input-box">
                <div class="input-content">
                    <textarea @keydown="handleKeyDown" ref="textarea" v-model="userInput"
                        @click="updateCursorPosition"></textarea>
                </div>
                <button @click.prevent="send" :disabled="!userInput" id="sendButton"
                    placeholder="按 Ctrl + Enter 以发送">发送</button>
            </div>
        </div>
        <div class="background" v-show="!showwindow">
            <img src="@/assets/default.svg" alt="SVG图标">
        </div>
    </div>
</template>

<style scoped>
.background img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>