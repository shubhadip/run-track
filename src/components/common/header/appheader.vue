<template>
  <header class="header-wrapper">
    Run Track
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'appheader',
  setup() {
    return {};
  },
});
</script>

<style scoped lang="postcss">
@import '@css/app.css';
.header-wrapper {
  font-size: 18px;
  font-weight: 500;
  padding: 16px;
  background-color: $black-1;
  color: $white;
}
</style>
