<template>
  <div class="settings">
    <div class="header">
      <button @click="$router.back" class="back_button">
        <font-awesome-icon icon="fa-solid fa-angles-left"></font-awesome-icon>
      </button>
      <router-link class="home_link" to="/"> Home</router-link>
      <h3>Locations</h3>
    </div>

    <div
      class="locations"
      v-if="locations"
      @dragstart="setClass"
      @dragend="removeClass"
      @dragover="moveLocation"
    >
      <location-card
        :data-id="location.id"
        draggable="true"
        class="location"
        v-for="location in locations"
        :key="location.id"
        :location="location"
      />
    </div>
    <search-component @error="(errorText: string) => setError(errorText)" />
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";
import LocationCard from "@/components/LocationCard.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import { CHANGE_LOCATIONS } from "@/store/mutationTypes";
import { Location } from "@/types";
export default defineComponent({
  name: "SettingsView",
  components: { LocationCard, SearchComponent },
  emits: ["error"],
  computed: {
    locations(): Location[] {
      return store.getters.getLocations;
    },
  },
  methods: {
    setClass(event: Event) {
      const target: HTMLElement = event.target as HTMLElement;
      if (target) {
        target.classList.add(`selected`);
      }
    },
    removeClass(event: Event) {
      const target: HTMLElement = event.target as HTMLElement;
      if (target) {
        target.classList.remove(`selected`);
      }
    },
    moveLocation() {
      const list = document.querySelector(`.locations`);
      if (list) {
        list.addEventListener(`dragover`, (evt) => {
          evt.preventDefault();

          const activeElement: HTMLElement | null =
            list.querySelector(`.selected`);
          const currentElement: HTMLElement | null = evt.target as HTMLElement;
          const isMoveable = activeElement !== currentElement;
          if (!isMoveable) {
            return;
          }

          if (activeElement?.dataset?.id && currentElement?.dataset?.id) {
            store.commit(CHANGE_LOCATIONS, {
              movingId: +activeElement.dataset?.id,
              idTochange: +currentElement.dataset?.id,
            });
          }
        });
      }
    },
    setError(errorText: string) {
      this.$emit("error", errorText);
    },
  },
});
</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  align-items: stretch;
  padding: 10px;
  background-image: url("https://images.wallpaperscraft.ru/image/single/oblaka_nebo_goluboj_113445_2560x1440.jpg");
  background-size: cover;
  border-radius: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back_button {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 2em;
  color: gray;
}
.home_link {
  text-decoration: none;
  font-size: 1.5em;
  color: gray;
}

.home_link:hover,
.back_button:hover {
  color: cornflowerblue;
}

.locations {
  flex-grow: 2;
  overflow: auto;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.locations::-webkit-scrollbar {
  display: none; /*chrome*/
}

.location {
  margin: 5px 0;
}
.location:hover {
  transform: scale(1.05);
}
</style>
