import { wokoutEmoji } from '@/shared/constants';
import { IGenericOption, IWorkoutLap, IWorkoutList, WorkoutOptions } from '@/shared/interface';

export const getFormattedWorkout = (workoutJson: IGenericOption): IWorkoutList[] => {
  const modifiedWorklist: IWorkoutList[] = [];
  Object.keys(workoutJson).forEach((data, index) => {
    const value = workoutJson[data];
    let tempData = '';
    value.forEach((element: IWorkoutLap, index1: number) => {
      const emoji = wokoutEmoji[element.type as WorkoutOptions];
      tempData += `${emoji}  ${element.timing}  m ${index1 + 1 === value.length ? '' : ' , '}`;
    });
    modifiedWorklist.push({
      key: `${index + 1}`,
      value: tempData,
      optionSelected: Number(data),
    });
  });
  return modifiedWorklist;
};

export const getFormattedMessage = (workoutComplete: boolean, workoutStarted: boolean, timer: number): string => {
  if (!workoutComplete && !workoutStarted) {
    return 'START RUN';
  }
  if (workoutComplete && workoutStarted) {
    return 'WORKOUT COMPLETED';
  }
  if (workoutStarted && !workoutComplete && timer) {
    const minutes = timer / 60;
    const secs = timer % 60;
    return minutes >= 1 ? `${Math.floor(minutes)} min ${secs} secs remaining` : `${secs} secs remaining`;
  }
  return 'Start Run';
};
