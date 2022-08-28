<template>
  <Modal v-if="error" @close="error = false" :errorText="errorText" />
  <router-view @error="(errorText: string) => setError(errorText)" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "./store";
import { RESTORE_LOCATIONS } from "./store/mutationTypes";
import Modal from "@/components/Modal.vue";

export default defineComponent({
  name: "App",
  components: {
    Modal,
  },
  data() {
    return { error: false, errorText: "" };
  },
  methods: {
    setError(errorText: string) {
      this.error = true;
      this.errorText = errorText;
    },
  },
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
  position: relative;
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
