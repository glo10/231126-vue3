<script setup>
import { computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import TheStar from "./TheStar.vue";
const { reference } = defineProps({
  reference: {
    type: String,
    required: true,
  },
});
const productStore = useProductStore();
const product = computed(() => productStore.findProductByReference(reference));
</script>

<template>
  <div v-if="product">
    <h3>Évaluation client</h3>
    <p>
      Note actuelle : <strong>{{ product.rating }} / 5</strong>
    </p>
    <div>
      <TheStar
        :product="product"
        :rating="product.rating"
        @setitem-rating="(star) => productStore.setItemRating(product.reference, star)"
      />
    </div>
  </div>
</template>
