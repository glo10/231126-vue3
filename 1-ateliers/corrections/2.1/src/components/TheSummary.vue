<script setup>
defineProps({
  subtotal: {
    type: Number,
    required: true
  },
  deliveryFee: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <aside>
    <h2>Total</h2>

    <div>
      <span>Sous-total</span>
      <span> : {{ subtotal.toFixed(2) }} €</span>
    </div>

    <div>
      <span>Livraison</span>
      <span> : {{ deliveryFee.toFixed(2) }} €</span>
    </div>

    <hr />

    <div>
      <span>Total</span>
      <span> : {{ total.toFixed(2) }} €</span>
    </div>
  </aside>
</template>