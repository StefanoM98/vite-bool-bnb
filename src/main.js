import { createApp } from 'vue';
import { router } from './router';
// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import App from './App.vue';


// FONT AWESOME

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/*  import font awesome icon component  */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/*  import specific icons */

import { faDoorOpen, faGlobe, faRotate, faRssSquare, faSquare, faStar } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faCrown } from "@fortawesome/free-solid-svg-icons";



/brands/;
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faBootstrap } from "@fortawesome/free-brands-svg-icons";
import { faVuejs } from "@fortawesome/free-brands-svg-icons";
import { faLaravel } from "@fortawesome/free-brands-svg-icons";

/services/;
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { faSquareParking } from "@fortawesome/free-solid-svg-icons";
import { faPersonSwimming } from "@fortawesome/free-solid-svg-icons";
import { faBellConcierge } from "@fortawesome/free-solid-svg-icons";
import { faSpa } from "@fortawesome/free-solid-svg-icons";
import { faWater } from "@fortawesome/free-solid-svg-icons";
import { faTv } from "@fortawesome/free-solid-svg-icons";
import { faTemperatureLow } from "@fortawesome/free-solid-svg-icons";
import { faFan } from "@fortawesome/free-solid-svg-icons";
import { faToilet } from "@fortawesome/free-solid-svg-icons";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { faMountainSun } from "@fortawesome/free-solid-svg-icons";
import { faFireBurner } from "@fortawesome/free-solid-svg-icons";
import { faSoap } from "@fortawesome/free-solid-svg-icons";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faSprayCan } from "@fortawesome/free-solid-svg-icons";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { faBabyCarriage } from "@fortawesome/free-solid-svg-icons";
import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { faSprayCanSparkles } from "@fortawesome/free-solid-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { faWheelchairMove } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faHotTubPerson } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faGlobe,
  faFilter,
  faLocationDot,
  faMagnifyingGlass,
  faEye,
  faHouse,
  faCrown,
  faStar,
  faSquare,
  faRssSquare,
  faDoorOpen,
  faRotate,
);
/brands/;
library.add(
  faFacebook,
  faInstagram,
  faTwitter,
  faGoogle,
  faGithub,
  faLinkedin,
  faBootstrap,
  faVuejs,
  faLaravel
);
/services/;
library.add(
  faWifi,
  faSquareParking,
  faPersonSwimming,
  faBellConcierge,
  faSpa,
  faWater,
  faTv,
  faTemperatureLow,
  faFan,
  faToilet,
  faMugHot,
  faMountainSun,
  faFireBurner,
  faSoap,
  faMugHot,
  faWind,
  faSprayCan,
  faRobot,
  faStroopwafel,
  faTree,
  faBabyCarriage,
  faShirt,
  faSprayCanSparkles,
  faFire,
  faWheelchairMove,
  faBed,
  faHotTubPerson
);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app')
// createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
