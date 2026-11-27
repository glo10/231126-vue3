<!-- src/views/UsersView.vue -->
<script setup>
import { storeToRefs } from 'pinia'
import UsersList from '@/components/user/TheList.vue'
import { useUsersStore } from '@/stores/userStore'

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)
</script>

<template>
    <UsersList :users="users" />
</template>