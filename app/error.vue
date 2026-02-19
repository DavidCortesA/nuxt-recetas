<script setup lang="ts">
const error = useError()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <UApp>
    <NuxtLayout>
      <div class="error-container">
        <div class="content">
          <h1>{{ error?.statusCode }}</h1>
          <p class="mensaje">
            {{ error?.statusMessage || 'algo salió mal en la cocina...' }}
          </p>

          <UButton @click="handleError" icon="i-lucide-arrow-left">
            volver al inicio
          </UButton>
        </div>
      </div>
    </NuxtLayout>
  </UApp>
</template>

<style scoped>
.error-container {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
}

.content {
  text-align: center;
  max-width: 400px;
}

h1 {
  font-size: 4rem;
  margin: 0 0 1rem;
  font-family: var(--font-display);
}

.mensaje {
  color: var(--color-muted);
  margin-bottom: 2rem;
}
</style>
