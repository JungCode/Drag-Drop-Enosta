import { useDroppable } from "@dnd-kit/core";
import SortableElementsList from "./SortableElementsList";

interface Props {
  idsList: string[];
  OverFormBuilderElementId: string | null;
  activeIdElement: string | null;
  isActivedItemFromSidebar: boolean;
  setEditableElementsId: React.Dispatch<React.SetStateAction<string[]>>;
}

const EditableElementsList = ({
  idsList,
  OverFormBuilderElementId,
  activeIdElement,
  setEditableElementsId,
  isActivedItemFromSidebar,
}: Props) => {
  const { setNodeRef } = useDroppable({
    id: "droppable",
  });

  return (
    <div className="ml-52 px-52 py-5">
      <ul
        ref={setNodeRef}
        className="bg-white mt-14 min-h-screen p-6 shadow-xl rounded-xl "
      >
        <SortableElementsList
          items={idsList}
          isSideBarItem={isActivedItemFromSidebar}
          OverFormBuilderElementId={OverFormBuilderElementId}
          activeIdElement={activeIdElement}
          setEditableElementsId={setEditableElementsId}
        />
      </ul>
    </div>
  );
};

export default EditableElementsList;
