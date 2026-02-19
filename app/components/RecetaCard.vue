<script setup lang="ts">
import type { MealSummary } from '~/composables/useRecetas'

defineProps<{ receta: MealSummary }>()
</script>

<template>
  <NuxtLink :to="`/receta/${receta.idMeal}`" class="card">
    <div class="thumb">
      <img :src="receta.strMealThumb" :alt="receta.strMeal" loading="lazy" />
    </div>
    <p class="nombre">{{ receta.strMeal }}</p>
  </NuxtLink>
</template>

<style scoped>
.card {
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.thumb {
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: var(--color-border);
  margin-bottom: 0.75rem;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease, filter 0.4s ease;
  filter: saturate(0.9);
}

.card:hover .thumb img {
  transform: scale(1.04);
  filter: saturate(1.1);
}

.nombre {
  font-size: 0.9rem;
  line-height: 1.4;
  font-weight: 400;
  margin: 0;
  color: var(--color-text);
}
</style>
