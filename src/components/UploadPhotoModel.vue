<script setup>
import { ref, defineProps } from "vue";
import { supabase } from "../supabase";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const loading = ref(false);
const open = ref(false);
const caption = ref("");
const file = ref(null);
const errorMessage = ref("");
const userStore = useUserStore();
const props = defineProps(["addNewPost"]);

const { user } = storeToRefs(userStore);

const showModal = () => {
  open.value = true;
};

const handleOk = async () => {
  loading.value = true;
  const fileName = Math.floor(Math.random() * 1000000000);
  let filePath
  if (file.value) {
    const { data, error } = await supabase.storage
      .from("images")
      .upload("public/" + fileName, file.value);

    if (error) {
      loading.value = false;
      return (errorMessage.value = "Unable to upload image ");
    }

    filePath = data.path
    // we either get data or the error, and if we get data we successfully added it to our db, we need to add that to our table
    await supabase.from("posts").insert({
      url: filePath,
      caption: caption.value,
      owner_id: user.value.id,
    });

  }
  loading.value = false;
  caption.value = ""
  open.value = false;

  props.addNewPost({
    url: filePath,
    caption: caption.value,
  });
};

const handleCancel = () => {
  open.value = false;
};

const handleUploadChange = (e) => {
  if (e.target.files[0]) {
    file.value = e.target.files[0];
  }
};
</script>

<template>
  <div>
    <a-button @click="showModal"> Upload Photo</a-button>
    <a-modal v-model:open="open" title="Upload Photo" @ok="handleOk">
      <div v-if="!loading">
        <input type="file" accept=".jpeg, .png" @change="handleUploadChange" />
        <a-input
          v-model:value="caption"
          placeholder="Caption..."
          :max-length="50"
        >
        </a-input>
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
</style>
