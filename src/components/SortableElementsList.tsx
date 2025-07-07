import EditableElement from "./EditableElement";
import { SortableContext } from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";

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
  console.log(isSideBarItem);
  return (
    <div className="flex flex-col gap-2">
      <SortableContext items={items as string[]}>
        {items.map((id) => (
          <EditableElement key={id} id={id as string}></EditableElement>
        ))}
        <DragOverlay>
          {!isSideBarItem || OverFormBuilderElementId ? (
            <EditableElement
              isItemFromSidebar={
                !items.includes(OverFormBuilderElementId as string)
              }
              isOverLay={true}
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
