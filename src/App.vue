<script>
import { RouterView } from 'vue-router'
import sidebar from './components/SideBar.vue'
import friendlist from './components/FriendLists.vue'

export default{
    components:{
        sidebar,
        friendlist,
        RouterView
    }
}
</script>

<template>
  <sidebar />
  <friendlist />
  <RouterView />
</template>

<style>
@media (max-width: 600px) {
  #chatwindow {
    display: none;
  }
  #friendlists {
    flex-basis: 100%;
    max-width: 100%;
  }
  #app{
    flex-direction: column-reverse;
  }
  #sidebar{
    height: 48px;
    min-width: 100%;
    flex-direction: row;
  }
  #sidebar .avatar{
    display: none;
  }
  .options#side{
    flex-direction: row;
  }
  .options#side .up-half{
    padding-top: 0px;
  }
  .options#side .up-half,
  .options#side .down-half{
    padding-top: 24px;
    flex-basis: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>