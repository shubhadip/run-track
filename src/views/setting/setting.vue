<template>
  <app-header />
  <div>App Setting</div>
  <app-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from '@/components/common/header/appheader.vue';
import AppFooter from '@/components/common/footer/appfooter.vue';

export default defineComponent({
  name: 'appsetting',
  components: {
    AppHeader,
    AppFooter,
  },
  setup() {
    return {};
  },
});
</script>
