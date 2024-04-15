<script setup>
import { ref, defineProps, onMounted, reactive} from "vue";
import { supabase } from "../supabase";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const loading = ref(false);
const open = ref(false);
const file = ref(null);
const errorMessage = ref("");
const userStore = useUserStore();
const filePathUserPicture = ref(null);
const props = defineProps(["user"]);

const { user } = storeToRefs(userStore);

const showModal = () => {
  open.value = true;
};

const handleOk = async () => {
  loading.value = true;
  const fileName = Math.floor(Math.random() * 1000000000);
  let filePath;
  if (file.value) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("profile_pictures")
      .upload("public/" + fileName, file.value);

    if (uploadError) {
      loading.value = false;
      return (errorMessage.value = "Unable to upload image ");
    }

    filePath = uploadData.path;

    // we either get data or the error, and if we get data we successfully added it to our db, we need to add that to our table
    await supabase
      .from("users")
      .update({ profile_picture: filePath })
      .eq("id", user.value.id);
    console.log("User profile picture updated successfully:", filePath);

    filePathUserPicture.value = filePath;

    loading.value = false;
    open.value = false;
  }
};

const handleCancel = () => {
  open.value = false;
};

const handleUploadChange = (e) => {
  if (e.target.files[0]) {
    file.value = e.target.files[0];
  }
};

onMounted(async () => {
  // Load user's profile picture when component is mounted
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("profile_picture")
    .eq("id", user.value.id)
    .single();

  if (userError) {
    console.error("Error fetching user data:", userError.message);
    return;
  }

  if (userData) {
    // If user has a profile picture, set it
    user.profile_picture = userData.profile_picture;
    filePathUserPicture.value = userData.profile_picture;
  }
});


</script>

<template>
  <div>
    <div v-if="props.user.id === user.id">
      <div @click="showModal" style="cursor: pointer">
        <img
          v-if="!props.user.profile_picture"
          src="../assets/avatar.png"
          class="img-fluid bi pe-none me-2 circular-img"
          width="100"
          height="100"
          alt="Profile"
        />

        <img
          v-else
          :src="
            `https://zqhfyaogkxyaxbujetnx.supabase.co/storage/v1/object/public/profile_pictures/` +
            props.user.profile_picture
          "
          class="img-fluid bi pe-none me-2 circular-img"
          width="100"
          height="100"
          alt="Profile"
        />
      </div>
    </div>

    <div v-else>
      <img
        v-if="!props.user.profile_picture"
        src="../assets/avatar.png"
        class="img-fluid bi pe-none me-2 circular-img"
        width="100"
        height="100"
        alt="Profile"
      />
      <img
        v-else
        :src="
          `https://zqhfyaogkxyaxbujetnx.supabase.co/storage/v1/object/public/profile_pictures/` +
          props.user.profile_picture
        "
        class="img-fluid bi pe-none me-2 circular-img"
        width="100"
        height="100"
        alt="Profile"
      />
    </div>

    <a-modal v-model:open="open" title="Upload Photo" @ok="handleOk">
      <div v-if="!loading">
        <input type="file" accept=".jpeg, .png" @change="handleUploadChange" />

        <ATypographyText v-if="errorMessage" type="danger">{{
          errorMessage
        }}</ATypographyText>
      </div>
      <div class="spinner" v-else>
        <a-spin></a-spin>
      </div>
    </a-modal>
  </div>
</template>

<style scoped>
input {
  margin-top: 10px;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.circular-img {
  border-radius: 50%;
  width: 150px; /* Adjust this value as needed */
  height: 150px; /* Adjust this value as needed */
}
</style>
