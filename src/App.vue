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


