<template>
  <footer class="footer">
    <template v-if="$props.workoutStarted && !$props.workoutComplete">
      <div class="btn-pause">Pause</div>
      <div class="btn-stop" @click="handleClick">Stop</div>
    </template>
    <template v-else>
      <div class="btn-details">
        <IconView icon="icon-home" />
      </div>
      <div class="btn-details"><IconView icon="icon-history" :width="24" /></div>
      <div class="btn-details"><IconView icon="icon-cog" /></div>
      <div class="btn-details"><IconView icon="icon-flickr" /></div>
    </template>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconView from '@/components/common/iconview/IconView.vue';

export default defineComponent({
  name: 'appfooter',
  emits: ['reset-workout'],
  components: {
    IconView,
  },
  props: {
    workoutStarted: {
      type: Boolean,
      default: false,
    },
    workoutComplete: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    /**
     * emit reset workout event
     */
    const handleClick = (): void => {
      emit('reset-workout');
    };

    return {
      handleClick,
    };
  },
});
</script>

<style scoped lang="postcss">
@import '@css/app.css';
.footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  .btn-pause,
  .btn-stop,
  .btn-details {
    flex: 1;
    text-align: center;
    padding: 16px;
    background-color: $black-1;
    color: $white;
  }
  .btn-pause,
  .btn-details:not(:last-child) {
    border-right: 1px solid $black-2;
  }
}
</style>
