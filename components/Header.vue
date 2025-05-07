<template>
  <header ref="header" class="flex text-center p-5 items-center justify-between bg-white text-gray-800">
    <div class="flex items-center gap-5">
      <img src="/mc_logo.png" class="size-10" alt=""/>
      <h1>Matthew's Video Game Catalog</h1>
    </div>
    <!-- <div v-if="currentUser">Current User: {{ currentUser.name }}</div> -->

    <MobileNav />

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

<style scoped lang="scss">
@import "~/assets/css/main.css";

.router-link-active {
  @apply bg-white/50;
}

a,
button {
  @apply rounded-2xl px-4 py-1 duration-200 ease-linear hover:backdrop-blur-md hover:shadow shadow-black;
}
</style>
