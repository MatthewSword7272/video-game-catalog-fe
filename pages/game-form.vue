<template>
  <div>
    <!-- <div class="absolute size-full inset-0 bg-black/50">
      <div class="rounded-full size-5 bg-white top-1/2 left-1/2 translate-1/2"></div>
    </div> -->
    <!-- <NuxtLoadingIndicator></NuxtLoadingIndicator> -->
    <form class="flex-grow p-5 space-y-6" @submit.prevent="submitGame">
      <div class="flex flex-col">
        <label for="title">Title</label>
        <GameSearchCombobox v-model="formData.title"/>
      </div>
      <div class="flex flex-col md:w-1/2">
        <label for="genre">Genre</label>
        <select id="genre" v-model="formData.genre" required>
          <option selected disabled>Please Select</option>
          <option value="Action">Action</option>
          <option value="RPG">RPG</option>
          <option value="Platformers">Platformers</option>
          <option value="Shooters">Shooters</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label for="developer">Developer</label>
        <input type="text" id="developer" v-model="formData.developer" required />
      </div>
      <div class="flex flex-col">
        <label for="publisher">Publisher</label>
        <input type="text" id="publisher" v-model="formData.publisher" />
      </div>
      <div class="flex flex-col md:w-1/4">
        <label for="release_year">Release Year</label>
        <input type="number" id="release_year" min="1980" :max="currentYear" v-model="formData.release_year" />
      </div>
      <div class="flex flex-col md:w-1/2">
        <label for="platform">Platform</label>
        <select id="platform" v-model="formData.platform">
          <option selected disabled>Please Select</option>
          <option v-for="platform in data" :key="platform?.id" :value="platform?.name">
            {{ platform?.name }}
          </option>
        </select>
      </div>
      <div class="flex flex-col md:w-1/4">
        <label for="region_code">Region Code</label>
        <select id="region_code" v-model="formData.region_code">
          <option selected disabled>Please Select</option>
          <option value="Japan">Japan</option>
          <option value="North American">North American</option>
          <option value="PAL/Euro">PAL/Euro</option>
        </select>
      </div>
      <div class="flex items-center justify-center">
        <button class="bg-white w-32 rounded-2xl p-2 text-center hover:bg-black hover:text-white cursor-pointer duration-300 ease-linear" type="submit">
          {{ route.query.edit ? 'Edit Game' : 'Add Game' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useUsers } from '~/composables/stores/userStore';


definePageMeta({
  middleware: ["auth"]
})

const config = useRuntimeConfig();
const route = useRoute();

const currentYear = new Date().getFullYear();

const {data} = await useFetch(`${config.app.apiURL}/platforms`)

const formData = ref([]);
const submitting = ref(false);

const {currentUser} = useUsers();

if (route.query.edit) {
  const { data: gameData } = await useFetch(`${config.app.apiURL}/games/${route.query.gameID}`);

  formData.value = reactive({...gameData.value});
} else {
  formData.value = reactive({
    title: '',
    genre: 'Please Select',
    developer: '',
    publisher: '',
    release_year: currentYear,
    platform: 'Please Select',
    region_code: 'Please Select'
  });
}

const submitGame = async () => {

  if (route.query.edit) {
    try {
      submitting.value = true;
      await $fetch(`${config.app.apiURL}/games/${route.query.gameID}`, {
        method: 'PUT',
        body: formData.value,
        credentials: 'include'
      });
      // Reset form after successful submission
      Object.keys(formData.value).forEach(key => formData.value[key] = '');

      submitting.value = false;

      alert('Game edited successfully!');

      await navigateTo('/');

    } catch (error) {
      submitting.value = false;
      console.error('Error editing game:', error);
      alert('Failed to edit game. Please try again.');
    }
  } else {
    try {
      submitting.value = true;

      const formattedData = {
        ...formData.value,
        user_id: currentUser?.id
      };

      await $fetch(`${config.app.apiURL}/games`, {
        method: 'POST',
        body: formattedData,
        credentials: 'include'
      });
      // Reset form after successful submission
      Object.keys(formData.value).forEach(key => formData.value[key] = '');

      submitting.value = false;

      alert('Game added successfully!');
      await navigateTo('/');

    } catch (error) {
      submitting.value = false;
      console.error('Error adding game:', error);
      alert('Failed to add game. Please try again.');
    }
  }
}

</script>

<style>

@reference "~/assets/css/main.css";

input, select {
  @apply text-lg py-0.5 px-1.5 bg-white font-[revert] rounded-md
}

label {
  @apply mb-2.5 font-bold text-lg
}

</style>