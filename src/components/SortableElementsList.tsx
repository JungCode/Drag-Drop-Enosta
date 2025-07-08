import { SortableContext } from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";
import Create from "../pages/Create";
import EditableElementOverlay from "./EditableElementOverlay";

interface Props {
  items: string[];
  isSideBarItem: boolean;
  OverFormBuilderElementId: string | null;
  activeIdElement: string | null;
}

const SortableElementsList = ({
  items,
  isSideBarItem,
  OverFormBuilderElementId,
  activeIdElement,
}: Props) => {
  // console.log('items', items)
  return (
    <div className="flex flex-col gap-2">
      <SortableContext items={items as string[]}>
        <Create items={items} />
        <DragOverlay>
          {/* Create overlay whenenver the element is not locate at sidebar element (dragging over form builder),
          we only use this overlay for re-arrange because we already got TypeElementOverlayCustom 
          for TypeElement within a difference style */}
          {!isSideBarItem || OverFormBuilderElementId ? (
            <EditableElementOverlay
              isSideBarItem={isSideBarItem}
              id={activeIdElement}
            />
          ) : null}
        </DragOverlay>
      </SortableContext>
    </div>
  );
};

export default SortableElementsList;
