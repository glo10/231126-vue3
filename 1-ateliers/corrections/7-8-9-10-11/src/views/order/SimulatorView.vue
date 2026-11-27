<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import SelectStatus from "@/components/order/SelectStatus.vue";
import TheInfo from "@/components/order/TheInfo.vue";
import AddToCart from "@/components/order/AddToCart.vue";
import { useOrderStore } from "@/stores/orderStore";
import { useProductStore } from "@/stores/productStore";

const orderStore = useOrderStore();
const { order } = storeToRefs(orderStore);

const productStore = useProductStore();
const { displayedItems } = storeToRefs(productStore);

onMounted(() => {
  if (displayedItems.value.length === 0) {
    productStore.fetchProducts();
  }
});
</script>

<template>
  <section>
    <h2>Similateur d'une commande</h2>
    <div>
      <SelectStatus :order="order" @update-status="orderStore.updateStatus" />
      <hr />
      <TheInfo :order="order" />
    </div>
    <hr />
    <AddToCart
      :products="displayedItems"
      @add-to-cart="({ product, quantity }) => orderStore.addToCart(product, quantity)"
    />

  </section>
</template>
<style scoped>
div {
  display: flex;
  justify-content: center;
  align-content: flex-start;
  margin: auto;
  width: 90%;
}
</style>