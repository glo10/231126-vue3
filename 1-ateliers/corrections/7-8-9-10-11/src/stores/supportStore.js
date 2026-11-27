import { ref, computed} from 'vue'
import { defineStore } from 'pinia'

export const useSupportStore = defineStore('support', () => {
  const isSubmitting = ref(false)
  const submittedMessage = ref(null)
  const fetchError = ref(null)
  const tickets = ref([])
  const totalTickets = computed(() => tickets.value.length)
  async function createTicket(payload) {
    isSubmitting.value = true

    try {
      const response = await fetch('http://localhost:3000/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || `Erreur serveur (${response.status})`)
      }
      tickets.value = [...tickets.value, data.ticket]
      submittedMessage.value = 'Félications le ticket a été crée avec succès'
      return data.ticket
    } catch (error) {
      submittedMessage.value = error.message || "Impossible d'envoyer le ticket au serveur local."
      throw error
    } finally {
      isSubmitting.value = false
    }
  }

  async function fetchTickets() {
    fetchError.value = null
    tickets.value = await fetch('http://localhost:3000/api/tickets')
      .then((res) => res.json())
      .then(({tickets}) => tickets)
      .catch((error) => {
        fetchError.value = error.message || 'Impossible de récupérer les tickets du support.'
      })
  }

  return {
    isSubmitting,
    submittedMessage,
    createTicket,
    fetchTickets,
    tickets,
    fetchError,
    totalTickets
  }
})
