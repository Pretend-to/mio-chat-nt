<script>
import { getinfo,updatesb } from '../scripts/middleware';
import { useContactorstore } from '../stores/contactor';
import { watch } from 'vue';


export default {

    data() {
        const contactor = useContactorstore()
        const sb = getinfo(contactor.uin)
        console.log(sb)
        return {
            sb,
            contactor
        }
    }, mounted() {
        watch(() => this.contactor.uin, (newValue, oldValue) => {
            this.sb = getinfo(newValue)
        });
    },
    methods: {
        startchat() {
            this.contactor.editing = false
            const element = document.querySelector("#unchoosen");
            element.click();
        },
        saveset(e,smb){
            updatesb(smb)
        }
    }
}
</script>

<template>
    <div id="chatwindow">
        <img src="https://pi.fcip.top:8848/upload/background2.jpg" alt="背景" id="background">
        <div class="card">
            <div id="top">
                <div id="imgcontainer">
                    <img :src="sb.avatar" :alt="sb.name" id="avatar">
                </div>
                <div id="t1">
                    <div id="c-name">
                        <input type="text" v-model="sb.name" />
                    </div>
                    <div id="c-avatar">
                        <input type="text" v-model="sb.avatar">
                    </div>
                </div>
            </div>
            <div id="btm">
                <div id="c-title">
                预设名<input type="text" v-model="sb.title" />
            </div>
            <div id="c-content">
                预设人格<textarea></textarea>
            </div>
            <div id="bt-place">
                <button @click="saveset(e, sb)">确认</button>
                <button @click="startchat">聊天</button>
            </div>
        </div>
            </div>


    </div>
</template>
    

<style scoped>
/* div{
    border: 1px solid #000;;
} */

input {
    border: 0px;
    width: 100%;
}

#chatwindow {
    overflow: hidden;
    /* 隐藏超出容器大小的图像部分 */
    position: relative;
}

.card {
    flex-wrap: wrap;
    display: flex;
    background-color: rgb(255, 255, 255);
    flex-direction: column;
    position: absolute;
    top: 30%;
    width: 100%;
    height: 70%;
    padding: 8px 0px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

#top {
    display: flex;
    flex-basis: 100%;
    flex-grow: 1;
    max-height: 20%;
    padding: 8px;
    border-bottom: 1px solid black;
    margin-bottom: 16px;
}

#t1 {
    display: flex;
    flex-direction: column;
}

#c-name {
    margin-top: 12px;
    margin-left: 24px;
}

#c-name input {
    font-size: 28px;
}

#c-avatar {
    display: inline-block;
    vertical-align: middle;
    margin-top: 12px;
    margin-left: 24px;
}

img#background {
    width: 100%;
    height: 40%;
}

img#avatar {
    height: 100px;
    border-radius: 50%;
    width: 100px;
}
/* #btm *{
    border: 1px solid black;
} */
#btm{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
#c-content{
    flex-grow: 1;
    padding: 8px;
    display: flex;
    text-wrap: nowrap;
}
#c-title{
    padding: 8px;
    display: flex;
    text-wrap: nowrap;
}
#c-title input{
    margin-left: 24px;
}
#bt-place{
    height: 50px;
    margin-bottom: 8px;
    display: flex;
}
#bt-place button{
    flex-grow: 1;
    height: 100%;
    width: 100px;
}
textarea{
    flex-grow: 1;
    margin-left: 8px;
}
</style>