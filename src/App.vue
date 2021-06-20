<template>
  <router-view />
  <notifications
    position="top right"
    classes="cutom-notification"
    :closeOnClick="true"
    :duration="2000"
    :speed="1000"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {},
});
</script>
<style lang="postcss">
@import '@css/app.css';
.cutom-notification {
  background: $blue;
  border-left: 5px solid $blue-1;
  padding: 16px;
  margin: 10px;
  border-radius: 4px;
  color: $white;
  &.success {
    background: $green;
    border-left-color: $green-1;
  }

  &.warn {
    background: $yellow;
    border-left-color: $yellow-1;
  }

  &.error {
    background: $red;
    border-left-color: $red-1;
  }
}
</style>
