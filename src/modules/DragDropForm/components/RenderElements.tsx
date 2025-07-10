import { useMemo } from "react";
import { type DragState } from "../../../types/ElementTypes";
import useElements from "../hooks/useElements";
import useEditHandlers from "../hooks/useEditHandlers";
import { useLocation } from "react-router-dom";
import RenderElementItems from "../../EditableElement/components/RenderElementItems";

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
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const renderedElements = useMemo(
    () =>
      elements.map((item) => (
        <RenderElementItems
          key={item.id}
          item={item}
          canEdit={isActive("/")}
          onSave={(updated) => handleOnSave(item.id, updated)}
          onDelete={() => handleOnDelete(item.id)}
        />
      )),
    [elements, handleOnSave, handleOnDelete]
  );

  return <>{renderedElements}</>;
};

export default RenderElemments;
