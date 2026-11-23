<template>
    <h1>Page de l'utilisateur {{ user.firstname }}</h1>
    <h2>Bonjour {{ user.firstname }}</h2>
    <h2>Age : {{  user.age }}</h2>
</template>
<script setup>
const { user } = defineProps({
    user: Object
}) // idem que const user = props.user et const title = props.title
</script>