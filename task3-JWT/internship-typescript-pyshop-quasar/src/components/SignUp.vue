<template>
    <q-form
        @submit="onSubmit"
        class="q-gutter-md"
    >
        <q-input
            filled
            v-model="signup_credentials.email"
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
            v-model="signup_credentials.name"
            label="Name *"
            label-color="info"
            color="white"
            dark
            lazy-rules
            :rules="[
                val => val && val.length > 0 || 'Should not be empty',
                val => val.length <= 40 || 'Max length: 40 symbols',
            ]"
        />

        <q-input
            filled
            v-model="signup_credentials.password"
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
            <q-btn label="Sign up" type="submit" color="primary"/>
        </div>
    </q-form>
</template>

<script setup lang='ts'>
import { AccessTokenDto } from '@/interfaces/dto/access_token.dto'
import router from '@/router'
import { loading, token } from '@/stores/AuthStore'
import axios from 'axios'
import { useQuasar } from 'quasar'
import isEmail from 'validator/lib/isEmail'
import { reactive } from 'vue'
import { UserSignupCredentialsDto } from '../interfaces/dto/user_signup_credentials.dto'

const signup_credentials: UserSignupCredentialsDto = reactive( {
    email: '',
    password: '',
    name: ''
} )

const $q = useQuasar()

function onSubmit () {
    loading.value = true
    axios( {
        method: 'POST',
        url: '/signup',
        data: signup_credentials
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
            if ( err.response && err.response.status === 409 ) {
                console.log( err.data )
                $q.notify( {
                    message: err?.response?.data?.description || 'Unique constraint violated',
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
