<template>
    <div class="relative h-screen">
        <form
            class="absolute py-10 px-8 flex flex-col justify-around inset-1/2 -translate-1/2 max-h-[600px] min-h-[500px] md:w-[500px] w-full rounded bg-red-500 shadow-2xl">
            <div class="flex flex-col gap-2">
                <label for="username">Username</label>
                <input required name="username" v-model="loginData.username" type="text" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="password">Password</label>
                <input required name="password" type="password" v-model="loginData.password" />
            </div>
            <div class="text-center">
                <span>Don't have an account? <NuxtLink to="/signup" id="link">Sign Up</NuxtLink></span>
            </div>
            <button id="mainButton" @click.prevent="login">Login</button>
        </form>
    </div>
</template>

<script setup>
import { useUsers } from '~/composables/stores/userStore';

definePageMeta({
    layout: false,
})

const config = useRuntimeConfig();

const loginData = ref({
    username: '',
    password: '',
});

const { storeUser } = useUsers();

const turnLoading = inject('loading')

const login = async () => {
    turnLoading(true);
    try {
        const { data, error } = await useFetch(`${config.app.apiURL}/users/verify`, {
            method: 'POST',
            body: {
                username: loginData.value.username,
                password: loginData.value.password
            }
        });

        turnLoading(false);

        if (error.value) {
            alert('Invalid credentials. Please Try Again');
            return;
        }

        if (data.value) {
            storeUser(data.value);
            alert('Login successful!');
            navigateTo('/');
        }
    } catch (error) {
        turnLoading(false);
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again');
    }

    loginData.value = {
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