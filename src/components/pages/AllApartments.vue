<script>
import axios from 'axios';
import { store } from '../../store';

export default {
    name: "AllApartments",
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
            showAll: true, // Variabile che serve nel template come parametro della condizione per la prop di AppList
            rangeValue: null,
        }
    },
    methods: {
        fetchApartments() {
            this.isLoading = true;
            axios.get(`${this.store.apiUrl}/apartments`).then((response)  => {
                this.apartments.data = response.data.results.data;
                console.log(response.data.results);
            }).finally(() => {
                this.isLoading = false;
            })
        },
        fetchCoordinates() {
            this.lat_a = "";
            this.lon_a = "";

            axios.get(`https://api.tomtom.com/search/2/geocode/${this.address}.json?key=${this.store.ttKey}&countrySet=IT`)
            .then((response) => {
                this.lat_a = response.data.results[0].position.lat;
                this.lon_a = response.data.results[0].position.lon;

                this.calculateDistance();
            })

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
            console.log(radius);
            this.filteredApartments = [];
            // Variabile per non stampare tutti gli appartamenti ma solo quelli filtrati per raggio
            this.showAll = false;
            for (let i = 0; i < this.apartments.list.length; i++) {
                const lat_a = this.lat_a; // Latitudine del punto 1
                const lon_a = this.lon_a; // Longitudine del punto 1

                //console.log(this.apartments.list[i]);

                const lat_b = this.apartments.list[i].latitude; // Latitudine del punto 2
                // console.log("Latitudine dell'appartamento " + lat_b);
                const lon_b = this.apartments.list[i].longitude; // Longitudine del punto 2
                // console.log("Longitudine dell'appartamento " + lon_b);

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
                // console.log(`Distanza: ${distance} km`);
                if (distance <= radius) {
                    this.filteredApartments.push({
                        ...this.apartments.list[i],
                        distance: distance, // Add the distance property to each filtered apartment
                    });
                }

                console.log(this.filteredApartments);
                // console.log("ApP filtrati " + this.searchedApartments);
                // console.log("i " + i);
                console.log("distance " + distance); // console.log("range " + range);

                // ORDINAMENTO PER DISTANZA FUNZIONA:
                // this.filteredApartments.sort((a, b) => a.distance - b.distance); // Sort the filtered apartments by distance
            }

            // console.log(this.filteredApartments.sort((a, b) => a.distance - b.distance));
            console.log("n App filtrati " + this.filteredApartments.length);
        },

        //converte gradi in radianti (serve a calculateDistance())
        toRadians(degrees) {
            return (degrees * Math.PI) / 180;
        },
        // updateRange(range) {
        //   this.searchApartmentsFilter(range);
        // },

        // Ritorna l'array chiamato sul created
        resetFilters() {
            this.fetchApartments();
            this.showAll = true;
        },
    },
    created() {
        this.fetchApartments();
    }
}
</script>

<template>

</template>

<style>

</style>