<script>
import { RouterView } from 'vue-router'
import AuthLogin from './components/AuthLogin.vue'
import Sidebar from './components/Sidebar.vue'
import FriendList from './components/FriendList.vue'
import { watch } from 'vue'
import { auth, init } from '@/scripts/middleware'
import makeTips from '@/scripts/tipsappend.js'
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'

export default {
    data() {
        const windowWidth = 0
        const global = useGlobalStore()
        const {acting} = storeToRefs(global)
        const showWindow = false
        const showOther = true
        const authinfo = 'fucker'
        const showauth = true
        return {
            windowWidth,
            showWindow,
            showOther,
            authinfo,
            showauth,
            global,
            acting
        }
    }, mounted() {
        this.global.load()

        const currerntcode = auth()
        if (currerntcode === 'root') {
            makeTips.info('欢迎主人')
            this.showauth = false
        } else if (currerntcode === 'user') {
            makeTips.info('欢迎使用')
            this.showauth = false
        }

        this.getWindowWidth() // 获取初始窗口宽度
        window.addEventListener('resize', this.handleResize) // 监听窗口大小变化
        watch(() => this.windowWidth, (newValue, oldValue) => {
            if (newValue > 600) {
                this.showOther = true
                this.showWindow = true
            } else if (acting.uin === 10000) {
                this.showOther = true
                this.showWindow = false
            } else {
                this.showOther = false
                this.showWindow = true
            }
        })

    }, beforeUnmount() {
        window.removeEventListener('resize', this.handleResize) // 在组件销毁前移除事件监听
    }, components: {
        Sidebar,
        FriendList,
        RouterView,
        AuthLogin
    }, methods: {
        getWindowWidth() {
            this.windowWidth = window.innerWidth // 获取初始窗口宽度
            if (this.windowWidth > 600) {
                this.showOther = true
                this.showWindow = true
            } else {
                this.showOther = true
                this.showWindow = false
            }
        },
        handleResize() {
            this.windowWidth = window.innerWidth // 更新当前网页宽度
        },
        tryauth(status) {
            if (status === 'fucker') {
                makeTips.warn('无效的鉴权码')
            } else if (status === 'root') {
                // 给最高权限
                makeTips.info('欢迎使用')
                this.showauth = false
            } else {
                //给一般权限
                makeTips.info('欢迎使用')
                this.showauth = false
            }
        }, exchange(uin) {
            console.log('update store')
            if (this.windowWidth < 600) {
                this.showOther = false
                this.showWindow = true
            }
        }
    }, beforeCreate() {
        init()
    }, watch: {
        acting(newValue, oldValue) {
            if (newValue.uin) {
                if (this.windowWidth < 600) {
                    console.log(`${newValue},${oldValue}`)
                    if (newValue.uin !== 10000) {
                        this.showOther = false
                        this.showWindow = true
                    } else if (oldValue.uin !== 10000) {

                    } else {
                        this.showOther = false
                        this.showWindow = true
                    }
                }
                console.log(newValue)
                console.log('选中' + this.acting.name)
            }
        },
        'global.chatting'(newValue, oldValue) {
            console.log(newValue ? '开始聊天啦' : '回到列表啦')
            if (!newValue) {
                this.showOther = true
                this.showWindow = false
            }
        }
    }
}
</script>

<template>
    <AuthLogin v-if="showauth" @get="tryauth"/>
    <Sidebar v-if="showOther"/>
    <FriendList v-if="showOther" @changed="exchange"/>
    <RouterView v-if="showWindow"/>
</template>

<style scoped>

</style>