import { useDroppable } from "@dnd-kit/core";
import EditableElement from "./EditableElement";

const EditableElementsList = () => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  return (
    <div className="ml-52 px-52 min-h-screen h-full py-5">
      <ul
        style={{ backgroundColor: isOver ? "red" : undefined }}
        ref={setNodeRef}
        className="bg-white h-full p-6 shadow-xl rounded-xl flex flex-col gap-2"
      >
        <EditableElement />
        <EditableElement />
        <EditableElement />
      </ul>
    </div>
  );
};

export default EditableElementsList;
