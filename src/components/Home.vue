<template>
  <div class="container-fluid">
    <header class="header-wrapper">
      Run Track
    </header>
    <div class="content-wrapper">
      <div class="start" @click="handleClick">
        <p class="run">{{ displayMessage }}</p>
      </div>
    </div>
    <div class="footer">
      <template v-if="workoutStarted && !workoutComplete">
        <div class="btn-pause">Pause</div>
        <div class="btn-stop" @click="resetWorkout">Stop</div>
      </template>
      <template v-else>
        <div class="btn-details">
          <IconView icon="icon-home" />
        </div>
        <div class="btn-details"><IconView icon="icon-history" :width="24" /></div>
        <div class="btn-details"><IconView icon="icon-cog" /></div>
        <div class="btn-details"><IconView icon="icon-flickr" /></div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import IconView from './iconview/IconView.vue';
import { useHome } from '../use/useHome';

export default defineComponent({
  name: 'Home',
  components: {
    IconView,
  },
  setup() {
    const { start, workoutComplete, workoutStarted, evaluateMessage, timer, resetWorkout } = useHome();

    const handleClick = (): void => {
      if (workoutComplete.value && workoutStarted.value) {
        workoutStarted.value = false;
        workoutComplete.value = false;
      } else {
        start();
      }
    };

    const displayMessage = computed((): string => {
      if (!workoutComplete.value && !workoutStarted.value) {
        return 'START RUN';
      }
      if (workoutComplete.value && workoutStarted.value) {
        return 'WORKOUT COMPLETED';
      }
      if (workoutStarted.value && !workoutComplete.value && timer.value) {
        const minutes = timer.value / 60;
        const secs = timer.value % 60;
        return minutes >= 1 ? `${Math.floor(minutes)} min ${secs} secs remaining` : `${secs} secs remaining`;
      }
      return 'START RUN';
    });

    return {
      start,
      workoutStarted,
      evaluateMessage,
      handleClick,
      timer,
      displayMessage,
      resetWorkout,
      workoutComplete,
    };
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
.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 120px);
  overflow-y: scroll;
  flex-direction: column;
  .start {
    padding: 20px;
    text-align: center;
    background-color: $black-1;
    color: $white;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .run {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 2px;
  }
}
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
