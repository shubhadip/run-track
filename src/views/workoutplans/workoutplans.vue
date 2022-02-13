<template>
  <div class="workout-plan">
    <app-header />
    <div class="header" v-if="modifiedWorklist.length">Workout Plans</div>
    <div class="workout-list" v-if="modifiedWorklist.length">
      <div class="start-label">Select to start :</div>
      <div v-for="(w, index) in modifiedWorklist" :key="index" class="list-item" @click="selectWorkout(w)">
        <div class="cell">
          <div class="cellindex">Workout {{ w.key }}</div>
          <div v-for="item in w.value" :key="item.name" class="workout-plan-row">
            <p class="workout-plan-name">{{ item.name }}</p>
            <p class="workout-plan-time">{{ item.time }} s</p>
          </div>
        </div>

        <div class="option-btns">
          <div class="cell cell-btn">
            <appButton title="Select" class="select-workout" :color="AppButtonColors.BLACK" />
          </div>
          <div class="cell cell-btn">
            <appButton
              title="Delete"
              class="select-workout"
              :color="AppButtonColors.BLUE"
              @click.stop="deleteWorkout(w)"
            />
          </div>
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
  padding-bottom: 100px;
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
      text-align: center;
      width: 100%;
      padding: 20px;
      border-bottom: 1px solid $black-2;
    }
    .cell {
      min-height: 80px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;
      .workout-plan-row {
        width: 90%;
        font-weight: 700;
        font-size: 24px;
        display: flex;
        padding: 20px;
        align-items: center;
        justify-content: space-between;
        .workout-plan-name {
          margin-right: 20px;
          text-transform: capitalize;
        }
        .workout-plan-time {
        }
      }
    }
    .list-item {
      display: flex;
      flex-direction: column;
      .cellindex {
        min-width: 40px;
        margin: 2px;
        padding-right: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cell {
      }
    }
    .option-btns {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      border-bottom: 1px solid $black-2;
      .btn {
        min-width: 130px;
        margin: 16px;
        padding: 12px;
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
