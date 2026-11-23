<script setup>
import TheUser from './components/user/TheUser.vue';
import TheCart from './components/product/TheCart.vue';
const user = {
  firstname: 'John',
  lastname: 'Doe',
  age: 52
}

const cart = {
  products: [
    {
      name: 'Clavier',
      price: 10,
      isAvailable: true
    },
    {
      name: 'Souris',
      price: 20,
      isAvailable: false
    }
  ]
}
</script>

<template>
  <TheUser :user="user" />
  <TheCart :items="cart" />
</template>

<style scoped></style>
