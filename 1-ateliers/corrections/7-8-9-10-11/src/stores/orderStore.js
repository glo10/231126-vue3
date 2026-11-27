import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useProductStore } from './productStore'
export const useOrderStore = defineStore('order', () => {
  const productStore = useProductStore()
  const dt = new Date()
  const plus5Day = dt.setDate(dt.getDate() + 5)
  const order = ref({
    id: 'CMD-123456',
    status: 'shipped',
    customer: {
      firstname: 'Alice',
      lastname: 'Bob',
      email: 'alice.bob@gmail.com',
    },
    delivery: '1 rue de Paris, 75020 Paris',
    carrier: 'UPS',
    estimatedDeliveryDate: new Date(plus5Day).toLocaleDateString('fr'),
    cancellationReason: 'Stock épuisé',
    items: [],
  })

  const totalPrice = computed(() => {
    return order.value.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  function updateStatus(newStatus) {
    order.value.status = newStatus
  }

  function addToCart(product, quantity = 1) {
    if (!product || !product.reference) return false

    const qty = Math.floor(Number(quantity) || 0)
    if (qty <= 0) return false
    // 1. Décrémente le stock dans productStore (source unique de vérité)
    const stockUpdated = productStore.decrementStock(product.reference, qty)
    if (!stockUpdated) {
      return false
    }
    // 2. Ajoute la quantité à la ligne existante ou crée une nouvelle entrée dans order.items
    const existingItem = order.value.items.find((item) => item.reference === product.reference)
    if (existingItem) {
      existingItem.quantity += qty
    } else {
      order.value.items.push({
        reference: product.reference,
        name: product.name,
        price: Number(product.price) || 0,
        quantity: qty,
      })
    }

    return true
  }

  return {
    order,
    updateStatus,
    addToCart,
    totalPrice,
  }
})
