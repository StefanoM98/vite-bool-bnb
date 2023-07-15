<script>
import axios from "axios";
import { store } from "../../store";

import CardList from "../Main/CardList.vue";
import AppSearch from "./AppSearch.vue";
import Loader from "../Main/Loader.vue";

export default {
    name: "AllApartments",
    
    components: {
        CardList,
        AppSearch,
        Loader,
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
                    console.log(this.apartments);
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
        // if (this.$route.query.search != undefined || this.$route.query.search != []) {
        //     this.showAll = false
        //     this.filteredApartments = JSON.parse(this.$route.query.search)
        // } else {
        //     this.showAll = true
        // }
        this.fetchApartments();
        this.fetchServices();
    },
    created() {
        // // caricamento delle query all'avvio della pagina
        // if (this.apartments) {
        //     // Gestione indirizzo al caricamento della pagina
        //     if (this.$route.query.address != undefined) {
        //         this.address = this.$route.query.address;
        //     } else {
        //         this.address = '';
        //     }
        //     // Gestione dei servizi al caricamento della pagina
        //     if (this.$route.query.services != undefined) {
        //         this.services = this.$route.query.services;
        //     } else {
        //         this.services = [];
        //     }
        //     // Gestione posti letto al caricamento della pagina
        //     if (this.$route.query.bed != undefined) {
        //         this.beds = this.$route.query.bed;
        //     } else {
        //         this.beds = '';
        //     }
        //     // Gestione stanze al caricamento della pagina
        //     if (this.$route.query.room != undefined) {
        //         this.rooms = this.$route.query.room;
        //     } else {
        //         this.rooms = '';
        //     }
        //     // Gestione bagni al caricamento della pagina
        //     if (this.$route.query.bathroom != undefined) {
        //         this.bathrooms = this.$route.query.bathroom;
        //     } else {
        //         this.bathrooms = '';
        //     }
        //     // Gestione stanze al caricamento della pagina
        //     if (this.$route.query.range != undefined) {
        //         this.rangeValue = this.$route.query.range;
        //     } else {
        //         this.rangeValue = '';
        //     }
        // }
    },
};
</script>

<template>
    <Loader v-if="isLoading"/>
    <div v-else class="container margin-fix">

        <!-- Ricerca indirizzo/città -->
        <label for="address">Search address</label>
        <input class="form-control" autocomplete="off" type="search" aria-label="Search" v-model="address" id="address"
            name="address" placeholder="Search for address or city" />

        <!-- Selezione raggio di ricerca -->
        <label for="customRange3" class="form-label my-3">Enter search radius</label>
        <div class="row row-cols-1 row-cols-md-1">
            <div class="col">
                <div class="d-flex row-cols align-items-center w-100">
                    <p class="col-1 m-0">2 km</p>
                    <input type="range" class="rangeSliderDistance my-3" min="2" max="20" step="0.1" id="customRange3"
                        v-model="rangeValue">
                    <p class="col-1 m-0 text-end">20 km</p>
                </div>
            </div>
            <div class="col my-3">
                <div class="d-flex flex-row align-items-start">
                    <!-- Selezione n.bagni -->
                    <div class="col">
                        <label class="me-2" for="bed">Bed number:</label>
                        <input type="number" class="form-control brb" id="bed" min="0" max="10" v-model="beds">
                    </div>
                    <!-- Selezione n.stanze -->
                    <div class="col mx-3">
                        <label class="me-2" for="room">Room number:</label>
                        <input type="number" class="form-control brb" id="room" min="0" max="10" v-model="rooms">
                    </div>
                    <!-- Selezione n.letti -->
                    <div class="col">
                        <label class="me-2" for="bathroom">Bathroom number:</label>
                        <input type="number" class="form-control brb" id="bathroom" min="0" max="10" v-model="bathrooms">
                    </div>
                </div>
            </div>
        </div>
        <!-- Servizi -->
        <div class="container">
            <ul class="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xxl-4 border rounded my-3 px-0 px-md-3">
                <li class="col py-2 list-group" v-for="service in allServices" :key="service.id">
                    <label
                        :class="['service-label  form-check px-3 justify-content-center', { 'selected-service': services.includes(service.id) }]">
                        <input type="checkbox" class="form-check-input d-none" :id="service.id" :value="service.id"
                            v-model="services" />
                        <div class="d-flex flex-row">
                            <div class="service-icon d-flex flex-row align-items-center">
                                <span class="align-items-center"><font-awesome-icon :icon="service.icon" /></span>
                                <span class="ms-2 text-truncate">{{ service.name }}</span>
                            </div>
                        </div>
                    </label>
                </li>
            </ul>
        </div>

        <button @click="resetFilters" type="submit" class="btn reset-btn rounded-5 mt-2 fw-bold">Reset filters <font-awesome-icon :icon="['fas', 'rotate']" /></button>
        <button @click.prevent="filterApartments()"
            v-if="services.length > 0 || rooms != '' || beds != '' || bathrooms != ''"
            class="btn form-btn rounded-5 mt-2 ms-2 fw-bold" type="submit">Search <font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
        <button @click.prevent="fetchCoordinates()" v-else class="btn form-btn rounded-5 mt-2 ms-2 fw-bold"
            type="submit">Search <font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>

    </div>
    <CardList v-if="showAll" :apartments="apartments" />
    <CardList v-if="filteredApartments.length > 0" :apartments="filteredApartments" />
    <div v-if="filteredApartments.length === 0 & !showAll" class="container">
        <p class="my-3">
            This search did not produce results, set other filters or specify the
            address you want to search by specifying the city
        </p>
    </div>
</template>

<style lang="scss" scoped>
@use "../../style/general.scss" as *;
@use "../../style/partials/variables.scss" as *;

.margin-fix {
    margin-top: 100px;
}

.service-label {
    cursor: pointer;
}

.service-label.selected-service {
    // background-color: $dark_accent_color;
    color: $dark_accent_color
}


.form-control:focus {
    outline: none;
    box-shadow: none;
}

input:focus,
textarea:focus {
    border-color: $dark_accent_color;
}

.form-btn {
    background-color: $dark_accent_color;
    color: #f1f1f1;

    &:hover {
        background-color: $dark_color;
        color: #f1f1f1;
    }
}

.reset-btn {
    background-color: $secondary_color;
    color: #f1f1f1;

    &:hover {
        background-color: $dark_color;
        color: #f1f1f1;
    }
}

.rangeSliderDistance {
    -webkit-appearance: none;
    background: $main_color;
    height: 0.3rem;
    width: 100%;
    border-radius: 25px;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 0.7rem;
        height: 1.5rem;
        border-radius: 20%;
        background-color: $dark_color;
        cursor: pointer;
    }
}</style>
