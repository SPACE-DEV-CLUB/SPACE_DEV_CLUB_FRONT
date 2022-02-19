interface LocalStorageMethods<T> {
  get(): T | null;
  set(values: T): void;
}

export class LocalStorage<T> implements LocalStorageMethods<T> {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  get(): T | null {
    if (this.key != null) {
      const storageValue = window.localStorage.getItem(this.key);
      if (typeof storageValue === "string") {
        try {
          return JSON.parse(storageValue);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return null;
  }

  set(ops: T) {
    if (this.key != null) {
      window.localStorage.setItem(this.key, JSON.stringify(ops));
    }
  }
}
