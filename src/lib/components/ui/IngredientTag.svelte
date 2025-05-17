<script lang="ts">
  export let name: string;
  export let removable = false;
</script>

<span class="ingredient-tag group">
  {name}
  {#if removable}
    <button 
      on:click 
      class="ml-1 rounded-full bg-emerald-200 text-emerald-800 w-4 h-4 inline-flex items-center justify-center opacity-70 group-hover:opacity-100 hover:bg-emerald-300 transition-colors"
      aria-label="Remove {name}"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3">
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </button>
  {/if}
</span>
