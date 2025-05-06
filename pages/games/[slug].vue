<template>
    <div class="space-y-10">
        <div class="flex justify-center max-md:items-center md:gap-10 gap-4 max-md:flex-col">
            <div v-if="game.image" class="w-1/2 flex justify-center">
                <img :src="imageURL" class="object-fit" loading="lazy"/>
            </div>
            <div class="text-white justify-between max-md:items-center w-1/2 space-y-3">
                <h3 class="text-2xl"><b>{{ game.title }}</b> </h3>
                <p>{{ game?.description }}</p>
                <div class="mt-2 flex flex-col">
                    <span><b>Genre:</b> {{ game.genre }}</span>
                    <span><b>Year of Release:</b> {{ game.release_year }}</span>
                    <span><b>Developer:</b> {{ game.developer }}</span>
                    <span><b>Publisher:</b> {{ game.publisher }}</span>
                    <span><b>Region Code:</b> {{ game.region_code }}</span>
                </div>
            </div>
        </div>
        <div class="flex max-md:flex-col items-center justify-center gap-5">
            <button
                @click="editGame"
                class="bg-white w-32 rounded-2xl p-2 text-center hover:bg-black hover:text-white cursor-pointer duration-300 ease-linear"
            >
                Edit Game
            </button>
            <button
                @click="deleteGame"
                class="bg-white w-32 rounded-2xl p-2 text-center hover:bg-black hover:text-white cursor-pointer duration-300 ease-linear"
            >
                Delete Game
            </button>
        </div>
    </div>
</template>

<script setup>

// definePageMeta({
//   middleware: ["auth"]
// })

const route = useRoute();
const config = useRuntimeConfig();

const {data : game} = await useFetch(`${config.app.apiURL}/games/${route.params.slug}`);

const imageURL = `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.value?.image}.webp`

const editGame = async () => {
    await navigateTo({ name: 'game-form',
        query: {
            edit: true,
            gameID : game.value.id
        }
    })
}

const deleteGame = async () => {
    try {
        await $fetch(`${config.app.apiURL}/games/${game.value.id}`, {
            method: 'DELETE'
        });
        alert('Game Deleted');
        await navigateTo('/');
    } catch (error) {
        console.error(error);
        alert(`Problem Deleting Game: ${error}` )
    }
}
</script>

<style lang="scss" scoped>

</style>