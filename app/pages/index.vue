<script setup lang="ts">
import type { MealSummary } from "~/composables/useRecetas";

useSeoMeta({
  title: 'Recetas · Inicio',
  description: 'Explora miles de recetas por nombre o categoría. Plataforma rápida, sin anuncios y con diseño minimalista.',

  ogTitle: 'Recetas · Inicio',
  ogDescription: 'Explora miles de recetas por nombre o categoría.',
  ogImage: '/og-image.png',
  ogType: 'website',

  twitterCard: 'summary_large_image',
  twitterTitle: 'Recetas · Inicio',
  twitterDescription: 'Explora miles de recetas por nombre o categoría.',
  twitterImage: '/og-image.png',
})

const { buscarPorNombre, obtenerCategorias, buscarPorCategoria } = useRecetas();

const busqueda = ref("");
const categoriaActiva = ref("");
const recetas = ref<MealSummary[]>([]);
const cargando = ref(false);

const categorias = await obtenerCategorias();

const cargar = async () => {
  cargando.value = true;
  if (busqueda.value.trim()) {
    recetas.value = await buscarPorNombre(busqueda.value.trim());
  } else if (categoriaActiva.value) {
    recetas.value = await buscarPorCategoria(categoriaActiva.value);
  } else {
    recetas.value = await buscarPorNombre("a");
  }
  cargando.value = false;
};

await cargar();

const onCategoria = async (cat: string) => {
  categoriaActiva.value = categoriaActiva.value === cat ? "" : cat;
  busqueda.value = "";
  await cargar();
};

const cleanCategorias = async () => {
  categoriaActiva.value = "";
  busqueda.value = "";
  await cargar();
};

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

watch(busqueda, () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    categoriaActiva.value = "";
    await cargar();
  }, 400);
});
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <h1>encuentra tu próxima <em>receta</em></h1>
      <p class="subtitulo">miles de platos del mundo entero</p>
    </section>

    <!-- Search -->
    <div class="buscador">
      <UInput
        v-model="busqueda"
        color="neutral"
        placeholder="buscar receta..."
        size="lg"
        variant="outline"
        class="rounded-none w-full"
        :ui="{
          base: 'rounded-none',
        }"
        icon="i-lucide-search"
      />
    </div>

    <!-- Categorías -->
    <div class="categorias">
      <button
        class="cat-btn"
        :class="{ active: categoriaActiva === '' }"
        @click="cleanCategorias"
      >
        Todas
      </button>
      <button
        v-for="cat in categorias"
        :key="cat"
        class="cat-btn"
        :class="{ active: categoriaActiva === cat }"
        @click="onCategoria(cat)"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Grid -->
    <div v-if="cargando" class="estado">
      <UIcon name="i-heroicons-arrow-path" class="spin" />
    </div>

    <div v-else-if="recetas.length === 0" class="estado">
      <p>sin resultados para "{{ busqueda }}"</p>
    </div>

    <div v-else class="grid">
      <RecetaCard v-for="r in recetas" :key="r.idMeal" :receta="r" />
    </div>
  </div>
</template>

<style scoped>
.hero {
  margin-bottom: 2.5rem;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.1;
  margin: 0 0 0.5rem;
}

.hero h1 em {
  color: var(--color-accent);
}

.subtitulo {
  color: var(--color-muted);
  font-size: 0.95rem;
  margin: 0;
  letter-spacing: 0.03em;
}

.buscador {
  margin-bottom: 1.5rem;
}

.categorias {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.cat-btn {
  padding: 0.3rem 0.85rem;
  font-size: 0.8rem;
  font-family: var(--font-body);
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: all 0.15s;
  border-radius: 0;
}

.cat-btn:hover {
  color: var(--color-text);
  border-color: var(--color-text);
}

.cat-btn.active {
  background: var(--color-text);
  color: var(--color-bg);
  border-color: var(--color-text);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem 1.25rem;
}

.estado {
  text-align: center;
  padding: 4rem 0;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.spin {
  animation: spin 1s linear infinite;
  font-size: 1.5rem;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
