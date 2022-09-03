<template>
    <q-layout view="lHh Lpr lFf" class="bg-dark text-white">
        <q-header elevated class="bg-primary">
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

                <div><AuthRouter /></div>
            </q-toolbar>
        </q-header>

        <q-drawer dark v-model="leftDrawerOpen" show-if-above bordered class="bg-dark">
            <q-list>
                <q-item-label header>Essential Links</q-item-label>
                <q-item clickable tag="router-link" to="/" active-class="text-accent">
                    <q-item-section avatar>
                        <q-icon name="school" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Home</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item v-if="token.valid" clickable tag="router-link" to="/edit" active-class="text-accent">
                    <q-item-section avatar>
                        <q-icon name="edit" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Profile editor</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view></router-view>
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuthRouter from './components/AuthRouter.vue'
import { token } from './stores/AuthStore'

const leftDrawerOpen = ref( true )
</script>
