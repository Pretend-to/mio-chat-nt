<script>
import { watch } from 'vue';
import { makelist } from '../scripts/middleware';
import { useContactorstore } from '../stores/contactor';
import makeTips from '@/scripts/tipsappend.js'


export default {
    data() {
        const contactor = useContactorstore()
        const list = makelist();
        //console.log(list);
        return {
            list,
            activeone: 0,
            contactor
        }
    },
    methods: {
        thatone(id, item) {
            if (this.activeone + 1) {
                //console.log("已经清除上一处引索" + this.activeone + "的属性")
                if (this.list[this.activeone].important) {
                    this.list[this.activeone].active = "important"
                } else {
                    this.list[this.activeone].active = "inactive"
                }
            }
            this.activeone = id
            //console.log("当前选中的引索值：" + id)
            this.list[id].active = "active"
            this.contactor.uin = item.uin;
            this.$emit('changed',item.uin)
            console.log("BBABABBABABABAB" + this.contactor.uin)
        },
        getindex(uin) {
            const index = this.list.findIndex(item => item.uin === uin);
            return index;
        }, addone() {
            makeTips.warn("此功能尚未开放")
        }
    },
    mounted() {
        if(this.contactor.uin != 10000) this.list[this.getindex(this.contactor.uin)].active = "active"
        watch(() => this.contactor.newmsg, (newValue, oldValue) => {
            this.list = makelist()
            this.list.forEach(function (element) {
                element.active = "inactive";
            });
            this.list[this.getindex(this.contactor.uin)].active = "active"
            this.contactor.newmsg = false;
        })
    },
    emits:["changed"]
}
</script>

<template>
    <div id="friendlists">
        <div class="upsidebar" id="friends">
            <div class="search" id="people">
                <svg t="1695130526763" class="listicon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3427">
                    <path
                        d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"
                        p-id="3428"></path>
                </svg>
                <input type="text" id="tosearch" placeholder="搜索">
            </div>
            <div class="bu-add">
                <button id="addcont" @click="addone">+</button>
            </div>
        </div>
        <div class="people">
            <div @click="thatone(index, item)" v-for="(item, index) of list" :key="index" class="lists"
                :id="(item.important && !item.active) ? 'important' : item.active">
                <div class="avatar">
                    <img :src="item.avatar" :alt="item.name">
                </div>
                <div class="info">
                    <div class="name">{{ item.name }}</div>
                    <div class="msginfo" id="time">{{ item.lasttime }}</div>
                    <div class="msginfo" id="msgctt">{{ item.content }}</div>
                </div>

            </div>
        </div>
    </div>
</template>