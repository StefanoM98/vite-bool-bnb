<script>
import axios from "axios";
import { store } from "../../store";

import CardList from "../Main/CardList.vue";
import AppSearch from "./AppSearch.vue";
import FilterSection from "../Main/FilterSection.vue";
export default {
    name: "AllApartments",

    components: {
        CardList,
        AppSearch,
        FilterSection,
    },
    data() {
        return {
            store,
            isLoading: false,
            apartments: {
                data: [],
            },
            address: "",
            lat_a: "",
            lon_a: "",
            filteredApartments: [],
            resetApartments: [],
            showAll: true,
            rangeValue: null,
            showNoResults: false,
        };
    },
    methods: {
        fetchApartments() {
            this.isLoading = true;
            axios
                .get(`${this.store.apiUrl}/apartments`)
                .then((response) => {
                    this.apartments.data = response.data.results.data;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchCoordinates() {
            this.lat_a = "";
            this.lon_a = "";
            axios
                .get(
                    `https://api.tomtom.com/search/2/geocode/${this.address}.json?key=${this.store.ttKey}&countrySet=IT`
                )
                .then((response) => {
                    this.lat_a = response.data.results[0].position.lat;
                    this.lon_a = response.data.results[0].position.lon;
                    this.calculateDistance();
                });
        },
        // Setta array appartamento passato nel parametro uguale all'array appartamenti filtrati
        filterApartments(apartments) {
            this.filteredApartments = apartments;
        },
        // Calcola il raggio e aggiunge appartamenti all'array appartamenti filtrati se la distanza è minore o uguale al range nel parametro
        calculateDistance(radius) {
            if (this.rangeValue === null) {
                radius = 20;
            } else {
                radius = this.rangeValue;
            }
            this.filteredApartments = [];
            // Variabile per non stampare tutti gli appartamenti ma solo quelli filtrati per raggio
            this.showAll = false;
            for (let i = 0; i < this.apartments.data.length; i++) {
                const lat_a = this.lat_a; // Latitudine del punto 1
                const lon_a = this.lon_a; // Longitudine del punto 1
                const lat_b = this.apartments.data[i].latitude; // Latitudine del punto 2
                const lon_b = this.apartments.data[i].longitude; // Longitudine del punto 2
                const earthRadius = 6371; // Raggio medio della Terra in chilometri
                const dLat = this.toRadians(lat_b - lat_a);
                const dLon = this.toRadians(lon_b - lon_a);
                const a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(this.toRadians(lat_a)) *
                    Math.cos(this.toRadians(lat_b)) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const distance = earthRadius * c;

                if (distance <= radius) {
                    this.filteredApartments.push({
                        ...this.apartments.data[i],
                        distance: distance, // Add the distance property to each filtered apartment
                    });
                }

                if (this.filteredApartments.length === 0) {
                    this.showNoResults = true;
                }
            }
        },
        //converte gradi in radianti (serve a calculateDistance())
        toRadians(degrees) {
            return (degrees * Math.PI) / 180;
        },
        // Ritorna l'array chiamato sul created
        resetFilters() {
            this.fetchApartments();
            this.showAll = true;
            this.showNoResults = false;
            this.address = "";
        },
    },
    created() {
        this.fetchApartments();
    },
};
</script>

<template>
    <!-- <AppSearch @filterApartments="fetchCoordinates()"/> -->
    <div class="container">
        <div class="d-flex">
            <form class="d-flex flex-grow-1" role="search" @submit.prevent="fetchCoordinates()">
                <input class="form-control" type="search" aria-label="Search" v-model="address" id="address"
                    name="address" />
                <button class="btn btn-primary mx-2" type="submit">Search</button>
            </form>
            <form @submit.prevent="resetFilters()">
                <button type="submit" class="btn btn-primary">Reset all filters</button>
            </form>
        </div>
        <FilterSection />
    </div>
    <!-- <div v-if="isLoading">
        Caricamento
    </div> -->
    <CardList v-if="showAll" :apartments="apartments.data" />
    <CardList v-else-if="!showAll" :apartments="filteredApartments" />
    <div v-if="showNoResults" class="container">
        <p class="my-3">
            This search did not produce results, set other filters or specify the
            address you want to search by specifying the city
        </p>
    </div>
</template>

<style></style>
