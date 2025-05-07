<template>
  <div>
    <div v-if="games.length !== 0">
      <GameViewOptions :games="games" />
      <ul
        class="h-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-3 gap-y-10 justify-items-center game-grid z-0 relative"
      >
        <PreviewGame
          v-for="(game, index) in games"
          :key="game?.id"
          :game="game"
          :style="{ '--index': index }"
          class="fade-in-up"
        />
      </ul>
    </div>
    <div v-else class="text-center text-3xl">No Games</div>
  </div>
</template>

<script setup>
import { useUsers } from "~/composables/stores/userStore";

// definePageMeta({
//   middleware: ["auth"]
// })

// const {currentUser} = useUsers();

const games = ref([]);

const config = useRuntimeConfig();

const { data } = await useFetch(`${config.app.apiURL}/games`);
games.value = data.value || [];

// if (currentUser) {
//   const {data: userGames} = await useFetch(`${config.app.apiURL}/user/games`, {
//     query: {
//       user_id: currentUser.id
//     }
//   });
//   games.value = userGames.value || [];
// } else {
//   const {data} = await useFetch(`${config.app.apiURL}/games`);
//   games.value = data.value || [];
// }
</script>

<style scoped>
.fade-in-up {
  opacity: 0;
  transform: translateY(100px);
  animation: fadeInUp 0.5s ease-out forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
