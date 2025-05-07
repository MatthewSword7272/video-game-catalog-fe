<template>
    <div class="h-screen">
        <div ref="heroImage" class="absolute w-full h-full -z-[2] overflow-hidden">
            <img src="/hero_image.png" class="w-full h-full object-cover"/>
            <div class="absolute inset-0 bg-black/50 w-full h-full"></div>
        </div>
        <div class="flex items-center justify-center h-[90%]">
            <h1 ref="title" class="text-3xl text-white font-bold">Welcome to Matthew's Video Game Catalog</h1>
        </div>
    </div>
</template>

<script setup>

import { gsap } from 'gsap'

const title = useTemplateRef('title');
const heroImage = useTemplateRef('heroImage');

gsap.registerPlugin();

onMounted(() => {
    gsap.fromTo(title.value, {duration: 2,
        opacity: 0,
        scale: 2,
    }, {
        duration: 2,
        opacity: 1,
        scale: 1,
        delay: 1,
        ease: 'power2.out',
    });

    gsap.fromTo(heroImage.value, {
        scale: 1.5,
        opacity: 0,
    }, {
        duration: 2,
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
    });
});

definePageMeta({
    layout: false,
})

</script>

<style lang="scss" scoped>

</style>