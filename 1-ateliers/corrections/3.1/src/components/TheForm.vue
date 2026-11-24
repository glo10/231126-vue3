<script setup>
import { reactive, ref, watch } from "vue";

const emit = defineEmits(["update:user"]);

const user = reactive({
  lastname: "",
  firstname: "",
  age: null,
  technos: [],
});

const newTechno = ref("");

function addNewTechno() {
  const v = newTechno.value.trim();
  if (!v) return;

  user.technos.push(v);
  newTechno.value = "";
}

watch(
  user,
  (val) => {
    emit("update:user", {
      ...val,
      technos: [...val.technos],
    });
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <form @submit.prevent>
    <h2>Saisie</h2>

    <div>
      <label for="firstname">Prénom</label>
      <input
        id="firstname"
        v-model="user.firstname"
        type="text"
        placeholder="Votre nom"
      />
    </div>
    <div>
      <label for="lastname">Nom</label>
      <input
        id="lastname"
        v-model="user.lastname"
        type="text"
        placeholder="Votre prénom"
      />
    </div>

    <div>
      <label for="age">Âge</label>
      <input
        id="age"
        v-model.number="user.age"
        type="number"
        min="13"
        placeholder="Votre âge"
      />
    </div>

    <div>
      <div>
        <input
          id="techno"
          v-model="newTechno"
          type="text"
          placeholder="Ajouter une techno"
          @keydown.enter.prevent="addNewTechno"
        />
        <button type="button" @click="addNewTechno">Ajouter</button>
      </div>
    </div>
  </form>
</template>
<style scoped>
label {
  padding-right: 1rem;
}
</style>
