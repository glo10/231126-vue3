<script setup>
import TheStar from "./TheStar.vue";
import { useProductStore } from "@/stores/productStore.js";
const { product } = defineProps({
  product: Object,
});
const emit = defineEmits(["toggle-description", "setitem-rating"]);
const productStore = useProductStore();
</script>
<template>
  <!-- 
      slot emplacement reservé par l'enfant pour que le parent puisse injecter ici du contenu
      l'enfant peut avoir plusieurs slot et les nommer pour que le parent puisse cibler la zone
      l'enfant peut transmettre des props comme c'est le cas ici pour que le parent s'occupe de
      l'affichage avec les données fournies
      -->
  <article>
    <header
      :style="
        product.inStock
          ? { color: 'blue' }
          : { color: 'grey', textDecoration: 'line-through' }
      "
    >
        <h3>Réf. : {{ product.reference }}</h3>
        <h3 @click="emit('toggle-description', product)" class="name">
          {{ product.name }}
        </h3>
    </header>
    <main>
        <img :src="product.cover" :alt="`cover of ${product.name} product`" />
        <p v-if="product.showDescription" class="description">
          {{ product.description }}
        </p>
        <p>
          Prix unitaire : <strong>{{ product.price }}</strong> €
        </p>
        <p v-if="product.inStock">
          Stock :
          <strong>{{ product.stock }}</strong>
        </p>
        <p :class="[product.inStock ? 'success' : 'error']">
          Disponibilité :
          <span v-if="product.inStock">En stock</span>
          <span v-else>Rupture (Qté &lt; 50 unités)</span>
        </p>
    </main>
    <footer>
        <router-link
          :to="{ name: 'product-details', params: { reference: product.reference } }"
          class="details-link"
          >Voir en détails
        </router-link>
        <div>
          <TheStar
            :product="product"
            :rating="product.rating"
            @setitem-rating="
              (star) => productStore.setItemRating(product.reference, star)
            "
          />
        </div>
    </footer>
    <slot name="actions" :product="product"></slot>
  </article>
</template>
<style scoped>
section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.5rem;
}

footer,
header {
  display: flex;
  flex-direction: column;
}

header {
  align-content: center;
}

a button {
  padding: 0.5rem 1rem;
}

img {
  width: 250px;
}

.name {
  cursor: pointer;
}

.details-link {
  margin-left: 0.75rem;
  font-size: 1.1rem;
  align-self: end;
}

.description {
  padding: 0.25rem 0.75rem;
}
p.error span {
  display: inline-block;
  padding: 1.1rem;
}
footer p {
  font-size: 1.5rem;
  text-align: center;
}
</style>
