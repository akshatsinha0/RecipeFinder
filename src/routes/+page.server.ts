import { SPOONACULAR_API_KEY } from '$env/static/private';
import type { Actions } from './$types';
import type { Recipe } from '$lib/types/recipe';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const ingredients = formData.get('ingredients')?.toString() || '';
    
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
          ingredients
        )}&apiKey=${SPOONACULAR_API_KEY}`
      );
      
      if (!response.ok) throw new Error('API request failed');
      
      const recipes: Recipe[] = await response.json();
      return { recipes };
    } catch (_error) {
      return { error: 'Failed to fetch recipes. Please try again.' };
    }
  }
};
