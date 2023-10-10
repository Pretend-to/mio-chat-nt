<script>
import { RouterView } from 'vue-router'
import sidebar from './components/SideBar.vue'
import friendlist from './components/FriendLists.vue'
import { useContactorstore } from '@/stores/contactor';
import { watch } from 'vue';


export default {
  data() {
    const windowWidth = 0;
    const one = useContactorstore();
    const showWindow = false;
    const showOther = true;
    return {
      one,
      windowWidth,
      showWindow,
      showOther
    }
  },
  mounted() {
    this.getWindowWidth(); // 获取初始窗口宽度
    window.addEventListener('resize', this.handleResize); // 监听窗口大小变化
    watch(() => this.windowWidth,(newValue,oldValue) => {
            if(newValue > 600 ){
              this.showOther = true;
              this.showWindow = true;
            }else if(this.one.uin == 10000){
              this.showOther = true
              this.showWindow = false
            }else {
              this.showOther = false
              this.showWindow = true
            }
        }) 
    watch(() => this.one.uin,(newValue,oldValue) =>{
      if(this.windowWidth < 600 ){
          console.log(`${newValue},${oldValue}`)
          if(newValue != 10000){
            this.showOther = false
            this.showWindow = true
          }else if(oldValue != 10000){
            this.showOther = true
            this.showWindow = false
          }else{
            this.showOther = false
            this.showWindow = true
          }
      }
    })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize); // 在组件销毁前移除事件监听
  },
  components: {
    sidebar,
    friendlist,
    RouterView
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
    }

  }
}
</script>

<template>
  <sidebar v-if="showOther" />
  <friendlist v-if="showOther" />
  <RouterView v-if="showWindow" />
</template>

<style>
@media (max-width: 600px) {

  #friendlists {
    flex-basis: 100%;
    max-width: 100%;
  }

  #app {
    flex-direction: column-reverse;
  }

  #sidebar {
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
}</style>