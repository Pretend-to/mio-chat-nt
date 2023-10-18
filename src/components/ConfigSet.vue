<template>
    <div id="fade" class="black_overlay" @click="leave"></div>
    <div id="configmain" class="config">
        <img class="bkg" src="@/assets/setting.svg" alt="background">
        <div id="head"></div>
        <div id="body">
            <div v-if="!devsets" id="form_submit">
                <div id="c-name" class="form">
                    用户名：<input type="text" v-model="user.name" />
                </div>
                <div id="c-title" class="form">
                    称号：<input type="text" v-model="user.title" />
                </div>
                <div id="c-avatar" class="form">
                    头像：<input type="text" v-model="user.avatar">
                </div>
                <img id="avatar" :src="user.avatar" alt="">

                <div id="c-baseurl" class="form">
                    baseurl：<input type="text" v-model="cfg.baseurl" />
                </div>
                <div id="c-respmt" class="form">
                    重置：<input type="text" v-model="cfg.resetprompt" />
                </div>

                <div id="c-loadpmt" class="form">
                    加载：<input type="text" v-model="cfg.loadprompt" />
                </div>

                <div id="c-uuid" class="form">
                    uuid：<input type="text" v-model="user.uuid" disabled />
                </div>
            </div>
            <div id="bt-place">
                <button @click="remake(0)" @dblclick="remake(1)">重置</button>
                <button @click="saveset(user, cfg)">确认</button>
                <button @click="leave">取消</button>
            </div>
        </div>

    </div>
</template>
  
<script>
import { makeTips, denied } from '@/scripts/tipsappend.js'


export default {
    data() {
        const devsets = false;
        return {
            devsets
        }
    },
    props: ["user", 'cfg'],
    emits: ['leave', 'save'],
    methods: {
        leave() {
            this.$emit('leave')
        },
        saveset(user, cfg) {
            this.$emit('save', user, cfg)
        },
        remake(count) {
            var result = confirm("警告: 此操作将会重置所有缓存(包含聊天记录)，确定要执行此操作吗？");
            if (result) {
                makeTips("info","操作成功，即将刷新")
                setTimeout(function(){
                    location.reload(); // 刷新页面
                },1000)
                localStorage.clear(); // 清除本地存储数据
            } else {
                // 用户点击了取消按钮
                makeTips("info","操作已取消")
            }
        }
    },
    computed: {
        active() {
            return this.devsets ? "inactive" : "active"
        },
        active2() {
            return this.devsets ? "active" : "inactive"
        }
    }
};
</script>
  

<style scoped>
#body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

#group {
    padding-right: 5%;
    flex-direction: column;
    flex-wrap: nowrap;
    flex-basis: 20%;
    display: flex;
    border-right: 1px solid rgba(112, 112, 112, 0.548);
}

#group button {
    border: 0px;
    border-radius: 5px;
    background-color: rgb(241, 241, 241);
    height: 32px;
    margin: 10px 0;
}

#group button#active {
    background-color: rgb(0, 153, 255);
    color: white;
}

.config #head {
    flex-basis: 70%;
    text-align: center;
    margin: 0px;
}

.black_overlay {
    display: block;
    /* 此元素不会被显示*/
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: #bbbbbb;
    z-index: 1001;
    /* z-index 属性设置元素的堆叠顺序。*/
    opacity: .80;
    /* opacity 属性设置元素的不透明级别。*/
}

.config {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    justify-content: flex-start;
    width: 600px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 32px;
    border: 1px solid #bbbbbb;
    border-radius: 20px;
    background-color: white;
    z-index: 1002;
    /*层级要比.black_overlay高，这样才能显示在它前面*/
    overflow: auto;
}

#form_submit {
    display: flex;
    flex-basis: 80%;
    flex-wrap: wrap;
}

.form {
    font-size: 14px;
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-basis: 100%;
    margin: 20px 20px;
}

input {
    font-size: 14px;
    height: 20px;
    flex-basis: 480px;
    flex-grow: 0;
}

#bt-place {
    display: flex;
    justify-content: space-between;
    padding: 0px 50px;
}

#bt-place button {
    width: 150px;
    height: 30px;
    color: aliceblue;
    border-radius: 5px;
    border: 0px;
    background-color: rgb(0, 153, 255);
    padding: 0px;
    margin-top: 20px;
}

#bt-place button:hover {
    background-color: rgb(0, 147, 245);
}

#bt-place button:active {
    background-color: rgb(0, 134, 224);
}

img#avatar {
    display: none;
    width: 150px;
    position: absolute;
    margin-left: 150px;
    border: 1px solid black;
}
img.bkg{
    display: none;
    z-index: 0;
    width: 600px;
    position: absolute;
}


@media (max-width: 600px) {


    .bkg {
        position: absolute;
    }

    .config {
        overflow: hidden;
        max-width: 100%;
        height: 100%;
        flex-direction: column;
        padding: 0px;
        flex-wrap: nowrap;
        background-color: aliceblue;
    }

    input {
        flex-basis: calc(100% - 72px);
    }

    .form {
        white-space: nowrap;
        font-size: 14px;
        align-items: center;
        justify-content: space-between;
        display: flex;
        flex-basis: 30px;
        margin: 10px 20px;
    }

    img.bkg {
        display: block;
        width: 1024px;
        position: absolute;
        right: 50%;
        top: -360px;
        transform: translateX(50%);
    }

    img#avatar {
        display: block;
        z-index: 2000000;
        position: absolute;
        top: 16px;
        border-radius: 50%;
        right: 50%;
        transform: translateX(50%);
    }

    #body {
        position: relative;
        flex-basis: 500px;
        flex-grow: 1;
        flex-direction: column;
        justify-content: flex-start;
    }

    #form_submit {
        flex:  1 1 200px;
        border-top-left-radius: 50px;
        border-top-right-radius: 50px;
        border-bottom: 1px solid white;
        flex-direction: column;
        justify-content: flex-start;
        flex-wrap: nowrap;
        overflow-x: hidden;
        overflow-y: auto;

        background: rgb(255, 255, 255);
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
    }

    .config #head {
        padding: 36px 0 0 0;
        width: 100%;
        flex: 0 1 200px;

    }

    #bt-place {
        background: rgb(255, 255, 255);
        align-items: center;
        flex-basis: 72px;
        padding: 0px 16px;
        display: flex;
        justify-content: center;
    }

    #bt-place button {
        height: 36px;
        width: 100px;
        margin: 0px 16px;
        border-radius: 36px;
    }

    .form:nth-child(1) {
        margin-top: 200px;

    }

}</style>