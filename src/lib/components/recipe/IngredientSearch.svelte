<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import Input from '../ui/Input.svelte';
  import Button from '../ui/Button.svelte';
  import IngredientTag from '../ui/IngredientTag.svelte';
  
  export let initialIngredients = '';
  
  const dispatch = createEventDispatcher();
  let ingredients: string[] = [];
  let inputValue = '';
  let suggestions: string[] = [];
  let isFocused = false;
  
  // Common ingredients for suggestions
  const commonIngredients = [
    'chicken', 'beef', 'pork', 'rice', 'pasta', 'potato', 'tomato',
    'onion', 'garlic', 'carrot', 'bell pepper', 'cheese', 'milk',
    'butter', 'egg', 'bread', 'flour', 'sugar', 'olive oil'
  ];
  
  onMount(() => {
    if (initialIngredients) {
      ingredients = initialIngredients.split(',').map(i => i.trim()).filter(Boolean);
    }
  });
  
  function addIngredient() {
    if (!inputValue.trim()) return;
    
    const newIngredient = inputValue.trim().toLowerCase();
    if (!ingredients.includes(newIngredient)) {
      ingredients = [...ingredients, newIngredient];
      inputValue = '';
      updateFormValue();
    }
  }
  
  function removeIngredient(index: number) {
    ingredients = ingredients.filter((_, i) => i !== index);
    updateFormValue();
  }
  
  function updateFormValue() {
    dispatch('change', ingredients.join(', '));
  }
  
  function getSuggestions(input: string) {
    if (!input.trim()) return [];
    
    const inputLower = input.toLowerCase();
    return commonIngredients
      .filter(ing => 
        ing.toLowerCase().includes(inputLower) &&
        !ingredients.includes(ing)
      )
      .slice(0, 5);
  }
  
  function handleInput() {
    suggestions = getSuggestions(inputValue);
  }
  
  function selectSuggestion(suggestion: string) {
    inputValue = suggestion;
    addIngredient();
    suggestions = [];
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addIngredient();
    } else if (event.key === ',' || event.key === ' ' && inputValue.trim()) {
      addIngredient();
      event.preventDefault();
    }
  }
</script>

<div class="w-full">
  <div class="mb-3">
    <label for="ingredient-input" class="block text-sm font-semibold text-slate-700 mb-1">
      Enter Ingredients
    </label>
    <p class="text-xs text-slate-500 mb-2">Type ingredient names and press Enter, or separate with commas</p>
    
    <div class="flex">
      <div class="flex-grow relative">
        <Input
          type="text"
          name="ingredient-input"
          placeholder="e.g. chicken, rice, tomato"
          bind:value={inputValue}
          on:input={handleInput}
          on:keydown={handleKeydown}
          on:focus={() => isFocused = true}
          on:blur={() => setTimeout(() => { isFocused = false }, 200)}
          icon='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>'
        />
        
        {#if suggestions.length > 0 && isFocused}
          <div 
            transition:slide={{ duration: 150 }}
            class="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-slate-200 max-h-60 overflow-auto"
          >
            <ul class="py-1">
              {#each suggestions as suggestion}
                <li>
                  <button
                    type="button"
                    class="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 transition-colors"
                    on:click={() => selectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </button>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
      
      <div class="ml-2">
        <Button type="button" on:click={addIngredient}>
          Add
        </Button>
      </div>
    </div>
  </div>
  
  {#if ingredients.length > 0}
    <div transition:slide={{ duration: 150 }} class="mb-4">
      <div class="flex flex-wrap mt-2">
        {#each ingredients as ingredient, i (ingredient)}
          <div transition:fade={{ duration: 200 }}>
            <IngredientTag 
              name={ingredient} 
              removable={true} 
              on:click={() => removeIngredient(i)}
            />
          </div>
        {/each}
      </div>
    </div>
  {/if}
  
  <input type="hidden" name="ingredients" value={ingredients.join(', ')} />
</div>
