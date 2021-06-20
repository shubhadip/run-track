import { WorkoutOptions, ICheckboxOption, IWorkOutEmoji } from './interface';

export const wokoutEmoji: IWorkOutEmoji = {
  [WorkoutOptions.Running]: '🏃🏻',
  [WorkoutOptions.Walking]: '🚶',
  [WorkoutOptions.Sprint]: '💨',
};
export const feedBackOptions: ICheckboxOption[] = [
  {
    label: 'Half Way Feedback',
    description: '',
    value: 1,
  },
  {
    label: 'Remaining Time FeedBack',
    description: '',
    value: 2,
  },
  {
    label: 'Regular Interval Feedback',
    description: 'regular interval message based on time (5 min, 10 min, 20 min)',
    value: 3,
  },
  {
    label: 'Workout Phase Change Feedback',
    description: 'alert after each added time  [1-run, 2-walk, 1-run, 2-walk, 1-sprint]',
    value: 4,
  },
  // {
  //   label: 'Regular Distance Feeback',
  //   description: 'regular interval message based on per km',
  //   value: 5,
  // },
];
