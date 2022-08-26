import { Location, Weather } from "@/types";
import { createStore } from "vuex";
import {
  ADD_LOCATION,
  CHANGE_LOCATIONS,
  REMOVE_LOCATION,
  RESTORE_LOCATIONS,
} from "./mutationTypes";

export default createStore({
  state: {
    currentWeather: new Weather(),
    locations: new Array<Location>(),
  },
  mutations: {
    [ADD_LOCATION](state, payload: Location) {
      let cityExist = false;
      state.locations.forEach((city) => {
        if (city.id === payload.id) {
          cityExist = true;
        }
      });
      if (!cityExist) {
        state.locations.push(payload);
        localStorage.setItem(
          "myWeatherLocations",
          JSON.stringify(state.locations)
        );
      }
    },
    [RESTORE_LOCATIONS](state) {
      const localStorageData = localStorage.getItem("myWeatherLocations");
      if (localStorageData) {
        const locations = JSON.parse(localStorageData);
        state.locations = locations;
      }
    },
    [REMOVE_LOCATION](state, id) {
      const indexToremove = state.locations.findIndex((loc) => loc.id === id);
      state.locations.splice(indexToremove, 1);
      localStorage.setItem(
        "myWeatherLocations",
        JSON.stringify(state.locations)
      );
    },
    [CHANGE_LOCATIONS](state, payload) {
      const indexToremove = state.locations.findIndex(
        (loc) => loc.id === payload.movingId
      );
      const removedItem = state.locations.splice(indexToremove, 1);

      const indexTochange = state.locations.findIndex(
        (loc) => loc.id === payload.idTochange
      );
      state.locations.splice(indexTochange, 0, removedItem[0]);
      localStorage.setItem(
        "myWeatherLocations",
        JSON.stringify(state.locations)
      );
    },
  },
  actions: {},
  modules: {},
  getters: {
    getLocations(state) {
      return state.locations;
    },
    getLocationById: (state) => (id: number) => {
      return state.locations.find((location) => location.id === id);
    },
  },
});
