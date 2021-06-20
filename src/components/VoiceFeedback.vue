<template>
  <div class="container-fluid voice-feedback">
    <div class="voice-header">Voice Instructions</div>
    <AppCheckbox
      id="voice-feedback"
      :items="feedBackOptions"
      :plain="false"
      :isExpandable="false"
      :showSideLabels="false"
      v-model="checkboxSelectedValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { feedBackOptions } from '@/shared/constants';
import AppCheckbox from './common/appcheckbox/appcheckbox.vue';

export default defineComponent({
  name: 'VoiceFeedback',
  components: {
    AppCheckbox,
  },
  setup() {
    const checkboxSelectedValue = ref<number[]>([1]);
    return {
      feedBackOptions,
      checkboxSelectedValue,
    };
  },
});
</script>

<style lang="postcss">
@import '@css/app.css';
.voice-header {
  font-size: 24px;
  text-align: center;
  padding-top: 20px;
  font-weight: bold;
}
.voice-feedback {
  .app-checkbox {
    color: $black-1;
    &__main {
      padding-bottom: 24px;
    }
    &__base {
      padding: 20px 0px;
      margin: 20px;
      display: flex;
    }
    &__description {
      font-size: 14px;
    }
    input {
      width: 20px;
      height: 20px;
      margin-right: 16px;
    }
  }
}
</style>
