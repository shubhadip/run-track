<template>
  <div class="sidebar-container" :class="[$props.open ? 'active' : '']" v-click-outside="onClickOutside">
    <div class="project-name" @click="onClickOutside">Run Track</div>
    <div class="user-details" v-if="false">Workout Plans</div>
    <div class="main-menu">
      <ul>
        <li @click="routeToCreateworkout">Create Workout</li>
        <li @click="routeToPlans">Workout Plans</li>
        <!-- <li @click="routeToLogin">Login</li> -->
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { ROUTES } from '@/router/constants';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SideBar',
  props: {
    open: {
      type: Boolean,
      required: false,
    },
  },
  emits: ['close-side-bar'],
  setup(props, { emit }) {
    const router = useRouter();

    /**
     * close sidebar on click outside
     */
    const onClickOutside = (): void => {
      emit('close-side-bar');
    };

    /**
     * open login page
     */
    const routeToLogin = (): void => {
      router.push({
        name: ROUTES.LOGIN.name,
      });
      onClickOutside();
    };

    /**
     * open login page
     */
    const routeToPlans = (): void => {
      router.push({
        name: ROUTES.WORKOUTPLANS.name,
      });
      onClickOutside();
    };

    /**
     * open login page
     */
    const routeToCreateworkout = (): void => {
      router.push({
        name: ROUTES.CREATEWORKOUT.name,
      });
      onClickOutside();
    };

    return {
      onClickOutside,
      routeToLogin,
      routeToPlans,
      routeToCreateworkout,
    };
  },
});
</script>
<style lang="postcss" scoped>
@import './sidebar.css';
</style>
