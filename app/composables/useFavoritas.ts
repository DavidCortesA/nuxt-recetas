import type { MealSummary } from './useRecetas'

export const useFavoritas = () => {
  const favoritas = useState<MealSummary[]>('favoritas', () => [])

  const cargar = () => {
    if (import.meta.client) {
      const guardadas = localStorage.getItem('recetas-favoritas')
      if (guardadas) favoritas.value = JSON.parse(guardadas)
    }
  }

  const guardar = () => {
    if (import.meta.client) {
      localStorage.setItem('recetas-favoritas', JSON.stringify(favoritas.value))
    }
  }

  const agregar = (receta: MealSummary) => {
    if (!esFavorita(receta.idMeal)) {
      favoritas.value.push(receta)
      guardar()
    }
  }

  const quitar = (id: string) => {
    favoritas.value = favoritas.value.filter((r) => r.idMeal !== id)
    guardar()
  }

  const esFavorita = (id: string) => {
    return favoritas.value.some((r) => r.idMeal === id)
  }

  const toggle = (receta: MealSummary) => {
    if (esFavorita(receta.idMeal)) quitar(receta.idMeal)
    else agregar(receta)
  }

  return { favoritas, cargar, agregar, quitar, esFavorita, toggle }
}
