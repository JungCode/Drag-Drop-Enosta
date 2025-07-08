import type { ElementItem } from "../types/ElementTypes";

const STORAGE_KEY = "elements";

export function loadElements(): ElementItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveElements(data: ElementItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


export function updateElement(id: string, newData: Partial<ElementItem["data"]>) {
  const elements = loadElements();
  const updated = elements.map((el) =>
    el.id === id ? { ...el, data: { ...el.data, ...newData } } : el
  );
  saveElements(updated);
}

export function deleteElement(id: string) {
  const elements = loadElements().filter((el) => el.id !== id);
  saveElements(elements);
}
