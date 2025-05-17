<script lang="ts">
  export let type: 'text' | 'email' | 'password' | 'number' | 'search' = 'text';
  export let name: string;
  export let placeholder = '';
  export let value = '';
  export let required = false;
  export let disabled = false;
  export let label = '';
  export let errorMessage = '';
  export let showLabel = true;
  export let icon: string | null = null;

  export let focusAndSelect = false;

  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  
  const dispatch = createEventDispatcher();
  let inputElement: HTMLInputElement;
  let isFocused = false;

  onMount(() => {
    if (focusAndSelect && inputElement) {
      inputElement.focus();
      inputElement.select();
    }
  });

  function handleFocus() {
    isFocused = true;
  }

  function handleBlur() {
    isFocused = false;
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    dispatch('input', value);
  }
</script>

<div class="w-full">
  {#if label && showLabel}
    <label for={name} class="block text-sm font-medium text-slate-700 mb-1">{label}</label>
  {/if}

  <div class="relative rounded-lg shadow-sm">
    {#if icon}
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
        {@html icon}
      </div>
    {/if}

    <input
      bind:this={inputElement}
      {type}
      {name}
      {placeholder}
      {required}
      {disabled}
      bind:value
      on:input={handleInput}
      on:focus={handleFocus}
      on:blur={handleBlur}
      class="block w-full rounded-lg border-slate-300 shadow-sm 
        focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 
        transition-all duration-200 bg-white
        {errorMessage ? 'border-red-300' : 'border-slate-300'}
        {icon ? 'pl-10' : 'pl-4'}
        {isFocused ? 'border-emerald-400' : ''}"
      aria-invalid={!!errorMessage}
      aria-errormessage={errorMessage ? `${name}-error` : undefined}
    />
    
    {#if isFocused}
      <div
        in:fly={{ y: 5, duration: 150 }}
        out:fly={{ y: 5, duration: 100 }}
        class="absolute inset-0 rounded-lg pointer-events-none border-2 border-emerald-500 opacity-50"
      ></div>
    {/if}
  </div>

  {#if errorMessage}
    <p transition:fly={{ y: 5, duration: 200 }} id="{name}-error" class="mt-1 text-sm text-red-600">{errorMessage}</p>
  {/if}
</div>
