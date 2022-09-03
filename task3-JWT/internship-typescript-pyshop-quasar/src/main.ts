import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Notify, Quasar, useQuasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import axios from 'axios'
import { token, user } from './stores/AuthStore'

createApp( App ).use( Quasar, quasarUserOptions ).use( router ).mount( '#app' )

axios.interceptors.request.use( ( config ) => {
    if ( config.headers ) {
        config.headers.Authorization = `Bearer ${token.token}`
    }
    return config
} )

axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3000'
console.log( 'api url:', axios.defaults.baseURL )

axios.interceptors.response.use(
    ( config ) => {
        return config
    },
    ( err ) => {
        if ( err.response && err.response.status === 401 ) {
            if ( token.valid ) {
                token.remove_token()
                Notify.create( {
                    message: 'Authentication failed',
                    color: 'warning',
                    actions: [
                        { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
                    ]
                } )
                router.push( '/signin' )
            }
        } else {
            Notify.create( {
                message: 'Network error',
                color: 'warning',
                actions: [
                    { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
                ]
            } )
        }
        return Promise.reject( err )
    }
)
console.log( 1 )
if ( token.valid ) {
    user.request_user()
}
