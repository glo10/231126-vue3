<template>
    <h2>Page produit</h2>
    <ul>
        <li v-for="product in props.items.products">
            Nom du produit : {{ product.name }}
        </li>
    </ul>
    <div v-html="injection"></div>
</template>
<script setup>
const props = defineProps({
    items: Object
})
const injection = '<strong>alert("Attention")</strong>'
</script>