<template>
    <div class="relative h-screen">
        <form
            class="absolute py-10 px-8 flex flex-col justify-around inset-1/2 -translate-1/2 max-h-[600px] min-h-[500px] md:w-[500px] w-full rounded bg-red-500 shadow-2xl">
            <div class="flex flex-col gap-2">
                <label for="name">Name</label>
                <input required name="name" v-model="signupData.name" type="text" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="username">Username</label>
                <input required name="username" v-model="signupData.username" type="text" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="password">Password</label>
                <input required name="password" type="password" v-model="signupData.password" />
            </div>
            <div class="text-center">
                <span>Already have an account? <NuxtLink to="/login" id="link">Login</NuxtLink></span>
            </div>
            <button id="mainButton" @click.prevent="registerUser">Sign Up</button>
        </form>
    </div>
</template>

<script setup>
import { useUsers } from '~/composables/stores/userStore';

definePageMeta({
    layout: false,
})

const config = useRuntimeConfig();

const signupData = ref({
    name: '',
    username: '',
    password: '',
});

const { storeUser } = useUsers();

const registerUser = async () => {
    try {
        const { data } = await useFetch(`${config.app.apiURL}/users`, {
            method: 'POST',
            body: signupData.value,
        });

        if (data.value) {
            storeUser(data.value);
            alert('Account created successfully!');
            navigateTo('/');
        } else {
            alert('Account created but no user data returned');
            navigateTo('/login');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('Error creating account. Please try again.');
    }

    signupData.value = {
        name: '',
        username: '',
        password: '',
    };
}
</script>

<style scoped>
@reference "~/assets/css/main.css";

input {
    @apply bg-white rounded font-[revert] p-0.5;
}

#mainButton {
    @apply bg-orange-400 rounded-2xl px-4 py-1 hover:bg-orange-700 duration-300 ease-linear hover:backdrop-blur-md hover:shadow shadow-black cursor-pointer;
}

#link {
    @apply text-blue-600 underline cursor-pointer
}
</style>