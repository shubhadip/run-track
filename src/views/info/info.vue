<template>
  <div class="info">
    <app-header />
    <div class="header">Info</div>
    <app-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from '@/components/common/header/appheader.vue';
import AppFooter from '@/components/common/footer/appfooter.vue';

export default defineComponent({
  name: 'Info',
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
.info {
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
