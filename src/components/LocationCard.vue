<template>
  <div class="root">
    <div class="menu">
      <font-awesome-icon
        class="menu_icon"
        icon="fa-solid fa-bars"
      ></font-awesome-icon>
    </div>
    <router-link :to="`/city/${location.id}`" class="location_name"
      >{{ location.city }}, {{ location.country }}</router-link
    >

    <button @click="removeLocation(location.id)" class="delete">
      <font-awesome-icon
        class="delete_icon"
        icon="fa-solid fa-xmark"
      ></font-awesome-icon>
    </button>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { REMOVE_LOCATION } from "@/store/mutationTypes";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LocationCard",
  props: {
    location: {
      type: Object,
      reqired: true,
      default: () => {
        return { id: 0, city: "", country: "" };
      },
    },
  },
  methods: {
    removeLocation(id: number) {
      store.commit(REMOVE_LOCATION, id);
    },
  },
});
</script>

<style scoped>
.root {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  border: 1px solid black;
  border-radius: 3px;
  padding: 3px;
}

.menu_icon {
  font-size: 27px;
  cursor: move;
}

.delete {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.delete_icon {
  font-size: 27px;
}

.location_name {
  text-decoration: none;
  color: black;
}
</style>
