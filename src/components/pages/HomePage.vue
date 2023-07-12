<script>
import axios from 'axios';
import { store } from '../../store';
import { stringifyQuery } from 'vue-router';
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
        fetchApartments() {
            this.isLoading = true;
            axios
                .get(`${this.store.apiUrl}/apartments`)
                .then((response) => {
                    this.apartments = response.data.results.data;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchCoordinates() {
            this.lat_a = "";
            this.lon_a = "";
            if (this.address != '') {
                axios
                    .get(
                        `https://api.tomtom.com/search/2/geocode/${this.address}.json?key=${this.store.ttKey}&countrySet=IT`
                    )
                    .then((response) => {
                        this.lat_a = response.data.results[0].position.lat;
                        this.lon_a = response.data.results[0].position.lon;
                        this.calculateDistance();
                    });
            } else {
                this.emptyAddress = 'Please, enter an address'
            }
        },
        // Calcola il raggio e aggiunge appartamenti all'array appartamenti filtrati se la distanza è minore o uguale al range nel parametro
        calculateDistance(radius) {
            this.filteredApartments = [];
            if (this.rangeValue === '') {
                radius = 20;
            } else {
                radius = this.rangeValue;
            }
            this.showNoResults = false;
            // Variabile per non stampare tutti gli appartamenti ma solo quelli filtrati per raggio
            this.showAll = false;
            for (let i = 0; i < this.apartments.length; i++) {
                const lat_a = this.lat_a; // Latitudine del punto 1
                const lon_a = this.lon_a; // Longitudine del punto 1
                const lat_b = this.apartments[i].latitude; // Latitudine del punto 2
                const lon_b = this.apartments[i].longitude; // Longitudine del punto 2
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
                        ...this.apartments[i],
                        distance: distance, // Add the distance property to each filtered apartment
                    });
                }
                console.log(this.filteredApartments);
            }
        },
        //converte gradi in radianti (serve a calculateDistance())
        toRadians(degrees) {
            return (degrees * Math.PI) / 180;
        },
    },
    mounted() {
        this.fetchSponsoredApartment();
        this.fetchApartments();
        
    }
}
</script>

<template>
    <div class="jumbotron">
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Start your search" v-model="this.address" @keyup="fetchCoordinates()">
            <router-link  :to="{ name: 'AllApartments', query: {address: this.address, search: JSON.stringify(filteredApartments) }}" class="btn btn-success">
                Inizia la tua ricerca
            </router-link>
        </div>

        <h3>Lista appartamenti sponsorizzati</h3>
        <div v-for="apartment in sponsoredApartment" :key="apartment.id">
            <p>
                {{ apartment.name }}
            </p>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.jumbotron {
    height: 500px;
    background-image: url("./src/assets/img/jumbotron_home.jpeg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    object-fit: cover;
}
</style>