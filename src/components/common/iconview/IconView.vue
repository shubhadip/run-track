<template>
  <!-- eslint-disable -->
  <svg
    v-if="icon === 'icon-calendar'"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    :height="$props.height"
    :width="$props.width"
    role="img"
    aria-hidden="true"
    data-icon="calendarAlt"
    :class="iconClass"
  >
    <path
      :fill="color"
      d="M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z"
    ></path>
  </svg>
  <svg
    v-else-if="icon === 'icon-home'"
    xmlns="http://www.w3.org/2000/svg"
    :height="$props.height"
    :width="$props.width"
    viewBox="0 0 32 32"
    role="img"
    aria-hidden="true"
    data-icon="homeAlt"
    :class="iconClass"
  >
    <path
      :fill="color"
      d="M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z"
    ></path>
  </svg>
  <svg
    v-else-if="icon === 'icon-history'"
    xmlns="http://www.w3.org/2000/svg"
    :height="$props.height"
    :width="$props.width"
    viewBox="0 0 32 32"
    role="img"
    aria-hidden="true"
    data-icon="historyAlt"
    :class="iconClass"
  >
    <path
      :fill="color"
      d="M20 2c7.732 0 14 6.268 14 14s-6.268 14-14 14v-3c2.938 0 5.701-1.144 7.778-3.222s3.222-4.84 3.222-7.778c0-2.938-1.144-5.701-3.222-7.778s-4.84-3.222-7.778-3.222c-2.938 0-5.701 1.144-7.778 3.222-1.598 1.598-2.643 3.601-3.041 5.778h5.819l-7 8-7-8h5.143c0.971-6.784 6.804-12 13.857-12zM26 14v4h-8v-10h4v6z"
    ></path>
  </svg>
  <svg
    v-else-if="icon === 'icon-flickr'"
    xmlns="http://www.w3.org/2000/svg"
    :height="$props.height"
    :width="$props.width"
    viewBox="0 0 32 32"
    role="img"
    aria-hidden="true"
    data-icon="flickAlt"
    :class="iconClass"
  >
    <path
      :fill="color"
      d="M25 13c-2.206 0-4 1.794-4 4s1.794 4 4 4c2.206 0 4-1.794 4-4s-1.794-4-4-4zM25 10v0c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7c0-3.866 3.134-7 7-7zM0 17c0-3.866 3.134-7 7-7s7 3.134 7 7c0 3.866-3.134 7-7 7s-7-3.134-7-7z"
    ></path>
  </svg>
  <svg
    v-else-if="icon === 'icon-cog'"
    xmlns="http://www.w3.org/2000/svg"
    :height="$props.height"
    :width="$props.width"
    viewBox="0 0 32 32"
    role="img"
    aria-hidden="true"
    data-icon="cogAlt"
    :class="iconClass"
  >
    <path
      :fill="color"
      d="M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z"
    ></path>
  </svg>
  <svg
    v-else-if="icon === 'contact'"
    :class="[iconClass, 'app-sprite-icon--no-fill']"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="1" width="14.8235" height="18" rx="1.04575" stroke="currentColor" stroke-width="2" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.6994 4.17505H18.8171C19.4018 4.17505 19.8759 4.6491 19.8759 5.23387C19.8759 5.81864 19.4018 6.2927 18.8171 6.2927H16.6994V4.17505ZM8.2552 6.29218C7.37968 6.29218 6.66696 7.00489 6.66696 7.88041C6.66696 8.75593 7.37968 9.46865 8.2552 9.46865C9.13072 9.46865 9.84343 8.75593 9.84343 7.88041C9.84343 7.00489 9.13072 6.29218 8.2552 6.29218ZM4.54932 13.477C4.54932 13.6019 4.68724 13.7039 4.85772 13.7039H11.6527C11.823 13.7039 11.9571 13.4328 11.9479 13.4112C11.9123 11.6562 10.4704 10.5275 8.24898 10.5275C6.00136 10.5275 4.54932 11.6858 4.54932 13.477ZM19.8759 7.35178H16.6994V9.46943H19.8759C20.4607 9.46943 20.9347 8.99537 20.9347 8.4106C20.9347 7.82583 20.4607 7.35178 19.8759 7.35178ZM16.6994 10.5277H17.7582C18.343 10.5277 18.8171 11.0018 18.8171 11.5866C18.8171 12.1713 18.343 12.6454 17.7582 12.6454H16.6994V10.5277ZM18.8171 13.7042H16.6994V15.8218H18.8171C19.4018 15.8218 19.8759 15.3478 19.8759 14.763C19.8759 14.1783 19.4018 13.7042 18.8171 13.7042Z"
      fill="currentColor"
    />
  </svg>
  <svg
    v-else-if="icon === 'arrow-left'"
    :class="iconClass"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      d="M12.707 18.293l-5.293-5.293h11.586c0.552 0 1-0.448 1-1s-0.448-1-1-1h-11.586l5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-7 7c-0.096 0.096-0.168 0.206-0.217 0.324-0.051 0.122-0.076 0.253-0.076 0.383 0 0.256 0.098 0.512 0.293 0.707l7 7c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"
    ></path>
  </svg>
  <svg
    v-else-if="icon === 'chevron-down'"
    :class="iconClass"
    version="1.1"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.50213 10.8L12.2918 7.16346C12.5694 6.89709 12.5694 6.46616 12.2918 6.19978C12.0142 5.93341 11.5651 5.93341 11.2875 6.19978L8 9.35356L4.71246 6.19978C4.43486 5.93341 3.98579 5.93341 3.7082 6.19978C3.4306 6.46616 3.4306 6.89709 3.7082 7.16346L7.49787 10.8C7.63619 10.9336 7.8181 11 8 11C8.1819 11 8.36381 10.9336 8.50213 10.8Z"
    />
  </svg>
  <svg
    v-else-if="icon === 'tick'"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    :class="iconClass"
    version="1.1"
    :fill="color"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 28.28125 6.28125 L 11 23.5625 L 3.71875 16.28125 L 2.28125 17.71875 L 10.28125 25.71875 L 11 26.40625 L 11.71875 25.71875 L 29.71875 7.71875 Z"
    />
  </svg>
  <svg
    v-else-if="icon === 'cross'"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    :class="iconClass"
    version="1.1"
    :fill="color"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
    />
  </svg>
  <svg
    v-else-if="icon === 'chevron-right'"
    :class="iconClass"
    version="1.1"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.80005 4.49775L1.16352 0.708077C0.897147 0.430477 0.466219 0.430477 0.199843 0.708077C-0.0665329 0.985667 -0.0665329 1.43474 0.199843 1.71234L3.35362 4.99988L0.199843 8.28742C-0.0665329 8.56502 -0.0665329 9.01409 0.199843 9.29168C0.466219 9.56928 0.897147 9.56928 1.16352 9.29168L4.80005 5.50201C4.93369 5.36369 5.00006 5.18178 5.00006 4.99988C5.00006 4.81798 4.93369 4.63607 4.80005 4.49775Z"
    />
  </svg>
  <!--eslint-enable-->
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'IconView',
  props: {
    icon: {
      type: String,
      required: true,
    },
    height: {
      type: [String, Number],
      default: '16',
    },
    width: {
      type: [String, Number],
      default: '16',
    },
    color: {
      type: String,
      default: 'white',
    },
    /**
     * css class name
     */
    className: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const iconClass = computed(() => {
      return `app-sprite-icon ${props.className}`;
    });
    return {
      iconClass,
    };
  },
});
</script>
<style scoped></style>
