<template>
    <li ref="gameRef" class="cursor-pointer transition bg-gray-600 hover:bg-gray-400 rounded-lg w-3/4">
        <NuxtLink :to="`/games/${game.id}`" class="flex flex-col gap-3">
            <div v-if="game.image" class="w-full">
                <img :src="imageURL" class="object-fit rounded-t-lg w-full" loading="lazy" />
            </div>
            <span v-else>NULL</span>
            <div className="pb-3 px-3">
                <div class="text-xl font-bold text-white truncate">{{ game?.title }}</div>
                <div class="text-sm font-thin text-gray-300">{{ game?.genre }}</div>
                <div class="text-sm font-thin text-gray-300 truncate">{{ game?.platform }}</div>
            </div>
        </NuxtLink>
    </li>
</template>

<script setup>

const { game } = defineProps(['game'])

const imageURL = `https://images.igdb.com/igdb/image/upload/t_cover_big/${game?.image}.webp`

const gameRef = useTemplateRef('gameRef')

</script>

<style lang="scss" scoped></style>