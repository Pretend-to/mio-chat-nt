<script>
import { RouterView } from 'vue-router'
import AuthLogin from './components/AuthLogin.vue';
import sidebar from './components/SideBar.vue'
import friendlist from './components/FriendLists.vue'
import { useContactorstore } from '@/stores/contactor';
import { watch } from 'vue';
import { initcontactor } from '@/scripts/function';
import { makelist,auth } from '@/scripts/middleware';
import { setcontactor,getcontactor } from './scripts/stroge';
import makeTips from '@/scripts/tipsappend.js'


export default {
  data() {
    const list = makelist();

    const windowWidth = 0;
    const one = useContactorstore();
    const showWindow = false;
    const showOther = true;
    const authinfo = 'fucker'
    const showauth = true
    return {
      list,
      one,
      windowWidth,
      showWindow,
      showOther,
      authinfo,
      showauth
    }
  },
  mounted() {
    const currerntcode = auth()
    console.log(currerntcode)
    if (currerntcode ==  'root'){
      makeTips.info("欢迎主人")
      this.showauth = false
    }else if(currerntcode == 'user'){
      makeTips.info("欢迎使用")
      this.showauth = false
    }

    this.getWindowWidth(); // 获取初始窗口宽度
    window.addEventListener('resize', this.handleResize); // 监听窗口大小变化
    watch(() => this.windowWidth, (newValue, oldValue) => {
      if (newValue > 600) {
        this.showOther = true;
        this.showWindow = true;
      } else if (this.one.uin == 10000) {
        this.showOther = true
        this.showWindow = false
      } else {
        this.showOther = false
        this.showWindow = true
      }
    })

    watch(() => this.one.uin, (newValue, oldValue) => {
      if (this.windowWidth < 600) {
        console.log(`${newValue},${oldValue}`)
        if (newValue != 10000) {
          this.showOther = false
          this.showWindow = true
        } else if (oldValue != 10000) {
          this.showOther = true
          this.showWindow = false
        } else {
          this.showOther = false
          this.showWindow = true
        }
      }
    })

    if (this.windowWidth < 600) {
      this.list.forEach(element => {
        if (!element.lasttime && !this.one.inited.includes(element.uin)) {
          initcontactor(element)
          this.one.inited.push(element.uin)
        }
      });
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize); // 在组件销毁前移除事件监听
  },
  components: {
    sidebar,
    friendlist,
    RouterView,
    AuthLogin
  }, methods: {
    getWindowWidth() {
      this.windowWidth = window.innerWidth; // 获取初始窗口宽度
      if (this.windowWidth > 600) {
        this.showOther = true;
        this.showWindow = true;
      } else {
        this.showOther = true
        this.showWindow = false
      }
    },
    handleResize() {
      this.windowWidth = window.innerWidth; // 更新当前网页宽度
    },
    tryauth(status){
      if (status === 'fucker'){
        makeTips.warn("无效的鉴权码")
      }else if(status === 'root'){
        // 给最高权限
        makeTips.info("欢迎使用")
        this.showauth = false
      }else{
        //给一般权限
        makeTips.info("欢迎使用")
        this.showauth = false
      }
    },exchange(uin){
      console.log("update store")
      if (this.windowWidth < 600) {
          this.showOther = false
          this.showWindow = true
      }
    },list(){
      makeTips.warn("asAS ")
    }
  }
}
</script>

<template>
  <AuthLogin v-if="showauth" @get="tryauth"/>
  <sidebar v-if="showOther" />
  <friendlist v-if="showOther" @changed="exchange" />
  <RouterView v-if="showWindow" @tolist="list" />
</template>

<style>
@media (max-width: 600px) {
  #friendlists {
    height: calc(100% - 40px);
    flex-basis: 100%;
    max-width: 100%;
    border: 0px;
  }

  #app {
    flex-direction: column-reverse;
  }

  #sidebar {
    background-color: rgb(250, 250, 250);
    height: 48px;
    min-width: 100%;
    flex-direction: row;
  }

  #sidebar .avatar {
    display: none;
  }

  .options#side {
    flex-direction: row;
  }

  .options#side .up-half {
    padding-top: 0px;
  }

  .options#side .up-half,
  .options#side .down-half {
    padding-top: 24px;
    flex-basis: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  #app {
    border: none;
    border-radius: 0px;
  }

  body {
    margin: 0;
    height: 100vh;
  }

  .upsidebar#friends {
    background-color: rgb(240, 240, 240);
  }

  .bu-add button,
  .search#people {
    background-color: white;
  }

  .inputbar {
    flex-direction: column-reverse;
    flex-basis: none;
    min-height: 0;
    padding-top: 8px;
  }

  .input-box {
    margin-bottom: 4px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;

  }

  .input-content textarea {
    height: 24px;
    width: 100%;
    background-color: rgb(255, 255, 255);
  }

  .input-content {
    flex-grow: 0;
    flex-wrap: wrap;
    flex-direction: column;
    max-width: calc(100% - 72px);
    margin: 0px 8px;
  }

  .input-box button {
    margin: 0px 8px;
    height: 28px;
  }

  .inputbar>.options {
    display: flex;
    justify-content: space-between;
    padding: 0px 16px;
    border-top: 0px;
  }
}</style>