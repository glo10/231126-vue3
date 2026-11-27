<script setup>
import { reactive, watch } from "vue";
import TheItem from "../product/TheItem.vue";
import { useProductStore } from "@/stores/productStore.js";

const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["add-to-cart"]);
const productStore = useProductStore();

// Quantités sélectionnées par référence produit indépendantes du stock store
const quantities = reactive({});

watch(
  () => props.products,
  (newProducts) => {
    for (const p of newProducts ?? []) {
      if (quantities[p.reference] === undefined) {
        quantities[p.reference] = 0;
      }
      const maxStock = Math.max(0, Number(p.stock) || 0);
      if (quantities[p.reference] > maxStock) {
        quantities[p.reference] = maxStock;
      }
    }
  },
  { immediate: true }
);

function cleanQuantity(product, rawValue) {
  const maxStock = Math.max(0, Number(product.stock) || 0);
  const parsed = Number(rawValue);
  if (Number.isNaN(parsed) || parsed < 0) return 0;
  return Math.min(Math.floor(parsed), maxStock);
}

function changeQuantity(product, delta) {
  const current = quantities[product.reference] || 0;
  quantities[product.reference] = cleanQuantity(product, current + delta);
}

function onInputQuantity(product, event) {
  quantities[product.reference] = cleanQuantity(product, event.target.value);
}

function handleAddToCart(product) {
  const qty = cleanQuantity(product, quantities[product.reference] || 0);
  if (qty <= 0) return;

  emit("add-to-cart", { product, quantity: qty });
  quantities[product.reference] = 0;
}
</script>

<template>
  <section>
    <h2>Ajoutez au panier</h2>
    <template v-if="props.products.length > 0">
      <TheItem
        v-for="item in props.products"
        :key="item.reference"
        :product="item"
        @setitem-rating="productStore.setItemRating(item.reference, item.rating)"
        @toggle-description="productStore.toggleDescription"
      >
        <template #actions="{ product: item }">
          <div class="actions">
            <button
              type="button"
              :disabled="item.stock <= 0 || (quantities[item.reference] || 0) <= 0"
              @click="changeQuantity(item, -1)"
            >
              -1
            </button>

            <input
              type="number"
              min="0"
              :max="item.stock"
              :disabled="!item.inStock"
              :value="quantities[item.reference] || 0"
              @input="onInputQuantity(item, $event)"
            />

            <button
              type="button"
              :disabled="!item.inStock"
              @click="changeQuantity(item, 1)"
            >
              +1
            </button>

            <strong>
              {{
                ((Number(item.price) || 0) * (quantities[item.reference] || 0)).toFixed(2)
              }}
              €
            </strong>

            <button
              type="button"
              :disabled="!item.inStock"
              @click="handleAddToCart(item)"
            >
              Ajouter au panier
            </button>
          </div>
        </template>
      </TheItem>
    </template>

    <div v-else>
      <p>
        Aucun produit est disponible, visitez la
        <span>
          <router-link :to="{ name: 'products' }">page produits</router-link> pour charger
          les produits
        </span>
      </p>
    </div>
  </section>
</template>
<style scoped>
section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

article {
  border: 1px solid #ccc;
  padding: 1rem;
}

h2 {
  grid-column: 1 / -1;
  text-align: center;
}

.actions {
  display: flex;
  justify-content: space-around;
  margin: 0.5em;
  align-items: center;
  flex-wrap: wrap;
}

.actions button:last-of-type {
  flex-basis: 100%;
  margin-top: .5rem;
}

input {
  width: 50px;
}

button, input {
  padding: 0.5rem;
}
</style>
