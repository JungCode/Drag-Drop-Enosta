import { useSortable } from "@dnd-kit/sortable";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";

interface EditableWrapperProps {
  children: React.ReactNode;
  editView: React.ReactNode;
  width?: string;
  position?: "left" | "center" | "right";
  canEdit?: boolean;
  onSave?: () => void;
  onDelete?: () => void;
  onDiscard?: () => void;
  id: string;
}

const getPositionClass = (position?: string) => {
  switch (position) {
    case "center":
      return "mx-auto";
    case "right":
      return "ml-auto";
    default:
      return "";
  }
};

const EditableWrapper: React.FC<EditableWrapperProps> = ({
  children,
  editView,
  width = "100%",
  position = "left",
  canEdit = false,
  onSave,
  onDelete,
  onDiscard,
  id = "abcb",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
    opacity: isDragging ? "0.4" : "1",
  };

  const handleDiscard = () => {
    onDiscard?.();
    setIsEditing(false);
  };

  const handleSave = () => {
    onSave?.();
    setIsEditing(false);
  };

  if (isEditing && canEdit) {
    return (
      <div
        className={`border border-gray-400 border-dashed p-4 rounded space-y-4 transition-all duration-300 ${getPositionClass(
          position
        )}`}
        style={{ width }}
      >
        {editView}
        <div className="flex gap-2 mt-4 justify-end">
          <button
            onClick={handleDiscard}
            className="flex items-center gap-1 px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition"
          >
            <Icon icon="mdi:undo" className="text-lg" />
            Discard
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            <Icon icon="mdi:content-save-outline" className="text-lg" />
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-2 rounded border transition-colors duration-300 border-dashed ${
        canEdit && "h-28"
      } flex flex-col justify-center ${
        canEdit && isHovered ? " border-gray-400" : "border-transparent "
      } ${getPositionClass(position)}`}
      style={{ width, ...style, position: "relative", zIndex: 9999999 }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {children}
      {isHovered && canEdit && !isEditing && (
        <div className="absolute top-1 right-1 flex gap-1 z-10">
          <button
            onDoubleClick={() => {
              setIsEditing(true);
              console.log("edit");
            }}
            className="bg-white p-1 rounded shadow hover:bg-blue-100 transition"
          >
            <Icon icon="mdi:pencil-outline" className="text-blue-600 text-lg" />
          </button>
          <button
            onDoubleClick={onDelete}
            className="bg-white p-1 rounded shadow hover:bg-red-100 transition"
          >
            <Icon
              icon="mdi:trash-can-outline"
              className="text-red-600 text-lg"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableWrapper;
