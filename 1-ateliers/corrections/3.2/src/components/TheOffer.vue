<template>
  <section v-if="offer">
    <h2>Récapitulatif de l'offre</h2>
    <p><strong>Référence :</strong> {{ offer.reference }}</p>
    <p><strong>Nom de l'offre :</strong> {{ offer.name }}</p>
    <p><strong>Prix mensuel unitaire :</strong> {{ offer.monthly }} {{ offer.currency }} / utilisateur</p>
    <div v-if="offer.discount">
      <span v-html="offer.discount"></span>
    </div>
    <p>
      <strong>Sous-total :</strong>
      {{ subTotal }} {{ offer.currency }} / mois pour {{ offer.users }} utilisateur{{ offer.users > 1 ? 's' : '' }}
    </p>
    <p>
      <strong>Support :</strong> {{ supportMessage }}
    </p>
    <p v-if="discount > 0" class="red">
      <strong>Remise code promo :</strong> -{{ discount.toFixed(2) * 100 }} %
    </p>
    <p>
      <strong>Total :</strong> {{ total.toFixed(2) }} {{ offer.currency }} / mois
    </p>
  </section>
</template>

<script>
export default {
  name: 'TheOffer',
  props: {
    offer: {
      type: Object,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    subTotal() {
      return this.offer.monthly * this.offer.users;
    },
    supportAmount() {
      return this.offer.support ? 39 : 0;
    },
    supportMessage() {
      return this.offer.support ? 'Inclus (+39 €)' : 'Standard (inclus)';
    },
    beforeDiscount() {
      return this.subTotal + this.supportAmount;
    },
    amountDiscount() {
      return this.beforeDiscount * this.discount;
    },
    total() {
      const total = this.beforeDiscount - this.amountDiscount;
      return total > 0 ? total : 0;
    }
  }
};
</script>
<style scoped>
.red {
  color: red;
}
</style>