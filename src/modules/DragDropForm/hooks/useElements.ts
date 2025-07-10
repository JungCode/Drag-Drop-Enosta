import { useEffect, useState } from "react";
import {
  type ElementItem,
  type ElementType,
} from "../../../types/ElementTypes";
import { getDefaultData } from "../../../ultis/storage";

export default function useElements(
  items: string[]
): [ElementItem[], React.Dispatch<React.SetStateAction<ElementItem[]>>] {
  const [elements, setElements] = useState<ElementItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("elements");
    if (data) {
      try {
        const parsedData : ElementItem[] = JSON.parse(data);
        let newElements : ElementItem[] = [...parsedData];
        if (parsedData.length !== items.length && items.length > 0) {
          const newItemId = items[items.length - 1];
          const isExisted = parsedData.some((el) => el.id === newItemId);
          if (!isExisted) {
          const type = newItemId.split("-")[0] as ElementType;
            const sameTypeCount = parsedData.filter(
              (el) => el.type === type
            ).length;
            const count = sameTypeCount + 1;
            newElements = [
              ...parsedData,
              {
                id: newItemId,
                type: newItemId.split("-")[0] as ElementType,
                data: {
                  ...getDefaultData(type),
                  name: `${type}-${count}`,
                },
              },
            ];
          }
        }

        setElements(newElements);
      } catch (err) {
        console.error("Failed to parse localStorage data:", err);
      }
    }
  }, [items]);

  return [elements, setElements];
}
