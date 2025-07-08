import { useDroppable } from "@dnd-kit/core";
import SortableElementsList from "./SortableElementsList";

interface Props {
  idsList: string[];
  OverFormBuilderElementId: string | null;
  activeIdElement: string | null;
}

const EditableElementsList = ({
  idsList,
  OverFormBuilderElementId,
  activeIdElement,
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

  // console.log('ghostIdsList', ghostIdsList);

  return (
    <div className="ml-52 px-52 mt-52 py-5" style={{ border: '1px solid red'}}>
      <ul
        ref={setNodeRef}
        className="bg-white h-full p-6 shadow-xl rounded-xl "
        style={{ border: '1px solid green'}}
      >
        <SortableElementsList
          items={ghostIdsList}
          isSideBarItem={isActivedItemFromOutSide}
          OverFormBuilderElementId={OverFormBuilderElementId}
          activeIdElement={activeIdElement}
        />
      </ul>
    </div>
  );
};

export default EditableElementsList;
