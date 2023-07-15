<script>
import { store } from "../../store.js";

export default {
    name: "AppFooter",
    data() {
        return {
            store,
        }
    }
}
</script>

<template>
    <footer class="text-lg-start d-flex justify-content-between p-4 p-xl-4">
        <!-- DEVELOPERS -->
        <div class="col-4 col-xl-7">
            <div id="developers_list" class="row h-100 align-items-center">
                <p class="mb-0">
                    <span class="d-block d-md-inline">
                        <a href="https://github.com/LucaPertosa" target="_blank" class="">Luca Pertosa</a>
                    </span>
                    <span class="mx-2 d-none d-md-inline-block">
                        &middot;
                    </span>
                    <span class="d-block d-md-inline my-2 my-xl-0">
                        <a href="https://github.com/StefanoM98" target="_blank" class="">Stefano Martino</a>
                    </span>
                    <span class="mx-2 d-none d-md-inline-block">
                        &middot;
                    </span>
                    <span class="d-block d-md-inline my-2 my-xl-0">
                        <a href="https://github.com/Luigidefilippo" target="_blank" class="">Luigi De Filippo</a>
                    </span>
                    <span class="mx-2 d-none d-md-inline-block">
                        &middot;
                    </span>
                    <span class="d-block d-md-inline">
                        <a href="https://github.com/diegoG82" target="_blank" class="">Diego Giardina</a>
                    </span>
                </p>
            </div>
        </div>

        <!-- STACK -->
        <div id="stack_list"
            class="col-2 col-xl-2 d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-end">
            <a href="https://getbootstrap.com/" target="_blank">
                <font-awesome-icon :icon="['fab', 'bootstrap']" />
            </a>

            <a href="https://vuejs.org/" target="_blank" class="mx-3">
                <font-awesome-icon :icon="['fab', 'vuejs']" />
            </a>

            <a href="https://laravel.com/" target="_blank">
                <font-awesome-icon :icon="['fab', 'laravel']" />
            </a>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use "../../style/general.scss" as *;
@use "../../style/partials/variables.scss" as *;
@use "../../style/partials/mixins.scss" as *;

// IMPORT GOOGLE FONT
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

footer {
    @include link_hover;
    font-family: 'Roboto', sans-serif;
    color: $light_color;
    background-color: $dark_accent_color;
    font-size: small;

    a:hover {
        color: $dark_color;
    }

    #stack_list {
        a {
            font-size: 1.2rem;
        }
    }
}
</style>