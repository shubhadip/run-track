<template>
  <div class="container-fluid">
    <app-header />
    <div class="content-wrapper">
      <div class="start" @click="handleClick">
        <p class="run">{{ displayMessage }}</p>
      </div>
    </div>
    <app-footer :workoutStarted="workoutStarted" :workoutComplete="workoutComplete" @resetWorkout="resetWorkout" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import AppFooter from '@/components/common/footer/appfooter.vue';
import AppHeader from '@/components/common/header/appheader.vue';
import { useHome } from '@/use/useHome';

export default defineComponent({
  name: 'Home',
  components: {
    AppHeader,
    AppFooter,
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
</style>
