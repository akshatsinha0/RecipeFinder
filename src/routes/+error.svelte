<script>
  import { page } from '$app/stores';
</script>

<div class="container mx-auto p-8 text-center max-w-lg">
  <h1 class="text-3xl font-bold mb-4 text-red-600">
    {$page.status}: {$page.error?.message || 'Error'}
  </h1>

  <p class="mb-6 text-lg">
    {#if $page.status === 500}
      There was a problem processing your request. Please check your API key configuration.
    {:else if $page.status === 404}
      The page you requested could not be found.
    {:else}
      An error occurred while processing your request.
    {/if}
  </p>

  <a href="/" class="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">
    Return to Home
  </a>
</div>
