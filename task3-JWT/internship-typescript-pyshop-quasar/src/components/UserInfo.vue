<template>
    <p class="text-h6">Hello, {{user.data.name}}!</p>
    <p>Here is some information known about you</p>
    <p v-if="user.data.email && user.data.email != ''">Email: {{user.data.email}}</p>
    <p v-if="user.data.email && user.data.address != ''">Address: {{user.data.address}}</p>
    <p v-if="user.data.email && user.data.phone != ''">Phone: {{user.data.phone}}</p>
    <p v-if="user.data.email && user.data.about != ''" class="text-no-wrap">About me: {{user.data.about}}</p>
</template>

<style>
</style>

<script setup lang="ts">
import { user } from '@/stores/AuthStore'
</script>
