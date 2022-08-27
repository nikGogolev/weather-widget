import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faGear,
  faAnglesLeft,
  faBars,
  faXmark,
  faPlus,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
library.add(faGear, faAnglesLeft, faBars, faXmark, faPlus, faLocationArrow);

class VueWeatherWidget extends HTMLElement {
  connectedCallback() {
    createApp(App)
      .use(store)
      .use(router)
      .component("font-awesome-icon", FontAwesomeIcon)
      .mount("#app");
  }
}

customElements.define("vue-weather-widget", VueWeatherWidget);
