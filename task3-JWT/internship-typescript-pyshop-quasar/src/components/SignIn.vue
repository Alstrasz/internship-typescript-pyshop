<template>
    <q-form
        @submit="onSubmit"
        class="q-gutter-md"
    >
        <q-input
            filled
            v-model="signin_credentials.email"
            label="Email *"
            label-color="info"
            color="white"
            dark
            lazy-rules
            :rules="[
                val => val && val.length > 0 || 'Should not be empty',
                val => val && isEmail( val ) || 'Should be email'
            ]"
        />

        <q-input
            filled
            v-model="signin_credentials.password"
            label="Password *"
            label-color="info"
            color="white"
            dark
            lazy-rules
            :rules="[
                val => val && val.length > 0 || 'Should not be empty',
                val => val.length >= 8 || 'Min length: 8 symbols',
                val => val.length <= 32 || 'Max length: 32 symbols'
            ]"
        />

        <div>
            <q-btn label="Sign in" type="submit" color="primary"/>
        </div>
    </q-form>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import isEmail from 'validator/lib/isEmail'
import { UserSigninCredentialsDto } from '@/interfaces/dto/user_signin_credentials.dto'
import axios from 'axios'
import { AccessTokenDto } from '@/interfaces/dto/access_token.dto'
import { loading, token } from '@/stores/AuthStore'
import router from '@/router'
import { useQuasar } from 'quasar'

const signin_credentials: UserSigninCredentialsDto = reactive( {
    email: '',
    password: ''
} )

const $q = useQuasar()

function onSubmit () {
    loading.value = true
    axios( {
        method: 'POST',
        url: '/login',
        data: signin_credentials
    } )
        .then( ( res ) => {
            const data: AccessTokenDto = res.data
            if ( data.token ) {
                token.set_token( data.token )
                router.push( '/' )
            } else {
                console.error( 'data.token is empty. Api is wrong?', data.token )
            }
        } )
        .catch( ( err ) => {
            if ( err.response && err.response.status === 401 ) {
                $q.notify( {
                    message: 'Email or password doesn\'t match',
                    color: 'warning',
                    actions: [
                        { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
                    ]
                } )
            }
        } )
        .finally( () => { loading.value = false } )
}
</script>
