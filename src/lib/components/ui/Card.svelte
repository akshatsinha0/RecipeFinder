<script lang="ts">
  export let href: string | null = null;
  export let variant: 'default' | 'hover' | 'interactive' = 'default';
</script>

<div class={`
  bg-white rounded-xl overflow-hidden shadow-md 
  ${variant === 'hover' ? 'hover:shadow-lg transition-shadow duration-300' : ''}
  ${variant === 'interactive' ? 'hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1' : ''}
`}>
  {#if href}
    <a {href} class="block h-full w-full">
      <slot />
    </a>
  {:else}
    <slot />
  {/if}
</div>
