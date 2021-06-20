<template>
  <div class="workout-login">
    <app-header />
    <button @click="login" class="login-btn">Login</button>
    <button @click="token" class="login-btn">Token</button>
    <app-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from '@/components/common/header/appheader.vue';
import AppFooter from '@/components/common/footer/appfooter.vue';
import { loginApi, tokenApi } from '@/services/api';
import { useRouter } from 'vue-router';
import { ROUTES } from '@/router/constants';

export default defineComponent({
  name: 'Login',
  components: {
    AppHeader,
    AppFooter,
  },
  setup() {
    const router = useRouter();
    /**
     * hit login apis
     */
    const login = async (): Promise<void> => {
      const data = await loginApi({
        email: 'test.test@gmail.com',
        password: '12345',
      });
      if (data) {
        router.push({
          name: ROUTES.LOGIN.name,
        });
      }
    };

    /**
     * hit token apis
     */
    const token = async (): Promise<void> => {
      const data = await tokenApi();
      console.log(data);
    };

    return {
      login,
      token,
    };
  },
});
</script>
<style lang="postcss" scoped>
@import '@css/app.css';
.login-btn {
  display: flex;
}
</style>
