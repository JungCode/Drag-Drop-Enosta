import { Icon } from "@iconify/react";
import { useDraggable } from "@dnd-kit/core";
import { useMemo } from "react";
import TypeElementOverlayCustom from "./TypeElementOverlayCustom";
import type { KindOfElementType } from "../types/ElementTypes";

interface Props {
  icon: string;
  name: string;
  isOverFormBuilder: boolean;
}

const TypeElements = ({ icon, name, isOverFormBuilder }: Props) => {
  // Use useMemo to not to re-render therefore we can drag it normally
  const ownType: KindOfElementType = useMemo(
    () => ({
      id: name + "-" + Date.now().toString(),
      type: name.toLowerCase() as KindOfElementType["type"],
    }),
    // Re-create the id whenever TypeElement is dropped or just move into form builder
    // because this id will be use for editable element so we don't want dupplicating.
    [isOverFormBuilder]
  );

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ownType.id,
  });
  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
      : undefined,
  };
  return (
    <TypeElementOverlayCustom
      setNodeRef={setNodeRef}
      isDragged={transform !== null}
      attributes={attributes}
      listeners={listeners}
      style={style}
    >
      {
        <>
          <Icon icon={icon} />
          <span className="pl-1 border-l">{name}</span>
        </>
      }
    </TypeElementOverlayCustom>
  );
};

export default TypeElements;
