<template>
  <weather-view :weather="weather" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherView, { Weather } from "@/components/WeatherView.vue";
import { Location } from "@/types";
import store from "@/store";
import { OPEN_WEATHER_API_KEY } from "@/utils/constants";

export default defineComponent({
  name: "City",
  components: {
    WeatherView,
  },
  created() {
    this.location = store.getters.getLocationById(+this.$route.params.id);
    this.getWeather();
  },
  data() {
    return {
      weather: new Weather(),
      location: new Location(),
    };
  },
  methods: {
    async getWeather() {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.location.city},${this.location.country}&appid=${OPEN_WEATHER_API_KEY}`;
      const response = await fetch(URL);
      const data: Weather = await response.json();
      this.weather = data;
    },
  },
});
</script>
