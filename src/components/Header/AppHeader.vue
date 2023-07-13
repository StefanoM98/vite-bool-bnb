<script>
import { store } from "../../store.js";

export default {
    name: "AppHeader",
    data() {
        return {
            store,
        }
    }
}
</script>

<template>
    <header class="fixed-top">
        <div class="container">
            <nav class="navbar navbar-expand-lg p-0 m-0">
                <div class="container-fluid text-center">
                    <router-link :to="{name: 'Home'}" class="nav-link">
                        <img src="../../assets/img/bnb.png" alt="Logo" class="d-inline-block align-text-top logo">
                    </router-link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 flex-grow-1">
                            <li class="nav-item spacing">
                                <router-link :to="{name: 'Home'}" class="nav-link">
                                    Home
                                </router-link>
                            </li>
                            <li class="nav-item spacing">
                                <router-link :to="{name: 'AllApartments'}" class="nav-link">
                                    Apartments
                                </router-link>
                            </li>
                            <li class="nav-item spacing">
                                <router-link :to="{name: 'AboutUs'}" class="nav-link">
                                    About Us
                                </router-link>
                            </li>
                            <div class="d-flex align-items-center text-center justify-content-center">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        User Actions
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="http://localhost:8000/login" target="_blank">Login</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="http://localhost:8000/register" target="_blank">Register</a></li>
                                    </ul>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use "../../style/general.scss" as *;
header {
    .logo {
        width: 3rem;
    }

    .spacing {
        width: calc(100% / 3);
        margin: 0;
        display: flex;
    }
}
</style>