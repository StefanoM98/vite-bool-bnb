<script>
    name: "AppCard"
    export default {
        props: {
            apartment: Object,
        },
    }
</script>

<template>
    <div>
        <div class="py-3 w-100 d-flex justify-content-center">
            <router-link :to="{name:'ApartmentsDetails', params: {slug:apartment.slug}}" :apartment="apartment" class="w-100">
                <div class="card px-3 pt-3 text-center rounded-3">
                    <h2>{{ apartment.name }}</h2>
                    <div class="card-img">
                        <img :src="apartment.image" :alt="apartment.name">
                    </div>
                    <div class="card-body">
                        <div v-show="apartment.sponsored === true">sponsorizzato</div>
                        <h2 class="py-1">{{ apartment.address }}</h2>
                        <p>
                            {{ apartment.bed_number }}
                            {{ apartment.room_number }}
                            {{ apartment.square_meters }} sqm
                        </p>
                    </div>
                    <h2>{{ apartment.price }}/night</h2>
                </div>
            </router-link>
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>