<script lang="ts">
  export let width: string = "100%";
  export let height: string = "1rem";
  export let rounded: boolean = false;
</script>

<div 
  class="shimmer {rounded ? 'rounded-full' : 'rounded-md'}" 
  style="width: {width}; height: {height};"
></div>
