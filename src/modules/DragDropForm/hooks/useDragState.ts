import { useEffect, useState } from "react";
import type { DragState, ElementItem } from "../../../types/ElementTypes";

export default function useDragState(): [
  dragState: DragState,
  setDragState: React.Dispatch<React.SetStateAction<DragState>>
] {
  const [dragState, setDragState] = useState<DragState>({
    editableElementsIds: [],
    activeId: null,
    overId: null,
    isFromSidebar: false,
  });

  // Fetch data at the first time reload
  useEffect(() => {
    const savedElements = localStorage.getItem("elements");
    const parsedElements: ElementItem[] = savedElements
      ? JSON.parse(savedElements)
      : [];

    const elementIds = parsedElements.map((el) => el.id);
    setDragState((prev) => ({ ...prev, editableElementsIds: elementIds }));
  }, []);

  return [dragState, setDragState];
}
