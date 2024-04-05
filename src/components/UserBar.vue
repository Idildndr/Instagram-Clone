<script setup>
import { defineProps } from "vue";
import UploadPhotoModel from "./UploadPhotoModel.vue";
import { useUserStore } from "@/stores/users";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import {supabase} from "../supabase"

const route = useRoute();
const userStore = useUserStore();

const {user} = storeToRefs(userStore)
const {username: profileUsername} = route.params 

const props = defineProps(['user', 'userInfo', 'addNewPost'])

const followUser = async()=>{
  const  res=  await supabase.from("followers_following").insert({
    follower_id : user.value.id,
    following_id : props.user.id
   })

   console.log(res)
}
</script>

<template>
  <div class="userbar-container" v-if="props.user">
    <div class="top-content">
      <a-typography-title :level="2"> {{ props.user.username }} {{ props.thisIsThePropName  }} {{ props.isFollowing }} </a-typography-title>
      <div v-if="user">
        <UploadPhotoModel 
                v-if="profileUsername === user.username"
                :addNewPost="addNewPost"
            />

      </div>
    </div>
    <div class="bottom-content">
      <a-typography-title :level="5"
        >{{ userInfo.posts }} posts</a-typography-title
      >
      <a-typography-title :level="5"
        >{{ userInfo.followers }} followers</a-typography-title
      >
      <a-typography-title :level="5"
        >{{ userInfo.following }} following</a-typography-title
      >
    </div>
  </div>
</template>

<style scoped>
.userbar-container {
  padding-bottom: 75px;
}

.bottom-content {
  display: flex;
  align-items: center;
}

.top-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottom-content h5 {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  margin-right: 30px;
}

.top-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
