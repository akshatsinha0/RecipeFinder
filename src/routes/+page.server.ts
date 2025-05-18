import { SPOONACULAR_API_KEY } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { Recipe } from '$lib/types/recipe';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const ingredients = formData.get('ingredients')?.toString() || '';
    
    // Validate input
    if (!ingredients.trim()) {
      return fail(400, { error: 'Please enter at least one ingredient' });
    }

    try {
      // Check if API key exists
      if (!SPOONACULAR_API_KEY) {
        console.error('Spoonacular API key is missing');
        return fail(500, { error: 'API key configuration error. Please check environment variables.' });
      }
      
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
          ingredients
        )}&number=10&apiKey=${SPOONACULAR_API_KEY}`
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', response.status, errorData);
        
        if (response.status === 401 || response.status === 403) {
          return fail(401, { error: 'Invalid API key or quota exceeded.' });
        }
        
        return fail(response.status, { error: 'Recipe API request failed' });
      }
      
      const recipes: Recipe[] = await response.json();
      
      if (!recipes.length) {
        return fail(404, { error: 'No recipes found with these ingredients. Try different ingredients.' });
      }
      
      return { recipes, success: true };
    } catch (err) {
      console.error('Recipe fetch error:', err);
      return fail(500, { error: 'Failed to fetch recipes. Please try again.' });
    }
  }
};
