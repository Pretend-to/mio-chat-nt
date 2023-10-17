<script>
import 'emoji-picker-element';
import html2canvas from 'html2canvas'
import { watch } from 'vue'; // 或 import { watch } from 'pinia';
import { useContactorstore } from '@/stores/contactor'
import { MdPreview } from 'md-editor-v3';
import { sentmsg, getmsg, init, getinfo } from '@/scripts/middleware';
import { makeTips, denied } from '@/scripts/tipsappend.js'
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
            info,
            textareaRef: null,

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
            if (window.innerWidth < 600) {
                this.textareaRef.style.height = '28px';

            }
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
                if (now == currernt) {
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
        }, tobuttom(clicked) {
            if (clicked) makeTips("info", "已滑至底部")
            const chatWindow = this.$refs.chatWindow;
            //console.log("滑动条位置顶部与元素顶部间距："+ chatWindow.scrollTop + "元素高度" + chatWindow.scrollHeight)
            chatWindow.scrollTop = chatWindow.scrollHeight
            //console.log(chatWindow.scrollHeight)
        }, cleanScreen() {
            const name = `ch-${this.contactor.uin}`
            localStorage.removeItem(name);
            this.messagechain = [];
            this.contactor.inited.splice(this.contactor.inited.indexOf(this.contactor.uin))
            makeTips("info", "已删除聊天记录")
            this.toupdate = true;
            init();
        }, reset() {
            const sb = getinfo(this.contactor.uin)
            initcontactor(sb)
            makeTips("info", "已重置好友人格")
        }, tolist() {
            this.contactor.uin = 10000
        }, adjustTextareaHeight() {
            if (window.innerWidth < 600) {
                this.textareaRef.style.height = '28px';
                this.textareaRef.style.height = this.textareaRef.scrollHeight - 8 + 'px';

                if (parseInt(this.textareaRef.style.height) > 200) {
                    this.textareaRef.style.height = '200px';
                }
            }
        }, isValidInput(input) {
            // 使用正则表达式检查用户输入是否只包含换行符和空格
            const regex = /^[ \n]+$/;
            const result = !regex.test(input);
            return result
        }, pushtip(type, info) {
            this.tips.push({
                info: info,
                type: type
            })
        }, waiting() {
            denied();
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
        this.textareaRef = this.$refs.textarea;
        this.textareaRef.addEventListener('input', this.adjustTextareaHeight);

        watch(() => this.contactor.uin, (newValue, oldValue) => {
            if (getmsg(newValue).length) {
                this.messagechain = getmsg(this.contactor.uin);
                setTimeout(this.tobuttom, 0)
                console.log(getmsg(newValue).length)
            } else if (this.contactor.inited.includes(newValue)) {
                console.log("未找到聊天记录，但已进行过初始化")
                this.messagechain = [];
            } else {
                console.log("未找到聊天记录，且未进行过初始化操作，进行初始化人格操作")
                this.contactor.inited.push(newValue)
                this.reset()
                this.messagechain = [];
            }
        });
        setTimeout(this.tobuttom, 0)
    }, updated() {
        if (this.toupdate) {
            setTimeout(this.tobuttom, 0)
            this.toupdate = false;
        }
    }, components: {
        MdPreview,
    }
}
</script>

<template>
    <TipAppend :tips="tips"></TipAppend>
    <div id="chatwindow">
        <div class="upsidebar" id="chat" v-show="showwindow">
            <div class="return" @click="tolist">
                <svg t="1696954263382" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="1042" width="20" height="20">
                    <path
                        d="M776.191485 982.272081L296.192421 515.840991c-1.279998-1.279998-1.535997-2.815995-1.535997-3.839993 0-1.023998 0.256-2.559995 1.535997-3.839992L775.935485 41.729915c6.143988-5.887989 6.399988-15.871969 0.511999-22.015957l-14.335972-14.847971c-5.887989-6.399988-15.61597-6.399988-21.759957-0.511999L260.60849 470.785079c-11.263978 11.007979-17.407966 25.59995-17.407966 41.215919 0 15.61597 6.143988 30.463941 17.407966 41.21592l479.999064 466.43109c6.143988 5.887989 15.871969 5.631989 21.759958-0.511999l14.335972-14.847971c5.887989-6.143988 5.631989-16.127969-0.511999-22.015957z"
                        p-id="1043"></path>
                </svg>
            </div>
            <div class="somebody">{{ sbinfo.name }}</div>
            <div class="options">
                <div id="system">
                    <div class="button" @click="waiting()" id="min">
                        <svg t="1696841764189" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4521" width="16" height="16">
                            <path
                                d="M746.666667 490.666667v42.666666a21.333333 21.333333 0 0 1-21.333334 21.333334H298.666667a21.333333 21.333333 0 0 1-21.333334-21.333334v-42.666666A21.333333 21.333333 0 0 1 298.666667 469.333333h426.666666a21.333333 21.333333 0 0 1 21.333334 21.333334z"
                                fill="#333333" p-id="4522"></path>
                        </svg>
                    </div>
                    <div class="button" @click="waiting()" id="max">
                        <svg t="1696841744276" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4306" width="16" height="16">
                            <path
                                d="M736 234.666667H288c-29.44 0-53.333333 23.893333-53.333333 53.333333v448c0 29.44 23.893333 53.333333 53.333333 53.333333h448c29.44 0 53.333333-23.893333 53.333333-53.333333V288c0-29.44-23.893333-53.333333-53.333333-53.333333zM725.333333 298.666667v426.666666H298.666667V298.666667h426.666666z"
                                fill="#333333" p-id="4307"></path>
                        </svg>
                    </div>
                    <div class="button" @click="waiting()" id="close">
                        <svg t="1696841669425" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4127" width="16" height="16">
                            <path
                                d="M344.362667 299.093333L512 466.773333l167.68-167.68a21.333333 21.333333 0 0 1 27.178667-2.432l2.986666 2.474667 15.061334 15.061333a21.333333 21.333333 0 0 1 0 30.165334L557.226667 512l167.68 167.68a21.333333 21.333333 0 0 1 0 30.165333l-15.104 15.061334a21.333333 21.333333 0 0 1-30.165334 0l-167.68-167.637334-167.594666 167.68a21.333333 21.333333 0 0 1-27.178667 2.432l-2.986667-2.474666-15.061333-15.061334a21.333333 21.333333 0 0 1 0-30.165333l167.594667-167.68-167.594667-167.594667a21.333333 21.333333 0 0 1 0-30.165333l15.061333-15.061333a21.333333 21.333333 0 0 1 30.165334 0z"
                                fill="#333333" p-id="4128"></path>
                        </svg>
                    </div>
                </div>
                <div id="share" @click="waiting()">
                    <svg t="1696841917190" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4742">
                        <path
                            d="M677.333333 245.333333a101.333333 101.333333 0 1 1-76.032 168.362667l-154.026666 85.546667a107.776 107.776 0 0 1-0.64 29.909333l151.978666 84.394667a101.333333 101.333333 0 1 1-22.570666 60.8l-158.250667-87.978667a106.666667 106.666667 0 1 1 2.944-145.621333l155.562667-86.357334a101.333333 101.333333 0 0 1 101.034666-109.056z m0 394.666667a37.333333 37.333333 0 1 0 0 74.666667 37.333333 37.333333 0 0 0 0-74.666667zM341.333333 469.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m336-160a37.333333 37.333333 0 1 0 0 74.666667 37.333333 37.333333 0 0 0 0-74.666667z"
                            p-id="4743"></path>
                    </svg>
                </div>
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
                        <div class="loader" v-if="isLoading"></div>
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
                    <svg @click="tobuttom(1)" t="1695147151930" class="chat-icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4438" width="20" height="20">
                        <path
                            d="M896 864H128c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h768c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM488.533333 727.466667c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466667-8.533333l213.333333-213.333334c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0l-157.866667 157.866667V170.666667c0-17.066667-14.933333-32-32-32s-34.133333 14.933333-34.133333 32v456.533333L322.133333 469.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l211.2 213.333334z"
                            p-id="4439"></path>
                    </svg>
                </div>
                <div class="bu-emoji">
                    <p id="ho-emoji">重置人格</p>
                    <svg @click="reset" t="1695146872454" class="chat-icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3849">
                        <path
                            d="M934.4 206.933333c-17.066667-4.266667-34.133333 6.4-38.4 23.466667l-23.466667 87.466667C797.866667 183.466667 654.933333 96 497.066667 96 264.533333 96 74.666667 281.6 74.666667 512s189.866667 416 422.4 416c179.2 0 339.2-110.933333 398.933333-275.2 6.4-17.066667-2.133333-34.133333-19.2-40.533333-17.066667-6.4-34.133333 2.133333-40.533333 19.2-51.2 138.666667-187.733333 232.533333-339.2 232.533333C298.666667 864 138.666667 706.133333 138.666667 512S300.8 160 497.066667 160c145.066667 0 277.333333 87.466667 330.666666 217.6l-128-36.266667c-17.066667-4.266667-34.133333 6.4-38.4 23.466667-4.266667 17.066667 6.4 34.133333 23.466667 38.4l185.6 49.066667c2.133333 0 6.4 2.133333 8.533333 2.133333 6.4 0 10.666667-2.133333 17.066667-4.266667 6.4-4.266667 12.8-10.666667 14.933333-19.2l49.066667-185.6c0-17.066667-8.533333-34.133333-25.6-38.4z"
                            p-id="3850"></path>
                    </svg>
                </div>
                <div class="bu-emoji">
                    <p id="ho-emoji">清除记录</p>
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
                <div class="bu-emoji">
                    <p id="ho-emoji">语音</p>
                    <svg  @click="waiting" t="1697536440024" class="chat-icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="7282" width="24" height="24">
                        <path
                            d="M544 851.946667V906.666667a32 32 0 0 1-64 0v-54.72C294.688 835.733333 149.333333 680.170667 149.333333 490.666667v-21.333334a32 32 0 0 1 64 0v21.333334c0 164.949333 133.717333 298.666667 298.666667 298.666666s298.666667-133.717333 298.666667-298.666666v-21.333334a32 32 0 0 1 64 0v21.333334c0 189.514667-145.354667 345.066667-330.666667 361.28zM298.666667 298.56C298.666667 180.8 394.165333 85.333333 512 85.333333c117.781333 0 213.333333 95.541333 213.333333 213.226667v192.213333C725.333333 608.533333 629.834667 704 512 704c-117.781333 0-213.333333-95.541333-213.333333-213.226667V298.56z m64 0v192.213333C362.666667 573.12 429.557333 640 512 640c82.496 0 149.333333-66.805333 149.333333-149.226667V298.56C661.333333 216.213333 594.442667 149.333333 512 149.333333c-82.496 0-149.333333 66.805333-149.333333 149.226667z"
                            p-id="7283"></path>
                    </svg>
                </div>
                <div class="bu-emoji">
                    <p id="ho-emoji">模型选择</p>
                    <svg @click="waiting"  t="1697536322502" class="chat-icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="6223" width="24" height="24">
                        <path
                            d="M618.666667 106.666667H405.333333v85.333333h64v42.666667H149.333333v661.333333h725.333334V234.666667H554.666667V192h64V106.666667zM234.666667 810.666667V320h554.666666v490.666667H234.666667zM21.333333 448v234.666667h85.333334V448H21.333333z m896 0v234.666667h85.333334V448h-85.333334z m-469.333333 64h-106.666667v106.666667h106.666667v-106.666667z m234.666667 0h-106.666667v106.666667h106.666667v-106.666667z"
                            p-id="6224"></path>
                    </svg>
                </div>
            </div>
            <div class="input-box">
                <div class="input-content">
                    <textarea @keydown="handleKeyDown" ref="textarea" v-model="userInput"
                        @click="updateCursorPosition"></textarea>
                </div>
                <button @click.prevent="send" :disabled="!userInput || !isValidInput(userInput)" id="sendButton"
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

#share svg {
    width: 32px;
    margin-right: 8px;
}

#system {
    display: flex;
    flex-basis: 100%;
}

#system .button {
    display: flex;
    justify-content: center;
    padding-top: 8px;
    flex: 0 0 32px;
}

#system .button:hover {
    background-color: rgb(231, 231, 231)
}


.button#close:hover {
    background-color: rgb(255, 0, 0)
}

.upsidebar .options {
    flex-basis: 96px;
    display: flex;
    height: 100%;
    flex-wrap: wrap;
    flex-direction: row-reverse;
}

svg:hover {
    fill: rgb(0, 153, 255);
}


.loader {
    width: 10px;
    padding: 4px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: rgb(0, 153, 255);
    --_m:
        conic-gradient(#0000 10%, #000),
        linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 1s infinite linear;
    position: absolute;
}

@keyframes l3 {
    to {
        transform: rotate(1turn)
    }
}

.return {
    display: none;
}

@media (max-width: 600px) {
    #chatwindow {
        height: 100%;
    }

    .upsidebar {
        background-color: #00A8FF;
        background: linear-gradient(to right, #00D2F8, #00A8FF);
    }

    .upsidebar * {
        color: white;
        fill: white;
    }

    #system {
        display: none;
    }

    .return {
        display: block;
        margin-left: 16px;
        margin-bottom: 8px;
    }

    .return svg {
        stroke-width: 3;
    }

    #share {
        display: flex;
        align-items: end;
        padding-bottom: 4px;
    }

    .somebody {
        padding-bottom: 4px;
    }

    textarea {
        overflow-y: auto
    }
}</style>