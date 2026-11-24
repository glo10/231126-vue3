<template>
  <main>
    <h1>Configuration de votre abonnement</h1>
    <div>
      <label for="offer"><strong>Choisissez une offre :</strong></label>
      <select id="offer" v-model="selectedReference">
        <option
          v-for="offer in offers"
          :key="offer.reference"
          :value="offer.reference"
        >
          {{ offer.name }} ({{ offer.monthly }} {{ offer.currency }}/mois/utilisateur)
        </option>
      </select>
    </div>

    <div>
      <label for="discount"><strong>Choisissez le code promo :</strong></label>
      <select id="discount" v-model.number="selectedDiscount">
        <option value="0">Aucune remise</option>
        <option
          v-for="discount in availableDiscounts"
          :key="discount"
          :value="discount"
        >
          - {{ discount * 100 }} %
        </option>
      </select>
    </div>

    <TheOffer
      :offer="chosenOffer"
      :discount="selectedDiscount"
    />
  </main>
</template>

<script>
import TheOffer from './components/TheOffer.vue';

export default {
  name: 'App',
  components: {
    TheOffer,
  },
  data() {
    return {
      selectedReference: 'PRO',
      selectedDiscount: 0,
      availableDiscounts: {
        BIENVENUE: 0.5, // 50%
        REMISE10: 0.1     // 10%
      },
      offers: [
        {
          reference: 'STARTER',
          name: 'Starter',
          monthly: 19,
          currency: '€',
          users: 3,
          support: false,
          promo: '<span>Offre lancement : <strong>-50%</strong> le 1er mois</span>'
        },
        {
          reference: 'PRO',
          name: 'Pro',
          monthly: 30,
          currency: '€',
          users: 5,
          support: true,
          promo: '<span>Offre lancement : <strong>-50%</strong> le 1er mois</span>'
        },
        {
          reference: 'CLOUD',
          name: 'Enterprise',
          monthly: 59,
          currency: '€',
          users: 12,
          support: true,
          promo: '<span>Offre lancement : <strong>-50%</strong> le 1er mois</span>'
        }
      ]
    };
  },
  computed: {
    chosenOffer() {
      return (
        this.offers.find((item) => item.reference === this.selectedReference) ||
        this.offers[0]
      );
    }
  }
};
</script>
