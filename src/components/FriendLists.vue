<script>
import makeTips from '@/scripts/tipsappend.js'
import { useGlobalstore } from '@/stores/global'
import { storeToRefs } from 'pinia'

export default {
    data() {
        const global = useGlobalstore()
        const { friend } = storeToRefs(global)
        const { acting } = storeToRefs(global)

        return {
            global,
            acting,
            friend
        }
    },
    methods: {
        thatone(item) {
            this.global.pickfriend(item);
            this.global.tochat(true)
        }
        , addone() {
            makeTips.warn("此功能尚未开放")
        }, status(one) {
            if (one.active) return 'active'
            if (one.important) return 'important'
            return null
        }
    },emits: ["changed"]
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
            <div @click="thatone(item)" v-for="(item, index) of friend" :key="index" class="lists" :id="status(item)">
                <div class="avatar">
                    <img :src="item.avatar" :alt="item.name">
                </div>
                <div class="info">
                    <div class="name">{{ item.name }}</div>
                    <div class="msginfo" id="time">{{ item.lasttime() }}</div>
                    <div class="msginfo" id="msgctt">{{ item.content() }}</div>
                </div>

            </div>
        </div>
    </div>
</template>