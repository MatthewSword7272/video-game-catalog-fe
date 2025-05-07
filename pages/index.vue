<template>
  <div class="h-screen">
    <div ref="heroImage" class="absolute w-full h-full -z-[2] overflow-hidden">
      <img src="/hero_image.png" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/50 w-full h-full"></div>
    </div>
    <div class="flex flex-col items-left justify-center h-[90%] px-28 space-y-6 text-white">
      <h2 ref="title" class="text-4xl font-black">
        Welcome to Matthew's Video Game Catalog
      </h2>
      <p ref="para" class="font-black text-2xl">Track what you're playing, discover new games.</p>
      <ul class="list-disc">
        <li ref="list">A comprehensive digital collection of your owned video games</li>
        <li ref="list">Simple organization by platform, genre, and completion status</li>
        <li ref="list">Quick reference for game information</li>
        <li ref="list">Visual representation of your gaming library with cover art</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { gsap } from "gsap";

const title = useTemplateRef("title");
const heroImage = useTemplateRef("heroImage");
const para = useTemplateRef("para");

onMounted(() => {
    const listItems = document.querySelectorAll("li");

  gsap.fromTo(
    title.value,
    { duration: 2, opacity: 0, scale: 1 },
    {
      duration: 2,
      opacity: 1,
      scale: 1,
      delay: 1,
      ease: "power2.out",
    }
  );

  gsap.fromTo(
    heroImage.value,
    {
      scale: 1.5,
      opacity: 0,
    },
    {
      duration: 2,
      opacity: 1,
      scale: 1,
      ease: "power2.out",
    }
  );

  gsap.fromTo(
    para.value,
    {
      x: -500,
      opacity: 0,
    },
    {
      duration: 2,
      opacity: 1,
      x: 0,
      delay: 1,
      ease: "power2.out",
    }
  );

  gsap.fromTo(
    listItems,
    {
      x: -1000,
    },
    {
      duration: 1,
      x: 0,
      stagger: 0.2,
      delay: 1.5,
      ease: "power2.out",
    }
  );
});

definePageMeta({
  layout: "welcome",
});
</script>

<style lang="scss" scoped></style>
