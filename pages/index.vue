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

<script setup lang="ts">

definePageMeta({
  middleware: ["auth"]
})

const games = ref<Object[]>([]);

const config = useRuntimeConfig();
const {data} = await useFetch(`${config.app.apiURL}/games`);

games.value = data.value || []

</script>

<style scoped>

</style>