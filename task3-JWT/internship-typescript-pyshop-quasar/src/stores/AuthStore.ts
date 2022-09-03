import { UserDto } from '@/interfaces/dto/user.dto'
import axios from 'axios'
import { reactive, ref, watch } from 'vue'

const default_user: UserDto = {
    id: '',
    name: '',
    email: '',
    about: '',
    address: '',
    phone: ''
}

export const loading = ref( false )

export const user = reactive( {
    data: default_user,
    valid: false,
    update_user ( user: UserDto ) {
        this.data = user
        this.valid = true
    },
    remove_user () {
        this.valid = false
        this.data = default_user
    },
    request_user () {
        loading.value = true
        axios( {
            method: 'GET',
            url: '/user'
        } )
            .then( ( res ) => {
                const data: UserDto = res.data
                console.log( data )
                this.update_user( data )
            } )
            .finally( () => { loading.value = false } )
    }
} )

export const token = reactive( {
    token: localStorage.getItem( 'JWT' ) || '',
    valid: localStorage.getItem( 'JWT' ) != null,
    set_token ( new_token: string ) {
        this.token = new_token
        this.valid = true
        localStorage.setItem( 'JWT', new_token )
    },
    remove_token () {
        this.valid = false
        this.token = ''
        localStorage.removeItem( 'JWT' )
    }
} )

console.log( token )

watch( () => token.valid, ( ) => {
    if ( token.valid ) {
        user.request_user()
    } else {
        user.remove_user()
    }
} )
