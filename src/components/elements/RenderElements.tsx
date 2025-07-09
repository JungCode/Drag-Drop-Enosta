import { useEffect, useState, useCallback, useMemo } from "react";
import { type ElementItem, type ElementType } from "../../types/ElementTypes";
import { saveElements } from "../../ultis/storage";
import RenderElementItem from "./RenderElementItems";

const RenderElemments = ({
  items = [],
  setEditableElementsId,
}: {
  items: string[];
  setEditableElementsId: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [elements, setElements] = useState<ElementItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("elements");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ElementItem[];
        let newElements = parsed;
        if (parsed.length !== items.length && items.length > 0) {
          const newItemId = items[items.length - 1];
          const exists = parsed.some((el) => el.id === newItemId);
          if (!exists) {
            newElements = [
              ...parsed,
              {
                id: newItemId,
                type: newItemId.split("-")[0] as ElementType,
                data: {},
              },
            ];
          }
        }

        setElements((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(newElements)) {
            return newElements;
          }
          return prev;
        });
      } catch (err) {
        console.error("Failed to parse localStorage data:", err);
      }
    }
  }, [items]);

  const handleSave = useCallback(
    (id: string, updatedData: Partial<ElementItem["data"]>) => {
      setElements((prev) => {
        const updated = prev.map((el) =>
          el.id === id ? { ...el, data: { ...el.data, ...updatedData } } : el
        );
        saveElements(updated);
        return updated;
      });
    },
    []
  );

  const handleDelete = useCallback(
    (id: string) => {
      setElements((prev) => {
        const updated = prev.filter((el) => el.id !== id);
        saveElements(updated);
        setEditableElementsId(updated.map((el) => el.id));
        return updated;
      });
    },
    [setEditableElementsId]
  );

  const renderedElements = useMemo(
    () =>
      elements.map((item) => (
        <RenderElementItem
          key={item.id}
          item={item}
          canEdit
          onSave={(updated) => handleSave(item.id, updated)}
          onDelete={() => handleDelete(item.id)}
        />
      )),
    [elements, handleSave, handleDelete]
  );

  return <>{renderedElements}</>;
};

export default RenderElemments;
