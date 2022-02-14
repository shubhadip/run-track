import { IGenericOption, IWorkoutLap, IWorkoutList } from '@/shared/interface';

export const getFormattedWorkout = (workoutJson: IGenericOption): IWorkoutList[] => {
  const modifiedWorklist: IWorkoutList[] = [];
  Object.keys(workoutJson).forEach((data, index) => {
    const value = workoutJson[data];
    const tempData: any = [];
    value.forEach((element: IWorkoutLap) => {
      tempData.push({
        name: element.type,
        time: element.timing,
      });
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
    return 'START';
  }
  if (workoutComplete && workoutStarted) {
    return 'WORKOUT COMPLETED';
  }
  if (workoutStarted && !workoutComplete && timer) {
    return `${timer} seconds remaining`;
  }
  return 'Start';
};
