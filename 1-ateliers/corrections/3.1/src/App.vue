<script setup>
import { ref } from "vue";
import TheForm from "./components/TheForm.vue";
import TheDisplay from "./components/TheDisplay.vue";

const user = ref({
  lastname: "",
  firstname: "",
  age: null,
  technos: [],
});
</script>

<template>
  <main>
    <div>
      <TheForm @update:user="user = $event" />
    </div>
    <div class="colonne">
      <TheDisplay :user="user" />
    </div>
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

main > div {
  grid-column: span 1;
}
</style>
