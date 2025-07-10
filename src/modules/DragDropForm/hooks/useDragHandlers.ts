import type {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import type { DragState } from "../../../types/ElementTypes";
import { syncElementsWithLocalStorage } from "../../../ultis/storage";
import { arrayMove } from "@dnd-kit/sortable";

export default function useDragHandlers(
  dragState: DragState,
  setDragState: React.Dispatch<React.SetStateAction<DragState>>
): {
  handleOnDragStart: (event: DragStartEvent) => void;
  handleOnDragMove: (event: DragEndEvent) => void;
  handleOnDragEnd: (event: DragMoveEvent) => void;
} {
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
    const movedArray = arrayMove(dragState.editableElementsIds, oldIndex, newIndex);
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
        const scrollY = window.scrollY;
        setDragState((prev) => ({
          ...prev,
          editableElementsIds: ghostArray,
        }));
        requestAnimationFrame(() => {
          window.scrollTo({ top: scrollY });
        });
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
    handleOnDragEnd: handleOnDragEnd,
    handleOnDragMove: handleOnDragMove,
    handleOnDragStart: handleOnDragStart,
  };
}
