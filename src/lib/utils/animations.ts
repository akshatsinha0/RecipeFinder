import { cubicOut, elasticOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

// Modified staggered transition
export function staggerFade(
  node: Element, 
  { delay = 0, duration = 400, easing = cubicOut, index = 0, stagger = 50 }
): TransitionConfig {
  const calculatedDelay = delay + (index * stagger);
  
  return {
    duration,
    delay: calculatedDelay,
    easing,
    css: (t) => `opacity: ${t}; transform: translateY(${(1 - t) * 10}px)`
  };
}

// Pulse animation for interactions
export function pulse(
  node: Element, 
  { duration = 300, scale = 1.05 }
): TransitionConfig {
  return {
    duration,
    css: (t) => {
      const eased = elasticOut(t);
      return `transform: scale(${1 + (scale - 1) * eased});`;
    }
  };
}

// Slide and fade for toast notifications
export function slideAndFade(
  node: Element, 
  { delay = 0, duration = 400, direction = 'top' }
): TransitionConfig {
  const dx = direction === 'left' ? -20 : direction === 'right' ? 20 : 0;
  const dy = direction === 'top' ? -20 : direction === 'bottom' ? 20 : 0;
  
  return {
    delay,
    duration,
    css: (t, u) => `
      transform: translate(${dx * u}px, ${dy * u}px);
      opacity: ${t};
    `
  };
}

// Ripple effect for buttons
export function createRipple(event: MouseEvent) {
  const button = event.currentTarget as HTMLElement;
  
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  const rect = button.getBoundingClientRect();
  
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
  
  // Clean up
  setTimeout(() => {
    if (circle) {
      circle.remove();
    }
  }, 600);
}
