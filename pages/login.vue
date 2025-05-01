<template>
    <div class="relative h-screen">
        <form class="absolute py-10 px-8 flex flex-col justify-around inset-1/2 -translate-1/2 h-[400px] md:w-[500px] w-full rounded bg-red-500 shadow-2xl">
            <div class="flex flex-col gap-2">
                <label for="username">Username</label>
                <input name="username" v-model="loginData.username" type="text"/>
            </div>
            <div class="flex flex-col gap-2">
                <label for="password">Password</label>
                <input name="password" v-model="loginData.password" type="text"/>
            </div>
            <div class="text-center">
                <span v-if="!createAccount">Don't have an account? <button @click="() => createAccount = true" id="link">Sign Up</button></span>
                <span v-else>Have an account? <button @click="() => createAccount = false" id="link">Login In</button></span>
            </div>
            <button id="mainButton" @click.prevent="addUser">{{createAccount ? 'Sign Up' : 'Login In'}}</button>
        </form>
    </div>
</template>

<script setup>
definePageMeta({
  layout: false,
})

const config = useRuntimeConfig();

const createAccount = ref(false);

const loginData = reactive({
    username: '',
    password: '',
    password_confirmation: '',
});

const addUser = async () => {

    loginData.password_confirmation = loginData.password;

    const response = await $fetch(`${config.app.apiURL}/users`, {
        method: 'POST',
        body: loginData,
    });

    console.log(response);
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