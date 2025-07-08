import {
  DndContext,
  type DragEndEvent,
  type DragMoveEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import EditableElementsList from "../components/EditableElementsList";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import type { ElementItem } from "../types/ElementTypes";
import { syncElementsWithLocalStorage } from "../ultis/storage";

const FormBuilderPage = () => {
  // Initiate 2 example elements id
  const [editableElementsId, setEditableElementsId] = useState<string[]>([]);
  const [activeIdElement, setActiveIdElement] = useState<string | null>(null);
  // The state that tracks if an element is going through form builder
  const [OverFormBuilderElementId, setOverFormBuilderElementId] = useState<
    string | null
  >(null);

  // Fetch data at the first time reload
  useEffect(() => {
    const savedElements = localStorage.getItem("elements");
    const parsedElements: ElementItem[] = savedElements
      ? JSON.parse(savedElements)
      : [];

    const elementIds = parsedElements.map((el) => el.id);
    setEditableElementsId(elementIds);
  }, []);

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
        syncElementsWithLocalStorage([
          ...editableElementsId,
          active.id as string,
        ]);
      }

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
    syncElementsWithLocalStorage(movedArray);
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
    <div className="bg-gray-100 ">
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
          setEditableElementsId={setEditableElementsId}
        />
      </DndContext>
    </div>
  );
};

export default FormBuilderPage;
