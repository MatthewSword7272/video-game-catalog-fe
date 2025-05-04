<template>
  <div>
    <div v-if="games.length !== 0" >
      <GameViewOptions :games="games"/>
      <ul class="h-full grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 justify-items-center">
        <PreviewGame v-for="game in games" :key="game?.id" :game="game"/>
      </ul>
    </div>
    <div v-else class="text-center text-3xl">No Games</div>
  </div>
</template>

<script setup>
import { useUsers } from '~/composables/stores/userStore';


definePageMeta({
  middleware: ["auth"]
})

const {currentUser} = useUsers();

const games = ref([]);

const config = useRuntimeConfig();

if (currentUser) {
  const {data: userGames} = await useFetch(`${config.app.apiURL}/user/games`, {
    query: {
      user_id: currentUser.id
    }
  });
  games.value = userGames.value || [];
} else {
  const {data} = await useFetch(`${config.app.apiURL}/games`);
  games.value = data.value || [];
}

</script>

<style scoped>

</style>