<script setup>
defineProps({
  rating: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["setitem-rating"]);
</script>

<template>
  <div class="stars">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      :class="{ active: star <= rating }"
      @click="emit('setitem-rating', star)"
    >
      ★
    </button>
  </div>
</template>

<style scoped>
.stars {
  display: inline-flex;
  align-items: center;
  gap: 0.15rem;
}

button {
  background: #fff;
  color: #ccc;
  border: none;
  padding: 0.25rem;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}

button.active {
  color: #f59e0b;
  font-weight: 900;
}
</style>
