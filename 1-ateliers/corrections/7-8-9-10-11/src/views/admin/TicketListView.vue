<template>
  <section v-if="totalTickets > 0">
    <h2>{{ totalTickets }} tickets reçus</h2>
    <article v-for="ticket in tickets">
        <ul>
            <li v-for="(value, prop) in ticket" :key="prop">
            {{ prop }} : {{ value}}
            </li>
        </ul>
        <hr>
    </article>
  </section>
  <h2 v-else>Aucun ticket reçu</h2>
  <p class="error" v-if="fetchError">{{ fetchError }}</p>
  <p class="error" v-if="submitError">{{ submitError }}</p>
</template>
<script setup>
import { useSupportStore } from "@/stores/supportStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const useSupport = useSupportStore();
const { tickets, totalTickets, submitError, fetchError } = storeToRefs(useSupport);

onMounted(() => {
  if (tickets.value.length > 0) return;
  useSupport.fetchTickets();
});
</script>
<style scoped>
h2 {
  text-align: center;
}
</style>
