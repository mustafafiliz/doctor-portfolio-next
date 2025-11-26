import * as React from 'react';

type Toast = {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

const toastListeners = new Set<(toasts: Toast[]) => void>();
let toasts: Toast[] = [];

function showToast({ title, description, variant = 'default' }: Omit<Toast, 'id'>) {
  const id = Math.random().toString(36).substring(7);
  const newToast: Toast = { id, title, description, variant };
  toasts = [...toasts, newToast];
  toastListeners.forEach((listener) => listener(toasts));

  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    toastListeners.forEach((listener) => listener(toasts));
  }, 5000);

  return { id };
}

export function useToast() {
  const [toastList, setToastList] = React.useState<Toast[]>([]);

  React.useEffect(() => {
    const listener = (newToasts: Toast[]) => {
      setToastList(newToasts);
    };
    toastListeners.add(listener);
    setToastList(toasts);
    return () => {
      toastListeners.delete(listener);
    };
  }, []);

  return {
    toast: showToast,
    toasts: toastList,
  };
}

