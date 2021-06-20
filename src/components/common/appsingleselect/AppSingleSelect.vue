<template>
  <wrapper
    element="select-menu"
    :id="$props.id"
    :error="!validation.isValid"
    :disabled="$props.disabled"
    :focused="isOpen"
    :labelShrink="labelFloat"
    :labelText="labelFloat ? label : placeholder || label"
    :variant="$props.variant"
    :addon="$props.addon"
  >
    <template v-slot:default="{ inputProps }">
      <transition name="fade">
        <div v-if="$props.mobileMode && isOpen" class="c-input__overlay" @click="closeDropdown"></div>
      </transition>
      <div :class="inputProps.inputClass" ref="ELEMENT_REF">
        <!--
          The following input element handles the initial opening of dropdown.
          Instead of click, mousedown is used because mousedown is triggered before the focus event.
          The input field SHOULD NOT gain focus by mouse actions, only keyboard action.
          This is achieved by preventing the default mousedown behaviour.
        -->
        <slot name="selectedLabel" v-bind:selectedItem="selectedItem">
          <div class="c-input__select-value">{{ selected ? selectedItem[$props.optionLabel] : '' }}</div>
        </slot>
        <input
          :id="inputProps.id"
          type="text"
          class="c-input__select-input"
          :disabled="$props.disabled"
          readonly
          @mousedown.prevent="onClick"
          @focus="onFocus"
          autocomplete="off"
        />
        <!-- dropdown panel -->
        <transition :name="$props.mobileMode ? 'pop' : 'scale'">
          <div
            v-if="isOpen"
            class="c-input__panel"
            :class="[
              {
                'c-input__panel--mobile': $props.mobileMode,
                [`c-input__panel--${$props.dropdownVariant}`]: $props.mobileMode,
              },
            ]"
          >
            <a v-if="$props.mobileMode && isOpen" class="c-input__panel-close" @click="closeDropdown"></a>

            <div class="c-input__panel-title" v-if="$props.panelLabel">{{ $props.panelLabel }}</div>

            <div v-if="$props.searchable" class="c-input__search">
              <!--
              Prevent up/down arrow keys to perform their default behaviour.
              When in an input field, the up/down arrow keys changes the cursor position
              which is not ideal when the same keys are used to highlight dropdown items.
            -->
              <input
                type="text"
                ref="SEARCH_REF"
                :value="searchTerm"
                @input="onChange"
                tabindex="-1"
                @keydown.down.prevent
                @keyup.up.prevent
                :placeholder="searchPlaceholder"
                autocomplete="off"
              />
              <a
                v-if="$props.clearable && searchTerm.length"
                class="c-input__search-clear"
                tabindex="-1"
                @click="clearSearch"
              >
              </a>
            </div>
            <ul ref="ITEMS_WRAPPER_REF" class="c-input__options">
              <li class="c-input__option-empty" v-if="!filteredItems.length">{{ emptyListMsg }}</li>
              <li
                v-for="(item, index) of filteredItems"
                :key="index"
                :ref="
                  (el) => {
                    if (el) ITEM_REF[index] = el;
                  }
                "
                @mouseenter="highlightItem(index)"
                @click="selectItem(index, $event)"
                :class="[
                  'c-input__option',
                  {
                    'c-input__option--selected': item[$props.valueLabel] === $props.modelValue,
                    'c-input__option--highlight': index === highlightedIndex,
                  },
                ]"
                :data-test="item[$props.optionLabel]"
              >
                <slot name="optionLabel" v-bind:item="item">
                  {{ item[$props.optionLabel] }}
                </slot>
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <icon-view v-if="arrowRight" icon="chevron-right" :className="inputProps.selectIconClass" />
      <icon-view v-else icon="chevron-down" :className="inputProps.selectIconClass" />
    </template>

    <template v-slot:addon="{ addonProps }" v-if="$props.addon">
      <slot name="addon" v-bind:addon="addonProps" />
    </template>

    <template v-slot:helper-text="{ inputProps }">
      <div v-if="$props.tip" :class="inputProps.helperClass">{{ $props.tip }}</div>
      <div v-if="!validation.isValid" :class="inputProps.errorClass">
        {{ validation.message }}
      </div>
    </template>
  </wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onBeforeUpdate, onMounted, reactive, ref, watch } from 'vue';
import { IValidationRule, IValidation, IGenericOption, KeyName, AppSingleSelectVariant } from '@/shared/interface';
import { validationHandler } from '@/shared/validations';
import { addBodyOverflow, removeBodyOverflow } from '@/utils/generic';
import IconView from '@/components/common/iconview/IconView.vue';
import BaseInput from '../baseinput/BaseInput.vue';

export default defineComponent({
  name: 'AppSingleSelect',
  components: {
    IconView,
    wrapper: BaseInput,
  },
  props: {
    /**
     * Selected value. Based on IGenericOption value which is String
     */
    modelValue: {
      type: [String, Number],
      default: '',
    },

    /**
     * List of items in the dropdown.
     */
    items: {
      type: Array as () => IGenericOption[],
      default: (): IGenericOption[] => [],
    },

    /**
     * Text to show when no value is selected.
     */
    placeholder: {
      type: String,
      default: '',
    },

    /**
     * Disable the dropdown.
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Allow filtering of dropdown items.
     */
    searchable: {
      type: Boolean,
      default: false,
    },

    /**
     * Allow search term to be cleared.
     */
    clearable: {
      type: Boolean,
      default: false,
    },

    /**
     * Show mobile version of dropdown.
     */
    mobileMode: {
      type: Boolean,
      default: false,
    },

    /**
     * DropDown variant.
     */
    dropdownVariant: {
      type: String as () => AppSingleSelectVariant,
      default: AppSingleSelectVariant.BOTTOM,
    },

    /**
     * Label for the dropdown field.
     */
    label: {
      type: String,
      default: '',
    },

    /**
     * Validations for the dropdown.
     */
    validations: {
      type: Array as () => IValidationRule[],
      default: (): IValidationRule[] => [] as IValidationRule[],
    },

    /**
     * Auto-validate on change/select.
     */
    autoValidate: {
      type: Boolean,
      default: false,
    },

    /**
     * Key to be used to get label.
     */
    optionLabel: {
      type: String,
      default: 'label',
    },

    /**
     * Key to be used to get value for an item in list.
     * @default: 'value'
     */
    valueLabel: {
      required: false,
      type: String,
      default: 'value',
    },

    /**
     * Key to be used to add panel label.
     */
    panelLabel: {
      type: String,
      default: '',
    },
    /**
     * Key to be used to add panel search placeholder.
     */
    searchPlaceholder: {
      type: String,
      default: 'Search...',
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
     * addon Start or End
     * @values String
     */
    addon: {
      type: String,
      default: '',
    },
    /**
     * Id for input element
     * @values String
     */
    id: {
      type: String,
      required: true,
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
    /**
     * Set this to true if item object is required
     * Or by default it will emit value
     * @default: false
     */
    emitItem: {
      type: Boolean,
      default: false,
    },
    /**
     * Set this for custom empty list message
     * @default: 'No items found...'
     */
    emptyListMsg: {
      type: String,
      default: 'No items found...',
    },
    /**
     * Set this to true if arrow to be shown in `>` direction
     */
    arrowRight: {
      type: Boolean,
      default: false,
    },
    /**
     * auto Focus on SearchText
     */
    autoFocus: {
      type: Boolean,
      default: false,
    },
    /**
     * Clears the input value (modalValue), if it does not exists in items
     * Checks and emits 'update:modelValue' once on component mount
     */
    clearInvalidInput: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    /**
     * Dropdown state.
     */
    const isOpen = ref<boolean>(false);

    /**
     * Search term to use for filtering dropdown items.
     */
    const searchTerm = ref<string>('');

    /**
     * Index of current highlighted item.
     */
    const highlightedIndex = ref<number>(-1);

    /**
     * Dropdown validation state.
     */
    const validation = reactive<IValidation>({
      isValid: true,
      message: '',
    });

    /**
     * Ref name for dropdown element.
     */
    const ELEMENT_REF = ref<HTMLElement | null>(null);

    /**
     * Ref name for the search field in dropdown panel.
     */
    const SEARCH_REF = ref<HTMLInputElement | null>(null);
    /**
     * Ref name for the scrollable dropdown items wrapper.
     */
    const ITEMS_WRAPPER_REF = ref<HTMLElement | null>(null);
    /**
     * Ref name for each dropdown item.
     */
    const ITEM_REF = ref<HTMLElement[]>([]);
    onBeforeUpdate(() => {
      ITEM_REF.value = [];
    });

    /**
     * Declaring functions here to avoid "used before" error.
     */
    let bindEvents: () => void;
    let unbindEvents: () => void;

    /**
     * List of items visible in the dropdown.
     * If no search term is present, all items are shown.
     */
    const filteredItems = computed<IGenericOption[]>(() => {
      if (searchTerm.value === '') {
        return [...props.items];
      }
      const regexQuery = new RegExp(searchTerm.value, 'i');
      return props.items.filter((item: any) => regexQuery.test(item[props.optionLabel]));
    });

    /**
     * Get index of item given its value from list of items.
     */
    function getItemIndexByValue(value: string | number): number {
      return props.items.findIndex((item: IGenericOption) => item[props.valueLabel] === value);
    }

    /**
     * Checks whether v-model value is valid value
     * i.e. it is in the list of items.
     */
    const selected = computed<boolean>(() => {
      const index = getItemIndexByValue(props.modelValue);
      return !(index < 0);
    });

    /**
     * Display text of selected value.
     */
    const selectedItem = computed<IGenericOption>(() => {
      const selectedItemIndex = getItemIndexByValue(props.modelValue);
      return props.items[selectedItemIndex];
    });

    /**
     * To make label as Floating
     */
    const labelFloat = computed((): boolean => {
      return !!(selected.value || props.labelShrink);
    });

    /**
     * Scrolls the item at the given index into view.
     * If already in view, nothing is done.
     */
    function scrollItemIntoView(index: number): void {
      if (index >= 0) {
        if (ITEM_REF.value) {
          const dropdownItems = ITEM_REF.value;
          const scrollPanel = ITEMS_WRAPPER_REF.value;
          if (dropdownItems && scrollPanel) {
            const highlightedItem = dropdownItems[index];
            if (highlightedItem) {
              const highlightedItemRect = highlightedItem.getBoundingClientRect();
              const highlightedItemTop = highlightedItemRect.top;
              const highlightedItemBottom = highlightedItemRect.bottom;

              const scrollPanelRect = scrollPanel.getBoundingClientRect();
              const scrollPanelTop = scrollPanelRect.top;
              const scrollPanelBottom = scrollPanelRect.bottom;
              const scrollPanelScrollTop = scrollPanel.scrollTop;

              /**
               * Is item already in view?
               */
              if (highlightedItemTop >= scrollPanelTop && highlightedItemBottom <= scrollPanelBottom) {
                return;
              }

              /**
               * Item outside viewable area.
               * If item is above the viewable area, align top edge.
               * If item is below the viewable area, align bottom edge.
               */
              if (highlightedItemBottom <= scrollPanelTop) {
                scrollPanel.scrollTop = scrollPanelScrollTop - (scrollPanelTop - highlightedItemTop);
              } else if (highlightedItemTop >= scrollPanelBottom) {
                scrollPanel.scrollTop = scrollPanelScrollTop + (highlightedItemBottom - scrollPanelBottom);
              }
            }
          }
        }
      }
    }

    /**
     * Highlight item given its index and scroll highlighted item in view.
     * If index < 0, highlight first item.
     */
    function highlightIndex(index: number): void {
      highlightedIndex.value = index;

      /**
       * Scroll only if dropdown is open.
       */
      if (isOpen.value) {
        if (index >= 0) {
          scrollItemIntoView(index);
        } else {
          scrollItemIntoView(0);
        }
      }
    }

    /**
     * Decides what to do when a key is pressed after dropown is opened.
     * ArrowUp: highlight previous item
     * ArrowDown: highlight next item
     *
     * Note: keydown is triggered continuously if key is pressed until keyup.
     */
    function handleKeydown(event: KeyboardEvent): void {
      const { key } = event;

      const totalItems = filteredItems.value.length;
      if (totalItems) {
        const currentIndex = highlightedIndex.value;

        if (key === KeyName.ArrowUp) {
          const updatedIndex = currentIndex > 0 ? currentIndex - 1 : totalItems - 1;
          highlightIndex(updatedIndex);
          return;
        }

        if (key === KeyName.ArrowDown) {
          const updatedIndex = currentIndex < totalItems - 1 ? currentIndex + 1 : 0;
          highlightIndex(updatedIndex);
        }
      }
    }

    /**
     * onChange to be called in case of value change of input, emits onChange event
     */
    function onChange(event: Event): void {
      /**
       * Event to be discarded if input is disabled
       */
      searchTerm.value = (event.target as HTMLInputElement).value;
    }

    /**
     * Clears the filter search term.
     */
    function clearSearch(): void {
      searchTerm.value = '';
    }

    /**
     * Calls the validationHandler to check the validations.
     */
    function isValid(): boolean {
      const response = validationHandler(props.modelValue, props.validations);
      validation.isValid = response.isValid;
      validation.message = response.message;
      return validation.isValid;
    }

    /**
     * Close dropdown panel.
     */
    function closeDropdown(): void {
      clearSearch();
      // unhighlightIndex();
      unbindEvents();
      if (props.autoValidate) {
        isValid();
      }
      if (props.mobileMode) {
        removeBodyOverflow();
        const dialogDOM = [...document.getElementsByClassName('app-dialog')];
        if (dialogDOM.length > 0) {
          dialogDOM.forEach((ele): void => {
            (ele as HTMLElement).classList.remove('scroll-freeze');
          });
        }
      }
      isOpen.value = false;
    }

    /**
     * Check if dropdown is still in focus or more precisely,
     * the activeElement of the document.
     */
    function isDropdownActive(): boolean {
      const { activeElement } = document;
      if (activeElement) {
        if (ELEMENT_REF.value) {
          const dropdown = ELEMENT_REF.value;
          return dropdown === activeElement || dropdown.contains(activeElement);
        }
      }
      return false;
    }

    /**
     * Select item and close the dropdown as only one selection is allowed.
     */
    function selectItem(index: number, event: MouseEvent | KeyboardEvent): void {
      if (filteredItems.value.length) {
        const selectedFilteredItem = filteredItems.value[index];
        const selectedValue = selectedFilteredItem[props.valueLabel];
        if (props.emitItem) {
          emit('change', selectedFilteredItem, event);
        }
        emit('update:modelValue', selectedValue, event);
        closeDropdown();
      }
    }

    /**
     * Decides what to do when a key is pressed after dropown is opened.
     * Escape: close dropdown
     * Tab: close dropdown if no longer active
     * Enter: select highlighted item
     */
    function handleKeyup(event: KeyboardEvent): void {
      const { key } = event;

      if (key === KeyName.Escape) {
        closeDropdown();
        return;
      }

      if (key === KeyName.Tab) {
        if (!isDropdownActive()) {
          closeDropdown();
        }
        return;
      }

      const totalItems = filteredItems.value.length;
      if (totalItems) {
        if (key === KeyName.Enter) {
          selectItem(highlightedIndex.value, event);
        }
      }
    }

    /**
     * Decides what to do when click is triggered after dropown is opened.
     * Outside click: close dropdown
     * Inside click: do nothing (handled by Vue event bindings)
     *
     * In mobile mode, clicking on the overlay will close the dropdown because
     * the overlay is outside dropdown element.
     */
    function handleMouseup(event: MouseEvent): void {
      const target = event.target as HTMLElement;
      if (ELEMENT_REF.value) {
        const element = ELEMENT_REF.value;
        if (!(element === target || element.contains(target))) {
          closeDropdown();
        }
      }
    }

    /**
     * Get index of item given its value from filtered list of items.
     */
    function getFilteredItemIndexByValue(value: string | number): number {
      return filteredItems.value.findIndex((item: IGenericOption) => item.value === value);
    }

    /**
     * Highlight item given its value.
     */
    function highlightItemByValue(value: any): void {
      const index = getFilteredItemIndexByValue(value);
      highlightIndex(index);
    }

    /**
     * Autofocus the search input field on dropdown panel open.
     */
    function autofocus(): void {
      if (SEARCH_REF.value) {
        const input = SEARCH_REF.value;
        if (input) {
          input.focus();
        }
      }
    }

    /**
     * Open dropdown panel.
     */
    function openDropdown(): void {
      isOpen.value = true;
      nextTick().then(() => {
        const selectedValue = props.modelValue;
        highlightItemByValue(selectedValue);
        if (props.searchable && props.autoFocus) {
          autofocus();
        }
        if (props.mobileMode) {
          addBodyOverflow();
          const dialogDOM = [...document.getElementsByClassName('app-dialog')];
          if (dialogDOM.length > 0) {
            dialogDOM.forEach((ele): void => {
              (ele as HTMLElement).classList.add('scroll-freeze');
            });
          }
        }
        bindEvents();
      });
    }

    /**
     * Toggle between open and close state of dropdown panel.
     */
    function toggleDropdown(): void {
      isOpen.value ? closeDropdown() : openDropdown();
    }

    /**
     * Callback when element receives focus.
     * This will be called when tab is pressed on the previous input field to change active element.
     */
    function onFocus(): void {
      openDropdown();
    }

    /**
     * Callback when element is clicked.
     * This will be called when mouse is used to open/close the dropdown.
     */
    function onClick(): void {
      toggleDropdown();
    }

    /**
     * Highlight item given its index.
     */
    function highlightItemByIndex(index: number): void {
      highlightIndex(index);
    }

    /**
     * Highlight item.
     */
    function highlightItem(index: number): void {
      highlightItemByIndex(index);
    }

    /**
     * Unhighlight item given its index.
     */
    function unhighlightIndex(): void {
      highlightedIndex.value = -1;
    }

    /**
     * Binds the necessary events after opening of dropdown panel.
     */
    bindEvents = (): void => {
      /**
       * Temporarily disable keydown events.
       */
      // eslint-disable-next-line @typescript-eslint/unbound-method
      // document.addEventListener('keydown', handleKeydown);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      document.addEventListener('keyup', handleKeyup);
      if (!props.mobileMode) {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        document.addEventListener('mouseup', handleMouseup);
      }
    };

    /**
     * Removes the events which were binded on opening of dropdown panel after it is closed.
     */
    unbindEvents = (): void => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      document.removeEventListener('keydown', handleKeydown);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      document.removeEventListener('keyup', handleKeyup);
      if (!props.mobileMode) {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        document.removeEventListener('mouseup', handleMouseup);
      }
    };

    /**
     * Highlight first item when search term changes.
     */
    watch(searchTerm, (): void => {
      highlightItemByIndex(0);
    });

    /**
     * Watch for changes in the selected value from parent component.
     */
    watch(
      (): string | number => props.modelValue,
      (newValue: string | number): void => {
        if (props.autoValidate) {
          isValid();
        }
        highlightItemByValue(newValue);
      }
    );

    onMounted(() => {
      if (props.modelValue && props.clearInvalidInput && !selected.value) {
        const emitValue = typeof props.modelValue === 'string' ? '' : null;
        emit('update:modelValue', emitValue);
      }
    });

    return {
      isOpen,
      selected,
      selectedItem,
      searchTerm,
      validation,
      ELEMENT_REF,
      SEARCH_REF,
      ITEMS_WRAPPER_REF,
      ITEM_REF,
      filteredItems,
      highlightItem,
      highlightedIndex,
      selectItem,
      clearSearch,
      isValid,
      onClick,
      onFocus,
      getItemIndexByValue,
      getFilteredItemIndexByValue,
      unhighlightIndex,
      closeDropdown,
      labelFloat,
      onChange,
    };
  },
});
</script>

<style lang="css" scoped>
@import './appsingleselect.css';
.fade-enter-active {
  animation: fade-in 0.25s ease-out;
}

.pop-enter-active {
  opacity: 0;
  animation: 0.25s ease 0.12s slide-up;
}

.scale-enter-active {
  opacity: 0;
  animation: 0.3s ease scale-up;
  transform-origin: top left;
}

.scale-leave-active {
  opacity: 0;
  animation: 0.3s ease scale-up reverse;
  transform-origin: top left;
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes scale-up {
  0% {
    opacity: 0;
    transform: scaleY(0);
  }

  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}
@keyframes fade-in {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
</style>
