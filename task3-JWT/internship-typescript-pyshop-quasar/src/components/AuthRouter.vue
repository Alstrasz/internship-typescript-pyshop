<template>
    <q-breadcrumbs v-if="!token.valid" class="text-accent text-h5">
        <q-breadcrumbs-el >
            <q-btn flat color="accent" label="Sign in" icon="login" to="signin" class="text-capitalize" />
        </q-breadcrumbs-el>
        <q-breadcrumbs-el >
            <q-btn flat color="accent" label="Sign up" to="signup" class="text-capitalize" />
        </q-breadcrumbs-el>
    </q-breadcrumbs>

    <q-breadcrumbs v-else class="text-accent text-h5">
        <q-breadcrumbs-el :label="user.valid ? user.data.name : ''" class="text-h6 text-info" />
        <q-breadcrumbs-el >
            <q-btn flat color="accent" label="Sign out" @click="signout()" class="text-capitalize" />
        </q-breadcrumbs-el>
    </q-breadcrumbs>
</template>

<style>
</style>

<script setup lang="ts">
import router from '@/router'
import axios from 'axios'
import { useQuasar } from 'quasar'
import { user, token } from '../stores/AuthStore'

function signout () {
    axios( {
        method: 'POST',
        url: '/logout'
    } ).then( () => {
        token.remove_token()
        router.push( '/' )
    } )
}

const $q = useQuasar()
</script>
