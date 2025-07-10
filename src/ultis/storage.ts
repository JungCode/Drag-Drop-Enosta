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

export const syncElementsWithLocalStorage = (ids: string[]) => {
  const saved = localStorage.getItem("elements");
  const oldElements: ElementItem[] = saved ? JSON.parse(saved) : [];

  const elementMap = new Map<string, ElementItem>();
  oldElements.forEach((el) => {
    elementMap.set(el.id, el);
  });

  const typeCountMap = new Map<string, number>();
  oldElements.forEach((el) => {
    const count = typeCountMap.get(el.type) || 0;
    typeCountMap.set(el.type, count + 1);
  });

  const updatedElements = ids.map((id) => {
    if (elementMap.has(id)) {
      return elementMap.get(id)!;
    }

    const type = id.split("-")[0];

    const count = (typeCountMap.get(type) || 0) + 1;
    typeCountMap.set(type, count);

    return {
      id,
      type,
      data: {
        name: `${type}-${count}`,
      },
    };
  });

  localStorage.setItem("elements", JSON.stringify(updatedElements));
};

