<script setup lang="ts">
useSeoMeta({
  title: 'Recetas · Favoritas',
  description: 'Tus recetas guardadas para cocinar cuando quieras.',

  ogTitle: 'Recetas favoritas',
  ogDescription: 'Accede rápidamente a tus recetas favoritas.',
  ogImage: '/og-image.png',

  twitterCard: 'summary_large_image',
  twitterTitle: 'Recetas favoritas',
  twitterDescription: 'Accede rápidamente a tus recetas favoritas.',
  twitterImage: '/og-image.png',
})

const { favoritas, cargar } = useFavoritas()
onMounted(() => cargar())
</script>

<template>
  <div>
    <h1 class="titulo">favoritas</h1>

    <div v-if="favoritas.length === 0" class="vacio">
      <p>aún no tienes recetas guardadas</p>
      <NuxtLink to="/" class="link">explorar recetas →</NuxtLink>
    </div>

    <div v-else class="grid">
      <RecetaCard v-for="r in favoritas" :key="r.idMeal" :receta="r" />
    </div>
  </div>
</template>

<style scoped>
.titulo {
  font-size: clamp(1.8rem, 4vw, 3rem);
  margin: 0 0 2.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem 1.25rem;
}

.vacio {
  padding: 4rem 0;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.vacio p { margin: 0 0 0.75rem; }

.link {
  color: var(--color-text);
  font-size: 0.85rem;
  letter-spacing: 0.03em;
}
</style>
