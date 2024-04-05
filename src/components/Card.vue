
<script setup>
import {defineProps} from "vue"

const props = defineProps(['cardIsThePropsName'])

</script>

<template>
    <a-card  class="card" hoverable style="width: 300px">
      <template #cover>
        <img alt="example" :src="cardIsThePropsName.url" />
      </template>
      <a-card-meta :title="cardIsThePropsName.username">
        <template #description>{{ cardIsThePropsName.caption }} </template>
      </a-card-meta>
    </a-card>
  </template>
  
  
  <style scoped>
.card{
    margin-bottom: 20px;
}
</style>