<template>
  <teleport to="body">
    <template v-if="$props.showAnimation">
      <transition :name="animation" appear>
        <div :class="appDialogClass" @click="backdropClick">
          <div class="app-dialog__content" role="dialog" @click.stop>
            <section class="app-dialog__buttons" v-if="showButtons">
              <span v-if="$props.backButton" class="app-dialog__back" @click="back">
                <slot name="dialog-back">Back</slot>
              </span>
              <slot name="dialog-buttons"></slot>
              <span class="app-dialog__close" @click="close" v-if="$props.closeButton">
                <slot name="dialog-close">
                  <!-- <app-sprite-icon icon="close" /> -->
                </slot>
              </span>
            </section>
            <header v-if="$slots.header" class="app-dialog__header">
              <slot name="header"></slot>
            </header>
            <section v-if="$slots.default" class="app-dialog__body">
              <slot name="default"></slot>
            </section>
            <footer v-if="$slots.footer" class="app-dialog__footer">
              <slot name="footer"></slot>
            </footer>
          </div>
        </div>
      </transition>
    </template>
    <template v-else>
      <div :class="appDialogClass" @click="backdropClick">
        <div class="app-dialog__content" role="dialog" @click.stop>
          <section class="app-dialog__buttons" v-if="showButtons">
            <span v-if="$props.backButton" class="app-dialog__back" @click="back">
              <slot name="dialog-back"></slot>
            </span>
            <slot name="dialog-buttons"></slot>
            <span class="app-dialog__close" @click="close" v-if="$props.closeButton">
              <slot name="dialog-close">
                <app-sprite-icon icon="close" />
              </slot>
            </span>
          </section>
          <header v-if="$slots.header" class="app-dialog__header">
            <slot name="header"></slot>
          </header>
          <section v-if="$slots.default" class="app-dialog__body">
            <slot name="default"></slot>
          </section>
          <footer v-if="$slots.footer" class="app-dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </template>
  </teleport>
</template>

<script lang="ts">
import { AppDialogVariant } from '@/shared/enum';
import { addBodyOverflow, removeBodyOverflow } from '@/shared/utils';
import { defineComponent, onBeforeUnmount, onMounted, computed, watch, toRefs } from 'vue';
// import AppSpriteIconVue from '../appspriteicon/AppSpriteIcon.vue';
import { useRouterHash } from '../../../use/useRouterHash';

export default defineComponent({
  name: 'AppDialog',
  components: {
    // 'app-sprite-icon': AppSpriteIconVue,
  },
  props: {
    /**
     * Flag to show overlay backdrop.
     */
    backdrop: {
      type: Boolean,
      default: true,
    },

    /**
     * Flag to show close button.
     */
    closeButton: {
      type: Boolean,
      default: true,
    },

    /**
     * Flag to show back button.
     */
    backButton: {
      type: Boolean,
      default: true,
    },

    /**
     * Disable dialog close on backdrop click.
     */
    disableBackdropClick: {
      type: Boolean,
      default: false,
    },

    /**
     * Disable dialog close on escape key.
     */
    disableEscapeKey: {
      type: Boolean,
      default: false,
    },

    /**
     * Dialog variant.
     */
    variant: {
      type: String as () => AppDialogVariant,
      default: AppDialogVariant.CENTER,
    },

    /**
     * Custom class.
     */
    customClass: {
      type: String,
      default: '',
    },
    /**
     * Add animation classes.
     */
    showAnimation: {
      default: true,
      type: Boolean,
    },
    /**
     * current router object of product
     */
    router: {
      required: false,
    },
    /**
     * current route object of product
     */
    route: {
      required: false,
    },
    /**
     * hash string to be used in url
     */
    hashString: {
      required: false,
      default: '#openModal',
    },
  },

  setup(props, { emit, slots }) {
    const { router, route } = toRefs(props);
    const { routerBack, appendHashToRoute } = useRouterHash(router?.value, route?.value);

    /**
     * Handle close click.
     */
    function close(event: Event): void {
      // Update flag in parent component.
      emit('close', '', event);
      routerBack();
    }

    /**
     * Handle back click.
     */
    function back(event: Event): void {
      // Actual functionality of back not clear yet.
      emit('back', '', event);
      routerBack();
    }

    /**
     * Handle keyup.
     */
    const handleKeyup = (event: KeyboardEvent): void => {
      const { key } = event;
      if (key === 'Escape' && !props.disableEscapeKey) {
        close(event);
      }
    };

    /**
     * Handle backdrop click.
     */
    function backdropClick(event: Event): void {
      if (props.disableBackdropClick || !props.backdrop) {
        return;
      }
      close(event);
    }
    /**
     * animation: computed appear transition named based on variant
     */
    const animation = computed<string>((): string => {
      let anim = 'pop';
      if (props.variant === AppDialogVariant.DESKTOP_RIGHT) {
        anim = 'slide';
      } else if (props.variant === AppDialogVariant.FULLSCREEN) {
        anim = 'fade';
      }
      return anim;
    });

    /**
     * Bind events.
     */
    onMounted(() => {
      addBodyOverflow();
      appendHashToRoute(props.hashString);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      document.addEventListener('keyup', handleKeyup);
    });

    /**
     * Unbind events.
     */
    onBeforeUnmount(() => {
      removeBodyOverflow();
      document.removeEventListener('keyup', handleKeyup);
    });

    const showButtons = computed((): boolean => {
      return !!(props.backButton || props.closeButton || slots['dialog-buttons']);
    });

    const appDialogClass = computed((): string[] => {
      const arr = ['app-dialog', props.customClass];
      if (props.variant) arr.push(`app-dialog--${props.variant}`);
      if (props.backdrop) arr.push('app-dialog--backdrop');
      return arr;
    });

    watch(
      () => route && (route as any)?.value?.hash,
      () => {
        if (route && (route as any)?.value?.hash === '') {
          props.closeButton ? close(('' as unknown) as Event) : back(('' as unknown) as Event);
        }
      }
    );

    return {
      back,
      close,
      backdropClick,
      animation,
      showButtons,
      appDialogClass,
    };
  },

  emits: ['back', 'close'],
});
</script>

<style lang="css" scoped>
@import './appdialog.css';
</style>
