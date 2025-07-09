import { useSortable } from "@dnd-kit/sortable";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useCallback, useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import type { PositionType } from "../../types/ElementTypes";

interface EditableWrapperProps {
  children: React.ReactNode;
  editView: React.ReactNode;
  width?: string;
  position?: PositionType;
  canEdit?: boolean;
  onSave?: () => boolean | void;
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

const EditableWrapper: React.FC<EditableWrapperProps> = React.memo(({
  children,
  editView,
  width = "100%",
  position = "left",
  canEdit = false,
  onSave,
  onDelete,
  onDiscard,
  id,
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
  } = useSortable({ id });

  const style = useMemo(() => ({
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? "0.4" : "1",
  }), [transform, transition, isDragging]);

  const handleDiscard = useCallback(() => {
    onDiscard?.();
    setIsEditing(false);
    setIsHovered(false);
  }, [onDiscard]);

  const handleSave = useCallback(() => {
    const result = onSave?.();
    if (result === false) return;
    setIsEditing(false);
    setIsHovered(false);
  }, [onSave]);

  const wrapperClass = useMemo(() => {
    return `relative p-2 rounded border transition-colors duration-300 border-dashed flex flex-col justify-center cursor-pointer ${
      canEdit && isHovered ? " border-gray-400" : "border-transparent "
    } ${getPositionClass(position)}`;
  }, [canEdit, isHovered, position]);

  if (isEditing && canEdit) {
    return (
      <div
        className={`border border-gray-400 border-dashed p-4 rounded space-y-4 transition-all duration-300 ${getPositionClass(
          position
        )}`}
        style={{ width }}
      >
        {editView}
        <div className="flex flex-wrap gap-2 mt-4 justify-end">
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
          <button
            onClick={onDelete}
            className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            <Icon icon="mdi:trash-can-outline" className="text-lg" />
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={() => {
        if (canEdit) setIsEditing(true);
      }}
      className={wrapperClass}
      style={{ width, ...style, position: "relative", zIndex: 9999998 }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      id={id}
    >
      {children}
    </div>
  );
});

export default EditableWrapper;