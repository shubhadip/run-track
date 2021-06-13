import { IFeedBackOptions } from './interface';

export const feedBackOptions: IFeedBackOptions[] = [
  {
    name: 'Half Way Feedback',
    description: 'voice the half way time',
    value: 0,
  },
  {
    name: 'Remaining Time FeedBack',
    description: 'voice remaining time',
    value: 1,
  },
  {
    name: 'Regular Interval Feedback',
    description: 'regular interval message based on time (5 min, 10 min, 20 min)',
    value: 2,
  },
  {
    name: 'Workout Phase Change Feedback',
    description: 'alert after each added time  [1-run, 2-walk, 1-run, 2-walk, 1-sprint]',
    value: 3,
  },
  {
    name: 'Regular Distance Feeback',
    description: 'regular interval message based on per km',
    value: 4,
  },
];
