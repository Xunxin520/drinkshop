'use client';

import { useEffect, useState } from 'react';

let toastId = 0;

export function showToast(message: string) {
  const event = new CustomEvent('toast', { detail: { id: ++toastId, message } });
  window.dispatchEvent(event);
}

export default function Toast() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { id, message } = (e as CustomEvent).detail;
      setToasts((prev) => [...prev, { id, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2000);
    };
    window.addEventListener('toast', handler);
    return () => window.removeEventListener('toast', handler);
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-zinc-900 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-bounce"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
