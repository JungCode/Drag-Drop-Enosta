import { useDroppable } from "@dnd-kit/core";
import type { DragState } from "../../../types/ElementTypes";
import BuilderSortableList from "./BuilderSortableList";

interface Props {
  idsList: string[];
  overId: string | null;
  activeId: string | null;
  isFromSidebar: boolean;
  setDragState: React.Dispatch<React.SetStateAction<DragState>>;
}

const FormBuilder = ({
  idsList,
  overId,
  activeId,
  setDragState,
  isFromSidebar,
}: Props) => {
  //
  const { setNodeRef } = useDroppable({
    id: "droppable",
  });
  return (
    <div className="ml-52 px-52 py-5">
      <ul
        ref={setNodeRef}
        className="bg-white mt-14 min-h-screen p-6 rounded-xl "
      >
        <BuilderSortableList
          items={idsList}
          isFromSidebar={isFromSidebar}
          overId={overId}
          activeId={activeId}
          setDragState={setDragState}
        />
      </ul>
    </div>
  );
};

export default FormBuilder;
