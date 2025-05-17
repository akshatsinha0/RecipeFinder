<script lang="ts">
  import { toasts } from '$lib/stores/toast';
  import Toast from './Toast.svelte';
</script>

<div class="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-sm">
  {#each $toasts as toast (toast.id)}
    <Toast 
      message={toast.message}
      type={toast.type}
      duration={toast.duration}
      dismissible={toast.dismissible}
      on:dismiss={() => toasts.remove(toast.id)}
    />
  {/each}
</div>
