<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'

const route = useRoute()
const productStore = useProductStore()
const product = computed(() => productStore.findProductByReference(route.params.reference))
</script>

<template>
  <div v-if="product">
    <h3>Caractéristiques et disponibilité</h3>
    <ul>
      <li>Disponibilité : {{ product.inStock ? 'En stock' : 'Rupture de stock' }}</li>
      <li>Quantité en stock : {{ product.stock }}</li>
      <li>Action : {{ product.stock < 50 ? 'Approvisionner stock < 50 unités' : 'RAS'}}</li>
    </ul>
  </div>
</template>