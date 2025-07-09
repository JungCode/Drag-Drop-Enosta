import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";
import EditableElementOverlay from "./EditableElementOverlay";
import RenderElemment from "./elements/RenderElements";

interface Props {
  items: string[];
  isSideBarItem: boolean;
  OverFormBuilderElementId: string | null;
  activeIdElement: string | null;
  setEditableElementsId: React.Dispatch<React.SetStateAction<string[]>>;
}

const SortableElementsList = ({
  items,
  isSideBarItem,
  OverFormBuilderElementId,
  activeIdElement,
  setEditableElementsId,
}: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <SortableContext
        items={items as string[]}
        strategy={verticalListSortingStrategy}
      >
        <RenderElemment
          items={items}
          setEditableElementsId={setEditableElementsId}
        />
        <DragOverlay>
          {/* Create overlay whenenver the element is not locate at sidebar element (dragging over form builder),
          we only use this overlay for re-arrange because we already got TypeElementOverlayCustom 
          for TypeElement within a difference style */}
          {!isSideBarItem || OverFormBuilderElementId ? (
            <EditableElementOverlay id={activeIdElement} />
          ) : null}
        </DragOverlay>
      </SortableContext>
    </div>
  );
};

export default SortableElementsList;
