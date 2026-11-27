<script setup>
import { reactive } from "vue";

const props = defineProps({
  email: {
    type: String,
    default: "",
  },
  orderId: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["submitted"]);

const subjects = [
  "bug",
  "reclammation",
  "ma commande",
  "facture",
  "livraison",
  "mon compte",
  "mes accès",
  "autre",
];

const form = reactive({
  title: "",
  email: props.email,
  type: "ma commande",
  isUrgent: false,
  message: "",
  orderId: props.orderId,
});

const errors = reactive({
  title: "",
  email: "",
  type: "",
  message: "",
  orderId: "",
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validateForm() {
  errors.title = "";
  errors.email = "";
  errors.type = "";
  errors.message = "";
  errors.orderId = "";

  let isValid = true;

  if (!form.title.trim()) {
    errors.title = "Le titre est obligatoire.";
    isValid = false;
  } else if (form.title.trim().length < 10) {
    errors.title = "Le titre doit contenir au moins 10 caractères.";
    isValid = false;
  }

  if (!form.email.trim()) {
    errors.email = "L'email du client est obligatoire.";
    isValid = false;
  } else if (!isValidEmail(form.email)) {
    errors.email = "L'adresse email n'est pas valide.";
    isValid = false;
  }

  if (!form.orderId.trim()) {
    errors.message = "Le numéro de commande est obligatoire";
    isValid = false;
  } else if (form.orderId.trim().length != 10) {
    errors.message = "Le numéro de commande doit faire exactement 10 caractères.";
    isValid = false;
  }
  if (!subjects.includes(form.type)) {
    errors.type = "Veuillez sélectionner un type de demande valide.";
    isValid = false;
  }

  if (!form.message.trim()) {
    errors.message = "Le message est obligatoire.";
    isValid = false;
  } else if (form.message.trim().length < 100) {
    errors.message = "Le message doit contenir au moins 100 caractères.";
    isValid = false;
  }

  return isValid;
}

function handleSubmit() {
  if (!validateForm()) {
    return;
  }

  const payload = {
    title: form.title.trim(),
    email: form.email.trim(),
    type: form.type,
    isUrgent: Boolean(form.isUrgent),
    message: form.message.trim(),
    orderId: form.orderId,
  };

  emit("submitted", payload);

  form.title = "";
  form.type = "ma commande";
  form.isUrgent = false;
  form.message = "";
  form.orderId = "";
}
</script>

<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <p v-if="orderId">
      <small>Commande associée : {{ orderId }}</small>
    </p>

    <div>
      <label for="title">Titre</label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        placeholder="Ex. : Problème de suivi colis"
      />
      <span v-if="errors.title" class="error">{{ errors.title }}</span>
    </div>

    <div>
      <label for="order-id">Numéro de commande</label>
      <input id="order-id" v-model="form.orderId" type="text" placeholder="CMD-123456" />
      <span v-if="errors.orderId" class="error">{{ errors.orderId }}</span>
    </div>
    <div>
      <label for="email">Email du client</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        placeholder="client@exemple.fr"
      />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>
    <div>
      <label for="type">Type de demande</label>
      <select id="type" v-model="form.type">
        <option v-for="subject in subjects" :key="subject" :value="subject">
          {{ subject }}
        </option>
      </select>
      <span v-if="errors.type" class="error">{{ errors.type }}</span>
    </div>

    <div>
      <label for="is-urgent">
        <input id="is-urgent" v-model="form.isUrgent" type="checkbox" />
        Demande urgente
      </label>
    </div>

    <div>
      <label for="message">Message</label>
      <textarea
        id="message"
        v-model="form.message"
        rows="4"
        placeholder="Votre message ici"
      ></textarea>
      <span v-if="errors.message" class="error">{{ errors.message }}</span>
    </div>

    <button type="submit">Envoyer la demande</button>
  </form>
</template>
<style scoped>
#is-urgent {
  width: inherit;
}

option {
  text-transform: uppercase;
}
</style>