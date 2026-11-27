<script setup>
import TheRegistration from '@/components/auth/TheRegistration.vue'


function handleRegistration(data) {
  console.log('Inscription :', data)
}
</script>

<template>
  <TheRegistration @register="handleRegistration" />
</template>