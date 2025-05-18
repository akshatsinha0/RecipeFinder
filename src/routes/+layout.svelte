<!-- File: src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import { loadFromLocalStorage, saveToLocalStorage } from '$lib/stores';
  import ToastManager from '$lib/components/ui/ToastManager.svelte';
  
  onMount(() => {
    loadFromLocalStorage();
    const interval = setInterval(saveToLocalStorage, 30000);
    return () => {
      clearInterval(interval);
      saveToLocalStorage();
    };
  });
</script>

<svelte:head>
  <title>Durzzee Recipe Finder</title>
</svelte:head>

<Header />

<main class="container mx-auto px-4 py-8">
  <slot />
</main>

<ToastManager />

<footer class="bg-slate-100 border-t border-slate-200 mt-12">
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row justify-between items-center">
      <div class="mb-4 md:mb-0">
        <img src="/src/assets/durzzeeLogo.png" alt="Durzzee" class="h-8 w-auto" />
        <p class="mt-2 text-sm text-slate-600">Find delicious recipes with ingredients you already have.</p>
      </div>
      <div class="text-sm text-slate-500">
        © {new Date().getFullYear()} Durzzee Recipe Finder. All rights reserved.
      </div>
    </div>
  </div>
</footer>
