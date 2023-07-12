<script>
import axios from "axios";
import { store } from "../../store";

import CardList from "../Main/CardList.vue";
import AppSearch from "./AppSearch.vue";

export default {
    name: "AllApartments",

    components: {
        CardList,
        AppSearch,
    },
    data() {
        return {
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

            // gestione servizi
            services: [],
            allServices: [],
            requiredServices: [],

            // gestione stanze, letti, bagni
            rooms: '',
            beds: '',
            bathrooms: '',
        };
    },
    methods: {
        fetchServices() {
            axios.get(`${this.store.apiUrl}/services`).then((response) => {
                this.allServices = response.data.services;
            });
        },
        fetchApartments() {
            this.isLoading = true;
            this.showNoResults = true;
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
            this.apartmentsLoader = true;
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
            }
            if (this.filteredApartments) {
                this.showNoResults = true;
            }
            this.apartmentsLoader = false;
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
            this.address = '';
            this.rangeValue = '',
            this.services = [];
            this.servicesApartments = [];
            this.filteredApartments = [];
            this.beds = '';
            this.bathrooms = '';
            this.rooms = '';
        },
        requireServices() {
            axios
                .get("http://127.0.0.1:8000/api/services")
                .then((response) => {
                    // Stampa tutti i servizi
                    this.allservices = response.data.services;
                    //console.log("servizi totali", this.allServices);

                    // Stampa solo i servizi con checkbox attiva
                    this.requiredServices = this.allServices.filter((service) => {
                        return this.selected.includes(service);
                    });
                });
        },
        filterApartments() {
            this.servicesApartments = [];
            this.showAll = false;
            this.showNoResults = false;
            this.filteredApartments = this.apartments.filter(apartment => {
                const apartmentServiceIds = apartment.services.map(service => service.id);
                const hasMatchingServices = this.services.every(serviceId => apartmentServiceIds.includes(serviceId));
                const hasMatchingAddress = apartment.city.toLowerCase().includes(this.address.toLowerCase()) || apartment.address.toLowerCase().includes(this.address.toLowerCase());
                const hasEnoughRooms = apartment.room_number >= this.rooms;
                const hasEnoughBathrooms = apartment.bathroom_number >= this.bathrooms;
                const hasEnoughBeds = apartment.bed_number >= this.beds;
                return hasMatchingServices && hasMatchingAddress && hasEnoughRooms && hasEnoughBathrooms && hasEnoughBeds;
            });
            if (this.filteredApartments.length == 0) {
                this.showNoResults = true;
            }
            console.log(this.filteredApartments);
        },

    },
    mounted() {
        this.fetchApartments();
        this.fetchServices();
        if (this.$route.query.search != undefined) {
            this.showAll = false
            this.filteredApartments = JSON.parse(this.$route.query.search)
        }
    },
    created() {
        // caricamento delle query all'avvio della pagina
        if (this.apartments) {
            // Gestione indirizzo al caricamento della pagina
            if (this.$route.query.address != undefined) {
                this.address = this.$route.query.address;
            } else {
                this.address = '';
            }
            // Gestione dei servizi al caricamento della pagina
            if (this.$route.query.services != undefined) {
                this.services = this.$route.query.services;
            } else {
                this.services = [];
            }
            // Gestione posti letto al caricamento della pagina
            if (this.$route.query.bed != undefined) {
                this.beds = this.$route.query.bed;
            } else {
                this.beds = '';
            }
            // Gestione stanze al caricamento della pagina
            if (this.$route.query.room != undefined) {
                this.rooms = this.$route.query.room;
            } else {
                this.rooms = '';
            }
            // Gestione bagni al caricamento della pagina
            if (this.$route.query.bathroom != undefined) {
                this.bathrooms = this.$route.query.bathroom;
            } else {
                this.bathrooms = '';
            }
            // Gestione stanze al caricamento della pagina
            if (this.$route.query.range != undefined) {
                this.rangeValue = this.$route.query.range;
            } else {
                this.rangeValue = '';
            }
        }
    },
};
</script>

<template>
    <div v-if="apartmentsLoader">
        Loading...
    </div>
    <div v-else class="container">

        <!-- Ricerca indirizzo/città -->
        <form class="input-group">
            <input class="form-control" type="search" aria-label="Search" v-model="address" id="address" name="address"
                :placeholder="emptyAddress" />
            <button @click.prevent="fetchCoordinates()" class="btn btn-primary" type="submit">Search address</button>
        </form>
        <!-- Selezione raggio di ricerca -->
        <label for="customRange3" class="form-label my-3">Enter search radius</label>
        <div class="d-flex row-cols">
            <p class="col-1">20 km</p>
            <input type="range" class="form-range" min="20" max="200" step="1" id="customRange3" v-model="rangeValue">
            <p class="col-1 text-end">200 km</p>
        </div>
        <!-- Servizi -->
        <ul class="d-flex flex-wrap px-3 border rounded my-3">
            <li class="col-3 px-3 list-group" v-for="service in allServices" :key="service.id">
                <label>
                    <input type="checkbox" :id="service.id" :value="service.id" v-model="services" />
                    <span class="ms-3">{{ service.name }}</span>
                </label>
            </li>
        </ul>
        <div class="row g-3">
            <!-- Selezione n.bagni -->
            <div class="col-4 mb-3">
                <label class="" for="bed">Bed number</label>
                <input type="number" class="form-control" id="bed" placeholder="Beds number" min="0" v-model="beds">
            </div>
            <!-- Selezione n.stanze -->
            <div class="col-4 mb-3">
                <label class="" for="room">Room number</label>
                <input type="number" class="form-control" id="room" placeholder="Room number" min="0" v-model="rooms">
            </div>
            <!-- Selezione n.letti -->
            <div class="col-4 mb-3">
                <label class="" for="bathroom">Bathroon number</label>
                <input type="number" class="form-control" id="bathroom" placeholder="Bathroom number" min="0"
                    v-model="bathrooms">
            </div>
        </div>
        <button @click="resetFilters" type="submit" class="btn btn-primary">Reset all filters</button>
        <router-link
            :to="{ name: 'AllApartments', query: { address: this.address, services: this.services, bed: this.beds, room: this.rooms, bathroom: this.bathrooms, range: this.rangeValue } }">
            <button @click="filterApartments" class="btn btn-primary ms-3" type="submit">Apply Filters</button>
        </router-link>
    </div>
    <CardList v-if="showAll" :apartments="apartments" />
    <CardList v-if="filteredApartments.length > 0" :apartments="filteredApartments" />
    <div v-if="filteredApartments.length === 0 & showNoResults" class="container">
        <p class="my-3">
            This search did not produce results, set other filters or specify the
            address you want to search by specifying the city
        </p>
    </div>
</template>

<style></style>
