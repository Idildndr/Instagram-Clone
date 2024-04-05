<script setup>
import Container from "./Container.vue";
import UserBar from "./UserBar.vue";
import ImageGallary from "./ImageGallary.vue";
import { ref, onMounted , watch} from "vue";
import { useRoute } from "vue-router";
import { supabase } from "../supabase";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const route = useRoute();
const user = ref(null); // user that we are currently on her/his page
const { username } = route.params;
const posts = ref([]);
const loading = ref(false);
const isFollowing = ref(false);

const userStore = useUserStore();
const { user: loggedInUser } = storeToRefs(userStore); //this is the ref that we previosuly deal with in the userstore


const addNewPost = (post) => {
  posts.value.unshift(post);
};

const fetchData = async () => {
  loading.value = true;
  const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("username", username)
    .single();

  if (!userData) {
    loading.value = false;
    return (user.value = null);
  }

  user.value = userData;

  const { data: postsData } = await supabase
    .from("posts")
    .select()
    .eq("owner_id", user.value.id);

  posts.value = postsData;

  await fetchIsFollowing();

  loading.value = false;
};

const fetchIsFollowing = async () => {
  if (loggedInUser.value && user.value.id !== loggedInUser.value.id) {
    const {data, error} = await supabase
      .from("followers_following")
      .select()
      .eq("follower_id", loggedInUser.value.id)
      .eq("following_id",user.value.id)
      .single();

    if (data)  isFollowing.value = true
     
  }
};

watch(loggedInUser, ()=>{
    fetchIsFollowing()
})

onMounted(() => {
  fetchData();
});
</script>

<template>
  <Container>
    <div class="profile-container" v-if="!loading">
      <UserBar
        :key="$route.params.username"
        :user="user"
        :userInfo="{
          posts: 4,
          followers: 100,
          following: 342,
        }"
        :addNewPost="addNewPost"
        :isFollowing="isFollowing"
      />
      <ImageGallary :posts="posts" />
    </div>
    <div v-else class="spinner">
      <ASpin />
    </div>
  </Container>
</template>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh;
}
</style>
