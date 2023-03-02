<template>
  <weather-component :weather="weather" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherComponent, { Weather } from "@/components/WeatherComponent.vue";
import { Location } from "@/types";
import store from "@/store";
import { OPEN_WEATHER_API_KEY } from "@/utils/constants";

export default defineComponent({
  name: "CityView",
  components: {
    WeatherComponent,
  },
  emits: ["error"],
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
      try {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.location.city},${this.location.country_code}&appid=${OPEN_WEATHER_API_KEY}`;
        const response = await fetch(URL);
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        const data: Weather = await response.json();
        this.weather = data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.setError(error.message);
        }
      }
    },
    setError(errorText: string) {
      this.$emit("error", errorText);
    },
  },
});
</script>
