<template>
  <div class="createworkout">
    <app-header />
    <div class="header">Add exercise</div>
    <div class="content">
      <app-single-select
        v-model="singleSelectValue"
        :items="singleSelectItems"
        placeholder="Select Workout Type / Rest"
        label="Select Workout Type / Rest"
        :mobileMode="false"
        :autoValidate="true"
        id="input1"
        class="singleselect-container"
      />
      <app-numeric-input
        id="test-input3"
        placeholder="Enter Workout Time (secs)"
        label="Workout Time (secs)"
        v-model="workoutTimeValue"
        addon=""
        inputType="tel"
        :maxLength="3"
        :clearable="false"
        :showContactIcon="false"
        class="workout-time"
      />
      <div class="workout-wrapper">
        <appButton title="Add" class="add-workout" :color="AppButtonColors.BLUE" @click="addWorkout" />
      </div>
    </div>
    <label style="margin: 14px;" v-if="workoutLaps.length"> Total Time : {{ totalWorkoutTime }} </label>
    <div class="workout-list" v-if="workoutLaps.length">
      <div class="list-header">
        <div class="cell">Type</div>
        <div class="cell">Time</div>
      </div>
      <div v-for="(w, index) in workoutLaps" :key="index" class="list-item">
        <div class="cell">{{ wokoutEmoji[w.type] || w.type }}</div>
        <div class="cell">{{ w.timing }} secs</div>
      </div>
    </div>
    <appButton
      v-if="workoutLaps.length"
      title="Create Workout"
      class="create-workout"
      :color="AppButtonColors.BLACK"
      @click="createWorkout"
    />
    <app-footer />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import AppHeader from '@/components/common/header/appheader.vue';
import AppFooter from '@/components/common/footer/appfooter.vue';
import AppNumericInput from '@/components/common/appnumericinput/AppNumericInput.vue';
import AppSingleSelect from '@/components/common/appsingleselect/AppSingleSelect.vue';
import AppButton from '@/components/common/appbutton/AppButton.vue';
import { ISingleSelectOption, AppButtonColors, WorkoutOptions, IWorkoutLap, IGenericOption } from '@/shared/interface';
import { notify } from '@kyvg/vue3-notification';
import { getData, setData } from '@/utils/generic';
import { useRouter } from 'vue-router';
import { ROUTES } from '@/router/constants';
import { wokoutEmoji, workoutList } from '@/shared/constants';

export default defineComponent({
  name: 'CreateWorkout',
  components: {
    AppHeader,
    AppFooter,
    AppNumericInput,
    AppSingleSelect,
    AppButton,
  },
  setup() {
    const router = useRouter();
    const singleSelectValue = ref<string>('');
    const workoutTimeValue = ref<number>();
    const workoutLaps: Ref<IWorkoutLap[]> = ref<IWorkoutLap[]>([]);
    const singleSelectItems: ISingleSelectOption[] = workoutList;

    /**
     * keeps user input in array
     */
    const addWorkout = (): void => {
      if ((workoutTimeValue.value || 0) > 0 && singleSelectValue.value) {
        const timing = Number(workoutTimeValue.value || 0);
        workoutLaps.value.push({
          type: singleSelectValue.value,
          timing,
        });
        workoutTimeValue.value = 0;
        singleSelectValue.value = '';
      } else {
        notify({
          title: 'Add workout type & timing',
          type: 'warn',
        });
      }
    };

    /**
     * add input values to localstorage
     */
    const createWorkout = (): void => {
      if (workoutLaps.value.length) {
        const initData = (getData('workout-plans') || {}) as IGenericOption;
        const temp = initData || {};
        let obj = {
          [new Date().getTime().toString()]: workoutLaps.value,
        };
        if (temp) {
          obj = { ...obj, ...temp };
        }
        setData('workout-plans', JSON.stringify(obj));
        workoutLaps.value = [];
        router.push({
          name: ROUTES.WORKOUTPLANS.name,
        });
        notify({
          title: 'workout created',
          type: 'success',
        });
      } else {
        notify({
          title: 'please create workout',
          type: 'warn',
        });
      }
    };

    /**
     * computes total workout time
     */
    const totalWorkoutTime = computed((): number => {
      return workoutLaps.value.reduce((acc: number, item: IWorkoutLap) => acc + item.timing, 0);
    });

    return {
      singleSelectValue,
      singleSelectItems,
      AppButtonColors,
      workoutTimeValue,
      workoutLaps,
      addWorkout,
      createWorkout,
      WorkoutOptions,
      wokoutEmoji,
      totalWorkoutTime,
    };
  },
});
</script>
<style lang="postcss" scoped>
@import '@css/app.css';
.createworkout {
  .header {
    font-size: 24px;
    text-align: center;
    padding-top: 10px;
    font-weight: bold;
  }
  .content {
    padding: 0px 20px;
  }
  .workout-time {
    margin-top: 10px;
  }
  .add-workout,
  .create-workout {
    margin-top: 20px;
    min-width: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .workout-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .workout-list {
    margin: 4px 16px;
    border: 1px solid $black-2;
    .cell {
      padding: 4px;
      margin: 4px;
    }
    .list-header {
      display: flex;
      border-bottom: 1px solid $black-2;
      text-align: center;
      .cell {
        flex: 1;
        &:nth-child(even) {
          border-left: 1px solid $black-2;
        }
      }
    }
    .list-item {
      display: flex;
      .cell {
        flex: 1;
        text-align: center;
        &:nth-child(even) {
          border-left: 1px solid $black-2;
        }
      }
    }
  }
}
</style>
