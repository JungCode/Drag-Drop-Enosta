import { DndContext } from "@dnd-kit/core";
import SideBar from "../../SideBar/components/Sidebar";
import FormBuilder from "./FormBuilder";
import useDragDrop from "../hooks/useDragDrop";

const DragDropLayout = () => {
  const {
    dragState,
    setDragState,
    handleOnDragStart,
    handleOnDragMove,
    handleOnDragEnd,
  } = useDragDrop();
  return (
    <DndContext
      onDragStart={handleOnDragStart}
      onDragEnd={handleOnDragEnd}
      onDragMove={handleOnDragMove}
    >
      <SideBar isOverFormBuilder={dragState.overId !== null} />
      <FormBuilder
        isFromSidebar={dragState.isFromSidebar}
        idsList={dragState.editableElementsIds}
        activeId={dragState.activeId}
        overId={dragState.overId}
        setDragState={setDragState}
      />
    </DndContext>
  );
};

export default DragDropLayout;
