import { useCallback } from "react";
import type { DragState, ElementItem } from "../../../types/ElementTypes";
import { saveElements } from "../../../ultis/storage";

export default function useEditHandlers(
  setElements: React.Dispatch<React.SetStateAction<ElementItem[]>>,
  setDragState: React.Dispatch<React.SetStateAction<DragState>>
): {
  handleOnSave: (id: string, updatedData: Partial<ElementItem["data"]>) => void;
  handleOnDelete: (id: string) => void;
} {
  const handleOnSave = useCallback(
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

  const handleOnDelete = useCallback(
    (id: string) => {
      let removedElements: ElementItem[] = [];
      setElements((prev) => {
        removedElements = prev.filter((item) => item.id !== id);
        return prev.filter((item) => item.id !== id);
      });
      setDragState((prev) => ({
        ...prev,
        editableElementsIds: removedElements.map((el) => el.id),
      }));
      saveElements(removedElements);
    },
    [setDragState]
  );
  return {
    handleOnSave: handleOnSave,
    handleOnDelete: handleOnDelete,
  };
}
