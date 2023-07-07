<script>
import { store } from "./store.js";
import axios from "axios";
import AppHeader from "./components/Header/AppHeader.vue";
import AppFooter from "./components/Footer/AppFooter.vue";

export default {
    data() {
        return {
            store
        }
    },
    components: {
        AppHeader,
        AppFooter,
    }
};
</script>

<template>
    <!-- Header -->
    <AppHeader/>

    <main>
        <router-view>

        </router-view>
    </main>
    <!-- Footer -->
    <AppFooter/>
</template>

<style lang="scss">
@use "./style/general.scss" as *;
main {
    margin-top: 60px;
}
</style>
