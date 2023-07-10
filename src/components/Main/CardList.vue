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
        <div class="row">
            <AppCard v-for="apartment in apartments" :key="apartment.id" :apartment="apartment" class="col d-flex"/>
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>