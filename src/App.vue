<script setup>
import {onMounted} from "vue"
import Nav from "./components/Nav.vue"
import {RouterView} from "vue-router"
import {useUserStore} from "./stores/users"

const userStore = useUserStore()

onMounted(() => {
  userStore.getUser()  //this is fetching the signed in user, and not to lose it after the refresh
})
</script>

<template>
  <main>
    <Nav />
    <RouterView />
  </main>
</template>

<style scoped>
</style>
