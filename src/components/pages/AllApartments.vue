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
        }
    },
    methods: {
        fetchApartments() {
            this.isLoading = true;
            axios.get(`${this.store.apiUrl}/apartments`).then((response)  => {
                this.apartments.data = response.data.results.data;
                console.log(response.data.results);
            })
        }
    },
    mounted() {
        this.fetchApartments();
    }
}
</script>

<template>

</template>