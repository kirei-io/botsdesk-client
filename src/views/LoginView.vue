<script setup lang="ts">
import LinkButtonDefault from '@/components/LinkButtonDefault.vue'
import InputDefault from '@/components/InputDefault.vue'
</script>

<template>
  <main class="pt-48">
    <div class="mx-auto w-96 rounded-md bg-ctp-mantle p-4 shadow">
      <h2 class="px-2 pb-8 text-2xl font-semibold text-ctp-subtext0">Login</h2>
      <form>
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
        <LinkButtonDefault name="home" class="mt-8"> Login </LinkButtonDefault>

        <RouterLink to="/signup" class="mt-5 block px-3 text-ctp-rosewater underline">
          Create an account
        </RouterLink>
      </form>
    </div>
  </main>
</template>
