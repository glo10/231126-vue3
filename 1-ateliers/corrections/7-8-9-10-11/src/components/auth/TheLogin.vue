<script setup>
import { reactive, ref } from 'vue'

const emit = defineEmits(['login'])

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

const loggedInEmail = ref('')

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function validateForm() {
  errors.email = ''
  errors.password = ''

  let isValid = true

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
  } else if (form.password.length < 6) {
    errors.password = 'Le mot de passe doit contenir au moins 6 caractères.'
    isValid = false
  }

  return isValid
}

function handleSubmit() {
  loggedInEmail.value = ''

  if (!validateForm()) {
    return
  }

  const data = {
    email: form.email.trim(),
    password: form.password,
  }

  emit('login', data)
  loggedInEmail.value = data.email
  form.password = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <h3>Connexion</h3>

    <div>
      <label for="login-email">Email</label>
      <input id="login-email" v-model="form.email" type="email" placeholder="john@doe.fr" />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>

    <div>
      <label for="login-password">Mot de passe</label>
      <input id="login-password" v-model="form.password" type="password" placeholder="••••••••" />
      <span v-if="errors.password" class="error">{{ errors.password }}</span>
    </div>

    <button type="submit">Se connecter</button>

    <p v-if="loggedInEmail" class="success">
      Connexion validée pour {{ loggedInEmail }}.
    </p>
  </form>
</template>

<style scoped>

</style>