<template>
    <div class="container">
        <div class="title">请输入鉴权码以完成身份认证</div>
        <div class="code"><input ref="code" type="text"></div>
        <div class="button">
            <button id="getcode">取消</button>
            <button id="quit" @click="getcode">确认</button>
        </div>
    </div>
    <div class="bkg"></div>
</template>

<script>
import { auth } from '@/scripts/middleware';
import makeTips from '@/scripts/tipsappend.js'

export default{
    emits:["get"],
    methods:{
        getcode(){
            const value = this.$refs.code.value
            if(value){
                this.$refs.code.value = ''
                this.$emit('get',auth(value))
            }else{
                makeTips.warn('输入不得为空')
            }

        }
    }
}

</script>
<style scoped>
.bkg{
    position: fixed;
    width: 100%;
    min-height: 100%;
    backdrop-filter: blur(12px);
    z-index: 200;
}
.container{
    background-color: white;
    z-index: 5000;
    width: 400px;
    height: 200px;
    max-width: 75%;
    border: 1px solid rgb(0,153,235);
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.title{
    text-align: center;
    font-size: large;
}
.code{
    flex-basis: 28px;
}
input{
    height: 100%;
    font-size: 20px;
}
input:focus{
    outline: 0px;
    height: 100%;
    font-size: 20px;
}
button{
    width: 88px;
    height: 32px;
    margin: 0 16px;
    background-color: rgb(0,153,235);
    border: 0px;
    color: white;
    border-radius: 16px;
}
button:hover{
    background-color: rgb(0,147,245);
}
button:active{
    background-color: rgb(0, 133, 222);
}

</style>