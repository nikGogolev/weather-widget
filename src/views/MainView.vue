<template>
  <weather-component :weather="weather" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherComponent, { Weather } from "@/components/WeatherComponent.vue";
import { OPEN_WEATHER_API_KEY } from "@/utils/constants";

export default defineComponent({
  name: "HomeView",
  components: {
    WeatherComponent,
  },
  emits: ["error"],
  async created() {
    await this.getLocation();
    await this.getWeather();
  },
  data() {
    return {
      weather: new Weather(),
      location: "",
    };
  },
  methods: {
    async getLocation() {
      const URL = `https://ipinfo.io/json?token=84b997d0b6009a`;
      const response = await fetch(URL);
      const data = await response.json();
      this.location = data.city;
    },

    async getWeather() {
      try {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${OPEN_WEATHER_API_KEY}`;
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
