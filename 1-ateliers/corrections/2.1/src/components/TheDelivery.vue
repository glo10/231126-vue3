<script setup>
defineProps({
  relayPoints: {
    type: Array,
    required: true
  },
  selectedRelayId: {
    type: [Number, String],
    required: true
  },
  deliveryFee: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['select-relay'])

function onSelect(event) {
  emit('select-relay', event.target.value)
}
</script>

<template>
  <section>
    <h3>Livraison en point relais</h3>

    <div>
      <label
        v-for="relay in relayPoints"
        :key="relay.id"
      >
        <input
          type="radio"
          name="relayPoint"
          :value="relay.id"
          :checked="relay.id === selectedRelayId"
          @change="onSelect"
        />
        <span>
          <strong>{{ relay.name }}</strong> — {{ relay.address }}
        </span>
      </label>
    </div>

    <p>
      Tarif de livraison : <strong>{{ deliveryFee.toFixed(2) }} €</strong>
    </p>
  </section>
</template>