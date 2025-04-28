<template>
  <ComboboxRoot>
    <ComboboxAnchor>
      <ComboboxInput :value="modelValue" @update:modelValue="$emit('update:modelValue', $event)"
        id="title" required
        placeholder="Enter Title"
        class="w-full"
      />
      <ComboboxCancel/>
    </ComboboxAnchor>
    <ComboboxPortal class="w-full">
      <ComboboxContent position='popper' class="bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
        <ComboboxItem
          v-for="game in results"
          :key="game.id"
          :value="game.name"
          class="p-2 hover:bg-gray-100 cursor-pointer"
        >
          {{ game.name }}
        </ComboboxItem>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>

<script setup lang="ts">
import {
  ComboboxRoot,
  ComboboxInput,
  ComboboxPortal,
  ComboboxContent,
  ComboboxItem,
  ComboboxCancel,
  ComboboxAnchor,
} from 'reka-ui';

const {modelValue} = defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

defineEmits(['update:modelValue']);

const results = ref([]);

watch(() => modelValue, async (newTitle) => {
  if (newTitle && newTitle.length) {
    try {
      // Use search instead of where for better text search
      const queryString = `fields name; search "${newTitle}"; limit 15;`

      let games = await $fetch('/api/igdb', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: queryString
      })
      results.value = games
    } catch (error) {
      console.error('Error fetching games:', error)
      results.value = []
    }
  } else {
    results.value = []
  }
})
</script>