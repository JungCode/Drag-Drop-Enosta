import { DndContext } from "@dnd-kit/core";
import SideBar from "../../SideBar/components/Sidebar";
import FormBuilder from "./FormBuilder";
import useDragDrop from "../hooks/useDragDrop";

const DragDropContext = () => {
  const [
    dragState,
    setDragState,
    handleOnDragStart,
    handleOnDragMove,
    handleDragOnEnd,
  ] = useDragDrop();
  return (
    <DndContext
      onDragStart={handleOnDragStart}
      onDragEnd={handleDragOnEnd}
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

export default DragDropContext;
