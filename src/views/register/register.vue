<template>
  <div>
    <app-header />
    <div>I am Register Component</div>
    <app-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from '@/components/common/header/appheader.vue';
import AppFooter from '@/components/common/footer/appfooter.vue';

export default defineComponent({
  name: 'Register',
  components: {
    AppHeader,
    AppFooter,
  },
  setup() {
    return {};
  },
});
</script>
