import { WorkoutOptions, ICheckboxOption, IWorkOutEmoji } from './interface';

export const wokoutEmoji: Partial<IWorkOutEmoji> = {
  [WorkoutOptions.Running]: '🏃🏻',
  [WorkoutOptions.Walking]: '🚶',
  [WorkoutOptions.Sprint]: '💨',
  [WorkoutOptions.Rest]: '🧘',
};

export const ActivateVoiceFeecback = true;
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

export const workoutList = [
  {
    label: `${wokoutEmoji[WorkoutOptions.Rest]}  Rest`,
    value: WorkoutOptions.Rest,
  },
  {
    label: `${wokoutEmoji[WorkoutOptions.Running]} Run`,
    value: WorkoutOptions.Running,
  },
  {
    label: `${wokoutEmoji[WorkoutOptions.Sprint]} Sprint `,
    value: WorkoutOptions.Sprint,
  },
  {
    label: `${wokoutEmoji[WorkoutOptions.Walking]} Walk `,
    value: WorkoutOptions.Walking,
  },
  {
    label: 'High Knees',
    value: WorkoutOptions.HighKnees,
  },
  {
    label: 'Jumping Jacks',
    value: WorkoutOptions.JumpingJacks,
  },
  {
    label: 'ButKicks',
    value: WorkoutOptions.ButKicks,
  },
  {
    label: 'MountainClimbers',
    value: WorkoutOptions.MountainClimbers,
  },
  {
    label: 'Burpees',
    value: WorkoutOptions.Burpees,
  },
  {
    label: 'Skipping',
    value: WorkoutOptions.Skipping,
  },
  {
    label: 'Russian twists',
    value: WorkoutOptions.RussianTwist,
  },
  {
    label: 'Leg raises',
    value: WorkoutOptions.LegRaises,
  },
  {
    label: 'Hip raises',
    value: WorkoutOptions.HipRaises,
  },
  {
    label: 'Flutter kicks',
    value: WorkoutOptions.Flutterkick,
  },
  {
    label: 'Plank knees to elbow',
    value: WorkoutOptions.PlankKneesToElbow,
  },
  {
    label: 'Chair sit ups',
    value: WorkoutOptions.ChairSitUp,
  },
  {
    label: 'Seated in and outs',
    value: WorkoutOptions.SeatedInAndOuts,
  },
];
