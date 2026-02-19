export interface Meal {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strTags: string | null
  strYoutube: string | null
  [key: string]: string | null
}

export interface MealSummary {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export const useRecetas = () => {
  const buscarPorCategoria = async (categoria: string): Promise<MealSummary[]> => {
    const data = await $fetch<{ meals: MealSummary[] }>(
      `${BASE_URL}/filter.php?c=${categoria}`
    )
    return data?.meals ?? []
  }

  const buscarPorNombre = async (nombre: string): Promise<MealSummary[]> => {
    const data = await $fetch<{ meals: MealSummary[] }>(
      `${BASE_URL}/search.php?s=${nombre}`
    )
    return data?.meals ?? []
  }

  const obtenerCategorias = async (): Promise<string[]> => {
    const data = await $fetch<{ meals: { strCategory: string }[] }>(
      `${BASE_URL}/list.php?c=list`
    )
    return data?.meals?.map((m) => m.strCategory) ?? []
  }

  const obtenerReceta = async (id: string): Promise<Meal | null> => {
    const data = await $fetch<{ meals: Meal[] }>(
      `${BASE_URL}/lookup.php?i=${id}`
    )
    return data?.meals?.[0] ?? null
  }

  const obtenerAleatoria = async (): Promise<Meal | null> => {
    const data = await $fetch<{ meals: Meal[] }>(`${BASE_URL}/random.php`)
    return data?.meals?.[0] ?? null
  }

  const extraerIngredientes = (meal: Meal) => {
    const ingredientes: { nombre: string; medida: string }[] = []
    for (let i = 1; i <= 20; i++) {
      const nombre = meal[`strIngredient${i}`]
      const medida = meal[`strMeasure${i}`]
      if (nombre && nombre.trim()) {
        ingredientes.push({ nombre: nombre.trim(), medida: medida?.trim() ?? '' })
      }
    }
    return ingredientes
  }

  return {
    buscarPorCategoria,
    buscarPorNombre,
    obtenerCategorias,
    obtenerReceta,
    obtenerAleatoria,
    extraerIngredientes,
  }
}
