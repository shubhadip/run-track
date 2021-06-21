import { ref } from 'vue';
import { IGenericOption, IUseHome, IWorkoutLap } from '@/shared/interface';
import { getData } from '@/utils/generic';
import { alertWorkoutUtils } from '@/utils/speak';

/**
 * alerts when whole workout is about to end
 */
const evaluateWorkoutEndAlert = (
  alertWhenWorkoutIsAboutToEnd: boolean,
  isCountDown: boolean,
  totalWorkoutTime: number,
  timer: number,
  isHalfTime: number | undefined,
  alertWhenLapIsAboutToEnd: boolean,
  currentTime: number,
  currentLap?: string
): void => {
  const { speakMessage } = alertWorkoutUtils();

  if (alertWhenWorkoutIsAboutToEnd && !isCountDown && [10, 20, 30].includes(totalWorkoutTime)) {
    speakMessage(`${timer} seconds remaning`);
  }

  /**
   * half time alert
   */
  if (isHalfTime && isHalfTime === totalWorkoutTime) {
    speakMessage(`Half the time`);
  }

  /**
   * alerts when current Lap is about to end
   */
  if (
    alertWhenLapIsAboutToEnd &&
    !isCountDown &&
    [currentTime - 10, currentTime - 20, currentTime - 30].includes(currentTime - timer)
  ) {
    speakMessage(`${timer} seconds remaning of ${currentLap}`);
  }

  /**
   * alerts at regular intervals for 5,10,15 mins .....
   */
  if (totalWorkoutTime > 0 && totalWorkoutTime % 300 === 0) {
    speakMessage(`${totalWorkoutTime / 300} minute completed`);
  }

  // todo: add km logic
};

/**
 * utility file for Home.vue
 * @returns
 */
export function useHome(): IUseHome {
  const runningPeriods = ref<IWorkoutLap[]>([]);
  const totalWorkoutTime = ref(0);
  const { speakMessage } = alertWorkoutUtils();
  /**
   * default 10 as countdown timer
   * also this will hold value of lap time
   */
  const currentTime = ref<number>(10);
  const currentLap = ref<string>('countdown');
  /**
   * this will act as temporary variable to hold current lap timing reduction
   */
  const timer = ref<number | null>(null);
  const intervalId = ref<number | null>(null);
  const workoutStarted = ref<boolean>(false);
  const workoutComplete = ref<boolean>(false);

  // todo: create workout logic without workout plan
  /**
   * alert config values
   */
  const alertWhenLapIsAboutToEnd = ref<boolean>(false);
  const alertWhenWorkoutIsAboutToEnd = ref<boolean>(false);
  const isHalfTime = ref<number>();

  /**
   * setting up different config variables
   */
  const initWorkout = (): void => {
    runningPeriods.value = [];
    currentTime.value = 10;
    currentLap.value = 'countdown';
    const selectedWorkout = getData('selectedWorkout') as IGenericOption;
    if (selectedWorkout) {
      totalWorkoutTime.value = Object.values(selectedWorkout)[0].reduce((acc: number, element: IWorkoutLap) => {
        runningPeriods.value.push({
          type: element.type,
          timing: element.timing * 60,
        });
        return acc + element.timing * 60;
      }, 0);
      isHalfTime.value = totalWorkoutTime.value / 2;
    }
  };

  /**
   * lap end or workout complete alert message
   * @param isCountDown
   * @returns
   */
  const LapOrWorkoutEndAlert = (isCountDown: boolean): void => {
    let msg = '';
    if (isCountDown) msg = 'Workout Started';
    if (runningPeriods.value.length <= 0) msg = `Workout Complete`;
    // below msg can be used to alert lap end
    // runningPeriods.value.length <= 0 ? `Workout Complete` : `${currentTime.value / 60} min ${currentLap.value} Complete`;
    if (msg) {
      speakMessage(msg);
    }
  };

  const startCountDown = (time: number, isCountDown = false): void => {
    let value = time;
    if (!workoutStarted.value) {
      workoutStarted.value = true;
    }
    intervalId.value = setInterval(() => {
      timer.value = value;
      value -= 1;

      /**
       * don't count countdown in timer
       */
      if (!isCountDown) {
        totalWorkoutTime.value -= 1;
      }

      evaluateWorkoutEndAlert(
        alertWhenWorkoutIsAboutToEnd.value,
        isCountDown,
        totalWorkoutTime.value,
        timer.value,
        isHalfTime.value,
        alertWhenLapIsAboutToEnd.value,
        currentTime.value
      );

      if (value === 0 && intervalId.value) {
        LapOrWorkoutEndAlert(isCountDown);
        clearInterval(intervalId.value);
        if (runningPeriods.value.length > 0) {
          const nextValue = runningPeriods.value.shift();
          if (nextValue) {
            currentLap.value = nextValue.type;
            currentTime.value = nextValue.timing;
            speakMessage(`${nextValue.timing / 60} min ${nextValue.type} started`);
            startCountDown(nextValue.timing);
          }
        } else {
          workoutComplete.value = true;
        }
      }
    }, 1000);
  };

  const nonTimerWorkout = (): void => {
    workoutStarted.value = true;
    intervalId.value = setInterval(() => {
      timer.value = (timer.value || 0) + 1;
      if (timer.value % 300 === 0) {
        speakMessage(`${timer.value / 300} minute completed`);
      }
    }, 1000);
  };

  /**
   * start workout
   */
  const start = (): void => {
    runningPeriods.value = [];
    initWorkout();
    timer.value = currentTime.value;
    startCountDown(timer.value, true);
    // nonTimerWorkout();
  };

  /**
   * reset flags when workout is complete
   */
  const resetWorkout = (): void => {
    if (intervalId.value) {
      clearInterval(intervalId.value);
      workoutComplete.value = false;
      workoutStarted.value = false;
    }
  };

  const handleStartWorkout = (): void => {
    if (workoutComplete.value && workoutStarted.value) {
      workoutStarted.value = false;
      workoutComplete.value = false;
    } else {
      start();
    }
  };

  return {
    start,
    currentTime,
    workoutStarted,
    workoutComplete,
    timer,
    resetWorkout,
    handleStartWorkout,
    nonTimerWorkout,
    totalWorkoutTime,
    runningPeriods,
    currentLap,
  };
}
