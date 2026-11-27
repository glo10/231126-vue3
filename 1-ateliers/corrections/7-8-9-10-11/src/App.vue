<script setup>
import { menu } from "./routes";
import { RouterLink, RouterView } from "vue-router";
import CartIcon from "@/components/icons/CartIcon.vue";
import { useOrderStore } from "./stores/orderStore";
import { storeToRefs } from "pinia";
const orderStore = useOrderStore()
const { order } = storeToRefs(orderStore)
</script>

<template>
  <h1>Ateliers 7.1, 8.1, 9.1, 10.1 et 11.1</h1>
  <nav>
    <ul>
      <li v-for="item in menu" :key="item.name">
        <RouterLink :to="item.path">{{ item.name }}</RouterLink>
      </li>
    </ul>
  </nav>
  <main>
  <RouterView/>
  </main>
      <CartIcon v-if="order.items.length" />
</template>

<style scoped>
h1 {
  text-align: center;
}

ul {
  list-style-type: none;
  display: flex;
  justify-content: space-between;
}

li {
  font-size: 1.1rem;
  text-decoration: underline;
}

li a {
  color: #141414;
  text-transform: capitalize;
}
</style>
