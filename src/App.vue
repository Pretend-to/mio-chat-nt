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
  #sidebar,
  #chatwindow {
    display: none;
  }
  #friendlists {
    flex-basis: 100%;
    max-width: 100%;
  }

}
</style>