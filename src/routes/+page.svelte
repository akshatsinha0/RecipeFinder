<script lang="ts">
  import type { ActionData } from './$types';
  export let form: ActionData;
</script>

<form method="POST" class="max-w-2xl mx-auto p-6">
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Enter Ingredients (comma-separated):
    </label>
    <input
      type="text"
      name="ingredients"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      required
    />
  </div>
  <button
    type="submit"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Find Recipes
  </button>
</form>

{#if form?.recipes}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
    {#each form.recipes as recipe}
      <a
        href={`/recipe/${recipe.id}`}
        class="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <img
          src={recipe.image}
          alt={recipe.title}
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-2">{recipe.title}</h3>
          <div class="flex justify-between text-sm text-gray-600">
            <span>Used: {recipe.usedIngredientCount}</span>
            <span>Missing: {recipe.missedIngredientCount}</span>
          </div>
        </div>
      </a>
    {/each}
  </div>
{/if}
