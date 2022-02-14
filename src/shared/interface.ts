import { Ref } from 'vue';

/**
 * Base Input component UI
 */
export enum BaseInputStyle {
  Bordered = 'bordered',
  Underline = 'underline',
}

export enum BaseInputElement {
  Input = 'input',
  Multiline = 'multiline',
  Select = 'select',
  SelectMenu = 'select-menu',
}

export enum BaseInputAddonPosition {
  Start = 'start',
  End = 'end',
}

export enum WorkoutOptions {
  Running = 'running',
  Walking = 'walking',
  Sprint = 'sprint',
  HighKnees = 'High Knees',
  JumpingJacks = 'Jumping Jacks',
  ButKicks = 'ButKicks',
  MountainClimbers = 'MountainClimbers',
  Burpees = 'Burpees',
  Skipping = 'Skipping',
  RussianTwist = 'Russian twists',
  LegRaises = 'Leg raises',
  HipRaises = 'Hip raises',
  Flutterkick = 'Flutter kicks',
  PlankKneesToElbow = 'Plank knees to elbow',
  ChairSitUp = 'Chair sit ups',
  SeatedInAndOuts = 'Seated in and outs',
  Rest = 'Rest',
  Plank = 'Plank',
  BoatHold = 'Boat hold',
  Crunches = 'Crunches',
  StarCrunch = 'Star Crunches',
}

export interface ILoginSuccess {
  accesstoken: string;
  refreshtoken: string;
  success: boolean;
}

export interface ILoginEmail {
  email: string;
  password: string;
}

export interface ILoginMobile {
  mobile: string;
  password: string;
}

export interface IUseHome {
  start: Function;
  currentTime: Ref<number>;
  workoutStarted: Ref<boolean>;
  workoutComplete: Ref<boolean>;
  timer: Ref<number | null>;
  resetWorkout: () => void;
  handleStartWorkout: () => void;
  nonTimerWorkout: () => void;
  totalWorkoutTime: Ref<number>;
  runningPeriods: Ref<IWorkoutLap[]>;
  currentLap: Ref<string>;
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

export enum ErrorCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  REQUEST_TIMEOUT = 408,
  PRECONDITION_FAILED = 412,
  UNPROCESSABLE_ENTITY = 422,
  FAILED_DEPENDENCY = 424,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
  CONNECTION_TIMED_OUT = 522,
}

// Base Input component UI
export interface IBaseInputAddonProps {
  buttonIconClass: string;
  iconClass: string;
  textClass: string;
}

export interface IBaseInputProps {
  inputClass: string;
  id: string;
  selectIconClass: string;
  selectListClass: string;
  errorClass?: string;
  helperClass?: string;
  customIconClass?: string;
}

export interface IValidation {
  isValid: boolean;
  message: string;
}

export interface IValidationRules {
  integer: (integer: any) => boolean;
  email: (email: string) => boolean;
  mobile: (mobile: any) => boolean;
  required: (value: any) => boolean;
  regex: (regexString: string, value: any) => boolean;
  inverseRegex: (regexString: string, value: any) => boolean;
  maxValue: (maxValue: any, value: any) => boolean;
  minValue: (minValue: any, value: any) => boolean;
  range: (range: any, value: any) => boolean;
  minLength: (minLength: number, value: any) => boolean;
  maxLength: (maxLength: number, value: any) => boolean;
  pan: (value: any) => boolean;
  aadhar: (value: any) => boolean;
  gstin: (value: any) => boolean;
  alphaNumeric: (value: any) => boolean;
  alphaNumericWithSpace: (value: any) => boolean;
  multipleOf: (multiple: number, value: number) => boolean;
}

export interface IValidationMessages {
  required: string;
  email: string;
  mobile: string;
  integer: string;
  regex: string;
  inverseRegex: string;
  maxValue: string;
  minValue: string;
  range: string;
  maxLength: string;
  minLength: string;
  pan: string;
  aadhar: string;
  gstin: string;
  pincode: string;
  alphaNumeric: string;
  alphaNumericWithSpace: string;
  multipleOf: string;
}

export interface IValidationRule {
  name: string;
  message?: string;
  minValue?: number;
  maxValue?: number;
  range?: { maximum: number; minimum: number };
  expression?: string;
  customHandler?: (value: any) => boolean;
}

export enum ValidationMessages {
  required = 'Please enter this value',
  email = 'Invalid email id',
  mobile = 'Invalid mobile no',
  integer = 'Please enter a valid intege value',
  regex = 'Please enter a valid value',
  inverseRegex = 'Please enter a valid value',
  maxValue = 'Value exceeds the maximum value allowed.',
  minValue = 'Value is less than the minimum value allowed.',
  maxLength = 'Character limit exceeded.',
  minLength = 'Not enough characters entered.',
  range = 'Value is not in the given range.',
  pan = 'Expected format AAAAA5555A',
  aadhar = 'Expected format 555555555555',
  gstin = 'Expected format 22AAAAA0000A1Z5',
  pincode = 'Please enter a valid 6 digit PIN code',
  alphaNumeric = 'Please enter only alphabets and numbers.',
  alphaNumericWithSpace = 'Invalid Characters.',
  multipleOf = 'Please enter the value which is multiple of a desired number.',
}

export enum AppSingleSelectVariant {
  /**
   * Dropdown view in full screen
   */
  FULLSCREEN = 'fullscreen',
  /**
   * Normal dropdown view
   */
  BOTTOM = 'bottom',
}

export enum KeyName {
  Enter = 'Enter',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Escape = 'Escape',
  Tab = 'Tab',
}

export interface ISingleSelectOption {
  label: string;
  value: string;
}

// Button varients
export enum AppButtonVariants {
  OUTLINE = 'outline',
  LINK = 'link',
}

export enum AppButtonColors {
  BLUE = 'blue',
  GREY = 'grey',
  GREYBLUE = 'grey-blue',
  TRANSPARENT = 'transparent',
  BLACK = 'black',
}

export enum AppButtonSizes {
  EXTRASMALL = 'xs',
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
}

export interface IWorkoutList {
  key: string;
  value: string;
  optionSelected: number;
}

export interface IWorkoutLap {
  type: string;
  timing: number;
}

export type IWorkOutEmoji = {
  [key in WorkoutOptions]: string;
};
