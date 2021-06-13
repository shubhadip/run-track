<template>
  <div class="app-checkbox">
    <div class="app-checkbox__header" v-if="$props.label">
      {{ $props.label }}
    </div>
    <div :class="[$props.plain ? 'app-checkbox__input' : 'app-checkbox__main']">
      <component
        v-for="item in $props.items"
        :key="item.label + item.value"
        :is="$props.plain || $props.bodyClick ? 'label' : 'div'"
        :class="[$props.plain ? 'app-checkbox__label' : 'app-checkbox__base', { 'is-disabled': item.disabled }]"
      >
        <span :class="['c-check-input', { 'c-check-input--sm': $props.small }]">
          <input
            type="checkbox"
            :disabled="item.disabled"
            v-model="localSelectedItems"
            :id="$props.id + item.value"
            :value="$props.itemMatch ? item : item.value"
            @change="(e) => handleChange(e, item)"
            autocomplete="off"
          />
        </span>
        <span v-if="$props.plain">
          <slot name="label" v-bind:item="item">{{ item.label }}</slot>
        </span>
        <slot name="custom" v-bind:item="{ ...item, uid: $props.id + item.value }" v-else-if="isCustom" />
        <div v-else class="app-checkbox__content">
          <div class="app-checkbox__left">
            <label :for="$props.id + item.value" :class="['app-checkbox__label', { 'is-disabled': item.disabled }]">
              {{ item.label }}
            </label>
            <div class="app-checkbox__description" v-if="shouldShowDescription(item)">{{ item.description }}</div>
          </div>
          <div class="app-checkbox__right">
            <div class="app-checkbox__sidelabel" v-if="showSideLabels && !isExpandable">{{ item.sideLabel }}</div>
            <button
              v-if="isExpandable && item.description"
              class="app-checkbox__expander"
              :class="[isExpanded(item) ? 'is-open' : '']"
              @click="toggleExpandItem(item.value)"
            ></button>
          </div>
        </div>
      </component>
    </div>
    <div v-if="$props.tip" class="app-checkbox__helper">{{ $props.tip }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import { ICheckboxOption, IGenericOption } from '@/shared/interface';

export default defineComponent({
  name: 'AppCheckbox',
  props: {
    /**
     * Unique component identifier.
     */
    id: {
      type: String,
      required: true,
    },
    /**
     * The model prop of the checkbox
     */
    modelValue: {
      type: Array as () => IGenericOption[] | string[] | number[] | boolean[],
      default: (): string[] => [],
    },
    /**
     * options array to render items
     */
    items: {
      type: Array as () => ICheckboxOption[],
      default: (): ICheckboxOption[] => [],
    },
    /**
     * label used as title at top of checkbox
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
     * Sizing.
     */
    small: {
      type: Boolean,
      default: false,
    },
    /**
     * Flag to use simple checkbox structure.
     * Note: simple structure consists only of a checkbox and label element useful in forms.
     * Default is false i.e. a complex structure consisting of side labels and expandables.
     */
    plain: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether to show side labels
     */
    showSideLabels: {
      type: Boolean,
      default: true,
    },
    /**
     * Make the checkbox list an expandable type
     */
    isExpandable: {
      type: Boolean,
      default: false,
    },
    /**
     * flag to disabled checkbox field
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * used to pass custom dom via slot
     */
    isCustom: {
      type: Boolean,
      default: false,
    },
    /**
     * to emit Option as selectedValue or just the value attribute
     */
    itemMatch: {
      type: Boolean,
      default: false,
    },
    /**
     * Pass boolean "true" to make type="complex" input item a label (clickable), default "false"
     */
    bodyClick: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const expanded = reactive<Set<string | boolean | number>>(new Set<string | boolean | number>());
    const localSelectedItems = ref<IGenericOption[] | string[] | number[] | boolean[]>(props.modelValue);
    /**
     * Called whenever expand chevron is clicked
     * @public
     */
    function toggleExpandItem(value: string | boolean | number): void {
      expanded.has(value) ? expanded.delete(value) : expanded.add(value);
    }

    /**
     * Checks if current checkbox item is expanded
     * @param item - checkbox item
     * @returns whether current checkbox is in expanded state
     * @public
     */
    function isExpanded(item: ICheckboxOption): boolean {
      return expanded.has(item.value);
    }

    /**
     * Gets called when the user clicks on the checkbox or label
     * @public
     */
    function handleChange(e: Event): void {
      if (props.disabled) {
        return;
      }
      emit('update:modelValue', localSelectedItems.value, e);
    }

    /**
     * Whether to show item description
     */
    function shouldShowDescription(item: ICheckboxOption): boolean {
      if (!props.isExpandable || isExpanded(item)) {
        return !!item.description;
      }
      return false;
    }

    watch(
      () => props.modelValue,
      (newValue: IGenericOption[] | string[] | number[] | boolean[]) => {
        localSelectedItems.value = newValue;
      }
    );

    return {
      expanded,
      localSelectedItems,
      toggleExpandItem,
      isExpanded,
      handleChange,
      shouldShowDescription,
    };
  },
});
</script>
