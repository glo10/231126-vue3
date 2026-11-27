<script setup>
import { computed, onMounted } from "vue";
import TheGoBackIcon from "@/components/icons/GoBackIcon.vue";
import { useProductStore } from "@/stores/productStore";

const props = defineProps({
  reference: {
    type: String,
    required: true,
  },
});

const productStore = useProductStore();
const product = computed(() => productStore.findProductByReference(props.reference));

onMounted(() => {
  if (productStore.items.length === 0) {
    productStore.fetchProducts();
  }
});
</script>

<template>
  <section>

    <router-link :to="{ name: 'products' }">
      <TheGoBackIcon />
      Retour aux produits</router-link
    >

    <article v-if="product">
      <h2>{{ product.name }}</h2>
      <p><strong>Référence :</strong> {{ product.reference }}</p>
      <img :src="product.cover" :alt="`cover of ${product.name}`" />
      <p>{{ product.description }}</p>
      <nav class="sub-nav">
        <router-link
          :to="{ name: 'product-specs', params: { reference: product.reference } }"
        >
          Caractéristiques &amp; Stock
        </router-link>
        <router-link
          :to="{ name: 'product-reviews', params: { reference: product.reference } }"
        >
          Avis &amp; Note ({{ product.rating }}/5)
        </router-link>
      </nav>
      <router-view />
    </article>

    <div v-else>
      <p>
        Produit introuvable pour la référence <strong>{{ reference }}</strong
        >.
      </p>
    </div>
  </section>
</template>

<style scoped>
img {
  width: 260px;
  display: block;
  margin: 0.75rem 0;
}

.sub-nav {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
}

.sub-nav a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}

</style>
