import { writable } from 'svelte/store';

export type ToastType = 'info' | 'success' | 'error' | 'warning';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
  dismissible: boolean;
}

function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([]);
  let counter = 0;
  
  function add(
    message: string, 
    type: ToastType = 'info', 
    duration: number = 5000,
    dismissible: boolean = true
  ) {
    const id = counter++;
    
    update(toasts => [
      ...toasts,
      { id, message, type, duration, dismissible }
    ]);
    
    return id;
  }
  
  function remove(id: number) {
    update(toasts => toasts.filter(toast => toast.id !== id));
  }
  
  return {
    subscribe,
    info: (msg: string, duration?: number) => add(msg, 'info', duration),
    success: (msg: string, duration?: number) => add(msg, 'success', duration),
    warning: (msg: string, duration?: number) => add(msg, 'warning', duration),
    error: (msg: string, duration?: number) => add(msg, 'error', duration),
    remove
  };
}

export const toasts = createToastStore();
