<template>
  <button :class="[classNames, { loading: $props.isLoading }]" :disabled="$props.disabled">
    <template v-if="$props.isLoading"><app-spinner /></template>
    <template v-else>
      <slot name="icon"></slot>
      <slot>{{ $props.title }}</slot>
    </template>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { AppButtonSizes, AppButtonVariants, AppButtonColors } from '@/shared/interface';
import AppSpinner from '../appspinner/AppSpinner.vue';

export default defineComponent({
  name: 'AppButton',
  components: {
    'app-spinner': AppSpinner,
  },
  props: {
    /**
     * Name of the button
     */
    title: String,
    /**
     * The state of the button
     * @values true, false
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * The size of the button
     * @values small, large
     */
    size: {
      type: String as () => AppButtonSizes,
      default: AppButtonSizes.MEDIUM,
    },
    /**
     * This will show the loading text in the button
     */
    isLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * The css to apply to button
     * @values css class names
     */
    customCssClasses: {
      type: Array as () => string[],
      default: (): string[] => [],
    },
    /**
     * The Variant types of the button
     * @values outline, link
     */
    variant: {
      type: String as () => AppButtonVariants,
      default: '',
    },
    /**
     * This will make the button block and full width
     */
    block: {
      type: Boolean,
      default: false,
    },
    /**
     * The Color types of a button
     * @values blue(optional, default), grey, grey-blue, green
     */
    color: {
      type: String as () => AppButtonColors,
      default: AppButtonColors.BLUE,
    },
  },
  setup(props) {
    const classNames = computed<string[]>((): string[] => {
      const sizeClass = `btn--${props.size}`;
      const btnBlock = props.block ? 'btn--block' : '';

      let variantClass: string;
      switch (props.variant) {
        case AppButtonVariants.LINK:
          variantClass = 'btn--link';
          break;
        case AppButtonVariants.OUTLINE:
          variantClass = `btn--outline-${props.color}`;
          break;
        default:
          variantClass = `btn--${props.color}`;
      }

      return ['btn', variantClass, sizeClass, btnBlock, ...props.customCssClasses];
    });

    return { classNames };
  },
});
</script>

<style lang="css" scoped>
@import './appbutton.css';
</style>
