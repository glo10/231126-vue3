<script setup>
import { onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/productStore";
import TheItem from "@/components/product/TheItem.vue";
const productStore = useProductStore();
const {
  displayedItems,
  onlyInStock,
  stockValue,
  isLoading,
  fetchError,
  inStockItems,
  items,
} = storeToRefs(productStore);
const {
  toggleOnlyInStock,
  fetchProducts,
  toggleDescription,
  setItemRating,
} = productStore;

function handleKeydown(event) {
  if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "t") {
    event.preventDefault();
    toggleOnlyInStock();
  }
}

onMounted(() => {
  fetchProducts();
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <section>
    <h2>Catalogue : {{ items.length }} produits</h2>
    <button type="button" @click="toggleOnlyInStock()">
      {{
        onlyInStock
          ? `Afficher tous les articles`
          : `Afficher uniquement les ${inStockItems.length} articles disponibles`
      }}
    </button>
    <div>
      <p>(Raccourci : Ctrl + Alt + T)</p>
      <p>Cliquez sur le titre pour afficher la description du produit</p>
    </div>
    <p v-if="isLoading">Chargement des produits...</p>
    <p v-else-if="fetchError" class="error">Erreur : {{ fetchError }}</p>
    <div v-else v-for="item in displayedItems" :key="item.reference" class="border">
      <TheItem
        :product="item"
        @toggle-description="toggleDescription"
      />
    </div>
    <footer>
      <p>
        <strong>Valeur du stock : {{ stockValue?.toFixed(2) }} € </strong>
      </p>
    </footer>
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}

button {
  width: 75%;
  margin: auto;
  padding: 0.5rem 1rem;
}

footer {
  grid-column: 1 / -1;
}

footer p {
  font-size: 1.5rem;
  text-align: center;
}

.border {
  border: 1px solid #ccc;
}
</style>
