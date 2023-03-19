<script setup lang="ts">
import LinkButtonDefault from '@/components/LinkButtonDefault.vue'
import InputDefault from '@/components/InputDefault.vue'
</script>

<template>
  <main class="pt-48">
    <div class="mx-auto w-96 rounded-md bg-ctp-mantle p-4 shadow">
      <h2 class="px-2 pb-8 text-2xl font-semibold text-ctp-subtext0">Signup</h2>
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
        <LinkButtonDefault name="login" class="mt-8"> Create </LinkButtonDefault>
        <RouterLink to="/login" class="mt-5 block px-4 text-ctp-rosewater underline">
          Already have an account?
        </RouterLink>
      </form>
    </div>
  </main>
</template>
