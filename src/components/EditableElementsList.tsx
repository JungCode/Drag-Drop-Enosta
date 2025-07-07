import { useDroppable } from "@dnd-kit/core";
import SortableElementsList from "./SortableElementsList";

interface Props {
  idList: string[];
  OverFormBuilderElementId: string | null;
  activeIdElement: string | null;
}

const EditableElementsList = ({
  idList,
  OverFormBuilderElementId,
  activeIdElement,
}: Props) => {
  const { setNodeRef } = useDroppable({
    id: "droppable",
  });

  const isActivedItemFromOutSide =
    activeIdElement && !idList.includes(activeIdElement);
  if (isActivedItemFromOutSide && OverFormBuilderElementId !== null) {
    idList = [...idList, activeIdElement as string];
  }

  return (
    <div className="ml-52 px-52 min-h-screen h-full py-5">
      <ul
        ref={setNodeRef}
        className="bg-white h-full p-6 shadow-xl rounded-xl "
      >
        <SortableElementsList
          items={idList}
          isSideBarItem={!!isActivedItemFromOutSide}
          OverFormBuilderElementId={OverFormBuilderElementId}
          activeIdElement={activeIdElement}
        />
      </ul>
    </div>
  );
};

export default EditableElementsList;
