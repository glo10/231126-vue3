<script setup>
import { ref, computed } from "vue";
import CartItem from "./components/TheCart.vue";
import DeliverySelector from "./components/TheDelivery.vue";
import CartSummary from "./components/TheSummary.vue";
import PaymentSection from "./components/ThePayment.vue";

const cartItems = ref([
  {
    id: 1,
    title: "Clavier",
    description: "USB-C",
    price: 29.99,
    image: "https://placehold.co/160x160?text=Clavier",
    quantity: 1,
  },
  {
    id: 2,
    title: "Souris",
    description: "Ergonomique",
    price: 19.45,
    image: "https://placehold.co/160x160?text=Souris",
    quantity: 1,
  },
]);

const relayPoints = ref([
  { id: "relay-1", name: "Locker", address: "Nation", fee: 2.9 },
  { id: "relay-2", name: "LaPoste", address: "Gare de Lyon", fee: 3.9 },
  { id: "relay-3", name: "VapStore", address: "Bastille", fee: 4.9 },
]);

const selectedRelayId = ref("relay-1");

const paymentMethods = ref([
  { id: "card", label: "CB / Visa / Mastercard" },
  { id: "paypal", label: "PayPal" },
  { id: "mobile-pay", label: "Apple Pay / Google Pay" },
]);

const selectedPaymentMethod = ref("card");
const orderConfirmation = ref("");

const deliveryFee = computed(() => {
  const relay = relayPoints.value.find((r) => r.id === selectedRelayId.value);
  return relay ? relay.fee : 0;
});

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const total = computed(() => {
  return subtotal.value + deliveryFee.value;
});

function handleUpdateQuantity(productId, step) {
  const item = cartItems.value.find((p) => p.id === productId);
  if (!item) return;

  const newQty = item.quantity + step;
  if (newQty >= 1) {
    item.quantity = newQty;
  }
}

function handleSelectRelay(relayId) {
  selectedRelayId.value = relayId;
}

function handleSelectPaymentMethod(methodId) {
  selectedPaymentMethod.value = methodId;
}

function handleSubmitPayment() {
  const relay = relayPoints.value.find((r) => r.id === selectedRelayId.value);
  const method = paymentMethods.value.find((m) => m.id === selectedPaymentMethod.value);

  orderConfirmation.value = `Commande validée pour un montant de ${total.value.toFixed(
    2
  )} € via ${method?.label} (Point relais : ${relay?.name}).`;
}
</script>

<template>
  <main>
    <h1>Mon Panier</h1>

    <div>
      <CartItem
        v-for="item in cartItems"
        :key="item.id"
        :product="item"
        @update-quantity="handleUpdateQuantity"
      />

      <DeliverySelector
        :relay-points="relayPoints"
        :selected-relay-id="selectedRelayId"
        :delivery-fee="deliveryFee"
        @select-relay="handleSelectRelay"
      />

      <PaymentSection
        :payment-methods="paymentMethods"
        :selected-method="selectedPaymentMethod"
        :total="total"
        @select-method="handleSelectPaymentMethod"
        @submit-payment="handleSubmitPayment"
      />
    </div>

    <div>
      <CartSummary :subtotal="subtotal" :delivery-fee="deliveryFee" :total="total" />

      <p v-if="orderConfirmation">
        {{ orderConfirmation }}
      </p>
    </div>
  </main>
</template>
