import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  id: string | null;
  isOverLay?: boolean;
  isSideBarItem?: boolean;
}
const EditableElement = ({
  id,
  isOverLay = false,
  isSideBarItem = false,
}: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id as string });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging && !isOverLay ? "0.2" : undefined,
    width: isSideBarItem ? "fit-content" : undefined,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="opacity-60 p-10 rounded-md text-xl text-center border border-dashed border-gray-400 hover:border-black hover:opacity-100 cursor-pointer bg-white"
    >
      {/* Turn into drag icons when the element came from sidebar */}
      {isSideBarItem ? <Icon icon="fluent:drag-24-filled" /> : id}
    </li>
  );
};

export default EditableElement;
