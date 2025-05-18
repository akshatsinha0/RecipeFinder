<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import IngredientSearch from '$lib/components/recipe/IngredientSearch.svelte';
  import RecipeGrid from '$lib/components/recipe/RecipeGrid.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { recentSearches, recentlyViewed, searchLoading } from '$lib/stores';
  
  export let form;
  let searchValue = '';
  let recipes = form?.recipes || [];
  let isFirstVisit = true;
  
  $: isSearching = $searchLoading;
  
  onMount(() => {
    setTimeout(() => {
      isFirstVisit = false;
    }, 1000);
  });
  
  function handleSearch() {
    $searchLoading = true;
    
    // After form submission, loading will be handled by the page load
    setTimeout(() => {
      if (searchValue.trim()) {
        addToRecentSearches(searchValue);
      }
    }, 100);
  }
  
  function addToRecentSearches(search: string) {
    recentSearches.update(searches => {
      const newSearches = [search, ...searches.filter(s => s !== search)].slice(0, 5);
      return newSearches;
    });
  }
  
  function setSearch(value: string) {
    searchValue = value;
  }
</script>

<svelte:head>
  <title>Durzzee Recipe Finder</title>
</svelte:head>

<section class="pt-8 pb-16 md:pt-12 md:pb-24" in:fade={{ duration: 700 }}>
  <div class="max-w-3xl mx-auto text-center">
    <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-emerald-700 mb-4">
      Find Delicious Recipes with Ingredients You Have
    </h1>
    
    <p class="text-lg text-slate-600 mb-10">
      Enter the ingredients you have on hand, and we'll show you recipes you can make right now.
    </p>
    
    {#if isFirstVisit}
      <div 
        in:fly={{ y: 20, duration: 800 }}
        class="relative mb-10 p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl shadow-sm"
      >
        <div class="absolute -top-4 -right-4">
          <span class="animate-float">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 text-amber-400">
              <path fill-rule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
        <h2 class="text-2xl font-semibold text-emerald-800 mb-3">Welcome to Durzzee!</h2>
        <p class="text-emerald-700">
          Start by entering ingredients you have, and we'll find matching recipes for you.
          You can add multiple ingredients separated by commas.
        </p>
      </div>
    {/if}
    
    <form method="POST" on:submit={handleSearch} class="bg-white rounded-xl p-6 shadow-lg mb-8">
      {#if form?.error}
        <div class="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
          <p class="font-medium">{form.error}</p>
          {#if form.error.includes('API key')}
            <p class="text-sm mt-1">Please check your Spoonacular API key configuration.</p>
          {/if}
        </div>
{     /if}

      <IngredientSearch bind:initialIngredients={searchValue} on:change={e => searchValue = e.detail} />
      
      <div class="mt-6">
        <Button type="submit" loading={isSearching} size="lg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-2">
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
          </svg>
          Find Recipes
        </Button>
      </div>
      
      {#if $recentSearches.length > 0}
        <div class="mt-4 text-sm">
          <p class="text-slate-500 mb-2">Recent searches:</p>
          <div class="flex flex-wrap gap-2">
            {#each $recentSearches as search}
              <button
                type="button"
                on:click={() => setSearch(search)}
                class="px-3 py-1 border border-slate-300 rounded-full text-sm text-slate-600 hover:bg-slate-100 transition-colors"
              >
                {search}
              </button>
            {/each}
          </div>
        </div>
      {/if}
    </form>
  </div>
  
  {#if form?.recipes && form.recipes.length > 0}
    <div class="mt-12">
      <h2 class="text-2xl font-bold text-slate-800 mb-6">Recipes You Can Make</h2>
      <RecipeGrid recipes={form.recipes} />
    </div>
  {/if}
  
  {#if $recentlyViewed.length > 0 && (!form?.recipes || form.recipes.length === 0)}
    <div class="max-w-6xl mx-auto mt-16" transition:fade>
      <h2 class="text-2xl font-bold text-slate-800 mb-6">Recently Viewed Recipes</h2>
      <RecipeGrid recipes={$recentlyViewed} />
    </div>
  {/if}
</section>
