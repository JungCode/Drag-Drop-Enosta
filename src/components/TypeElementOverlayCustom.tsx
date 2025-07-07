import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

interface Props {
  children: React.ReactNode;
  isDragging: boolean;
  listeners: SyntheticListenerMap | undefined;
  attributes: DraggableAttributes;
  setNodeRef: (element: HTMLElement | null) => void;
  style: React.CSSProperties;
}
const TypeElementOverlayCustom = ({
  children,
  attributes,
  listeners,
  style,
  isDragging,
  setNodeRef,
}: Props) => {
  const draggingStyle = isDragging ? "relative z-10 shadow-md" : undefined;

  return (
    <li className={isDragging ? "relative" : undefined}>
      <div
        className={`${draggingStyle} transition-colors bg-blue-600 text-white p-2 rounded-md flex  items-center gap-1 cursor-pointer hover:bg-blue-400`}
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        {children}
      </div>
      {isDragging && (
        <div className="absolute top-0 bottom-0 transition-colors bg-blue-600 z-0 opacity-40 text-white p-2 rounded-md flex  items-center gap-1 cursor-pointer hover:bg-blue-400 w-full">
          {children}
        </div>
      )}
    </li>
  );
};

export default TypeElementOverlayCustom;
