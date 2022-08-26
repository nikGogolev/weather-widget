<template>
  <div class="settings">
    <div class="header">
      <router-link class="" to="/"
        ><font-awesome-icon
          class="back"
          icon="fa-solid fa-angles-left"
        ></font-awesome-icon
      ></router-link>
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
    <search-component />
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
  name: "Settings",
  components: { LocationCard, SearchComponent },
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
  background-image: url("https://avatars.mds.yandex.net/i?id=6e7bc58c62a7221f3cf53c75a34d3ade-5233506-images-thumbs&n=13");
  background-size: cover;
  border-radius: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.back {
  font-size: 30px;
  color: gray;
}

.back:hover {
  color: cornflowerblue;
}

.locations {
  flex-grow: 2;
  overflow: auto;
  scrollbar-width: none;
}
.locations::-webkit-scrollbar {
  display: none; /*chrome*/
}

.location {
  margin-bottom: 10px;
}
</style>
