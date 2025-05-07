<template>
    <div>
        <nav class="">
            <div ref="mobileMenuRef" v-if="mobileMenu" class="fixed bg-white inset-0 h-screen flex flex-col text-4xl gap-12 justify-center items-center z-40">
                <NuxtLink to="/" @click="closeMenu">Home</NuxtLink>
                <NuxtLink to="/games" @click="closeMenu">Catalogue</NuxtLink>
                <NuxtLink to="/game-form" @click="closeMenu">Add Game</NuxtLink>
            </div>
            <div class="md:hidden block z-50 relative">
                <v-icon v-if="!mobileMenu"
                    name="hi-menu"
                    scale="1.5"
                    class="cursor-pointer"
                    @click="toggleMenu"
                />
                <v-icon v-else
                    name="io-close"
                    scale="2"
                    class="cursor-pointer"
                    @click="toggleMenu"
                />
            </div>
            <div class="hidden md:flex gap-5">
                <NuxtLink to="/">Home</NuxtLink>
                <NuxtLink to="/games">Catalogue</NuxtLink>
                <NuxtLink to="/game-form">Add Game</NuxtLink>
            </div>
            <!-- <button v-if="currentUser" @click="logout">Logout</button> -->
        </nav>
    </div>
</template>

<script setup>
import {gsap} from "gsap";

const mobileMenu = ref(false);
const mobileMenuRef = ref(null);

watch(mobileMenu, (newValue) => {
    if (newValue) {
        nextTick(() => {
            if (newValue) {
                gsap.fromTo(
                mobileMenuRef.value,
                {
                    opacity: 0,
                    y: -100,
                },
                {
                    duration: 0.5,
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                }
            );
            }
        });
    }
});

const toggleMenu = () => {
    if (mobileMenu.value) {
        closeMenu();
    } else {
        mobileMenu.value = true
    }
};

const closeMenu = () => {
    gsap.to(mobileMenuRef.value, {
        duration: 0.3,
        opacity: 0,
        y: -100,
        ease: "power2.in",
        onComplete: () => {
            mobileMenu.value = false;
        }
    });
};

</script>

<style lang="scss" scoped>
.router-link-active {
    text-decoration: underline;
}
</style>
