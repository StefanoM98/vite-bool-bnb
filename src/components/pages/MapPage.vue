<script>
import { onMounted } from 'vue'

export default {

  name: 'Map',

  props:{
    lat: String,
    lon: String,
  },

  setup(props) {
        let map = null;
        onMounted(() => {
            map = tt.map({
                key: 'q6xk75W68NwnmO3Kj5A9ZdBIBFmcbPBJ',
                container: 'map',
                center: [props.lon, props.lat],
                zoom: 15,
                radius: 20000
            });

            const marker = new tt.Marker().setLngLat([props.lon, props.lat]).addTo(map);
            map.addControl(new tt.NavigationControl());

        });

        return { map };
  }
}
</script> 
        

<template>
  <div class="tomtom">
        <h3 class="mb-4">Map:</h3>
        <div id="map" class="map-container"></div>
    </div>
</template> 
 

<style lang="scss" scoped>
.map-container {
  height: 400px;
}
</style>