<template>
  <div class="layout">
    <header class="header">
      <NuxtLink to="/" class="logo text-primary"> recetas </NuxtLink>
      <nav class="nav flex flex-row items-center">
        <NuxtLink to="/" class="nav-link">inicio</NuxtLink>
        <NuxtLink to="/favoritas" class="nav-link">favoritas</NuxtLink>
        <UColorModeButton />
      </nav>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <p>
        hecho con cariño por
        <NuxtLink to="https://github.com/DavidCortesA" class="underline italic"
          >david cortes</NuxtLink
        >
        · {{ new Date().getFullYear() }}
      </p>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0 1.5rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 3rem;
}

.logo {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.5rem;
  color: var(--color-text);
  text-decoration: none;
  letter-spacing: -0.03em;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  font-size: 0.875rem;
  color: var(--color-muted);
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.15s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-text);
}

.main {
  flex: 1;
}

.footer {
  padding: 2rem 0;
  margin-top: 4rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
  font-size: 0.8rem;
  color: var(--color-muted);
  letter-spacing: 0.05em;
}
</style>
