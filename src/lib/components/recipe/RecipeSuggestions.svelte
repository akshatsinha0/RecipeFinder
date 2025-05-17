<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import RecipeGrid from './RecipeGrid.svelte';
  import type { Recipe } from '$lib/types/recipe';
  import { SPOONACULAR_API_KEY } from '$env/static/private';
  import { toasts } from '$lib/stores/toast';
  
  export let ingredients: string[] = [];
  export let limit: number = 6;
  
  let loading = false;
  let recipes: Recipe[] = [];
  
  $: if (ingredients.length > 0) {
    fetchSuggestions();
  }
  
  async function fetchSuggestions() {
    if (!ingredients.length) return;
    
    loading = true;
    
    try {
      const response = await fetch(
        `/api/suggestions?ingredients=${ingredients.join(',')}&limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }
      
      const data = await response.json();
      recipes = data;
    } catch (error) {
      toasts.error('Failed to load recipe suggestions');
      console.error(error);
    } finally {
      loading = false;
    }
  }
</script>

<div class="mt-12">
  {#if loading}
    <h2 class="text-xl font-bold mb-4">Finding recipe suggestions...</h2>
    <RecipeGrid loading={true} recipes={[]} />
  {:else if recipes.length > 0}
    <div in:fade={{ duration: 300 }}>
      <h2 class="text-xl font-bold mb-4">Suggested recipes for you</h2>
      <RecipeGrid recipes={recipes} />
    </div>
  {/if}
</div>
