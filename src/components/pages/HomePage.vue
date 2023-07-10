<script>
import axios from 'axios';
import { store } from '../../store';

export default {
    name: "HomePage",
    data() {
        return {
            sponsoredApartment: [],
            store,
            isLoading: false,
        }
    },
    methods: {
        fetchSponsoredApartment() {
            this.isLoading = true;
            axios.get(`${this.store.apiUrl}/sponsored-apartments`).then((response) =>{
                this.sponsoredApartment = response.data.results.data;
                console.log(response.data.results.data);
            })
        }
    },
    mounted() {
        this.fetchSponsoredApartment();
    }
}
</script>

<template>
    <div class="jumbotron">

        <router-link :to="{name: 'AllApartments'}" class="btn btn-success">
            Inizia la tua ricerca
        </router-link>
        
        <h3>Lista appartamenti sponsorizzati</h3>
        <div v-for="apartment in sponsoredApartment" :key="apartment.id">
            <p>
                {{apartment.name}}
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