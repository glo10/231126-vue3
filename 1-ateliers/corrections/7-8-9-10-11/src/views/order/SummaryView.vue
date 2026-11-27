<script setup>
import { useOrderStore } from "@/stores/orderStore";
import { storeToRefs } from "pinia";

const orderStore = useOrderStore();
const { order, totalPrice } = storeToRefs(orderStore);
</script>

<template>
  <section>
    <h2>Mon panier</h2>
    <ul>
      <li v-for="product in order?.items ?? []" :key="product.id ?? product.name">
        <strong>{{ product.quantity }}</strong> {{ product.name }} à <strong>{{ product.price }} €</strong>
        l'unité pour un sous-total de
        <strong>{{ (product.price * product.quantity).toFixed(2) }} €</strong>
      </li>
    </ul>
    <h3>
      Total : <strong>{{ (totalPrice ?? 0).toFixed(2) }} €</strong>
    </h3>
  </section>
</template>
