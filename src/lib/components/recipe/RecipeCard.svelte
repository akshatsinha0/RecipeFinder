<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import type { Recipe } from '$lib/types/recipe';
  import Skeleton from '../ui/Skeleton.svelte';
  
  export let recipe: Recipe;
  export let loading: boolean = false;
  
  let imageLoaded = false;
  let hovered = false;
</script>

<a 
  href={`/recipe/${recipe.id}`} 
  class="recipe-card block"
  on:mouseenter={() => hovered = true}
  on:mouseleave={() => hovered = false}
>
  <div class="relative overflow-hidden aspect-video">
    {#if loading}
      <Skeleton width="100%" height="100%" />
    {:else}
      <div class="absolute inset-0 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          class="w-full h-full object-cover"
          on:load={() => { imageLoaded = true; }}
          style="opacity: {imageLoaded ? 1 : 0}; transition: opacity 0.5s ease-in-out;"
        />
      </div>
      
      {#if imageLoaded}
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        <div class="absolute bottom-0 left-0 right-0 p-4">
          <span 
            class="inline-block text-xs font-semibold bg-amber-500 text-white px-2 py-1 rounded-md"
            in:fly={{y: 20, duration: 300, delay: 200}}
          >
            {recipe.usedIngredientCount} ingredients matched
          </span>
        </div>
      {/if}
    {/if}
  </div>
  
  <div class="p-4">
    {#if loading}
      <Skeleton height="1.5rem" width="100%" />
      <div class="mt-2">
        <Skeleton height="0.8rem" width="70%" />
      </div>
    {:else}
      <h3 class="text-lg font-bold text-slate-800 line-clamp-2">
        {recipe.title}
      </h3>
    
      <div class="mt-2 flex justify-between text-sm">
        <span class="text-emerald-700">
          <span class="font-semibold">{recipe.usedIngredientCount}</span> used
        </span>
        <span class="text-amber-700">
          <span class="font-semibold">{recipe.missedIngredientCount}</span> missing
        </span>
      </div>
      
      {#if hovered}
        <div class="mt-3" in:fly={{y: 10, duration: 200}}>
          <span class="text-sm text-emerald-600 font-medium flex items-center">
            View recipe
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 ml-1">
              <path fill-rule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
      {/if}
    {/if}
  </div>
</a>
