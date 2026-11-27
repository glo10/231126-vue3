<script setup>
import { reactive, ref } from 'vue'

const emit = defineEmits(['register'])

const form = reactive({
  lastname: '',
  firstname: '',
  email: '',
  password: '',
  confirmPassword: '',
  country: '',
  city: '',
})

const errors = reactive({
  lastname: '',
  firstname: '',
  email: '',
  password: '',
  confirmPassword: '',
  country: '',
  city: '',
})

const registeredUser = ref('')

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function validateForm() {
  errors.lastname = ''
  errors.firstname = ''
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''
  errors.country = ''
  errors.city = ''

  let isValid = true

  if (!form.lastname.trim()) {
    errors.lastname = 'Le nom est obligatoire.'
    isValid = false
  }

  if (!form.firstname.trim()) {
    errors.firstname = 'Le prénom est obligatoire.'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = "L'email est obligatoire."
    isValid = false
  } else if (!isValidEmail(form.email)) {
    errors.email = "L'adresse email n'est pas valide."
    isValid = false
  }

  if (!form.password) {
    errors.password = 'Le mot de passe est obligatoire.'
    isValid = false
  } else if (form.password.length < 8) {
    errors.password = 'Le mot de passe doit contenir au moins 8 caractères.'
    isValid = false
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'La confirmation du mot de passe est obligatoire.'
    isValid = false
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas.'
    isValid = false
  }

  if (!form.country.trim()) {
    errors.country = 'Le pays est obligatoire.'
    isValid = false
  }

  if (!form.city.trim()) {
    errors.city = 'La ville est obligatoire.'
    isValid = false
  }

  return isValid
}

function handleSubmit() {
  registeredUser.value = ''

  if (!validateForm()) {
    return
  }

  const userData = {
    lastname: form.lastname.trim(),
    firstname: form.firstname.trim(),
    email: form.email.trim(),
    password: form.password,
    country: form.country.trim(),
    city: form.city.trim(),
  }

  emit('register', userData)
  registeredUser.value = `${userData.firstname} ${userData.lastname}`

  form.lastname = ''
  form.firstname = ''
  form.email = ''
  form.password = ''
  form.confirmPassword = ''
  form.country = ''
  form.city = ''
}
</script>

<template>
  <form class="form-box" @submit.prevent="handleSubmit" novalidate>
    <h3>Inscription</h3>

    <div class="field">
      <label for="reg-lastname">Nom</label>
      <input id="reg-lastname" v-model="form.lastname" type="text" placeholder="Dupont" />
      <span v-if="errors.lastname" class="error">{{ errors.lastname }}</span>
    </div>

    <div class="field">
      <label for="reg-firstname">Prénom</label>
      <input id="reg-firstname" v-model="form.firstname" type="text" placeholder="Jean" />
      <span v-if="errors.firstname" class="error">{{ errors.firstname }}</span>
    </div>

    <div class="field">
      <label for="reg-email">Email</label>
      <input id="reg-email" v-model="form.email" type="email" placeholder="jean.dupont@exemple.fr" />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>

    <div class="field">
      <label for="reg-password">Mot de passe</label>
      <input id="reg-password" v-model="form.password" type="password" placeholder="8 caractères minimum" />
      <span v-if="errors.password" class="error">{{ errors.password }}</span>
    </div>

    <div class="field">
      <label for="reg-confirm-password">Confirmation de mot de passe</label>
      <input
        id="reg-confirm-password"
        v-model="form.confirmPassword"
        type="password"
        placeholder="Répétez le mot de passe"
      />
      <span v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</span>
    </div>

    <div class="field">
      <label for="reg-country">Pays</label>
      <input id="reg-country" v-model="form.country" type="text" placeholder="France" />
      <span v-if="errors.country" class="error">{{ errors.country }}</span>
    </div>

    <div class="field">
      <label for="reg-city">Ville</label>
      <input id="reg-city" v-model="form.city" type="text" placeholder="Paris" />
      <span v-if="errors.city" class="error">{{ errors.city }}</span>
    </div>

    <button type="submit">Créer un compte</button>

    <p v-if="registeredUser" class="success">
      Inscription réussie pour {{ registeredUser }}.
    </p>
  </form>
</template>