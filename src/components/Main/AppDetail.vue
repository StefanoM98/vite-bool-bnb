<script>
import axios from 'axios';
import { store } from '../../store';

export default {
    name: "AppDetail",
    data() {
        return {
            store,
            isLoading: false,
            apartment: null
        }
    },
    created() {
        this.isLoading = true;
        axios.get(`${this.store.apiUrl}/apartments/${this.$route.params.slug}`)
        .then((response) => {
            this.apartment = response.data.results;
            this.isLoading = false;
            console.log(response.data.results);
        })
    }
}
</script>

<template>
    <div class="container w-100">
        <div v-if="isLoading">
            Loading
        </div>
        <div v-else class="card px-3 pt-3 text-center rounded-3 w-100" >
            <h2>{{ apartment.name }}</h2>
            <div class="card-img-top w-100">
                <img :src="apartment.image" :alt="apartment.name">
            </div>
            <div class="card-body">
                <h2 class="py-1">{{ apartment.address }}</h2>
                <p>
                    {{ apartment.bed_number }}
                    {{ apartment.room_number }}
                    {{ apartment.square_meters }} sqm
                </p>
            </div>
            <h2>{{ apartment.price }}/night</h2>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    
</style>