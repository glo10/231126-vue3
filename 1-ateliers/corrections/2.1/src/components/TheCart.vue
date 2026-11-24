<script setup>
const { product } = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-quantity'])

function changeQuantity(qty) {
  emit('update-quantity', product.id, qty)
}
</script>

<template>
  <article>
    <img :src="product.image" :alt="product.title" />

    <div>
      <h3>{{ product.title }}</h3>
      <p>{{ product.description }}</p>
      <p>{{ product.price.toFixed(2) }} €</p>
    </div>

    <div>
      <button type="button" @click="changeQuantity(-1)">
        -
      </button>
      <span>{{ product.quantity }}</span>
      <button type="button" @click="changeQuantity(1)">+</button>
    </div>
  </article>
</template>