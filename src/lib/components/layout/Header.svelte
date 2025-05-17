<script lang="ts">
  import { onMount } from 'svelte';
  
  let isScrolled = false;
  let headerElement: HTMLElement;

  onMount(() => {
    const checkScroll = () => {
      isScrolled = window.scrollY > 10;
    };
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();
    
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  });
</script>

<header 
  bind:this={headerElement}
  class="fixed top-0 w-full z-10 transition-all duration-300 {isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-5'}"
>
  <div class="container mx-auto px-4 flex items-center justify-between">
    <a href="/" class="flex items-center space-x-2">
      <img
        src="/src/assets/durzzeeLogo.png"
        alt="Durzzee Logo"
        class="h-10 w-auto animate-float"
      />
      <span class="text-xl font-bold text-emerald-800 hidden sm:inline-block">Durzzee</span>
    </a>

    <nav>
      <ul class="flex space-x-6 text-sm font-medium">
        <li><a href="/" class="text-slate-700 hover:text-emerald-600 transition-colors">Home</a></li>
        <li><a href="/popular" class="text-slate-700 hover:text-emerald-600 transition-colors">Popular</a></li>
        <li>
          <a href="/favorites" class="text-slate-700 hover:text-emerald-600 transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mr-1">
              <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
            </svg>
            Favorites
          </a>
        </li>
      </ul>
    </nav>
  </div>
</header>

<div style="height: 76px;"></div> <!-- Spacer for fixed header -->
