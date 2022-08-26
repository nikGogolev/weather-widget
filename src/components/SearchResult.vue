<template>
  <div class="result_item">
    <div class="result_name">
      <slot></slot>
    </div>

    <button @click="$emit('addLocation')" class="add_button">
      <font-awesome-icon
        class="add_icon"
        icon="fa-solid fa-plus"
      ></font-awesome-icon>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SearchResult",
  emits: ["addLocation"],
});
</script>

<style scoped>
.result_name {
  cursor: default;
}
.result_item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.result_item:hover {
  background-color: deepskyblue;
}

.add_button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
