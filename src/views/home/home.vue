<template>
  <div class="container-fluid home">
    <app-header />
    <template v-if="!workoutStarted && !workoutComplete">
      <div class="selected" v-if="modifiedWorklist.length">Selected Workout :</div>
      <div v-for="(w, index) in modifiedWorklist" :key="index" class="list-item">
        <div class="cell">
          <div v-for="item in w.value" :key="item.name" class="workout-plan-row">
            <p class="workout-plan-name">{{ item.name }}</p>
            <p class="workout-plan-time">{{ item.time }} s</p>
          </div>
        </div>
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
      <div
        style="text-align:center; margin: 40px 0px;"
        @click="
          workoutStarted = false;
          workoutComplete = false;
        "
        v-if="workoutStarted && workoutComplete"
      >
        <appButton title="Workout Complete" class="" :color="AppButtonColors.BLACK" @click="() => {}" />
      </div>
      <template v-else>
        <div class="workout-page-title">
          {{ currentLap === 'countdown' ? 'Countdown' : currentLap || 'Current Workout' }}
        </div>
        <div class="lap-tabs">
          <div :class="['timer current', currentLap === 'Rest' ? 'green' : '']">
            <div class="cell value">{{ timer || 0 }}</div>
          </div>
        </div>
      </template>
      <template v-if="remainingWorkoutMsg.length">
        <div style="margin:20px">Next :</div>
        <div class="list-item">
          <div class="cell">
            <div v-for="item in remainingWorkoutMsg" :key="item.name" class="workout-plan-row">
              <p class="workout-plan-name">{{ item.name }}</p>
              <p class="workout-plan-time">{{ item.time }} s</p>
            </div>
          </div>
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
import { IGenericOption, IWorkoutLap, IWorkoutList, AppButtonColors } from '@/shared/interface';
import { useRouter } from 'vue-router';
import { ROUTES } from '@/router/constants';
import AppButton from '@/components/common/appbutton/AppButton.vue';

export default defineComponent({
  name: 'Home',
  components: {
    AppHeader,
    AppFooter,
    AppButton,
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
      const temp: any = [];
      runningPeriods.value.forEach((element: IWorkoutLap) => {
        temp.push({
          name: element.type,
          time: element.timing,
        });
      });
      return temp;
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
      AppButtonColors,
    };
  },
});
</script>

<style scoped lang="postcss">
@import '@css/app.css';
.home {
  .workout-page-title {
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    margin: 40px 0px;
  }
  .content-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 500px);
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
    .cell {
      width: 100%;
      .workout-plan-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        .workout-plan-name {
          text-transform: capitalize;
        }
      }
    }
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

      &.current {
        width: 320px;
        height: 320px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &.green {
        background: green;
      }
    }
    .value {
      font-weight: bold;
      font-size: 120px;
    }
    .rem {
      font-size: 12px;
    }
  }
}
</style>
