import { WorkoutOptions, ICheckboxOption, IWorkOutEmoji, ISingleSelectOption } from './interface';

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

const getSortedWorkOutList = (): any => {
  return [
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
      label: `Dead Hang`,
      value: WorkoutOptions.DeadHang,
    },
    {
      label: `Scapulla Pull`,
      value: WorkoutOptions.ScapullaPull,
    },
    {
      label: `Negative Pull `,
      value: WorkoutOptions.NegativePull,
    },
    {
      label: 'Plank',
      value: WorkoutOptions.Plank,
    },
    {
      label: 'Boat Hold',
      value: WorkoutOptions.BoatHold,
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
      label: 'Butt Kicks',
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
    {
      label: 'Crunches',
      value: WorkoutOptions.Crunches,
    },
    {
      label: 'Star Crunch',
      value: WorkoutOptions.StarCrunch,
    },
    {
      label: 'Running Jump',
      value: WorkoutOptions.RunningJump,
    },
    {
      label: 'A Skips',
      value: WorkoutOptions.ASkips,
    },
    {
      label: 'Run Toe Touch',
      value: WorkoutOptions.RunToeTouch,
    },
    {
      label: 'Leg Raise Clap',
      value: WorkoutOptions.LegRaiseClap,
    },
    {
      label: 'On Air Lunges',
      value: WorkoutOptions.OnAirLunges,
    },
    {
      label: 'SquatJump',
      value: WorkoutOptions.SquatJump,
    },
    {
      label: 'Ankle Walk',
      value: WorkoutOptions.AnkleWalk,
    },
    {
      label: 'Single Leg Jump',
      value: WorkoutOptions.SingleLegJump,
    },
    {
      label: 'Knee Hold',
      value: WorkoutOptions.KneeHold,
    },
    {
      label: 'Box Jump',
      value: WorkoutOptions.BoxJump,
    },
    {
      label: 'Straight leg Running',
      value: WorkoutOptions.StraightLegRunning,
    },
  ].sort((x: any, y: any) => {
    // eslint-disable-next-line
    return x.label > y.label ? 1 : (x.label < y.label ? -1 : 0)
  });
};
export const workoutList: ISingleSelectOption[] = getSortedWorkOutList();
