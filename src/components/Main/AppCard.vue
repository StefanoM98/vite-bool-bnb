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
            <router-link :to="{ name: 'ApartmentsDetails', params: { slug: apartment.slug } }" :apartment="apartment"
                class="w-100 text-reset">
                <div class="card-box px-3 pt-3 text-center rounded-3">
                    <!-- apartment title -->
                    <h2 class="name fw-semibolder fs-4 pt-3 text-truncate">{{ apartment.name }}</h2>
                    <div class="image image-card rounded-3 position-relative">
                        <img :src="apartment.image" :alt="apartment.name" class="image-frame rounded-3">
                        <div v-show="apartment.sponsored == true">
                            <div class="sponsored-icon m-3">
                                <font-awesome-icon :icon="['fas', 'star']" />
                            </div>
                        </div>
                    </div>
                    <div class="details mb-3">
                        <h2 class="py-1">{{ apartment.address }}, {{ apartment.city }}</h2>
                        <p>
                            {{ apartment.bed_number }} <font-awesome-icon icon="fa-solid fa-bed" /> -
                            {{ apartment.room_number }} <font-awesome-icon icon="fa-solid fa-house" /> -
                            {{ apartment.square_meters }} <span class="fw-bold">sqm</span>
                        </p>
                    </div>
                    <h2 class="price fs-4">{{ apartment.price }}/night</h2>
                </div>
            </router-link>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use "../../style/partials/variables.scss" as *;
@import url("https://fonts.googleapis.com/css?family=Lato:200,400|Playfair+Display");

.card-box {
    background-color: #f1f1f1;
    box-shadow: 0 1px 30px rgba(0, 0, 0, 0.12), 0 3px 5px rgba(0, 0, 0, 0.24);

    .sponsored-icon {
        width: 2rem;
        height: 2rem;
        line-height: 2rem;
        border-radius: 50%;
        color: $warning_color;
        vertical-align: middle;
        text-align: center;
        position: absolute;
        top: 0;
        right: 0;
        background-color: wheat;
    }

    h2 {
        color: #fff;
        min-height: 60px;
    }

    .name,
    .price {
        color: #333;
    }

    .image {
        position: relative;
        z-index: 3;
        width: 97%;
        height: 250px;
        margin: 0 auto -10rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 10px rgba(0, 0, 0, 0.24);
        transition: all ease-in 0.15s;
    }

    .image-frame {
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: $light_color;
    }

    .triangle {
        position: absolute;
        bottom: 0;
        left: 50%;
        display: inline-block;
        transform: translate(-50%, 10%);
        vertical-align: middle;
    }

    .triangle-4 {
        width: 150px;
        height: 75px;
        border-bottom: solid 75px #f1f1f1;
        border-left: solid 75px transparent;
        border-right: solid 75px transparent;
    }

    .details {
        position: relative;
        width: 85%;
        margin: 0 auto;
        padding-top: 10.5rem;
        padding-bottom: 1rem;
        background-color: #24ADE3;
        color: #333;
        // background-color: $dark_accent_color;
        // color: #f1f1f1;
        // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 5px rgba(0, 0, 0, 0.24);
        transition: all ease-in 0.15s;

        h2 {
            font-size: 1rem;
        }

        p {
            font-size: 1rem;
            font-weight: 200;
        }
    }
}

.card-box:hover  {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 5px rgba(0, 0, 0, 0.22);
    transform: translate(0px, -2px) scale(1.01);
}

// .card-box:hover .image {
//     box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
//     transform: translate(0px, -3px) scale(1.02);
// }
</style>