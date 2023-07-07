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
    <router-link :to="{name: 'AllApartments'}" class="btn btn-success">
        Inizia la tua ricerca
    </router-link>

    <h3>Lista appartamenti sponsorizzati</h3>
    <div v-for="apartment in sponsoredApartment" :key="apartment.id">
        <p>
            {{apartment.name}}
        </p>
    </div>
</template>


<style lang="scss" scoped>

</style>