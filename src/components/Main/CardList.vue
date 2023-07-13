<script>
import AppCard from './AppCard.vue';

export default {
        components: {
            AppCard
        },
        props: {
            apartments: Array,
        }
    }
</script>

<template>
    <div class="container">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 pb-5 pt-1">
            <AppCard v-for="apartment in apartments" :key="apartment.id" :apartment="apartment" class="col d-flex"/>
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>