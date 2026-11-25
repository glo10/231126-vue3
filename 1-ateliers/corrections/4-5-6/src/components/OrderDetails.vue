<script setup>
import { ref, reactive, computed } from "vue";

const showHelp = ref(false);
const onlyInStock = ref(false);

const order = reactive({
  id: "CMD-123456",
  status: "shipped",
  customer: {
    firstname: "Alice",
    lastname: "Bob",
    email: "alice.bob@gmail.com",
  },
  delivery: "1 rue de Paris, 75020 Paris",
  carrier: "UPS",
  estimatedDeliveryDate: new Date(
    new Date().getTime() + 5 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("fr"), // + 5 jours
  cancellationReason: "Stock épuisé",
  items: [
    {
      reference: "ART-001",
      name: "Clavier",
      price: 29.9,
      quantity: 1,
      inStock: true,
      rating: 5,
      cover:
        "https://www.manutan.fr/fstrz/r/s/www.manutan.fr/img/S/GRP/ST/AIG42308105.jpg",
    },
    {
      reference: "ART-002",
      name: "Souris",
      price: 19.9,
      quantity: 2,
      inStock: true,
      rating: 4,
      cover: "/img/product/002.jpg",
    },
    {
      reference: "ART-003",
      name: "Ecran",
      price: 89.9,
      quantity: 0,
      inStock: false,
      rating: 3,
      cover: "/img/product/003.jpg",
    },
  ],
});

const statusMessage = computed(() => {
  switch (order.status) {
    case "pending":
      return "Votre commande est en attente de paiement.";
    case "paid":
      return "Votre paiement est validé, la préparation de votre commande va démarrer.";
    case "shipped":
      return `Votre commande a été expédiée via ${order.carrier}.`;
    case "delivered":
      return `Votre commande a été livrée par le transporteur ${order.carrier}.`;
    case "cancelled":
      return "Votre commande a été annulée.";
    default:
      return "Contactez le support";
  }
});
const inStockItems = computed(() => {
  return order.items.filter((item) => item.inStock);
});

const displayedItems = computed(() => {
  return onlyInStock.value ? inStockItems.value : order.items;
});

const totalPrice = computed(() => {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

function setItemRating(reference, rating) {
  if (rating < 1 || rating > 5) {
    return;
  }

  const targetItem = order.items.find((item) => item.reference === reference);
  if (targetItem) {
    targetItem.rating = rating;
  }
}
</script>

<template>
  <header>
    <h2>Support</h2>
    <button type="button" @click="showHelp = !showHelp">
      {{ showHelp ? "Masquer l'aide" : "Besoin d'aide ?" }}
    </button>

    <template v-if="showHelp">
      <h3>Support et aide</h3>
      <p>
        Contactez le support en indiquant votre identifiant de commande (<strong>{{
          order.id
        }}</strong
        >).
      </p>
    </template>
  </header>
  <hr />
  <section>
    <h2>Simulation du statut de livraison</h2>
    <label for="status">Sélectionnez un statut : </label>
    <select id="status" v-model="order.status">
      <option value="pending">En cours de traitement</option>
      <option value="paid">Payée</option>
      <option value="shipped">Expédiée</option>
      <option value="delivered">Livrée</option>
      <option value="cancelled">Annulée</option>
      <option value="-1">Inconnue</option>
    </select>
    <p>{{ statusMessage }}</p>

    <div v-if="order.status === 'cancelled'" class="red">
      <h3>Commande annulée - Raison : {{ order.cancellationReason }}</h3>
    </div>

    <template v-else-if="order.status === 'shipped'">
      <p class="green"><strong>Transporteur : </strong> {{ order.carrier }}</p>
      <p class="green">
        <strong>Date d'estimation de la livraison :</strong>
        {{ order.estimatedDeliveryDate }}
      </p>
    </template>
  </section>

  <hr />
  <section>
    <h2>Informations de la commande</h2>
    <ul>
      <li><strong>Identifiant : </strong> {{ order.id }}</li>
      <li><strong>Statut actuel : </strong> {{ order.status }}</li>
      <li>
        <strong>Client : </strong>
        {{ order.customer.firstname }} {{ order.customer.lastname }} ({{
          order.customer.email
        }})
      </li>
      <li><strong>Livraison : </strong> {{ order.delivery }}</li>
      <li><strong>Transporteur : </strong> {{ order.carrier }}</li>
      <li>
        <strong>Date d'estimation de la livraison : </strong>
        {{ order.estimatedDeliveryDate }}
      </li>
      <li>
        <strong>Raison de l'annulation : </strong>
        {{ order.cancellationReason }}
      </li>
    </ul>
  </section>
  <hr />
  <section>
    <h2>Articles de la commande</h2>
    <button type="button" @click="onlyInStock = !onlyInStock">
      {{
        onlyInStock
          ? "Afficher tous les articles"
          : "Afficher uniquement les articles en stock"
      }}
    </button>

    <template v-for="item in displayedItems" :key="item.reference">
      <article>
        <div
          :style="
            item.inStock
              ? { color: 'blue' }
              : { color: 'grey', textDecoration: 'line-through' }
          "
        >
          <strong>{{ item.name }}</strong>
          <span>Réf : {{ item.reference }}</span>
          <img :src="item.cover" :alt="`cover of ${item.name} product`" />
        </div>

        <p>Prix unitaire : {{ item.price.toFixed(2) }} €</p>
        <p>Quantité : {{ item.quantity }}</p>
        <p>
          Sous-total :
          <strong>{{ (item.price * item.quantity).toFixed(2) }} €</strong>
        </p>

        <p>
          Disponibilité :
          <span v-if="item.inStock">En stock</span>
          <span v-else>Rupture de stock</span>
        </p>
        <div class="rating-controls">
          <span>Note ({{ item.rating }}/5) : </span>
          <button
            v-for="star in 5"
            :key="star"
            type="button"
            :class="{ active: star <= item.rating }"
            @click="setItemRating(item.reference, star)"
          >
            ★
          </button>
        </div>
      </article>
      <hr />
    </template>
  </section>
  <footer>
    <p><strong>Prix total de la commande :</strong> {{ totalPrice.toFixed(2) }} €</p>
  </footer>
</template>
<style scoped>
img {
  width: 250px;
}

.red {
  color: red;
}

.green {
  color: green;
}

.active {
  color: yellow;
  font-weight: 900;
}

.rating-controls button {
  background: #fff;
  border: none;
}

article {
  margin: 1rem;
}

h2 {
  text-align: center;
}
</style>
