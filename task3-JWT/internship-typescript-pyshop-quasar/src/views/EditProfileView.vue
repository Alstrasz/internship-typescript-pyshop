<template>
    <q-page padding class="flex justify-center">
        <EditProfile style="min-width: 40%" />
    </q-page>
</template>

<script setup lang="ts">
import router from '@/router'
import { token } from '@/stores/AuthStore'
import EditProfile from '../components/EditProfile.vue'
if ( !token.valid ) {
    router.push( '/' )
}
</script>
