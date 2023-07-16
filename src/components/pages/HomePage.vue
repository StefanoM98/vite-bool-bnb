<script>
import axios from 'axios';
import { store } from '../../store';
import AppCard from '../Main/AppCard.vue';

import Loader from '../Main/Loader.vue';
export default {
    name: "HomePage",
    data() {
        return {
            sponsoredApartment: [],
            store,
            isLoading: false,
            apartments: [],
            apartmentsLoader: false,
            filteredApartments: [],
            servicesApartments: [],
            emptyAddress: '',
            address: '',
            lat_a: '',
            lon_a: '',
            resetApartments: [],
            showAll: true,
            rangeValue: '',
            showNoResults: false,
        }
    },
    components: {
    AppCard,
    Loader
},
    methods: {
        fetchSponsoredApartment() {
            this.isLoading = true;
            axios.get(`${this.store.apiUrl}/sponsored-apartments`).then((response) => {
                this.sponsoredApartment = response.data.results.data;
                console.log(response.data.results.data);
            }).finally(() => {
                this.isLoading = false;
            });
        },
    },
    mounted() {
        this.fetchSponsoredApartment();
        // this.fetchApartments();
    }
}
</script>

<template>
    <Loader v-if="isLoading"/>
    <div v-else>
        <div class="jumbotron position-relative">
            <div class="position-absolute home-title text-center">
                <div class="my-card mb-4">
                    <h2 class="fw-bolder d-inline-block">Bool</h2>
                    <h2 class="fw-bolder d-inline-block title-color">BnB</h2>
                    <p class="fw-bolder fs-3">Where every guest feels at home, <br> anywhere in the world.</p>
                    <div class="my-button-container mt-3">
                        <form submit.prevent class="text-center d-flex justify-content-center">
                            <router-link :to="{ name: 'AllApartments' }" class="btn btn-primary mx-2" type="submit">
                                <span class="btn-icon">
                                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" aria-hidden="true" />
                                </span>
                                <span class="btn-text ms-2">See all Apartments</span>
                            </router-link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="container pt-3">
            <h3>Bests of apartments</h3>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 pb-5 pt-3">
                <AppCard class="col" v-for="apartment in sponsoredApartment" :key="apartment.id" :apartment="apartment" />
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use "../../style/general.scss" as *;
@use "../../style/partials/variables.scss" as *;

.jumbotron {
    margin-top: 2rem;
    height: 500px;
    background-image: url("./src/assets/img/home.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    object-fit: cover;
}

.home-title {
    top: 50%;
    left: 50%;
    width: 50%;
    transform: translate(-50%, -50%);
    color: $dark_color;
}

.title-color {
    color: $dark_accent_color;
}

.my-card {
    // width: 300px;
    padding: 2rem;
    background-color: rgb(221, 221, 221, 0.6);
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    bottom: -4rem;

    .btn {
        position: relative;
        display: inline-block;
        padding: 15px;
        background-color: $dark_accent_color;
        cursor: pointer;
        outline: none;
        border: 0;
        vertical-align: middle;
        text-decoration: none;
        color: #fff;
        border-radius: 25px;
        -webkit-transition: width 1s;
        transition: 1s;

        &:hover {
            background-color: $dark_color;
        }
    }

    .btn .btn-text {
        max-width: 0;
        display: inline-block;
        -webkit-transition: color 0.25s 1.5s, max-width 2s;
        transition: color 0.25s 1.5s, max-width 2s;
        vertical-align: top;
        white-space: nowrap;
        overflow: hidden;
        color: $dark_color;
        animation-fill-mode: forwards;
        animation-name: stretch;
        animation-duration: 4s;
        animation-delay: 400ms;
    }

    @keyframes stretch {
        100% {
            max-width: 300px;
            color: white;
        }
    }

}

@media (max-width: 570px) {
    .home-title {
        width: 80%;
    }
}

@media (max-width: 1000px) {
    .home-title {
        width: 80%;
    }
}
</style>