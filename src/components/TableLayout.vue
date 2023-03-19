<script setup lang="ts"></script>

<template>
  <table class="w-full table-auto shadow-sm">
    <thead class="bg-ctp-crust text-left text-ctp-subtext1">
      <slot name="header" />
    </thead>
    <tbody>
      <slot name="body" />
    </tbody>
  </table>
</template>
