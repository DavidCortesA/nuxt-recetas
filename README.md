# 🍽 Recetas App

Aplicación minimalista de recetas construida con **Nuxt 4** y **Nuxt UI v3**.  
Consume la API pública de [TheMealDB](https://www.themealdb.com/api.php).

---

## Stack

- **Nuxt 4** — framework con compatibilidad version 4
- **Nuxt UI v3** — componentes de UI
- **TheMealDB API** — fuente de recetas gratuita
- **TypeScript** — tipado completo
- **localStorage** — para guardar recetas favoritas

---

## Características

- 🔍 Búsqueda por nombre (con debounce)
- 🗂 Filtro por categoría (Beef, Chicken, Pasta, etc.)
- 📖 Detalle de receta con ingredientes y pasos
- ❤️ Guardar recetas favoritas (persiste en localStorage)
- 📱 Responsive

---

## Instalación

```bash
# 1. Instala dependencias
npm install

# 2. Inicia el servidor de desarrollo
npm run dev
```

Visita `http://localhost:3000`

---

## Estructura del proyecto

```
recetas-app/
├── app/
│   ├── app.vue              # Root component
│   ├── error.vue            # Pagina de error
│   ├── app.config.ts        # configuracion global
│   ├── assets/
│   │   └── css/
│   │   │   └── main.css     # Estilos globales
│   ├── layouts/
│   │   └── default.vue      # Layout con nav y footer
│   ├── pages/
│   │   ├── index.vue        # Home: búsqueda y categorías
│   │   ├── favoritas.vue    # Recetas guardadas
│   │   └── receta/[id].vue  # Detalle de receta
│   ├── components/
│   │   └── RecetaCard.vue   # Card de receta
│   └── composables/
│       ├── useRecetas.ts    # Lógica de API
│       └── useFavoritas.ts  # Gestión de favoritas
├── public
│   ├── og-image.png
│   └── favicon.png
├── nuxt.config.ts
└── package.json
```
