import { useDroppable } from "@dnd-kit/core";
import SortableElementsList from "./SortableElementsList";

interface Props {
  idsList: string[];
  OverFormBuilderElementId: string | null;
  activeIdElement: string | null;
  setEditableElementsId: React.Dispatch<React.SetStateAction<string[]>>;
}

const EditableElementsList = ({
  idsList,
  OverFormBuilderElementId,
  activeIdElement,
  setEditableElementsId,
}: Props) => {
  const { setNodeRef } = useDroppable({
    id: "droppable",
  });

  const isActivedItemFromOutSide = !!(
    activeIdElement && !idsList.includes(activeIdElement)
  );

  // Check if item is draged from side bar to form builder then create a ghost list
  // if it's not then the user just re-arranges the elements
  let ghostIdsList: string[] = idsList;
  if (isActivedItemFromOutSide && OverFormBuilderElementId !== null) {
    ghostIdsList = [...idsList, activeIdElement as string];
  }

  return (
    <div className="ml-52 px-52 py-5">
      <ul
        ref={setNodeRef}
        className="bg-white mt-14 min-h-screen p-6 shadow-xl rounded-xl "
      >
        <SortableElementsList
          items={ghostIdsList}
          isSideBarItem={isActivedItemFromOutSide}
          OverFormBuilderElementId={OverFormBuilderElementId}
          activeIdElement={activeIdElement}
          setEditableElementsId={setEditableElementsId}
        />
      </ul>
    </div>
  );
};

export default EditableElementsList;
