<template>
  <div class="c-input">
    <label
      class="c-input__label"
      :class="{
        'c-input__label--ul': isUnderline,
        'c-input__label--br': isBordered,
        'c-input__label--shrink': labelShrink,
        'is-error': $props.error,
      }"
      :for="$props.id"
    >
      {{ $props.labelText }}
    </label>
    <div
      class="c-input__base"
      :class="{
        'c-input__base--ul': isUnderline,
        'c-input__base--br': isBordered,
        'c-input__base--addon-start': hasAddonStart,
        'c-input__base--addon-end': hasAddonEnd,
        'is-focused': $props.focused,
        'is-error': $props.error,
        'is-disabled': $props.disabled,
      }"
    >
      <div v-if="hasAddonStart" class="c-input__addon-start" @click="handleFocusInput">
        <slot name="addon" v-bind:addonProps="addonProps" />
      </div>
      <slot v-bind:inputProps="inputProps" />
      <div v-if="hasAddonEnd" class="c-input__addon-end" @click="handleFocusInput">
        <slot name="addon" v-bind:addonProps="addonProps" />
      </div>
    </div>
    <slot name="helper-text" v-bind:inputProps="inputProps"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import {
  IBaseInputAddonProps,
  IBaseInputProps,
  BaseInputStyle,
  BaseInputElement,
  BaseInputAddonPosition,
} from '@/shared/interface';

/*
 * This is a prop only base component made to bring common looking UI
 * css and html structure for &lt;input/&gt;, &lt;select/&gt;, &lt;textarea/&gt;, &lt;select-menu/&gt; (custom select)
 * Will provide consistant non repetetive scoped css + html to all the components extending its html
 *
 * A.Common UI styles would be:
 * 1) Floating Label OR Non-Floating(Static) Underline UI
 * 2) Floating Label OR Non-Floating(Static) Bordered UI
 * 3) Its UI classes will handle error, disabled, focused (js props) & hover(css based)
 * 4) Current size options are as pe material UI design Normal and Small(Dense).
 *
 * B.Input Will have two main elements namely: Label & Base
 * Label Has states:
 * 1. Floating i.e. once input has value or input field is in focused -  *interacted state)
 * 2. Non Floating i.e. like it will act as a placeholder primarly and when in *interaced state it vanishes.
 * 3. Dual use with input:placeholder could also be made, i.e. when placeholder attr is added to main base input element,
 * and its visible UI placeholder would be label in static form & input:placeholder will be hidden and once label gets *interacted state,
 * input:placeholder will appear (providing some more hint information.)
 * Base will hold the main input element and its interaction states :disabled, error, focused shall be passes via $props
 * to this component
 */
export default defineComponent({
  name: 'BaseInput',
  props: {
    /**
     * Id attribute provided to native input element from outside,
     * here will be used as for="id" &lt;label&gt; tag
     */
    id: {
      type: String,
      required: true,
    },
    /**
     * Text to be placed in label position,
     * Label in floating state or placeholder type state
     * can carry different text value supplied from outside
     */
    labelText: {
      type: String,
      required: true,
      default: 'Label Placeholder',
    },
    /**
     * To toggle label to floating (true) or
     * placeholder (false) state
     * Boolean value
     */
    labelShrink: {
      type: Boolean,
      default: false,
    },
    /**
     * underline | bordered
     */
    variant: {
      type: String,
      default: BaseInputStyle.Underline,
    },
    /**
     * key: element
     * values: 'input', 'multiline', 'select' (native), 'select-menu' (non native custom select)
     */
    element: {
      type: String,
      required: true,
    },
    /**
     * To add: text (price, kg, cm unit) | clickable button with icon| icon and many more,
     * along with main input element from outside to position start or end of input
     * Values: 'start' | 'end'
     */
    addon: {
      type: String,
      default: '',
    },
    /**
     * Actual UI state representing focused
     * key: focused
     * value: boolean
     */
    focused: {
      type: Boolean,
      default: false,
    },
    /**
     * Actual UI state representing error
     * key: error
     * value: boolean
     */
    error: {
      type: Boolean,
      default: false,
    },
    /**
     * Actual UI state representing disabled
     * key: disabled
     * value: boolean
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    /**
     * classes for various addon types available through 'adonProps' slotscope context
     * textClass - for text
     * buttonIconClass - button type icon
     * iconClass - svg icon
     */
    const addonProps: IBaseInputAddonProps = {
      textClass: 'c-input__addon-text',
      buttonIconClass: 'c-input__btn',
      iconClass: 'c-input__icon',
    };
    // Computed
    const isBordered = computed((): boolean => {
      return props.variant === BaseInputStyle.Bordered;
    });
    const isUnderline = computed((): boolean => {
      return props.variant === BaseInputStyle.Underline;
    });

    const hasAddonStart = computed((): boolean => {
      return props.addon === BaseInputAddonPosition.Start;
    });
    const hasAddonEnd = computed((): boolean => {
      return props.addon === BaseInputAddonPosition.End;
    });
    /**
     * Computed input classes to be applied on slot input $prop.element
     */
    const inputProps = computed(
      (): IBaseInputProps => {
        const { element } = props;
        const elementClass: { [key: string]: string } = {
          [BaseInputElement.Input]: 'c-input__input',
          [BaseInputElement.Multiline]: 'c-input__multiline',
          [BaseInputElement.Select]: 'c-input__select',
          [BaseInputElement.SelectMenu]: 'c-input__select c-input__select-menu',
        };
        return {
          inputClass: `c-input__elem ${elementClass[element]}`,
          id: props.id,
          selectIconClass: 'c-input__select-icon',
          customIconClass: 'c-input__custom-icon',
          selectListClass: 'c-input__select-menu-list',
          errorClass: 'c-input__error',
          helperClass: 'c-input__helper',
        };
      }
    );

    /**
     * handler for focus on parent element on click an addon element
     */
    const handleFocusInput = (): void => {
      emit('focus-input');
    };

    return {
      isBordered,
      isUnderline,
      hasAddonStart,
      hasAddonEnd,
      inputProps,
      addonProps,
      handleFocusInput,
    };
  },
});
</script>

<style lang="css">
@import '@css/app.css';
@import '@css/_input-elements.css';
</style>
