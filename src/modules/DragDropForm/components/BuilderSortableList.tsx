import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";
import type { DragState } from "../../../types/ElementTypes";
import EditableElementOverlay from "./EditableElementOverlay";
import RenderElemments from "./RenderElements";

interface Props {
  items: string[];
  isFromSidebar: boolean;
  overId: string | null;
  activeId: string | null;
  setDragState: React.Dispatch<React.SetStateAction<DragState>>;
}

const BuilderSortableList = ({
  items,
  isFromSidebar,
  overId,
  activeId,
  setDragState,
}: Props) => {
  const shouldShowOverlay =
    (!isFromSidebar && activeId) || (overId && activeId);
  return (
    <div className="flex flex-col gap-8">
      <SortableContext
        items={items as string[]}
        strategy={verticalListSortingStrategy}
      >
        <RenderElemments items={items} setDragState={setDragState} />
        <DragOverlay>
          {shouldShowOverlay ? <EditableElementOverlay id={activeId} /> : null}
        </DragOverlay>
        {items.length === 0 && (
          <p className="text-4xl text-center text-gray-400">Empty</p>
        )}
      </SortableContext>
    </div>
  );
};

export default BuilderSortableList;
