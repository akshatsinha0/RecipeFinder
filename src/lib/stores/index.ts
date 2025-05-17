import { writable } from 'svelte/store';
import type { Recipe, RecipeDetails } from '$lib/types/recipe';

// Recent searches store
export const recentSearches = writable<string[]>([]);

// Recently viewed recipes
export const recentlyViewed = writable<Recipe[]>([]);

// Favorite recipes
export const favoriteRecipes = writable<Recipe[]>([]);

// User preferences
export const preferences = writable({
  dietRestrictions: [] as string[],
  cuisine: [] as string[],
  maxCookTime: 60,
});

// Search loading state
export const searchLoading = writable(false);

// Add a recipe to recently viewed
export function addToRecentlyViewed(recipe: Recipe) {
  recentlyViewed.update(items => {
    // Remove if already exists
    const filtered = items.filter(item => item.id !== recipe.id);
    // Add to front, limit to 5
    return [recipe, ...filtered].slice(0, 5);
  });
}

// Toggle a recipe as favorite
export function toggleFavorite(recipe: Recipe): boolean {
  let isFavorite = false;
  
  favoriteRecipes.update(items => {
    const index = items.findIndex(item => item.id === recipe.id);
    
    if (index >= 0) {
      // Remove if already in favorites
      return items.filter(item => item.id !== recipe.id);
    } else {
      // Add to favorites
      isFavorite = true;
      return [...items, recipe];
    }
  });
  
  return isFavorite;
}

// Check if a recipe is favorited
export function isFavorite(recipeId: number): boolean {
  let result = false;
  favoriteRecipes.subscribe(items => {
    result = items.some(item => item.id === recipeId);
  })();
  
  return result;
}

// Save all stores to localStorage
export function saveToLocalStorage() {
  try {
    // Subscribe to each store and save changes
    recentSearches.subscribe(value => {
      localStorage.setItem('durzzee-recent-searches', JSON.stringify(value));
    });
    
    recentlyViewed.subscribe(value => {
      localStorage.setItem('durzzee-recently-viewed', JSON.stringify(value));
    });
    
    favoriteRecipes.subscribe(value => {
      localStorage.setItem('durzzee-favorites', JSON.stringify(value));
    });
    
    preferences.subscribe(value => {
      localStorage.setItem('durzzee-preferences', JSON.stringify(value));
    });
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

// Load all stores from localStorage
export function loadFromLocalStorage() {
  try {
    const searches = localStorage.getItem('durzzee-recent-searches');
    if (searches) recentSearches.set(JSON.parse(searches));
    
    const viewed = localStorage.getItem('durzzee-recently-viewed');
    if (viewed) recentlyViewed.set(JSON.parse(viewed));
    
    const favorites = localStorage.getItem('durzzee-favorites');
    if (favorites) favoriteRecipes.set(JSON.parse(favorites));
    
    const userPrefs = localStorage.getItem('durzzee-preferences');
    if (userPrefs) preferences.set(JSON.parse(userPrefs));
  } catch (e) {
    console.error('Failed to load from localStorage', e);
  }
}
