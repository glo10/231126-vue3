import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
  const onlyInStock = ref(false)
  const isLoading = ref(false)
  const fetchError = ref(null)

  const items = ref([])

  const inStockItems = computed(() => {
    return items.value.filter((item) => item.inStock)
  })

  const displayedItems = computed(() => {
    return onlyInStock.value ? inStockItems.value : items.value
  })

  const stockValue = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.stock, 0)
  })

  function findProductByReference(reference) {
    return items.value.find((item) => item.reference === reference) || null
  }

  function findProductByName(name) {
    return items.value.find((item) => item.name === name) || null
  }

  function toggleOnlyInStock() {
    onlyInStock.value = !onlyInStock.value
  }

  function setItemRating(reference, star) {
    const target = findProductByReference(reference)
    if (star < 1 || star > 5 || !target) return
    target.rating = star
  }

  function toggleDescription(productOrRef) {
    const reference = typeof productOrRef === 'object' ? productOrRef.reference : productOrRef
    const target = items.value.find((item) => item.reference === reference)
    if (target) {
      target.showDescription = !target.showDescription
    }
  }

  async function fetchProducts(limit = 12) {
    if (isLoading.value) return
    if (items.value.length > 0) return // Si déjà présents, on ne recharge pas

    isLoading.value = true
    fetchError.value = null

    try {
      const response = await fetch(`https://dummyjson.com/products?limit=${limit}`)
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }

      const data = await response.json()

      items.value = data.products.map((product) => {
        const stock = Number(product.stock) || 0
        return {
          reference: `PROD-${product.id}`,
          name: product.title,
          description: product.description,
          price: Number(product.price),
          stock: product.stock,
          quantity: 0,
          inStock: stock > 50,
          rating: Math.min(5, Math.max(1, Math.round(product.rating))),
          cover: product.thumbnail,
          showDescription: false,
        }
      })
    } catch (error) {
      fetchError.value = error.message || 'Impossible de récupérer les produits.'
    } finally {
      isLoading.value = false
    }
  }

  function decrementStock(reference, qty = 1) {
    const target = items.value.find((item) => item.reference === reference)
    if (!target) return false
    if (target.stock < qty) return false

    target.stock -= qty
    target.inStock = target.stock > 50
    return true
  }

  function restoreStock(reference, qty = 1) {
    const target = items.value.find((item) => item.reference === reference)
    if (!target) return

    target.stock += qty
    target.inStock = target.stock > 50
  }

  return {
    items,
    onlyInStock,
    isLoading,
    fetchError,
    inStockItems,
    displayedItems,
    stockValue,
    findProductByReference,
    findProductByName,
    toggleOnlyInStock,
    setItemRating,
    toggleDescription,
    fetchProducts,
    restoreStock,
    decrementStock,
  }
})
