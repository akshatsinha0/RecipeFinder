<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<div class="max-w-4xl mx-auto p-6">
  <h1 class="text-3xl font-bold mb-6">{data.recipe.title}</h1>
  
  <div class="grid md:grid-cols-2 gap-8">
    <img
      src={data.recipe.image}
      alt={data.recipe.title}
      class="rounded-lg shadow-lg"
    />
    
    <div>
      <div class="bg-gray-100 p-4 rounded-lg mb-6">
        <div class="flex justify-between mb-4">
          <span class="font-semibold">
            ⏱️ {data.recipe.readyInMinutes} mins
          </span>
          <span class="font-semibold">
            🍽️ Serves {data.recipe.servings}
          </span>
        </div>
        
        <h2 class="text-xl font-bold mb-3">Ingredients</h2>
        <ul class="list-disc pl-5">
          {#each data.recipe.extendedIngredients as ingredient}
            <li class="mb-2">{ingredient.original}</li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <div class="mt-8">
    <h2 class="text-2xl font-bold mb-4">Instructions</h2>
    <div class="prose max-w-none">
      {@html data.recipe.instructions}
    </div>
  </div>
</div>
