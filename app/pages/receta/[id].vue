<script setup lang="ts">
const route = useRoute()
const { obtenerReceta, extraerIngredientes } = useRecetas()
const { esFavorita, toggle, cargar: cargarFavoritas } = useFavoritas()

onMounted(() => cargarFavoritas())

const { data: receta } = await useAsyncData(`receta-${route.params.id}`, () =>
  obtenerReceta(route.params.id as string)
)

if (!receta.value) {
  throw createError({ statusCode: 404, statusMessage: 'Receta no encontrada' })
}

useSeoMeta({
  title: () => `${receta.value?.strMeal} · Recetas`,
  description: () =>
    receta.value?.strInstructions?.slice(0, 150) || 'Receta deliciosa paso a paso',

  ogTitle: () => receta.value?.strMeal,
  ogDescription: () =>
    receta.value?.strInstructions?.slice(0, 150),
  ogImage: () => receta.value?.strMealThumb,
  ogType: 'article',

  twitterCard: 'summary_large_image',
  twitterTitle: () => receta.value?.strMeal,
  twitterDescription: () =>
    receta.value?.strInstructions?.slice(0, 150),
  twitterImage: () => receta.value?.strMealThumb,
})

const ingredientes = computed(() =>
  receta.value ? extraerIngredientes(receta.value) : []
)

const pasos = computed(() =>
  receta.value
    ? receta.value.strInstructions
        .split(/\r?\n/)
        .map((p) => p.trim())
        .filter((p) => p.length > 10)
    : []
)

const esFav = computed(() => receta.value ? esFavorita(receta.value.idMeal) : false)

const toggleFav = () => {
  if (!receta.value) return
  toggle({
    idMeal: receta.value.idMeal,
    strMeal: receta.value.strMeal,
    strMealThumb: receta.value.strMealThumb,
  })
}
</script>

<template>
  <div v-if="receta">
    <!-- Back -->
    <NuxtLink to="/" class="volver">
      <UIcon name="i-heroicons-arrow-left" />
      volver
    </NuxtLink>

    <!-- Header -->
    <div class="cabecera">
      <div class="info">
        <div class="meta">
          <span class="tag">{{ receta.strCategory }}</span>
          <span class="tag">{{ receta.strArea }}</span>
        </div>
        <h1>{{ receta.strMeal }}</h1>

        <div class="acciones">
          <UButton
            :icon="esFav ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
            :variant="esFav ? 'solid' : 'ghost'"
            :color="esFav ? 'error' : 'neutral'"
            size="sm"
            @click="toggleFav"
          >
            {{ esFav ? 'en favoritas' : 'guardar' }}
          </UButton>

          <UButton
            v-if="receta.strYoutube"
            icon="i-heroicons-play-circle"
            variant="ghost"
            color="neutral"
            size="sm"
            :to="receta.strYoutube"
            target="_blank"
          >
            ver video
          </UButton>
        </div>
      </div>

      <div class="foto">
        <img :src="receta.strMealThumb" :alt="receta.strMeal" />
      </div>
    </div>

    <div class="cuerpo">
      <!-- Ingredientes -->
      <aside class="ingredientes">
        <h2>ingredientes</h2>
        <ul>
          <li v-for="ing in ingredientes" :key="ing.nombre">
            <span class="medida">{{ ing.medida }}</span>
            <span>{{ ing.nombre }}</span>
          </li>
        </ul>
      </aside>

      <!-- Pasos -->
      <section class="pasos">
        <h2>preparación</h2>
        <ol>
          <li v-for="(paso, i) in pasos" :key="i">
            <span class="num">{{ i + 1 }}</span>
            <p>{{ paso }}</p>
          </li>
        </ol>
      </section>
    </div>
  </div>
</template>

<style scoped>
.volver {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--color-muted);
  text-decoration: none;
  margin-bottom: 2rem;
  letter-spacing: 0.02em;
  transition: color 0.15s;
}

.volver:hover { color: var(--color-text); }

.cabecera {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
  margin-bottom: 3rem;
}

.meta {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tag {
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-muted);
  border: 1px solid var(--color-border);
  padding: 0.2rem 0.6rem;
}

.info h1 {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  margin: 0 0 1.25rem;
  line-height: 1.1;
}

.acciones {
  display: flex;
  gap: 0.5rem;
}

.foto img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  filter: saturate(0.9);
}

.cuerpo {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 3rem;
  align-items: start;
}

h2 {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin: 0 0 1.25rem;
  font-family: var(--font-body);
  font-weight: 500;
}

/* Ingredientes */
.ingredientes ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ingredientes li {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 0.875rem;
}

.medida {
  color: var(--color-muted);
  min-width: 70px;
  font-style: italic;
}

/* Pasos */
.pasos ol {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.pasos li {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
}

.num {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.5rem;
  color: var(--color-accent);
  line-height: 1;
  flex-shrink: 0;
  width: 2rem;
}

.pasos p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--color-text);
}

@media (max-width: 768px) {
  .cabecera {
    grid-template-columns: 1fr;
  }
  .foto { order: -1; }
  .cuerpo {
    grid-template-columns: 1fr;
  }
}
</style>
