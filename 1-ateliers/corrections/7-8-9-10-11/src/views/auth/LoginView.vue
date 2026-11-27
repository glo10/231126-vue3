<script setup>
import TheLogin from '@/components/auth/TheLogin.vue'


function handleLogin(data) {
  console.log('Connexion :', data)
}
</script>

<template>
  <TheLogin @login="handleLogin" />
</template>