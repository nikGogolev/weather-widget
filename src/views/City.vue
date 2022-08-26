<template>
  <weather-view :weather="weather" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherView, { Weather } from "@/components/WeatherView.vue";
import { Location } from "@/types";
import store from "@/store";

export default defineComponent({
  name: "City",
  components: {
    WeatherView,
  },
  created() {
    this.location = store.getters.getLocationById(+this.$route.params.id);
    console.log(this.location);
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
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.location.city}&appid=f0694cc740867c7440b3be0552c0bf8f`;
      console.log(URL);
      const response = await fetch(URL);
      const data: Weather = await response.json();
      this.weather = data;
    },
  },
});
</script>
