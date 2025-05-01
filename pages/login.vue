<template>
    <div class="relative h-screen">
        <form
            class="absolute py-10 px-8 flex flex-col justify-around inset-1/2 -translate-1/2 max-h-[600px] min-h-[500px] md:w-[500px] w-full rounded bg-red-500 shadow-2xl">
            <div class="flex flex-col gap-2" v-if="createAccount">
                <label for="name">Name</label>
                <input required name="name" v-model="loginData.name" type="text" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="username">Username</label>
                <input required name="username" v-model="loginData.username" type="text" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="password">Password</label>
                <input required name="password" type="password" v-model="loginData.password" />
            </div>
            <div class="text-center">
                <span v-if="!createAccount">Don't have an account? <button @click="() => createAccount = true"
                        id="link">Sign Up</button></span>
                <span v-else>Have an account? <button @click="() => createAccount = false" id="link">Login
                        In</button></span>
            </div>
            <button id="mainButton" @click.prevent="authUser">{{ createAccount ? 'Sign Up' : 'Login In' }}</button>
        </form>
    </div>
</template>

<script setup>
import { useUsers } from '~/composables/stores/userStore';

definePageMeta({
    layout: false,
})

const config = useRuntimeConfig();

const createAccount = ref(false);

const loginData = ref(reactive({
    name: '',
    username: '',
    password: '',
}));

const {storeUser} = useUsers();

const authUser = async () => {

    if (createAccount.value) {
        const {data} = await $fetch(`${config.app.apiURL}/users`, {
            method: 'POST',
            body: loginData.value,
        });

        let user = data.value;

        storeUser(user);
    } else {
        try {
            const { data, error } = await useFetch(`${config.app.apiURL}/users/verify`, {
                query: {
                    username: loginData.value.username,
                    password: loginData.value.password
                }
            });

            if (error.value) {
                alert('Invalid credentials. Please Try Again');
                return;
            }

            let user = data.value;

            storeUser(user);
            alert('Success!');
            navigateTo('/');
        } catch (error) {
            console.error('Login error: ', error);
            alert('An error occurred during login. Please try again')
        }
    }

    loginData.value = reactive({
        name: '',
        username: '',
        password: '',
    });

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