<script setup>
import { ref, onMounted } from "vue";
import { useUsersStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
const userStore = useUsersStore()
const { users } = storeToRefs(userStore)

const isLoading = ref(false);
const errorMessage = ref("");

onMounted(() => {
  try {
    userStore.fetchUsers()
  } catch (error) {
    errorMessage.value = error.message || "Impossible de charger les utilisateurs.";
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <section>
    <h2>Liste des utilisateurs</h2>

    <p v-if="isLoading">Chargement des utilisateurs...</p>
    <p v-else-if="errorMessage" class="error">{{ errorMessage }}</p>

    <ul v-else>
      <li v-for="user in users" :key="user.id">
        <span>
          <strong>{{ user.name }}</strong>
        </span>
        <span>Email : {{ user.email }} </span>
        <span>Ville : {{ user.address?.city }}</span>
        <span>Entreprise : {{ user.company?.name }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0.5rem;
  display: grid;
  gap: 0.75rem;
}

li {
  padding: 0.75rem;
  border: 1px solid #141414;
  border-radius: 6px;
}

li span {
    display: block;
}
</style>
