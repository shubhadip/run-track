<template>
  <header class="header-wrapper">
    <div class="menu-icon" :class="{ active: isHamburgerOpen }" @click="toggle">
      <hr />
    </div>
    <a href="/" class="project-name">Run Track</a>
  </header>
  <side-bar :open="isHamburgerOpen" @close-side-bar="isHamburgerOpen = false" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SideBar from '@/components/sidebar/sidebar.vue';

export default defineComponent({
  name: 'appheader',
  components: {
    SideBar,
  },
  setup() {
    const isHamburgerOpen = ref<boolean>(false);
    /**
     * close function to handle hamburger menu
     */
    const toggle = (): void => {
      isHamburgerOpen.value = !isHamburgerOpen.value;
    };

    return {
      isHamburgerOpen,
      toggle,
    };
  },
});
</script>

<style scoped lang="postcss">
@import '@css/app.css';
.header-wrapper {
  font-size: 18px;
  font-weight: 500;
  padding: 16px;
  background-color: $black-1;
  color: $white;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $black-2;
  a {
    text-decoration: none;
    background-image: none;
  }
}
.project-name {
  margin-left: 15px;
  display: block;
}
</style>
