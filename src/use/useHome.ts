import { Ref } from '@vue/runtime-core';
import { ref } from 'vue';

export function useHome(): {
  start: Function;
  currentTime: Ref<number>;
  workoutStarted: Ref<boolean>;
  evaluateMessage: () => string;
  workoutComplete: Ref<boolean>;
  timer: Ref<number | null>;
  resetWorkout: () => void;
} {
  let runningPeriods = [60];
  let speakApi = new SpeechSynthesisUtterance();
  let currentTime = ref<number>(10);
  const workoutStarted = ref<boolean>(false);
  const workoutComplete = ref<boolean>(false);
  const timer = ref<number | null>(null);
  const intervalId = ref<number | null>(null);
  const alertWhenWorkoutIsAboutToEnd = ref<boolean>(true);

  const speakMessage = (msg: string): void => {
    speakApi.text = msg;
    window.speechSynthesis.speak(speakApi);
  };

  const evaluateMessage = (): string => {
    return runningPeriods.length <= 0 ? `Workout Complete` : `${currentTime.value} seconds Workout Complete`;
  };

  const alertWhenWorkoutIsAboutToEndMsg = (time: number) => {
    speakMessage(`Workout About to Complete ${time} seconds remaning`);
  };

  const startWorkout = (): void => {
    const nextValue = runningPeriods.shift();
    if (nextValue) {
      currentTime.value = nextValue;
      startCountDown(nextValue);
    }
  };

  const startCountDown = (time: number, isCountDown = false): void => {
    let value = time;
    intervalId.value = setInterval(() => {
      if (!workoutStarted.value) {
        workoutStarted.value = true;
      }

      timer.value = value;
      value = value - 1;

      if (
        alertWhenWorkoutIsAboutToEnd.value &&
        !isCountDown &&
        [currentTime.value - 10, currentTime.value - 20, currentTime.value - 30].includes(
          currentTime.value - timer.value
        )
      ) {
        alertWhenWorkoutIsAboutToEndMsg(timer.value);
      }

      if (value === 0 && intervalId.value) {
        speakMessage(isCountDown ? 'Workout Started' : evaluateMessage());
        clearInterval(intervalId.value);
        if (runningPeriods.length > 0) {
          startWorkout();
        } else {
          workoutComplete.value = true;
        }
      }
    }, 1000);
  };

  const start = () => {
    timer.value = currentTime.value;
    startCountDown(currentTime.value, true);
  };

  const resetWorkout = (): void => {
    if (intervalId.value) {
      clearInterval(intervalId.value);
      workoutComplete.value = false;
      workoutStarted.value = false;
    }
  };

  return {
    start,
    currentTime,
    workoutStarted,
    evaluateMessage,
    workoutComplete,
    timer,
    resetWorkout,
  };
}
