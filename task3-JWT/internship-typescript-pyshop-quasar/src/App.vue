<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    @click="leftDrawerOpen = !leftDrawerOpen"
                    aria-label="Menu"
                    icon="menu"
                />

                <q-toolbar-title> PyShopJL - TypeScript </q-toolbar-title>

                <div>User | Login | Sigin | Logout</div>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
            <q-list>
                <q-item-label header>Essential Links</q-item-label>
                <q-item clickable tag="router-link" to="/">
                    <q-item-section avatar>
                        <q-icon name="school" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Home</q-item-label>
                        <q-item-label caption>quasar.dev</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable tag="router-link" to="/edit">
                    <q-item-section avatar>
                        <q-icon name="school" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Profile editor</q-item-label>
                        <q-item-label caption>quasar.dev</q-item-label>
                    </q-item-section>
                </q-item>
                <router-link to="/">Go to Home</router-link>
                <router-link to="/login">Go to login</router-link>
                <router-link to="/signin">Go to signin</router-link>
                <router-link to="/edit">Go to edit</router-link>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view></router-view>
        </q-page-container>
    </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'LayoutDefault',

    setup () {
        return {
            leftDrawerOpen: ref( false )
        }
    }
}
</script>
