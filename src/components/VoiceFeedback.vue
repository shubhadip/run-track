<template>
  <div class="container-fluid">
    <AppCheckbox
      id="q1"
      label="Checkbox element label?"
      :small="true"
      :plain="true"
      :items="[
        { label: 'yes', value: 1 },
        { label: 'no', value: 2 },
      ]"
      v-model="checkboxSelectedValue"
    >
      <template v-slot:label="{ item }">
        <span class="font-bold">{{ item.label }}</span>
        <span class="text-grey text-12 ml-4">(2)</span>
      </template>
    </AppCheckbox>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { feedBackOptions } from '@/shared/constants';

export default defineComponent({
  name: 'VoiceFeedback',
  components: {},
  setup() {
    return {
      feedBackOptions,
    };
  },
});
</script>

<style scoped lang="postcss">
@import '@css/app.css';
</style>
