import { DndContext } from "@dnd-kit/core";
import EditableElementsList from "../components/EditableElementsList";
import SideBar from "../components/SideBar";

const FormBuilderPage = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <DndContext
        onDragStart={(event) => {
          console.log("Drag start:", event.active);
        }}
        onDragEnd={() => {
          console.log("Drag end");
        }}
      >
        <SideBar />
        <EditableElementsList />
      </DndContext>
    </div>
  );
};

export default FormBuilderPage;
