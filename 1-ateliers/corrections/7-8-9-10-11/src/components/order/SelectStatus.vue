<script setup>
import { computed } from 'vue';
const { order } = defineProps({
    order: Object
})

const emit = defineEmits(["update-status"]);

const statusMessage = computed(() => {
  switch (order.status) {
    case "pending":
      return "Votre commande est en attente de paiement.";
    case "paid":
      return "Votre paiement est validé, la préparation de votre commande va démarrer.";
    case "shipped":
      return `Votre commande a été expédiée via ${order.carrier}.`;
    case "delivered":
      return `Votre commande a été livrée par le transporteur ${order.carrier}.`;
    case "cancelled":
      return "Votre commande a été annulée.";
    default:
      return null;
  }
});

function onStatusChange(event) {
  emit("update-status", event.target.value);
}
</script>
<template>
      <header>
    <h2>Changement de statut</h2>
    <form>
      <label for="status">Sélectionnez un statut : </label>
      <select id="status" :value="order.status" @change="onStatusChange">
        <option value="pending">En cours de traitement</option>
        <option value="paid">Payée</option>
        <option value="shipped">Expédiée</option>
        <option value="delivered">Livrée</option>
        <option value="cancelled">Annulée</option>
        <option value="-1">Inconnue</option>
      </select>
      <p v-if="statusMessage === null">
        <RouterLink :to="{ name: 'support' }">Contactez le support</RouterLink>
      </p>
      <p v-else>{{ statusMessage }}</p>

      <div v-if="order.status === 'cancelled'" class="error">
        <h3>Commande annulée - Raison : {{ order.cancellationReason }}</h3>
      </div>

      <template v-else-if="['shipped', 'delivered'].includes(order.status)">
        <p class="success"><strong>Transporteur : </strong> {{ order.carrier }}</p>
        <p class="success">
          <strong>Date d'estimation de la livraison :</strong>
          {{ order.estimatedDeliveryDate }}
        </p>
      </template>
    </form>
  </header>
</template>