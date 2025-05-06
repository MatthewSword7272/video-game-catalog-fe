<template>
    <div class="flex justify-start items-center mb-5">
        <div class="flex gap-3 items-center pl-10">
            <!-- <button @click="sortList" class="text-xl px-3 cursor-pointer text-white duration-200">
                Sort
            </button> -->
            <button @click="sortList" class="flex gap-3 items-center cursor-pointer">
                <span class="text-white text-xl">{{ listGoingDown ? 'Descending' : 'Ascending' }}</span>
                <v-icon name="fa-chevron-up" class="duration-300 text-white" :class="listGoingDown ? 'rotate-180' : 'rotate-0' "/>
            </button>
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