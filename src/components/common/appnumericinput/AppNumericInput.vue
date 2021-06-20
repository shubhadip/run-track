<template>
  <wrapper
    element="input"
    :id="$props.id"
    :error="!valid"
    :disabled="$props.disabled"
    :focused="isFocused"
    :labelShrink="labelFloat"
    :labelText="labelFloat ? label : placeholder || label"
    :variant="$props.variant"
    :addon="$props.addon"
    @focusInput="focusInput"
  >
    <template v-slot:default="{ inputProps }">
      <input
        :id="inputProps.id"
        :class="inputProps.inputClass"
        :ref="
          (el) => {
            inputRef = el;
          }
        "
        :value="localValue"
        type="tel"
        :autofocus="$props.autoFocus"
        :maxlength="$props.maxLength"
        :disabled="$props.disabled"
        @input="onChange"
        @focus="onFocus"
        @blur="onBlur"
        autocomplete="off"
      />
      <div v-if="$props.clearable && localValue.length" @click="onClear" class="c-input__clear"></div>
      <icon-view
        v-if="$props.showContactIcon && !(localValue.length && $props.clearable)"
        icon="contact"
        :className="`${inputProps.customIconClass} contact-icon`"
        @click="focusInput"
      />
    </template>
    <template v-slot:addon="{ addonProps }">
      <span :class="[addonProps.textClass, { 'addon-hidden': !labelFloat }]">+91</span>
    </template>
    <template v-slot:helper-text="{ inputProps }">
      <div v-if="$props.tip" :class="inputProps.helperClass">{{ $props.tip }}</div>
      <div v-if="!valid" :class="inputProps.errorClass">
        {{ message }}
      </div>
    </template>
  </wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, watch } from 'vue';
import { IValidationRule, IValidation } from '@/shared/interface';
import { validationHandler } from '@/shared/validations';
import IconView from '@/components/common/iconview/IconView.vue';
import BaseInput from '../baseinput/BaseInput.vue';

export default defineComponent({
  name: 'AppNumericInput',
  components: {
    wrapper: BaseInput,
    IconView,
  },
  emits: ['focus', 'blur', 'update:modelValue'],
  props: {
    /**
     * addon Start or End
     * @values String
     */
    addon: {
      type: String,
      default: '',
    },
    /**
     * Type of input
     * @values {String, Number}
     * @default ""
     */
    modelValue: {
      type: [String, Number],
      default: '',
    },
    /**
     * Flag to show the clear input symbol
     * @values Boolean
     * @default true
     */
    clearable: {
      type: Boolean,
      default: true,
    },
    /**
     * Flag to show the contact icon symbol
     * @values Boolean
     * @default true
     */
    showContactIcon: {
      type: Boolean,
      default: false,
    },
    /**
     * Validations array of objects of type IValidationRule to valdiate the input
     * @values IValidationRule[]
     */
    validations: {
      type: Array as () => IValidationRule[],
      default: (): IValidationRule[] => [] as IValidationRule[],
    },
    /**
     * Focus state of input
     * @values Boolean
     * @default false
     */
    autoFocus: {
      type: Boolean,
      default: false,
    },
    /**
     * Disabled state of input
     * @values Boolean
     * @default false
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Placeholder to be shown on the input
     * @values String
     */
    placeholder: {
      type: String,
      default: '',
    },
    /**
     * Max length of the input
     * @values Number
     */
    maxLength: Number,
    /**
     * Label to be shown above the input
     * @values String
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * Message to be shown below the input
     * @values String
     */
    tip: {
      type: String,
      default: '',
    },
    /**
     * flag to turn on/off internal validation of component
     * @values Boolean
     */
    autoValidate: {
      type: Boolean,
      default: true,
    },

    /**
     * Type of label
     * @values Boolean
     * @default false
     */
    labelShrink: {
      type: Boolean,
      default: false,
    },
    /**
     * variant for input element
     * default: underline & other option: bordered
     * @values String
     */
    variant: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const localValue = ref<string>('');
    const validation = reactive<IValidation>({ isValid: true, message: '' });
    const isFocused = ref<boolean>(false);
    const inputRef = ref<typeof HTMLInputElement | null>(null);
    const { isValid: valid, message } = toRefs<{ isValid: boolean; message: string }>(validation);

    /**
     * Calls the validationHandler to check the validations, whether the state of input is valid or not
     * @returns boolean whether current state of the input is valid or not
     */
    function isValid(): boolean {
      const response = validationHandler(localValue.value, props.validations);
      validation.isValid = response.isValid;
      validation.message = response.message;
      return validation.isValid;
    }

    /**
     * onChange to be called in case of value change of input, emits onChange event
     * @public
     */
    function onChange(event: Event): void {
      // Event to be discarded if input is disabled
      localValue.value = (event.target as HTMLInputElement).value;
      if (props.disabled) {
        return;
      }
      // restrict characters
      localValue.value = localValue.value.replace(/[^\d]/, '');
      emit('update:modelValue', localValue.value, event);
    }

    /**
     * onFocus to be called in case of input gets focus, emits onFocus event
     * @public
     */
    function onFocus(event: Event): void {
      // Event to be discarded if input is disabled
      isFocused.value = true;
      if (props.disabled) {
        return;
      }
      emit('focus', localValue.value, event);
    }

    /**
     * onBlur to be called in case of input gets blur, emits onBlur event
     * @public
     */
    function onBlur(event: Event): void {
      // Event to be discarded if input is disabled
      isFocused.value = false;
      if (props.disabled) {
        return;
      }
      // Validate component if auto validate is on
      if (props.autoValidate) {
        isValid();
      }
      emit('blur', localValue.value, event);
    }

    /**
     * Focus input in case on clicking addon Handler
     */
    function focusInput(): void {
      ((inputRef.value as unknown) as HTMLInputElement).focus();
    }

    /**
     * onClear to be called on cross click, $prop.clearable being set to true
     */
    function onClear(event: Event): void {
      localValue.value = '';
      emit('update:modelValue', localValue.value, event);
    }

    /**
     * To make label as Floating
     */
    const labelFloat = computed((): boolean => {
      return !!(isFocused.value || localValue.value || props.labelShrink);
    });

    watch(
      () => props.modelValue,
      (): void => {
        localValue.value = String(props.modelValue || '');
      }
    );

    // Created
    localValue.value = String(props.modelValue || '');

    return {
      localValue,
      onChange,
      onFocus,
      onBlur,
      // Refs
      inputRef,
      // Computed
      labelFloat,
      isValid,
      valid,
      message,
      isFocused,
      // Methods
      focusInput,
      onClear,
    };
  },
});
</script>

<style lang="postcss" scoped>
@import '@css/app.css';
.contact-icon {
  flex-shrink: 0;
  font-size: 1.25em;
  color: $black-1;
}
.addon-hidden {
  display: none;
}
</style>
