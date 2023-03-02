<template>
  <div class="result_item">
    <div class="result_name" @click="$emit('addLocation')">
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
  methods: {
    add() {
      this.$emit("addLocation");
    },
  },
});
</script>

<style scoped>
.result_name {
  cursor: pointer;
}
.result_item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  padding: 3px;
}

.result_item:hover {
  background-color: rgba(0, 191, 255, 0.3);
  transform: scale(1.1);
  backdrop-filter: blur(1px);
}

.add_button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
