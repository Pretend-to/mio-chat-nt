<template>
    <div id="fade" class="black_overlay" @click="leave"></div>
    <div id="configmain" class="config">
        <h2 id="head">配置信息</h2>
        <div id="body">
            <div id="group">
                <button class="cfg" @click="devsets=false" :id="active">通用</button>
                <button class="cfg" @click="devsets=true" :id="active2">高级</button>
            </div>
            <div v-if="!devsets" id="form_submit">
                <div id="c-name">
                    用户名：<input type="text" v-model="user.name" />
                </div>
                <div id="c-title">
                    称号：<input type="text" v-model="user.title" />
                </div>
                <div id="c-avatar">
                    头像：<input type="text" v-model="user.avatar">
                </div>
                <img :src="user.avatar" alt="">

                <div id="bt-place">
                    <button @click="saveset(user, cfg)">确认</button>
                    <button @click="leave">取消</button>
                </div>
            </div>
            <div v-else id="form_submit">
                <div id="c-baseurl">
                    baseurl：<input type="text" v-model="cfg.baseurl" />
                </div>
                <div id="c-respmt">
                    重置：<input type="text" v-model="cfg.resetprompt"  />
                </div>

                <div id="c-loadpmt">
                    加载：<input type="text" v-model="cfg.loadprompt"  />
                </div>

                <div id="c-uuid">
                    uuid：<input type="text" v-model="user.uuid" disabled />
                </div>

                <div id="bt-place">
                    <button @click="saveset(user, cfg)">确认</button>
                    <button @click="leave">取消</button>
                </div>
            </div>
        </div>

    </div>
</template>
  
<script>
export default {
    data() {
        const devsets = false;
        return {
            devsets
        }
    },
    props: ["user",'cfg'],
    emits: ['leave', 'save'],
    methods: {
        leave() {
            this.$emit('leave')
        },
        saveset(user, cfg) {
            this.$emit('save', user, cfg)
        }
    },
    computed:{
        active(){
            return this.devsets?"inactive":"active"
        },
        active2(){
            return this.devsets?"active":"inactive"
        }
    }
};
</script>
  

<style scoped>
#body {
    display: flex;
    justify-content: space-between;
}

#group{
    padding-right: 5%;
    flex-direction: column;
    flex-wrap: nowrap;
    flex-basis: 20%;
    display: flex;
    border-right: 1px solid rgba(112, 112, 112, 0.548);
}

#group button{
    border: 0px;
    border-radius: 5px;
    background-color: rgb(241,241,241);
    height: 32px;
    margin: 10px 0; 
}

#group button#active{
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
    justify-content: center;
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

#form_submit div {
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
    flex-basis: 330px;
    flex-grow: 0;
}

#bt-place {
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

img{
    width: 150px;
    margin-left: 150px;
    border: 1px solid black;
}

</style>