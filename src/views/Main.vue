<template>
  <weather-view :weather="weather" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherView, { Weather } from "@/components/WeatherView.vue";

export default defineComponent({
  name: "Home",
  components: {
    WeatherView,
  },
  created() {
    this.getWeather();
  },
  data() {
    return {
      weather: new Weather(),
    };
  },
  methods: {
    async getWeather() {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=saint%20petersburg&appid=f0694cc740867c7440b3be0552c0bf8f"
      );
      const data: Weather = await response.json();
      this.weather = data;
    },
  },
});
</script>
