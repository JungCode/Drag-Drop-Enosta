import {
  DndContext,
  type DragEndEvent,
  type DragMoveEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import EditableElementsList from "../components/EditableElementsList";
import SideBar from "../components/SideBar";
import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

const FormBuilderPage = () => {
  // Initiate 2 example elements id
  const [editableElementsId, setEditableElementsId] = useState([
    "Heading1",
    "Heading2",
  ]);
  const [activeIdElement, setActiveIdElement] = useState<string | null>(null);
  // The state that tracks if an element is going through form builder
  const [OverFormBuilderElementId, setOverFormBuilderElementId] = useState<
    string | null
  >(null);

  // ------ UI animation Functions ------

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setOverFormBuilderElementId(null);

    // Check if a element did not change its position then do nothing
    if (!over || active.id === over.id) {
      const currIndex = editableElementsId.indexOf(active.id as string);

      // Special case (creating element): Check if the current array does not include the actived element,
      // that means the user want to create a new element at the last of the array
      // therefore the (active.id === over.id) -> (true) is happended
      if (currIndex === -1 && OverFormBuilderElementId !== null) {
        setEditableElementsId([...editableElementsId, active.id as string]);
      }
      // TODO: change on local storage
      console.log([...editableElementsId, active.id as string]);

      return;
    }

    const oldIndex = editableElementsId.indexOf(active.id as string);
    const newIndex = editableElementsId.indexOf(over.id as string);
    let movedArray: string[];

    // Special case (creating element): Check if the current array does not contain
    // the actived element that means the user wants to create a element at "newIndex"
    if (oldIndex === -1 && typeof active.id === "string") {
      movedArray = [
        ...editableElementsId.slice(0, newIndex),
        active.id,
        ...editableElementsId.slice(newIndex),
      ];

      // Else just swap 2 elements (re-arrange)
    } else {
      movedArray = arrayMove(editableElementsId, oldIndex, newIndex);
    }
    // TODO: change on local storage
    console.log(movedArray);

    setEditableElementsId(movedArray);
  }

  function handleOnDragStart(event: DragStartEvent) {
    setActiveIdElement(event.active.id as string);
  }

  function handleOnDragMove(event: DragMoveEvent) {
    const { over, active } = event;

    if (over !== null) {
      setOverFormBuilderElementId(active.id as string);
    } else {
      setOverFormBuilderElementId(null);
    }
  }
  // ------ End of UI animation Functions ------

  return (
    <div className="bg-gray-100 h-screen">
      <DndContext
        onDragStart={handleOnDragStart}
        onDragEnd={handleDragEnd}
        onDragMove={handleOnDragMove}
      >
        <SideBar isOverFormBuilder={OverFormBuilderElementId !== null} />
        <EditableElementsList
          idsList={editableElementsId}
          activeIdElement={activeIdElement}
          OverFormBuilderElementId={OverFormBuilderElementId}
        />
      </DndContext>
    </div>
  );
};

export default FormBuilderPage;
