<script lang="ts">
  import { fade, stagger } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import type { Recipe } from '$lib/types/recipe';
  import RecipeCard from './RecipeCard.svelte';
  
  export let recipes: Recipe[] = [];
  export let loading = false;
  export let emptyMessage = 'No recipes found. Try different ingredients!';
  
  // Create skeleton array for loading state
  const skeletonCount = 6;
  let skeletons = Array(skeletonCount).fill(null);
</script>

{#if loading}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each skeletons as _, i (i)}
      <RecipeCard loading={true} recipe={{} as Recipe} />
    {/each}
  </div>
{:else if recipes.length > 0}
  <div 
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    in:fade={{ duration: 300, easing: quintOut }}
  >
    {#each recipes as recipe, i (recipe.id)}
      <div in:fade={{ duration: 300, delay: 100 + (i * 50) }}>
        <RecipeCard {recipe} />
      </div>
    {/each}
  </div>
{:else}
  <div class="text-center py-16" in:fade={{ duration: 300 }}>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    <p class="text-slate-500 font-medium">{emptyMessage}</p>
  </div>
{/if}
