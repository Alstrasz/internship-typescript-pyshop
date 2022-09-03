<template>
    <div>
        <h6>Here you can update you profile data</h6>
        <q-form
            @submit="onSubmit"
            class="q-gutter-md"
        >
            <q-input
                filled
                v-model="update_user_dto.email"
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
                v-model="update_user_dto.name"
                label="Name *"
                label-color="info"
                color="white"
                dark
                lazy-rules
                :rules="[
                    val => val && val.length > 0 || 'Should not be empty',
                ]"
            />

            <q-input
                filled
                v-model="update_user_dto.address"
                label="Address"
                label-color="info"
                color="white"
                dark
            />

            <q-input
                filled
                v-model="update_user_dto.phone"
                label="Phone"
                label-color="info"
                color="white"
                dark
            />

            <q-input
                filled
                v-model="update_user_dto.about"
                label="About me"
                label-color="info"
                color="white"
                dark
            />

            <div>
                <q-btn label="Update" type="submit" color="primary"/>
            </div>
        </q-form>
        <h6>Our you can <q-btn label="Delete profile" type="delete" color="warning" @click="confirm_deletion_dialog = true"/></h6>

        <q-dialog v-model="confirm_deletion_dialog">
            <q-card class="bg-dark" dark>
                <q-card-section class="row items-center">
                    <span class="q-ml-sm">Are you shure?</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="Delete" color="warning" @click="delete_profile()" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref, watchEffect } from 'vue'
import isEmail from 'validator/lib/isEmail'
import { UpdateUserDto } from '@/interfaces/dto/update_user.dto'
import { token, user } from '@/stores/AuthStore'
import axios from 'axios'
import { UserDto } from '@/interfaces/dto/user.dto'
import { useQuasar } from 'quasar'
import router from '@/router'

const update_user_dto: UpdateUserDto = reactive(
    {
        email: '',
        name: '',
        about: '',
        address: '',
        phone: ''
    }
)

const confirm_deletion_dialog = ref( false )

watchEffect( () => {
    if ( user.valid ) {
        update_user_dto.email = user?.data?.email || ''
        update_user_dto.name = user?.data?.name || ''
        update_user_dto.about = user?.data?.about || ''
        update_user_dto.address = user?.data?.address || ''
        update_user_dto.phone = user?.data?.phone || ''
    }
} )

const $q = useQuasar()

function onSubmit () {
    axios( {
        method: 'PUT',
        url: '/user',
        data: update_user_dto
    } ).then( ( res ) => {
        const data: UserDto = res.data
        user.update_user( data )
        $q.notify( {
            message: 'Updated successfuly',
            color: 'positive',
            actions: [
                { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
            ]
        } )
        router.push( '/' )
    } )
}

function delete_profile () {
    axios( {
        method: 'DELETE',
        url: '/user',
        data: update_user_dto
    } ).then( () => {
        $q.notify( {
            message: 'Deleted successfuly',
            color: 'positive',
            actions: [
                { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
            ]
        } )
        confirm_deletion_dialog.value = false
        token.remove_token()
        router.push( '/' )
    } )
}
</script>
