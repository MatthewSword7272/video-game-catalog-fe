<template>
  <header class="text-center py-5 space-y-3">
    <h1>Matthew's Video Game Catalog!</h1>
    <div v-if="currentUser">Current User: {{ currentUser.name }}</div>
    <nav class="flex gap-5 justify-center">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/game-form">Add Game</NuxtLink>
      <button v-if="currentUser" @click="logout">Logout</button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useUsers } from '~/composables/stores/userStore';

const { deleteUser, getUser, currentUser } = useUsers();

const logout = async () => {
  deleteUser();
  navigateTo('/login');
}

</script>

<style scoped>
@reference "~/assets/css/main.css";

.router-link-active {
  @apply bg-orange-700;
}

a, button {
  @apply bg-orange-400 rounded-2xl px-4 py-1 hover:bg-orange-700 duration-300 ease-linear hover:backdrop-blur-md hover:shadow shadow-black ;
}
</style>