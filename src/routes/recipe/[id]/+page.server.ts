import { SPOONACULAR_API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RecipeDetails } from '$lib/types/recipe';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${SPOONACULAR_API_KEY}`
    );
    
    if (!response.ok) throw new Error('Recipe not found');
    
    const recipe: RecipeDetails = await response.json();
    return { recipe };
  } catch (err) {
    if (err instanceof Error) {
      console.error('API Error:', err.message);
    }
    throw error(404, 'Recipe not found');
  }
};
