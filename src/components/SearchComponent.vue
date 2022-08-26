<template>
  <input
    type="text"
    v-model="city"
    @input="searchTimeOut"
    placeholder="Start input place"
    class="search_input"
  />
  <ul v-if="matches" class="matches">
    <li
      v-for="match in matches"
      :key="match.id"
      class="match_item"
      @click="addLocation(match)"
    >
      {{ match.name }}, {{ match.country }}
    </li>
  </ul>
</template>

<script lang="ts">
import store from "@/store";
import { ADD_LOCATION } from "@/store/mutationTypes";
import { defineComponent } from "vue";
import cities from "@/assets/cities.json";
class City {
  id: number;
  name: string;
  country: string;
  constructor() {
    this.id = 0;
    this.name = "";
    this.country = "";
  }
}
export default defineComponent({
  name: "SearchComponent",
  data() {
    return {
      country: "",
      city: "",
      matches: new Array<City>(),
      cities: cities,
      timer: 0,
    };
  },
  methods: {
    addLocation(city: City) {
      store.commit(ADD_LOCATION, {
        id: city.id,
        city: city.name,
        country: city.country,
      });
      this.city = "";
      this.matches = [];
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
    searchCity() {
      const matches = [];
      for (const city of this.cities) {
        if (city.name.toLowerCase().includes(this.city)) {
          matches.push(city);
        }
      }
      this.matches = matches.slice(0, 5);
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
.matches {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px;
  margin: 0;
  width: 80%;
  margin: 0 auto;
}
.match_item {
  width: 100%;
  list-style: none;
  cursor: pointer;
  text-align: left;
}

.match_item:hover {
  background-color: deepskyblue;
}
</style>
