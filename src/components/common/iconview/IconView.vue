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
  >
    <path
      :fill="color"
      d="M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z"
    ></path>
  </svg>
  <!--eslint-enable-->
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
  },
  setup() {
    return {};
  },
});
</script>
<style scoped></style>
