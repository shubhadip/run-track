<template>
  <div class="container-fluid home">
    <app-header />
    <template v-if="!workoutStarted && !workoutComplete">
      <div class="selected" v-if="modifiedWorklist.length">Selected Workout :</div>
      <div v-for="(w, index) in modifiedWorklist" :key="index" class="list-item">
        {{ w.value }}
      </div>
      <div class="extra" @click="routeToCreateWorkout">
        {{ modifiedWorklist.length ? 'Change Workout' : 'Create Workout' }}
      </div>
      <div class="content-wrapper">
        <button class="start" @click="handleClick">
          <p class="run">{{ displayMessage }}</p>
        </button>
      </div>
    </template>
    <template v-else>
      <div style="margin:20px">Current Workout</div>
      <div class="lap-tabs">
        <div class="timer current">
          <div class="cell">{{ currentLap === 'countdown' ? 'Countdown' : 'Current Lap' }}</div>
          <div class="cell value">{{ timer || 0 }} <span class="rem">secs</span></div>
        </div>
        <div class="timer total">
          <div class="cell">
            Workout Rem
          </div>
          <div class="cell value">{{ totalWorkoutTime }} <span class="rem">secs</span></div>
        </div>
      </div>
      <template v-if="remainingWorkoutMsg">
        <div style="margin:20px">Next Laps :</div>
        <div class="list-item">
          {{ remainingWorkoutMsg }}
        </div>
      </template>
    </template>
    <app-footer :workoutStarted="workoutStarted" :workoutComplete="workoutComplete" @resetWorkout="resetWorkout" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import AppFooter from '@/components/common/footer/appfooter.vue';
import AppHeader from '@/components/common/header/appheader.vue';
import { useHome } from '@/use/useHome';
import { getData } from '@/utils/generic';
import { getFormattedMessage, getFormattedWorkout } from '@/utils/workout';
import { IGenericOption, IWorkoutLap, IWorkoutList, WorkoutOptions } from '@/shared/interface';
import { useRouter } from 'vue-router';
import { ROUTES } from '@/router/constants';
import { wokoutEmoji } from '@/shared/constants';

export default defineComponent({
  name: 'Home',
  components: {
    AppHeader,
    AppFooter,
  },
  setup() {
    const router = useRouter();
    const modifiedWorklist: Ref<IWorkoutList[] | null> = ref<IWorkoutList[] | null>([]);
    const {
      totalWorkoutTime,
      start,
      workoutComplete,
      workoutStarted,
      timer,
      resetWorkout,
      handleStartWorkout,
      runningPeriods,
      currentLap,
    } = useHome();

    const displayMessage = computed((): string => {
      return getFormattedMessage(workoutComplete.value, workoutStarted.value, timer.value || 0);
    });

    const selectedWorkout = getData('selectedWorkout') as IGenericOption;
    if (selectedWorkout) {
      modifiedWorklist.value = getFormattedWorkout(selectedWorkout);
    }

    const routeToCreateWorkout = (): void => {
      router.push({
        name: modifiedWorklist.value?.length ? ROUTES.WORKOUTPLANS.name : ROUTES.CREATEWORKOUT.name,
      });
    };

    const handleClick = (): void => {
      if (modifiedWorklist.value?.length) {
        handleStartWorkout();
      } else {
        routeToCreateWorkout();
      }
    };

    const remainingWorkoutMsg = computed((): string => {
      let temp = '';
      runningPeriods.value.forEach((element: IWorkoutLap) => {
        const emoji = wokoutEmoji[element.type as WorkoutOptions];
        temp += `${emoji}  ${element.timing / 60}  m , `;
      });
      return temp.replace(/,\s*$/, '');
    });

    return {
      start,
      workoutStarted,
      handleStartWorkout,
      timer,
      displayMessage,
      resetWorkout,
      workoutComplete,
      selectedWorkout,
      modifiedWorklist,
      routeToCreateWorkout,
      handleClick,
      totalWorkoutTime,
      remainingWorkoutMsg,
      currentLap,
    };
  },
});
</script>

<style scoped lang="postcss">
@import '@css/app.css';
.home {
  .content-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 200px);
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
      border: 1px solid $black-2;
    }
    .run {
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 2px;
    }
  }
  .list-item {
    display: flex;
    border: 1px solid $black-2;
    margin: 10px;
    align-items: center;
    justify-content: center;
  }
  .selected {
    margin: 10px;
  }
  .extra {
    padding: 10px;
    margin: 10px;
    background: $black-2;
    color: $white;
    display: flex;
    justify-content: space-around;
  }
  .lap-tabs {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    border-radius: 4px;
    .timer {
      padding: 4px 0px;
      padding: 20px 10px;
      background: $black-1;
      color: $white;
      border-radius: 5px;
      min-width: 150px;
    }
    .value {
      font-weight: bold;
      font-size: 30px;
    }
    .rem {
      font-size: 12px;
    }
  }
}
</style>
