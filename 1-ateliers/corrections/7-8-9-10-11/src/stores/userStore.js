import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])
  const selectedUser = ref(null)
  const isLoading = ref(false)
  const errorMessage = ref('')

  async function fetchUsers() {
    if(users.value.length > 0) return
    if (isLoading.value) return
    isLoading.value = true
    errorMessage.value = ''

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
      users.value = await response.json()
    } catch (error) {
      errorMessage.value = error.message || 'Impossible de charger les utilisateurs.'
    } finally {
      isLoading.value = false
    }
  }

  function selectUser(user) {
    selectedUser.value = user
  }

  return {
    users,
    selectedUser,
    isLoading,
    errorMessage,
    fetchUsers,
    selectUser,
  }
})