<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  
  export let type: 'success' | 'error' | 'info' | 'warning' = 'info';
  export let message: string;
  export let duration = 5000;
  export let dismissible = true;
  
  const dispatch = createEventDispatcher();
  let visible = true;
  let progressWidth = 100;
  let timerId: number;
  let progressTimerId: number;
  
  const icons = {
    success: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>',
    error: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" /></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" /></svg>',
    warning: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>'
  };
  
  const bgColors = {
    success: 'bg-emerald-50',
    error: 'bg-red-50',
    info: 'bg-blue-50',
    warning: 'bg-amber-50'
  };
  
  const borderColors = {
    success: 'border-emerald-300',
    error: 'border-red-300',
    info: 'border-blue-300',
    warning: 'border-amber-300'
  };
  
  const textColors = {
    success: 'text-emerald-800',
    error: 'text-red-800',
    info: 'text-blue-800',
    warning: 'text-amber-800'
  };
  
  const progressColors = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-amber-500'
  };
  
  onMount(() => {
    if (duration > 0) {
      timerId = window.setTimeout(dismiss, duration);
      
      // Create progress animation
      const startTime = Date.now();
      progressTimerId = window.setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        progressWidth = Math.max(0, 100 - (elapsedTime / duration) * 100);
        
        if (progressWidth <= 0) {
          clearInterval(progressTimerId);
        }
      }, 10);
    }
    
    return () => {
      if (timerId) clearTimeout(timerId);
      if (progressTimerId) clearInterval(progressTimerId);
    };
  });
  
  function dismiss() {
    visible = false;
    if (timerId) clearTimeout(timerId);
    if (progressTimerId) clearInterval(progressTimerId);
    dispatch('dismiss');
  }
</script>

{#if visible}
  <div 
    class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg border {bgColors[type]} {borderColors[type]}"
    in:fly={{ y: 20, duration: 300 }}
    out:fly={{ y: 20, duration: 200 }}
  >
    <div class="p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0 {textColors[type]}">
          {@html icons[type]}
        </div>
        <div class="ml-3 w-0 flex-1">
          <p class="text-sm font-medium {textColors[type]}">{message}</p>
        </div>
        {#if dismissible}
          <div class="ml-4 flex flex-shrink-0">
            <button
              type="button"
              class="inline-flex rounded-md {textColors[type]} focus:outline-none focus:ring-2 focus:ring-offset-2"
              on:click={dismiss}
              aria-label="Close"
            >
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        {/if}
      </div>
    </div>
    
    {#if duration > 0}
      <div class="h-0.5 w-full bg-gray-200">
        <div 
          class="h-full {progressColors[type]}" 
          style="width: {progressWidth}%; transition: width 10ms linear;"
        ></div>
      </div>
    {/if}
  </div>
{/if}
