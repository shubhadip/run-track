<template>
  <div class="workout-history">
    <app-header />
    <div class="header">History</div>
    <app-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from '@/components/common/header/appheader.vue';
import AppFooter from '@/components/common/footer/appfooter.vue';

export default defineComponent({
  name: 'WorkoutHistory',
  components: {
    AppHeader,
    AppFooter,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="postcss" scoped>
@import '@css/app.css';
.workout-history {
  background-color: $black-1;
  .header {
    font-size: 24px;
    text-align: center;
    padding-top: 20px;
    font-weight: bold;
    color: $white;
  }
}
</style>
