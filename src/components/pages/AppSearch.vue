<script>
import axios from 'axios';
import { store } from "../../store";
export default {
    name: "AppSearch",
    data() {
        return {
            store,
            wordSearched: '',
            filteredApartments: [],
            address: null,
        }
    },
    methods: {
        searchApartment() {
            this.filteredApartments = [],
            axios.get(`${this.store.apiUrl}/apartments`, {
                params: {
                    address: this.wordSearched,
                }
            }).then((response) => {
                this.filteredApartments = response.data.results.data,
                this.$emit("filterApartments", this.filteredApartments)
            })
        }
    }
}
</script>

<template>
    <div class="container">
        <form class="d-flex" role="search" @submit.prevent="searchApartment(filteredApartments)">
            <input class="form-control me-2" type="search" name="" id="" v-model="wordSearched" placeholder="Esegui la ricerca per indirizzo/città">
            <button type="submit" class="btn btn-primary">Cerca</button>
        </form>
    </div>
</template>


<style lang="scss" scoped>

</style>