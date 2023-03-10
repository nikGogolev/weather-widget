<template>
  <div
    class="root"
    :style="{
      backgroundImage: `url(${bgImage})`,
    }"
  >
    <div class="header">
      <h3>{{ weather?.name }}, {{ weather?.sys.country }}</h3>
      <router-link class="" to="/settings"
        ><font-awesome-icon
          class="settings"
          icon="fa-solid fa-gear fa-10x"
        ></font-awesome-icon
      ></router-link>
    </div>
    <div class="weather">
      <div class="temperature">
        <img :src="weatherIcon" alt="weather image" />
        <span class="weather_temperature">{{ weatherTemp }} C</span>
      </div>
      <div class="description">
        <p class="weather_description">
          Feels like {{ weatherFeelsLikeTemp }} C.
          {{ weatherDescription }}
        </p>
      </div>
      <div class="wind_pressure">
        <font-awesome-icon
          :style="{ transform: `rotate(${weather?.wind.deg - 45}deg)` }"
          class="wind_direction"
          icon="fa-solid fa-location-arrow"
        ></font-awesome-icon>
        <span class="weather_wind">{{ weatherWindSpeed }} m/s</span>
        <span class="weather_pressure">{{ weatherPressure }} hPa</span>
      </div>
      <div class="humidity_visibility">
        <span class="weather_humidity">Humidity: {{ weatherHumidity }} %</span>
        <span class="weather_visibility"
          >Visibility: {{ weatherVisibility }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { capitalizeFirstLetter } from "@/utils/helpers";
import { defineComponent } from "vue";

export class Weather {
  coord: WeatherCoord;
  main: WeatherMain;
  wind: WeatherWind;
  clouds: WeatherClouds;
  weather: WeatherWeather[];
  sys: WeatherSys;
  visibility: number;
  name: string;
  constructor() {
    this.coord = {
      lon: 0,
      lat: 0,
    };
    this.main = {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    };
    this.wind = {
      speed: 0,
      deg: 0,
      gust: 0,
    };
    this.clouds = {
      all: 0,
    };
    this.weather = [
      {
        id: 0,
        main: "",
        description: "",
        icon: "",
      },
    ];
    this.sys = {
      type: 0,
      id: 0,
      country: "",
      sunrise: 0,
      sunset: 0,
    };
    this.visibility = 0;
    this.name = "";
  }
}

export class WeatherCoord {
  lon: number;
  lat: number;

  constructor() {
    this.lon = 0;
    this.lat = 0;
  }
}

export class WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;

  constructor() {
    this.temp = 0;
    this.feels_like = 0;
    this.temp_min = 0;
    this.temp_max = 0;
    this.pressure = 0;
    this.humidity = 0;
  }
}

export class WeatherWind {
  speed: number;
  deg: number;
  gust: number;

  constructor() {
    this.speed = 0;
    this.deg = 0;
    this.gust = 0;
  }
}

export class WeatherClouds {
  all: number;

  constructor() {
    this.all = 0;
  }
}

export class WeatherSys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;

  constructor() {
    this.type = 0;
    this.id = 0;
    this.country = "";
    this.sunrise = 0;
    this.sunset = 0;
  }
}

export class WeatherWeather {
  id: number;
  main: string;
  description: string;
  icon: string;

  constructor() {
    this.id = 0;
    this.main = "";
    this.description = "";
    this.icon = "";
  }
}

export default defineComponent({
  name: "WeatherComponent",
  props: {
    weather: {
      type: Object,
      require: true,
      default: () => {
        return {
          coord: {
            lon: 0,
            lat: 0,
          },
          main: {
            temp: 0,
            feels_like: 0,
            temp_min: 0,
            temp_max: 0,
            pressure: 0,
            humidity: 0,
          },
          wind: {
            speed: 0,
            deg: 0,
            gust: 0,
          },
          clouds: {
            all: 0,
          },
          weather: [
            {
              id: 0,
              main: "",
              description: "",
              icon: "",
            },
          ],
          visibility: 0,
        };
      },
    },
  },
  data() {
    return {
      weatherIcon1: "",
      bgImage:
        "https://images.wallpaperscraft.ru/image/single/oblaka_nebo_goluboj_113445_2560x1440.jpg",
    };
  },

  computed: {
    weatherIcon() {
      if (this.weather?.weather[0].icon) {
        return (
          "http://openweathermap.org/img/wn/" +
          this.weather?.weather[0].icon +
          "@2x.png"
        );
      } else {
        return "";
      }
    },
    weatherTemp() {
      return (this.weather?.main.temp - 273).toFixed(1);
    },

    weatherFeelsLikeTemp() {
      return (this.weather?.main.feels_like - 273).toFixed(1);
    },

    weatherWindSpeed() {
      return this.weather?.wind.speed.toFixed(1);
    },

    weatherHumidity() {
      return this.weather?.main.humidity.toFixed(0);
    },

    weatherPressure() {
      return this.weather?.main.pressure.toFixed(0);
    },

    weatherVisibility() {
      return this.weather?.visibility < 1000
        ? `${this.weather?.visibility.toFixed(0)} m`
        : `${(this.weather?.visibility / 1000).toFixed(0)} km`;
    },

    weatherDescription() {
      return capitalizeFirstLetter(this.weather?.weather[0].description);
    },
  },
});
</script>

<style scoped>
.root {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-size: cover;
  padding: 10px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.temperature {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.weather_temperature {
  font-size: 30px;
}

.weather_description {
  font-size: 1.1em;
}

.wind_pressure {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
  font-size: 1.5em;
}

.humidity_visibility {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1.2em;
}

.settings {
  font-size: 30px;
  color: gray;
}

.settings:hover {
  color: cornflowerblue;
}
</style>
