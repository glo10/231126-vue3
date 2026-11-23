<script setup>
defineProps({
  paymentMethods: {
    type: Array,
    required: true
  },
  selectedMethod: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['select-method', 'submit-payment'])
</script>

<template>
  <section>
    <h3>Moyen de paiement</h3>

    <div>
      <label
        v-for="method in paymentMethods"
        :key="method.id"
      >
        <input
          type="radio"
          name="paymentMethod"
          :value="method.id"
          :checked="method.id === selectedMethod"
          @change="emit('select-method', method.id)"
        />
        <span>{{ method.label }}</span>
      </label>
    </div>

    <button
      type="button"
      @click="emit('submit-payment')"
    >
      Paiement ({{ total.toFixed(2) }} €)
    </button>
  </section>
</template>