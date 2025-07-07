import { Icon } from "@iconify/react";
import { useDraggable } from "@dnd-kit/core";
import { useMemo } from "react";
import TypeElementOverlayCustom from "./TypeElementOverlayCustom";

type TypeElement = {
  id: string;
  type: "heading" | "input" | "button" | "select" | "image";
};

interface Props {
  icon: string;
  name: string;
}

const TypeElement = ({ icon, name }: Props) => {
  const ownType: TypeElement = useMemo(
    () => ({
      id: name + Date.now().toString(),
      type: name.toLowerCase() as TypeElement["type"],
    }),
    []
  );

  const { attributes, listeners, setNodeRef, transform, over } = useDraggable({
    id: ownType.id,
  });

  console.log("over:" + over);

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
      : undefined,
  };
  return (
    <TypeElementOverlayCustom
      setNodeRef={setNodeRef}
      isDragging={transform !== null}
      attributes={attributes}
      listeners={listeners}
      style={style}
    >
      <Icon icon={icon} />
      <span className="pl-1 border-l">{name}</span>
    </TypeElementOverlayCustom>
  );
};

export default TypeElement;
