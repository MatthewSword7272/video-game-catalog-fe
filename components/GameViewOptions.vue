<template>
    <div class="flex justify-center items-center mb-5">
        <div class="flex gap-3">
            <button @click="sortList" class="text-xl bg-gradient-to-b from-gray-200 to-gray-500 px-3 cursor-pointer hover:ring-2 duration-200">
                Sort
            </button>
            <div v-if="listSorted">
                <v-icon name="fa-chevron-up" class="duration-300" :class="listGoingDown ? 'rotate-180' : 'rotate-0' "/>
            </div>
        </div>
    </div>
</template>

<script setup>

const listSorted = ref(false);
const listGoingDown = ref(false);
const {games} = defineProps(['games']);

const sortList = () => {

    listSorted.value = true;

    if (listGoingDown.value) {
        games.sort((a, b) => b.title.localeCompare(a.title))
        listGoingDown.value = false
    } else {
        games.sort((a, b) => a.title.localeCompare(b.title))
        listGoingDown.value = true
    }
}

</script>

<style lang="scss" scoped>

</style>