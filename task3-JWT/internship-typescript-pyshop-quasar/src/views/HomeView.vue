<template>
    <q-page padding>
        <UserInfo v-if="user.valid" />
        <Introduction />
    </q-page>
</template>

<script setup lang="ts">
import UserInfo from '../components/UserInfo.vue'
import Introduction from '../components/Introduction.vue'
import { user } from '@/stores/AuthStore'

</script>
