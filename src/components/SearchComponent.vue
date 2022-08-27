<template>
  <input
    type="text"
    v-model="city"
    @input="searchTimeOut"
    placeholder="Start input place"
    class="search_input"
  />
  <div v-if="results" class="results">
    <search-result
      v-for="result in results"
      :key="result.id"
      @addLocation="addLocation(result)"
    >
      {{ result.city }}, {{ result.country }}
    </search-result>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { ADD_LOCATION } from "@/store/mutationTypes";
import { defineComponent } from "vue";
// import cities from "@/assets/cities.json";
import SearchResult from "@/components/SearchResult.vue";
// import { jsonp } from "vue-jsonp";
class City {
  id: number;
  city: string;
  country: string;
  svg: string;
  constructor() {
    this.id = 0;
    this.city = "";
    this.country = "";
    this.svg = "";
  }
}
interface Response {
  place_id: number;
  svg: string;
  address: {
    city: string;
    town: string;
    state: string;
    country_code: string;
  };
}
export default defineComponent({
  name: "SearchComponent",
  components: { SearchResult },
  data() {
    return {
      country: "",
      city: "",
      results: new Array<City>(),
      // cities: cities,
      timer: 0,
    };
  },
  methods: {
    addLocation(city: City) {
      store.commit(ADD_LOCATION, {
        id: city.id,
        city: city.city,
        country: city.country,
      });
      this.city = "";
      this.results = [];
    },
    async searchTimeOut() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = 0;
      }
      this.timer = setTimeout(() => {
        this.searchCity();
      }, 500);
    },
    async searchCity() {
      const searchRequest = `https://nominatim.openstreetmap.org/search/${this.city}?format=json&addressdetails=1&limit=5&polygon_svg=1`;
      const response = await fetch(searchRequest);
      const data = await response.json();
      // const data = await response.json();
      console.log(data);
      const results = data.map((item: Response) => {
        if (typeof item == "object" || item !== null) {
          return {
            id: item.place_id,
            city: item.address.city
              ? item.address.city
              : item.address.town
              ? item.address.town
              : item.address.state,
            country: item.address.country_code,
            svg: item.svg,
          };
        }
      });
      this.results = results;
      console.log(results);
      // for (const city of this.cities) {
      //   if (city.name.toLowerCase().includes(this.city)) {
      //     matches.push(city);
      //   }
      // }
      // this.matches = matches.slice(0, 5);
    },
  },
});
</script>

<style scoped>
.search_input {
  padding: 5px 10px;
  width: 80%;
  margin: 0 auto;
  border-radius: 5px;
  border: 2px solid transparent;
}
.results {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px;
  margin: 0;
  width: 80%;
  margin: 0 auto;
}

.result_item {
  padding: 3px;
}
</style>
