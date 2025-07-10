import { DndContext } from "@dnd-kit/core";
import SideBar from "../../SideBar/components/Sidebar";
import FormBuilder from "./FormBuilder";
import useDragState from "../hooks/useDragState";
import useDragHandlers from "../hooks/useDragHandlers";

const DragDropLayout = () => {
  const [dragState, setDragState] = useDragState();
  const { handleOnDragStart, handleOnDragEnd, handleOnDragMove } =
    useDragHandlers(dragState, setDragState);
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
