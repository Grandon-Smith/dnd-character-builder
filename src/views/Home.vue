<script setup>
import { Button } from "@/components/ui/button";
import { PhDoorOpen, PhHouseLine } from "@phosphor-icons/vue";
</script>

<template>
  <div
    class="template-container flex flex-col items-center justify-center min-h-screen text-center gap-4"
  >
    <h1 class="text-4xl font-bold">This is the Home</h1>
    <Button size="lg" class="text-lg">
      <PhDoorOpen />
      <RouterLink to="/login">Login</RouterLink>
    </Button>
    <Button size="lg" class="text-lg">
      <PhHouseLine />
      <RouterLink to="/">Home</RouterLink>
    </Button>
  </div>
</template>
