import { Icon } from "@iconify/react";
import TypeElementOverlayCustom from "./TypeElementOverlayCustom";
import useDraggableCustom from "../hooks/useDraggableCustom";

interface Props {
  icon: string;
  name: string;
  isOverFormBuilder: boolean;
}

const SidebarTypeElement = ({ icon, name, isOverFormBuilder }: Props) => {
  const { attributes, listeners, setNodeRef, transform, style } =
    useDraggableCustom(name, [isOverFormBuilder]);
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

export default SidebarTypeElement;
