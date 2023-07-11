<script>
import axios from "axios";
import { store } from "../../store";
export default {
  name: "FilterSection",
  data() {
    return {
      store,
      filteredApartments: [],
      allServices: [],
      name: null,
      rooms: null,
      bathroom: null,
      services: [],
      activeCheck: [],
    };
  },
  methods: {
    fetchServices() {
      axios.get(`${this.store.apiUrl}/services`).then((response) => {
        this.allServices = response.data.services;
      });
    },
    getAllServices() {
      axios
        .get(`${this.store.apiUrl}/apartments`, {
          params: {
            rooms: this.rooms,
            bathrooms: this.bathroom,
            services: this.activeCheck,
          },
        })
        .then((response) => {
          this.activeCheck = this.allServices.filter((service) => {
            return this.services.includes(service.id);
          });
        });
      // this.filteredApartments = this.AllApartments;
    },
  },
  mounted() {
    this.fetchServices();
  },
};
</script>

<template>
  <!-- <div class="container">
    <div class="form-check form-check-inline">
      Seleziona i servizi che vuoi
      <ul class="d-flex flex-wrap px-3">
        <li class="px-3" v-for="service in allServices" :key="service.id">
          <label>
            <input type="checkbox" :value="service.id" v-model="services"/>
            <span class="m-2">{{ service.name }}</span>
          </label>
        </li>
      </ul>
    </div>
    <button @click.prevent="getAllServices()" class="btn btn-primary">Go filter</button>
  </div> -->
</template>

<style lang="scss" scoped>
ul {
  list-style-type: none;
}
</style>
