<script setup>
import TheContactForm from '@/components/support/TheContactForm.vue'
import { useSupportStore } from '@/stores/supportStore'
import { useOrderStore} from '@/stores/orderStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { createTicket } = useSupportStore()
const orderStore = useOrderStore()
const { order } = storeToRefs(orderStore)
const errorMessage = ref(null)
const successMessage = ref(null)
function handleCreateTicket(payload) {
  createTicket(payload)
  .then(data => {
    successMessage.value = 'Félicitations ! Votre demande de support a bien été envoyé'
  })
  .catch(error => {
    errorMessage.value = error.message
  })
}
</script>

<template>
  <section>
    <h2>Support</h2>
    <p  class="error" v-if="errorMessage">{{ errorMessage }}</p>
    <p class="success" v-if="successMessage">{{  successMessage }}</p>
    <TheContactForm
      :email="order.customer.email"
      :orderId="order.id"
      @submitted="handleCreateTicket"
    />
  </section>
</template>