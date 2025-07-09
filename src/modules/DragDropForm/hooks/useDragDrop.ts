import { useEffect, useState } from "react";
import type { DragState, ElementItem } from "../../../types/ElementTypes";
import type {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { syncElementsWithLocalStorage } from "../../../ultis/storage";
import { arrayMove } from "@dnd-kit/sortable";

export default function useDragDrop(): {
  dragState: DragState;
  setDragState: React.Dispatch<React.SetStateAction<DragState>>;
  handleOnDragStart: (event: DragStartEvent) => void;
  handleOnDragMove: (event: DragEndEvent) => void;
  handleOnDragEnd: (event: DragMoveEvent) => void;
} {
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

  function handleOnDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setDragState((prev) => ({ ...prev, isFromSidebar: false, overId: null }));

    if (!over || active.id === over.id) {
      if (dragState.isFromSidebar) {
        syncElementsWithLocalStorage([...dragState.editableElementsIds]);
      }
      return;
    }

    const oldIndex = dragState.editableElementsIds.indexOf(active.id as string);
    const newIndex = dragState.editableElementsIds.indexOf(over.id as string);
    let movedArray: string[];

    if (oldIndex === -1 && typeof active.id === "string") {
      movedArray = [
        ...dragState.editableElementsIds.slice(0, newIndex),
        active.id,
        ...dragState.editableElementsIds.slice(newIndex),
      ];
    } else {
      movedArray = arrayMove(dragState.editableElementsIds, oldIndex, newIndex);
    }
    syncElementsWithLocalStorage(movedArray);
    setDragState((prev) => ({ ...prev, editableElementsIds: movedArray }));
  }

  function handleOnDragStart(event: DragStartEvent) {
    setDragState((prev) => ({
      ...prev,
      activeId: event.active.id as string,
      isFromSidebar: !prev.editableElementsIds.includes(
        event.active.id as string
      ),
    }));
  }

  function handleOnDragMove(event: DragMoveEvent) {
    const { over, active } = event;

    if (over !== null) {
      if (
        dragState.isFromSidebar &&
        !dragState.editableElementsIds.includes(active.id as string)
      ) {
        const ghostArray = [
          ...dragState.editableElementsIds,
          dragState.activeId as string,
        ];
        setDragState((prev) => ({
          ...prev,
          editableElementsIds: ghostArray,
        }));
      }

      setDragState((prev) => ({ ...prev, overId: active.id as string }));
    } else {
      if (dragState.isFromSidebar) {
        const removedGhostElementArray = [
          ...dragState.editableElementsIds.filter(
            (elementId) => elementId != dragState.activeId
          ),
        ];
        setDragState((prev) => ({
          ...prev,
          editableElementsIds: removedGhostElementArray,
        }));
      }

      setDragState((prev) => ({ ...prev, overId: null }));
    }
  }

  return {
    dragState,
    setDragState,
    handleOnDragStart,
    handleOnDragMove,
    handleOnDragEnd,
  };
}
