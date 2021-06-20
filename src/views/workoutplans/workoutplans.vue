<template>
  <div class="workout-plan">
    <app-header />
    <div class="header" v-if="modifiedWorklist.length">Workout Plans</div>
    <div class="workout-list" v-if="modifiedWorklist.length">
      <div class="start-label">Select to start :</div>
      <div v-for="(w, index) in modifiedWorklist" :key="index" class="list-item" @click="selectWorkout(w)">
        <div class="cellindex">{{ w.key }}</div>
        <div class="cell">{{ w.value }}</div>
        <div class="cell cell-btn">
          <appButton title="✔️" class="select-workout" :color="AppButtonColors.TRANSPARENT" />
        </div>
        <div class="cell cell-btn">
          <appButton
            title="❌"
            class="select-workout"
            :color="AppButtonColors.TRANSPARENT"
            @click.stop="deleteWorkout(w)"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <p class="no-workout">No Workout Plans Found</p>
      <div class="extra" @click="routeToCreateWorkout">Create Workout</div>
    </div>
    <app-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import AppHeader from '@/components/common/header/appheader.vue';
import AppFooter from '@/components/common/footer/appfooter.vue';
import AppButton from '@/components/common/appbutton/AppButton.vue';
import { getData, setData } from '@/utils/generic';
import { IGenericOption, WorkoutOptions, AppButtonColors, IWorkoutList } from '@/shared/interface';
import { getFormattedWorkout } from '@/utils/workout';
import { useRouter } from 'vue-router';
import { ROUTES } from '@/router/constants';

export default defineComponent({
  name: 'WorkoutPlan',
  components: {
    AppHeader,
    AppFooter,
    AppButton,
  },
  setup() {
    const router = useRouter();
    const workoutlist = getData('workout-plans') as IGenericOption;
    const modifiedWorklist: Ref<IWorkoutList[] | null> = ref<IWorkoutList[] | null>([]);
    if (workoutlist) {
      modifiedWorklist.value = getFormattedWorkout(workoutlist);
    }

    /**
     * select workout from localstorage
     */
    const selectWorkout = (data: IWorkoutList): void => {
      const workouts = getData('workout-plans') as IGenericOption;
      const selectedWorkout = workouts[data.optionSelected];
      setData('selectedWorkout', JSON.stringify({ [data.optionSelected]: selectedWorkout }));
      router.push({
        name: ROUTES.HOME.name,
      });
    };

    /**
     * remove selected workout from localstorage
     */
    const deleteWorkout = (data: IWorkoutList): void => {
      const key = data.optionSelected;
      const workouts = getData('workout-plans') as IGenericOption;
      delete workouts[key];
      setData('workout-plans', JSON.stringify(workouts));
      modifiedWorklist.value = getFormattedWorkout(workouts);
    };

    const routeToCreateWorkout = (): void => {
      router.push({
        name: ROUTES.CREATEWORKOUT.name,
      });
    };

    return {
      workoutlist,
      WorkoutOptions,
      modifiedWorklist,
      selectWorkout,
      AppButtonColors,
      deleteWorkout,
      routeToCreateWorkout,
    };
  },
});
</script>
<style lang="postcss" scoped>
@import '@css/app.css';
.workout-plan {
  .header {
    font-size: 24px;
    text-align: center;
    padding-top: 20px;
    font-weight: bold;
  }
  .start-label {
    font-size: 16px;
    text-align: left;
    padding: 10px;
    font-weight: medium;
    border-bottom: 1px solid $black-2;
  }
  .workout-plans {
    padding: 14px;
  }
  .title {
    text-align: left;
    padding-left: 14px;
  }
  .select-workout {
    margin: 0px;
    padding: 2px 4px;
  }
  .workout-list {
    margin: 10px 0px;
    border-top: 1px solid $black-2;
    .cellindex {
      border-right: 1px solid $black-2;
      /* min-width: 30px; */
      margin: 2px 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cell-btn {
      max-width: 30px;
    }
    .cell-icon {
      max-width: 30px;
    }
    .cell {
      padding: 4px;
      margin: 4px;
      min-height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .list-item {
      display: flex;
      border-bottom: 1px solid $black-2;
      .cellindex {
        min-width: 40px;
        margin: 2px;
        padding-right: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cell {
        flex: 1;
        text-align: center;
      }
    }
  }
  .no-workout {
    text-align: center;
    margin: 30px 0px;
  }
  .extra {
    padding: 20px 10px;
    background: $black-1;
    color: $white;
    margin: 10px;
    border-radius: 10px;
    text-align: center;
  }
}
</style>
