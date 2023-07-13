<script>
import axios from 'axios';
import { store } from '../../store';
import MessageForm from './MessageForm.vue';
import MapPage from '../pages/MapPage.vue';

export default {
    name: "AppDetail",
    components: {
        MessageForm,
        MapPage
    },
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
                console.log(response.data.results);
            }).finally(() => {
                this.isLoading = false;
                console.log(this.apartment);
            });
    }
}
</script>

<template>
    <div v-if="isLoading"> Loading</div>
    <!-- Aggiungi il componente Loader quando isLoading è true -->
  
    <div
      v-else-if="!isLoading"
      class="margin-fix"
    >
      <!-- <AppCard v-if="apartment" :apartment="apartment" /> -->
      <div class="container detail-appartment py-2 px-5 my-4 rounded-4">
        <div class="row py-3">
          <h2 class="title-section">{{ apartment.name }}</h2>
          <div class="col-12 pt-3">
            <!-- image appartment  -->
            <div class="appartment-image-frame rounded-4">
              <img
                :src="apartment.image"
                class="image-appartment rounded-4"
                alt="#"
              />
            </div>
          </div>
        </div>
        <!-- detail  -->
        <div class="row">
          <div class="col-12 col-lg-8 d-flex flex-column py-3 pe-5">
            <div class="pb-2">
              <h2 class="fw-semibold">{{ apartment.address }}</h2>
            </div>
            <div class="border-bottom border-secondary">
              <ul class="fix-list d-flex flex-row">
                <li>
                  {{ apartment.room_number }}
                  <span v-if="apartment.rooms < 2"> Camera</span>
                  <span v-else>Camere</span>
                </li>
                <li>
                  {{ apartment.bed_number }}
                  <span v-if="apartment.beds < 2"> Letto</span>
                  <span v-else>Letti</span>
                </li>
                <li>
                  {{ apartment.bathroom_number }}
                  <span v-if="apartment.bathroom_number < 2"> Bagno</span>
                  <span v-else>Bagni</span>
                </li>
                <li>{{ apartment.square_meters }} <span>Mq</span></li>
              </ul>
            </div>
            <!-- description appartment  -->
            <div class="pt-3 pb-1 border-bottom border-secondary">
              <h3 class="title-section">Descrizione dell'appartamento:</h3>
              <p class="fs-5">
                {{ apartment.description }}
              </p>
            </div>
            <!-- service  -->
            <div class="pt-3 pb-4 border-bottom border-secondary">
              <h3 class="title-section pb-2">Servizi presenti:</h3>
              <div class="">
                <!-- <ul class="d-flex flex-row flex-wrap p-0">
                  <li class="py-2 px-3 m-2 service-card rounded-5" v-for="service in apartment.services" :key="service.id">
                    <span><font-awesome-icon :icon="service.icon" /></span>
                    <span class="service-name ms-2">{{ service.name }}</span>
                  </li>
                </ul> -->
  
                <!-- * LAYOUT CON TOOLTIP -->
                <ul class="d-flex flex-row flex-wrap p-0">
                  <li
                    class="m-2 service-card"
                    v-for="service in apartment.services"
                    :key="service.id"
                  >
                    <span class="my-tooltip">
                      <font-awesome-icon :icon="service.icon" />
                      <span class="my-tooltip-text">{{ service.name }}</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- end detail  -->
          <!-- init form  -->
          <div class="col-12 col-lg-4 my-4">
            <MessageForm :apartment_id="apartment.id" />
          </div>
          <!-- end form  -->
        </div>
      </div>
      <!-- end container  -->
  
      <!-- map container -->
      <div class="container detail-appartment py-2 px-5 my-4 rounded-4">
        <div class="row">
          <div class="col-12 py-5">
            <h2 class="pb-3">Noi Siamo qui</h2>
            <MapPage
              :lat="apartment.latitude"
              :lon="apartment.longitude"
            />
          </div>
        </div>
      </div>
      <!-- end map container -->
    </div>
  </template>
<!-- <template>
    <div class="container w-100">
        <div v-if="isLoading">
            Loading
        </div>
        <div v-else class="card px-3 pt-3 text-center rounded-3 w-100">
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
            <div class="container">
                <MessageForm :apartment_id="apartment.id" />
            </div>
            <div class="container py-2 px-5 my-4 rounded-4">
                <div class="row">
                    <div class="col-12 py-5 border rounded">
                        <h2 class="pb-3">We are here!</h2>
                        <MapPage :lat="apartment.latitude" :lon="apartment.longitude" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> -->


<style lang="scss" scoped>
@use "../../style/partials/variables.scss" as *;

// appartment detail ****************************

.margin-fix {
  margin-top: 5rem;
  margin-bottom: 4rem;
  .detail-appartment {
    background-color: #f1f1f1;
    color: $dark_color;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    margin: 18rem auto;

    .appartment-image-frame {
      // background-image: url(../../assets/images/house-10b.jpg);
      // background-size: cover;
      // background-repeat: no-repeat;
      // background-position: center;
      height: 450px;
      box-shadow: 3px 8px 10px rgba(0, 0, 0, 0.5);
      width: 100%;

      .image-appartment {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .fix-list {
      padding-left: 0;

      li {
        font-size: 1.2rem;
        padding: 0 0.9rem 0 0;
      }
    }

    .service-card {
      color: white;
      text-align: center;
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      vertical-align: middle;
      border-radius: 50%;
      background-color: $dark_color;
      font-size: 0.9rem;
    }

    .title-section {
      font-weight: 600;
    }

    /* Tooltip */
    .my-tooltip {
      position: relative;
      display: inline-block;

      /* Testo del tooltip */
      .my-tooltip-text {
        visibility: hidden;
        width: 120px;
        background-color: rgba(50, 50, 50, 0.8);
        color: #fff;
        text-align: center;
        border-radius: 6px;

        /* Dove posizionare il tooltip*/
        position: absolute;
        bottom: 2.3rem;
        right: -3.5rem;
        z-index: 1;
      }
    }

    .my-tooltip:hover .my-tooltip-text {
      visibility: visible;
    }
  }
}
</style>