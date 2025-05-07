<template>
  <header
    ref="header"
    class="flex text-center p-5 items-center justify-between bg-white text-gray-800"
  >
    <h1>Matthew's Video Game Catalog</h1>
    <!-- <div v-if="currentUser">Current User: {{ currentUser.name }}</div> -->
    <nav class="flex gap-5 justify-center">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/games">Catalogue</NuxtLink>
      <NuxtLink to="/game-form">Add Game</NuxtLink>
      <!-- <button v-if="currentUser" @click="logout">Logout</button> -->
    </nav>
  </header>
</template>

<script setup lang="ts">
// import { useUsers } from '~/composables/stores/userStore';

// const { deleteUser, getUser, currentUser } = useUsers();

// const logout = async () => {
//   deleteUser();
//   navigateTo('/login');
// }
import { gsap } from "gsap";

const header = useTemplateRef("header");

gsap.registerPlugin();

onMounted(() => {
  gsap.fromTo(
    header.value,
    {
      y: -200,
    },
    {
      duration: 2,
      y: 0,
      ease: "power2.out",
    }
  );
});

</script>

<style scoped>
@reference "~/assets/css/main.css";

.router-link-active {
  @apply bg-white/50;
}

a,
button {
  @apply rounded-2xl px-4 py-1 duration-200 ease-linear hover:backdrop-blur-md hover:shadow shadow-black;
}
</style>
