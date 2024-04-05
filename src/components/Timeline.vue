<script setup>
import Card from "./Card.vue";
import Container from "./Container.vue";

const data = [
  {
    id: 1,
    username: "idilego",
    url: "https://blog.minifigures.com/wp-content/uploads/2021/03/teddi-mightsmallstories-cmfseries21-00.jpg",
    caption: "Ladybird and I"  },

  {
    id: 2,
    username: "brickseven",
    url: "https://www.lego.com/cdn/cs/set/assets/bltd67c11a183b8a5f1/Amsterdam.jpeg?format=jpg&quality=80&width=700&dpr=1?fit=crop&quality=80&width=700&dpr=1",
    caption: "Getting around, Dutch style"
  },

  {
    id: 3,
    username: "paigecaldaralo",
    url: "https://www.lego.com/cdn/cs/set/assets/bltc8bf8ec816d588ee/New_York.jpeg?format=jpg&quality=80&width=700&dpr=1?format=webply&fit=crop&quality=75&width=700&dpr=1",
    caption: "Next stop: The Big Apple"
  }
  ,
  {
    id: 4,
    username: "LegoJim007",
    url: "https://www.lego.com/cdn/cs/set/assets/bltba82cfa00343e001/Vegas.jpeg?format=jpg&quality=80&width=700&dpr=1?format=webply&fit=crop&quality=75&width=700&dpr=1",
    caption: "Parties in the desert"
  }
];
</script>

<template>
  <Container>
    <div class="timeline-container">
      <Card v-for="post in data" 
      :key="post.id"
      :cardIsThePropsName="post"/>
    </div>
  </Container>
</template>

<style scoped>
.timeline-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
}
</style>
