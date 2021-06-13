import { Ref } from 'vue';

export interface IUseHome {
  start: Function;
  currentTime: Ref<number>;
  workoutStarted: Ref<boolean>;
  evaluateMessage: () => string;
  workoutComplete: Ref<boolean>;
  timer: Ref<number | null>;
  resetWorkout: () => void;
}

export interface IFeedBackOptions {
  name: string;
  description: string;
  value: number;
}

export interface ICheckboxOption {
  label: string;
  value: string | boolean | number;
  sideLabel?: boolean | string;
  description?: string;
  disabled?: boolean;
  expanded?: boolean;
  imageName?: string;
  customAttr?: string;
}

export interface IGenericOption {
  [x: string]: any;
}
