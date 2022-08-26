<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "./store";
import { RESTORE_LOCATIONS } from "./store/mutationTypes";
export default defineComponent({
  name: "App",
  created() {
    store.commit(RESTORE_LOCATIONS);
  },
});
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 400px;
  width: 300px;
  background-color: lightblue;
  border-radius: 20px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
