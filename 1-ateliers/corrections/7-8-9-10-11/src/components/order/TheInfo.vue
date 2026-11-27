<script setup>
const { order } = defineProps({
  order: Object,
});
</script>
<template>
  <section>
    <h2>Informations de la commande</h2>
    <ul>
      <li>
        Identifiant : <strong> {{ order.id }}</strong>
      </li>
      <li>
        Statut actuel : <strong> {{ order.status }}</strong>
      </li>
      <li>
        Client :
        <strong>
          {{ order.customer.firstname }} {{ order.customer.lastname }} ({{
            order.customer.email
          }})</strong
        >
      </li>
      <template v-if="['shipped', 'delivered'].includes(order.status)">
        <li>
          Livraison : <strong> {{ order.delivery }}</strong>
        </li>
        <li>
          Transporteur : <strong> {{ order.carrier }}</strong>
        </li>
        <li>
          Date d'estimation de la livraison :
          <strong> {{ order.estimatedDeliveryDate }}</strong>
        </li>
      </template>
      <li v-if="order.status === 'cancelled'">
        Raison de l'annulation : <strong> {{ order.cancellationReason }}</strong>
      </li>
    </ul>
  </section>
</template>
<style scoped>
li {
  padding: 0.5rem;
}
</style>
