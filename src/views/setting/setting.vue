<template>
  <app-header />
  <voice-feedback />
  <app-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from '@/components/common/header/appheader.vue';
import AppFooter from '@/components/common/footer/appfooter.vue';
import VoiceFeedback from '@/components/VoiceFeedback.vue';

export default defineComponent({
  name: 'appsetting',
  components: {
    AppHeader,
    AppFooter,
    VoiceFeedback,
  },
  setup() {
    return {};
  },
});
</script>
