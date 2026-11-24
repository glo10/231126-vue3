<script setup>
import { computed } from "vue";

const { user } = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const ageStatusHtml = computed(() => {
  if (
    user.age === null ||
    user.age === "" ||
    Number.isNaN(user.age)
  ) {
    return "";
  }
  const ageStatus = user.age >= 18 ? "majeur(e)" : "mineur(e)";
  return `<p>Vous êtes <strong>${ageStatus}</strong></p>`;
});
</script>

<template>
  <section>
    <h2>Affichage</h2>

    <p><strong>Prénom :</strong> {{ user.firstname || "-" }}</p>
    <p><strong>Nom :</strong> {{ user.lastname ? user.lastname :  "-" }}</p>
    <p><strong>Âge :</strong> {{ user.age ?? "-" }}</p>

    <div v-if="ageStatusHtml" v-html="ageStatusHtml"></div>

    <div>
      <strong>Technos :</strong>
      <ul v-if="user.technos.length > 0">
        <li v-for="(techno, index) in user.technos" :key="index">
          {{ techno }}
        </li>
      </ul>
      <p v-else>Aucune techno ajoutée pour le moment.</p>
    </div>
  </section>
</template>
