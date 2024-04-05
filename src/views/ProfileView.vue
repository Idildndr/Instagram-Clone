<script setup>
import Profile from '../components/Profile.vue'
</script>

<template>
    <div>
        <Profile :key="$route.params.username "
        ></Profile>
    </div>
</template>