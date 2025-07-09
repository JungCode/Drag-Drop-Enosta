import { useMemo } from "react";
import { type DragState } from "../../../types/ElementTypes";
import RenderElementItems from "../../../components/elements/RenderElementItems";
import useElements from "../hooks/useElements";
import useEditHandlers from "../hooks/useEditHandlers";

const RenderElemments = ({
  items = [],
  setDragState,
}: {
  items: string[];
  setDragState: React.Dispatch<React.SetStateAction<DragState>>;
}) => {
  const [elements, setElements] = useElements(items);
  const { handleOnDelete, handleOnSave } = useEditHandlers(
    setElements,
    setDragState
  );

  const renderedElements = useMemo(
    () =>
      elements.map((item) => (
        <RenderElementItems
          key={item.id}
          item={item}
          canEdit
          onSave={(updated) => handleOnSave(item.id, updated)}
          onDelete={() => handleOnDelete(item.id)}
        />
      )),
    [elements, handleOnSave, handleOnDelete]
  );

  return <>{renderedElements}</>;
};

export default RenderElemments;
