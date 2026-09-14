export interface StorageAdapter<T> {
  load: () => T;
  save: (data: T) => void;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function createStorageAdapter<T>(key: string, fallback: T): StorageAdapter<T> {
  return {
    load: (): T => {
      if (!isBrowser()) return fallback;
      try {
        const raw = window.localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
      } catch (err) {
        console.error(`[StorageAdapter] Failed to load key "${key}":`, err);
        return fallback;
      }
    },
    save: (data: T): void => {
      if (!isBrowser()) return;
      try {
        window.localStorage.setItem(key, JSON.stringify(data));
      } catch (err) {
        console.error(`[StorageAdapter] Failed to save key "${key}":`, err);
      }
    },
  };
}
