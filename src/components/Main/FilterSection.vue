<script>
import axios from "axios";
import { store } from "../../store";
export default {
  name: "FilterSection",
  data() {
    return {
      store,
      filteredApartments: [],
      
      // filters
      name: null,
      rooms: null,
      bathrooms: null,
      beds: null,
      price: null,
      
      // services
      allServices: [],
      services: [],
      requiredServices: [],
    };
  },
  props: {allApartments: Array},
  methods: {
    fetchServices() {
      axios.get(`${this.store.apiUrl}/services`).then((response) => {
        this.allServices = response.data.services;
      });
    },
    //CERCA SERVIZI RICHIESTI
    // requireServices() {
    //   axios
    //     .get("http://127.0.0.1:8000/api/services")
    //     .then((response) => {
    //       // Stampa tutti i servizi
    //       this.allServices = response.data.services;
    //       //console.log("servizi totali", this.allServices);

    //       // Stampa solo i servizi con checkbox attiva
    //       this.requiredServices = this.allServices.filter((service) => {
    //         return this.services.includes(service.id);
    //       });
    //     });
    // },
    searchApartmentFilter() {
      this.filteredApartments= [];
      axios
        .get(`${this.store.apiUrl}/apartments`, {
          params: {
            room_number: this.rooms,
            bathroom_number: this.bathrooms,
            bed_number: this.beds,
            price: this.price,
            services: this.services,
          },
        })
        .then((response) => {
          // Stampa solo i servizi con checkbox attiva
          this.requiredServices = this.allServices.filter((service) => {
            return this.services.includes(service.id);
          });
          console.log(
            "questi sono i servizi richiesti con this.requiredServices.map",
            this.requiredServices.map((service) => ({
              id: service.id,
              name: service.name,
            }))
          );

          // Stampa solo gli appartamenti che coincidono con i valori specificati
          const filteredApartments = this.allApartments.filter((apartment) => {
            //ID dei servizi checkati
            const checkedServices = this.services;

            //ID dei servizi di ogni appartamento
            const serviceIds = apartment.services.map((service) => service.id);

            // Verifica se tutti i valori di checkedServices sono presenti in serviceIds
            const matchingServices = checkedServices.every((serviceId) =>
              serviceIds.includes(serviceId)
            );
            /* console.log("ID dei servizi checkati", checkedServices);
            console.log("ID dei servizi di ogni appartamento", serviceIds);
            console.log("Tutti i servizi corrispondono:", matchingServices); */

            return (
              (this.beds === null || apartment.beds >= this.beds) &&
              (this.rooms === null || apartment.rooms >= this.rooms) &&
              (this.bathrooms === null ||
                apartment.bathrooms >= this.bathrooms) &&
              //dal prezz minimo
              (this.currentMinPrice === null ||
                apartment.price >= this.currentMinPrice) &&
              //al prezzo massimo
              (this.currentMaxPrice === null ||
                apartment.price <= this.currentMaxPrice) &&
              /* FILTRO PER SERVIZI */
              matchingServices
            );
          });

          console.log(
            "appartamenti filtrati",
            filteredApartments.map((apartment) => ({
              name: apartment.name,
              rooms: apartment.room_number,
              beds: apartment.bed_number,
              bathrooms: apartment.bathroom_number,
              services: apartment.services,
            }))
          );

          // Aggiorna la lista degli appartamenti filtrati
          this.$emit("filterApartments", filteredApartments);
        });

    },
  },
  mounted() {
    this.fetchServices();
  },
};
</script>

<template>
  <div class="container">
    <div class="form-check form-check-inline">
      <form method="get">
        Seleziona i servizi che vuoi
        <ul class="d-flex flex-wrap px-3">
          <li class="px-3" v-for="service in allServices" :key="service.id">
            <label>
              <input type="checkbox" :id="service.id" :value="service.id" v-model="services"/>
              <span class="ms-2">{{ service.name }}</span>
            </label>
          </li>
        </ul>
        <button @click="searchApartmentFilter(), requireServices()" type="submit" class="btn btn-primary">Go filter</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
ul {
  list-style-type: none;
}
</style>
