<template>
<li class="cursor-pointer hover:bg-black/30 py-5 rounded-2xl transition md:w-3/4">
        <NuxtLink :to="`/games/${game.id}`" class="flex flex-col items-center gap-3">
            <div v-if="game.image" class="w-40">
                <img :src="imageURL" class="object-fit" loading="lazy"/>
            </div>
            <span v-else>NULL</span>
            <span class="text-center block">{{game?.title}}</span>
        </NuxtLink>
    </li>
</template>

<script setup>
const {game} = defineProps(['game'])

const imageURL = `https://images.igdb.com/igdb/image/upload/t_cover_big/${game?.image}.webp`
</script>

<style lang="scss" scoped>

</style>