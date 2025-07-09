import { useEffect, useState } from "react";
import {
  type ElementItem,
  type ElementType,
} from "../../../types/ElementTypes";

export default function useElements(
  items: string[]
): [ElementItem[], React.Dispatch<React.SetStateAction<ElementItem[]>>] {
  const [elements, setElements] = useState<ElementItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("elements");
    if (data) {
      try {
        const parsedData = JSON.parse(data) as ElementItem[];
        let newElements = parsedData;
        if (parsedData.length !== items.length && items.length > 0) {
          const newItemId = items[items.length - 1];
          const isExisted = parsedData.some((el) => el.id === newItemId);
          if (!isExisted) {
            newElements = [
              ...parsedData,
              {
                id: newItemId,
                type: newItemId.split("-")[0] as ElementType,
                data: {},
              },
            ];
          }
        }
        setElements((prev) => {
          return JSON.stringify(prev) !== JSON.stringify(newElements)
            ? newElements
            : prev;
        });
      } catch (err) {
        console.error("Failed to parse localStorage data:", err);
      }
    }
  }, [items]);

  return [elements, setElements];
}
