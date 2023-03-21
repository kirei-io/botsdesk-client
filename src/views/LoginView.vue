<script setup lang="ts">
import InputDefault from '@/components/InputDefault.vue'
import { useAuthStore } from '@/stores/auth';
import ButtonDefault from '@/components/ButtonDefault.vue';
import { useRouter } from 'vue-router';
import { ROUTE_PATH } from '@/router/routePath';
import { ROUTE_NAME } from '@/router/routeName';
import { DefaultApiInstance } from '@/api';
import { CustomerAPI } from '@/api/customer/CustomerAPI';

const store = useAuthStore();
const router = useRouter()

const handleSubmit = () => {

  // store.onLogin('example@m.com', 'qwerty123')
  // router.push(ROUTE_PATH[ROUTE_NAME.HOME])

  CustomerAPI.listBusinesses({}).then((res) => {
    console.log(res.data)
  })
}

</script>

<template>
  <main class="pt-48">
    <div class="mx-auto w-96 rounded-md bg-ctp-mantle p-4 shadow">
      <h2 class="px-2 pb-8 text-2xl font-semibold text-ctp-subtext0">Login</h2>
      <form @submit.prevent="handleSubmit">
        <InputDefault
          label="Email"
          type="email"
          input-name="email"
          placeholder="Enter your email"
          class="mb-4"
        />
        <InputDefault
          label="Password"
          type="password"
          input-name="password"
          placeholder="Enter your password"
        />
        <ButtonDefault class="mt-8">
          Login
        </ButtonDefault>

        <RouterLink
          to="/signup"
          class="mt-5 block px-3 text-ctp-rosewater underline"
        >
          Create an account
        </RouterLink>
      </form>
    </div>
  </main>
</template>
