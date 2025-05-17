<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { addToRecentlyViewed, toggleFavorite, isFavorite } from '$lib/stores';
  import IngredientTag from '$lib/components/ui/IngredientTag.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  
  export let data;
  
  let recipe = data.recipe;
  let isLoading = true;
  let isFavorited = false;
  let animationComplete = false;
  
  onMount(() => {
    // Add to recently viewed
    addToRecentlyViewed({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      usedIngredientCount: 0,
      missedIngredientCount: 0
    });
    
    // Check if it's already favorited
    isFavorited = isFavorite(recipe.id);
    
    // Simulate loading for smooth animations
    setTimeout(() => {
      isLoading = false;
      
      // Set animation complete after transition time
      setTimeout(() => {
        animationComplete = true;
      }, 1000);
    }, 500);
  });
  
  function handleFavoriteToggle() {
    isFavorited = toggleFavorite({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      usedIngredientCount: 0,
      missedIngredientCount: 0
    });
  }
</script>

<svelte:head>
  <title>{recipe.title} | Durzzee Recipe</title>
</svelte:head>

<section class="pb-12">
  <div class="relative">
    <!-- Hero image -->
    <div class="w-full h-64 md:h-96 overflow-hidden relative">
      {#if !isLoading}
        <img 
          src={recipe.image}
          alt={recipe.title}
          class="w-full h-full object-cover transition-transform duration-10000 ease-in-out"
          style="transform: scale({animationComplete ? '1.03' : '1'}); transition: transform 30s ease-out;"
          in:fade={{ duration: 800 }}
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      {/if}
    </div>
    
    <!-- Title container -->
    <div class="container mx-auto px-4">
      <div class="relative -mt-24 md:-mt-32 bg-white rounded-t-3xl px-8 pt-8 pb-2 shadow-xl">
        <div class="flex justify-between items-start">
          {#if !isLoading}
            <h1 
              in:fly={{ y: 20, duration: 500 }}
              class="text-3xl md:text-4xl font-bold text-slate-800 mb-2"
            >
              {recipe.title}
            </h1>
          {/if}
          
          <button
            class="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            on:click={handleFavoriteToggle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFavorited ? "currentColor" : "none"} stroke="currentColor" class="w-6 h-6 {isFavorited ? 'text-red-500' : 'text-slate-400'}">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </div>
        
        {#if !isLoading}
          <div class="flex flex-wrap gap-3 mb-6" in:fly={{ y: 10, duration: 500, delay: 200 }}>
            <span class="inline-flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mr-1">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" />
              </svg>
              {recipe.readyInMinutes} mins
            </span>
            
            <span class="inline-flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mr-1">
                <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16.5h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16.5z" />
              </svg>
              Serves {recipe.servings}
            </span>
          </div>
        {/if}
      </div>
    </div>
  </div>
  
  <div class="container mx-auto px-4">
    <div class="bg-white px-8 pb-12 shadow-xl rounded-b-3xl">
      {#if !isLoading}
        <div class="grid md:grid-cols-3 gap-8">
          <div class="md:col-span-1" in:fly={{ x: -20, duration: 500, delay: 300 }}>
            <h2 class="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Ingredients</h2>
            
            <ul class="space-y-3">
              {#each recipe.extendedIngredients as ingredient, i}
                <li 
                  class="flex items-start"
                  in:fly={{ y: 10, duration: 300, delay: 400 + (i * 50) }}
                >
                  <span class="inline-flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-full w-5 h-5 text-xs font-bold mr-2 mt-0.5">✓</span>
                  <span>{ingredient.original}</span>
                </li>
              {/each}
            </ul>
            
            <div class="mt-8">
              <Button variant="outline" on:click={() => window.history.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mr-1">
                  <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
                </svg>
                Back to results
              </Button>
            </div>
          </div>
          
          <div class="md:col-span-2" in:fly={{ x: 20, duration: 500, delay: 400 }}>
            <h2 class="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Instructions</h2>
            
            {#if recipe.instructions}
              <div class="prose max-w-none">
                {@html recipe.instructions}
              </div>
            {:else}
              <p class="text-slate-600">No detailed instructions available for this recipe.</p>
            {/if}
          </div>
        </div>
      {:else}
        <!-- Loading skeleton -->
        <div class="animate-pulse grid md:grid-cols-3 gap-8 pt-4">
          <div class="md:col-span-1">
            <div class="h-6 w-1/3 bg-slate-200 rounded mb-6"></div>
            <div class="space-y-3">
              {#each Array(8) as _}
                <div class="h-4 bg-slate-200 rounded w-full"></div>
              {/each}
            </div>
          </div>
          <div class="md:col-span-2">
            <div class="h-6 w-1/3 bg-slate-200 rounded mb-6"></div>
            <div class="space-y-4">
              {#each Array(5) as _}
                <div class="h-4 bg-slate-200 rounded w-full"></div>
              {/each}
              <div class="h-4 bg-slate-200 rounded w-2/3"></div>
              <div class="h-12 bg-slate-100 rounded"></div>
              {#each Array(3) as _}
                <div class="h-4 bg-slate-200 rounded w-full"></div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>
