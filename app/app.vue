<script setup lang="ts">
useSeoMeta({
  title: 'Recetas',
  ogTitle: 'Rectas',
  description: 'Encuentra recetas de todas las categorias, sin anuncios y un diseño minimalista',
  ogDescription: 'Encuentra recetas de todas las categorias, sin anuncios y un diseño minimalista',
  ogImage: './og-image.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
