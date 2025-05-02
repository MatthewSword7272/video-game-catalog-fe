<template>
  <header class="text-center py-5 space-y-3">
    <h1>Matthew's Video Game Catalog!</h1>
    <div v-if="user">Current User: {{ user.name }}</div>
    <nav class="flex gap-5 justify-center">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/game-form">Add Game</NuxtLink>
      <button v-if="user" @click="logout">Logout</button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useUsers } from '~/composables/stores/userStore';

const userStore = useUsers();
const { deleteUser, getUser} = userStore;

const user = ref(null);

// Call getUser on component mount to ensure user is loaded from localStorage
onMounted(() => {
  user.value = getUser();
});

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